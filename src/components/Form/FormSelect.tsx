import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CheckIcon, FormControl, IFormControlProps, ISelectProps, Select } from "native-base";
import { ArrowDown2 } from "iconsax-react-native";
import { colorTheme } from "../../theme";

const DefaultSelectProps: ISelectProps = {
  height: "12",
  colorScheme: "primary",
  _selectedItem: {
    bg: "primary.100",
    endIcon: <CheckIcon size="5" />,
  },
  _item: {
    _pressed: { backgroundColor: "primary.100" },
  },
  _actionSheetBody: { scrollEnabled: false },
  dropdownIcon: <ArrowDown2 color={colorTheme.primary[600]} size={24} style={{ marginRight: 8 }} />,
  rounded: "lg",
  fontSize: "sm",
};

export type SelectItem = {
  id: string;
  label: string;
};

type Props = {
  label?: string;
  items?: SelectItem[];
  _stack?: IFormControlProps;
} & ISelectProps;

const FormSelect = (props: Props) => {
  const { label, _stack, items, ...selectProps } = props;

  return (
    <FormControl {..._stack}>
      {label && (
        <FormControl.Label _text={{ color: "primary.600", fontWeight: "semibold" }}>
          {label}
        </FormControl.Label>
      )}
      <Select {...DefaultSelectProps} placeholder="Lựa chọn" {...selectProps}>
        {items?.map((item) => (
          <Select.Item key={item.id} label={item.label} value={item.id} />
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(FormSelect);

const styles = StyleSheet.create({});
