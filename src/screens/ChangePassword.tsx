import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { Button, FormControl, Input, Stack, VStack, WarningOutlineIcon } from "native-base";

const ChangePassword = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack space="3" flex={1} bg="white" px="5" pt="16" safeAreaBottom>
        <FormControl>
          <Stack mx="2">
            <FormControl.Label>Mật khẩu hiện tại</FormControl.Label>
            <Input
              type="password"
              variant="outline"
              placeholder="Mật khẩu hiện tại"
              h="12"
              fontSize="md"
            />
          </Stack>
        </FormControl>
        <FormControl>
          <Stack mx="2">
            <FormControl.Label>Mât khẩu mới</FormControl.Label>
            <Input
              type="password"
              variant="outline"
              placeholder="Mât khẩu mới"
              h="12"
              fontSize="md"
            />
          </Stack>
        </FormControl>
        <FormControl>
          <Stack mx="2">
            <FormControl.Label>Nhập lại mật khẩu</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Nhập lại mật khẩu"
              h="12"
              fontSize="md"
              secureTextEntry
            />
          </Stack>
        </FormControl>
        <Stack px="2" pt="3">
          <Button rounded="lg" size="lg">
            Cập nhật mật khẩu
          </Button>
        </Stack>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
