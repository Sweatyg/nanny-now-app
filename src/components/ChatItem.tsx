import { StyleSheet } from "react-native";
import React from "react";
import { Box, Container, HStack, Stack, Text, VStack } from "native-base";

export enum EChatType {
  SEND,
  RECIEVED,
}

type Props = {
  type: EChatType;
  message: string;
};

const ChatItem = ({ type, message }: Props) => {
  const isRecieved = type === EChatType.RECIEVED;
  return (
    <VStack space={1}>
      <HStack flex={1} justifyContent={isRecieved ? "flex-start" : "flex-end"}>
        <Stack
          borderBottomLeftRadius={isRecieved ? "0" : undefined}
          borderBottomRightRadius={!isRecieved ? "0" : undefined}
          bg={isRecieved ? "muted.100" : "primary.600"}
          px="3"
          py="4"
          rounded="xl"
          maxW="80%"
        >
          <Text
            color={isRecieved ? "muted.800" : "white"}
            fontSize="md"
            minW="12"
            width="100%"
            textAlign={isRecieved ? "left" : "right"}
          >
            {message}
          </Text>
        </Stack>
      </HStack>
      <Text color="muted.500" textAlign={isRecieved ? "left" : "right"}>
        07:05
      </Text>
    </VStack>
  );
};

export default ChatItem;

const styles = StyleSheet.create({});
