import { StyleSheet } from "react-native";
import React from "react";
import { EGender } from "../../types/user";
import FormSelect from "./FormSelect";

type Props = {
  selectedValue?: EGender;
  onValueChange?: (itemValue: string) => void;
  isDisabled?: boolean;
};

const GenderSelect = ({ selectedValue = EGender.None, onValueChange, isDisabled }: Props) => {
  return (
    <FormSelect
      isDisabled={isDisabled}
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      label="Giới tính"
      items={[
        { id: EGender.Male, label: "Nam" },
        { id: EGender.Female, label: "Nữ" },
      ]}
    />
  );
};

export default GenderSelect;

const styles = StyleSheet.create({});
