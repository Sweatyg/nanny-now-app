import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox, FormControl, HStack, Text } from "native-base";
import { CheckBoxValue } from "../../types/type-utils";

type Props = {
  formLabel?: string;
  values?: CheckBoxValue[];
};

const FormCheckBoxes = (props: Props) => {
  const [values, setValues] = useState<string[]>([]);
  function onChange(values: string[]) {
    setValues([values[values.length - 1]]);
  }
  return (
    <FormControl>
      <FormControl.Label>{props.formLabel}</FormControl.Label>
      <Checkbox.Group
        flexDir="row"
        justifyContent="space-between"
        onChange={onChange}
        value={values}
      >
        <HStack space="4">
          {props.values?.map((item) => (
            <Checkbox value={item.id} key={item.id}>
              <Text color="muted.800">{item.label}</Text>
            </Checkbox>
          ))}
        </HStack>
      </Checkbox.Group>
    </FormControl>
  );
};

export default FormCheckBoxes;

const styles = StyleSheet.create({});
