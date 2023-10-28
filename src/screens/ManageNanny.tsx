import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { Stack } from "native-base";
import ListProfile from "../components/ListProfile/ListProfile";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../navigations/config";

type NavigationProps = NativeStackScreenProps<RootStackParams, "ManageNanny">;

const ManageNanny = () => {
  const navigation = useNavigation<NavigationProps["navigation"]>();

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Quản lý bảo mẫu", headerBackTitleVisible: false });
  }, []);

  return (
    <Stack flex={1} bg="white" px="6" safeAreaBottom>
      <ListProfile />
    </Stack>
  );
};

export default ManageNanny;

const styles = StyleSheet.create({});
