import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Heading, Stack, VStack } from "native-base";
import ListProfile from "../../components/ListProfile/ListProfile";

const History = () => {
  return (
    <VStack flex="1">
      <Stack bg="primary.600" safeAreaTop>
        <Heading textAlign="center" pt="2" pb="3" fontSize="xl" color="white">
          Lịch sử
        </Heading>
      </Stack>
      <Stack px="3" bg="white" flex="1">
        <ListProfile />
      </Stack>
    </VStack>
  );
};

export default History;

const styles = StyleSheet.create({});
