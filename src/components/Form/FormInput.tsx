import { StyleSheet } from "react-native";
import React from "react";
import { FormControl, IInputProps, Input, VStack, IStackProps } from "native-base";

type Props = {
  label?: string;
  isRequired?: boolean;
  _stack?: IStackProps;
} & IInputProps;

const FormInput = (props: Props) => {
  const { label, isRequired, _stack, ...inputProps } = props;
  return (
    <VStack {..._stack}>
      {label && (
        <FormControl.Label
          _text={{ color: "primary.600", fontWeight: "semibold" }}
          isRequired={isRequired}
        >
          {label}
        </FormControl.Label>
      )}
      <Input
        variant="outline"
        placeholder={label}
        h="12"
        fontSize="md"
        rounded="lg"
        _disabled={{ bg: "primary.50" }}
        {...inputProps}
      />
    </VStack>
  );
};

export default FormInput;

const styles = StyleSheet.create({});
