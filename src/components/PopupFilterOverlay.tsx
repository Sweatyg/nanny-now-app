import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button, FormControl, HStack, Input, Modal, VStack } from "native-base";
import { useAppDispatch, useAppSelector } from "../store";
import { hidePopupFilter } from "../store/popup-filter.reducer";
import FormSelect from "./Form/FormSelect";
import FormCheckBoxes from "./Form/FormCheckBoxes";

const PopupFilterOverlay = () => {
  const { show } = useAppSelector((state) => state.popupFilter);
  const dispatch = useAppDispatch();
  const closePopup = () => dispatch(hidePopupFilter());
  return (
    <Modal isOpen={show} onClose={closePopup} size="full" animationPreset="slide">
      <Modal.Content style={{ marginBottom: 0, marginTop: "auto", width: "100%" }}>
        <Modal.CloseButton />
        <Modal.Header _text={{ color: "primary.600", fontSize: "xl" }}>Bộ lọc</Modal.Header>
        <Modal.Body>
          <VStack space="4">
            <FormSelect label="Loại chăm sóc" />
            <FormCheckBoxes
              formLabel="Giới tính"
              values={[
                { id: "all", label: "Tất cả" },
                { id: "male", label: "Nam" },
                { id: "female", label: "Nữ" },
              ]}
            />
            <FormControl>
              <FormControl.Label mb="2">Khu vực</FormControl.Label>
              <HStack space="4">
                <FormSelect _stack={{ flex: 1 }} />
                <FormSelect _stack={{ flex: 1 }} />
              </HStack>
            </FormControl>
            <FormControl>
              <FormControl.Label>Giá</FormControl.Label>
              <HStack space="4">
                <Input flex={1} placeholder="Min" fontSize={14} h="12" />
                <Input flex={1} placeholder="Max" fontSize={14} h="12" />
              </HStack>
            </FormControl>
          </VStack>
        </Modal.Body>
        <Modal.Footer safeAreaBottom>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={closePopup}>
              Đóng
            </Button>
            <Button onPress={closePopup}>Tìm kiếm</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default PopupFilterOverlay;

const styles = StyleSheet.create({});
