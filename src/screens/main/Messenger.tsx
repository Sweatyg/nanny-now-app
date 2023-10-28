import { StyleSheet } from "react-native";
import React from "react";
import { VStack, useTheme, HStack, Input } from "native-base";
import { SearchNormal } from "iconsax-react-native";
import MessageItem from "../../components/ListMassages/MessageItem";
import ListMassages from "../../components/ListMassages/ListMassages";
import { MESSAGES } from "../../data/message";
import { StatusBar } from "expo-status-bar";

const Messenger = () => {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar style="light" />
      <VStack flex={1} bg="white">
        <VStack space="2" px="4" py="4" bg="primary.600" safeAreaTop>
          <HStack>
            <Input
              backgroundColor="white"
              _stack={{ px: "3" }}
              size="lg"
              h="10"
              rounded="lg"
              variant="unstyled"
              flex={1}
              placeholder="Tìm kiếm"
              InputLeftElement={<SearchNormal color={colors.muted[400]} />}
            />
          </HStack>
        </VStack>
        <VStack px="5" flex={1}>
          <ListMassages data={MESSAGES} />
        </VStack>
      </VStack>
    </>
  );
};

export default Messenger;

const styles = StyleSheet.create({});
