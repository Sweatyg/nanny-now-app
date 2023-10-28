import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Box, Column, FormControl, Text } from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from "react-native";
import moment from "moment";

type Props = {
  value?: Date;
  onChange?: (value: Date) => void;
};

const FormDatePicker = ({ value, onChange }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Column>
        <FormControl.Label _text={{ color: "primary.600", fontWeight: "semibold" }}>
          Thời gian hẹn
        </FormControl.Label>
        <TouchableOpacity onPress={showDatePicker}>
          <Box borderWidth={0.2} p="3" rounded="md">
            <Text fontWeight="semibold">{moment(value).format("DD - MM - YYYY   HH:mm")}</Text>
          </Box>
        </TouchableOpacity>
      </Column>
    </>
  );
};

export default FormDatePicker;

const styles = StyleSheet.create({});
