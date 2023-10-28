import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, Column } from "native-base";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigations/config";
import FormDatePicker from "../components/Form/FormDatePicker";
import FormInput from "../components/Form/FormInput";
import AddressSelect from "../components/Form/AddressSelect";
import { useAppDispatch, useAppSelector } from "../store";
import { onInputChange } from "../utils/form-utils";
import { removeLoading, setLoading } from "../store/loading.reducer";
import LoadingOverlay from "../components/LoadingOverlay";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import { createSchedule } from "../types/schedule";

type Props = StackScreenProps<RootStackParams, "BookingForm">;

type BookingInfo = {
  datetime: Date;
  district: string;
  address: string;
  note: string;
};

const BookingForm = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { nanny } = route.params;
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const [formData, setFormData] = useState<BookingInfo>({
    datetime: new Date(),
    district: user!.profile.district,
    address: "",
    note: "",
  });

  async function onBooking() {
    try {
      dispatch(setLoading());
      if (formData.address.length * formData.note.length == 0) {
        throw Error("Bạn phải điền đủ thông tin");
      }
      await createSchedule({
        ...formData,
        nanny,
        parent: user!.phone,
        datetime: formData.datetime.toISOString(),
      });
      navigation.navigate("ScheduleMeeting" as any);
    } catch (err) {
      console.error(err);
      dispatch(
        setPopup({
          type: EPopupType.ERROR,
          title: "Thông báo",
          message: (err as any).message,
        })
      );
    } finally {
      dispatch(removeLoading());
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Column bg="white" flex={1} px="4" space="3" pt="4">
      <FormDatePicker
        value={formData.datetime}
        onChange={onInputChange<BookingInfo>("datetime", setFormData, formData)}
      />
      <AddressSelect
        district={formData.district as any}
        setDistrict={onInputChange<BookingInfo>("district", setFormData, formData)}
      />
      <FormInput
        label="Địa chỉ"
        onChangeText={onInputChange<BookingInfo>("address", setFormData, formData)}
      />
      <FormInput
        label="Mong muốn"
        multiline
        h="32"
        onChangeText={onInputChange<BookingInfo>("note", setFormData, formData)}
      />
      <Button _text={{ fontWeight: "semibold" }} onPress={onBooking}>
        Đặt lịch
      </Button>
    </Column>
  );
};

export default BookingForm;

const styles = StyleSheet.create({});
