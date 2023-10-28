import { StyleSheet } from "react-native";
import React from "react";
import { Divider, Heading, Stack, VStack } from "native-base";
import NANNY from "../../data/nanny";
import NotificationList from "../../components/NotificationList/NotificationList";
import { StatusBar } from "expo-status-bar";

const Notification = () => {
  return (
    <>
      <StatusBar style="light" />
      <Stack bg="primary.600" safeAreaTop>
        <Heading textAlign="center" pt="2" pb="3" fontSize="xl" color="white">
          Thông báo
        </Heading>
      </Stack>
      <VStack flex={1} bg="white">
        <Stack px="4" flex="1">
          <NotificationList data={NANNY.map((user) => ({ fromUser: user }))} />
        </Stack>
      </VStack>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({});
