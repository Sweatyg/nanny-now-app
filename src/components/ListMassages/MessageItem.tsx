import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { HStack, Heading, Text, VStack } from "native-base";
import { MessageItemProps } from "../../types/message";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../Avatar";

type Props = MessageItemProps;

const MessageItem = ({ date, lastMassage, targetUser }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat");
      }}
    >
      <HStack alignItems="center" justifyContent="space-between" my="2">
        <HStack space={2} flex={1}>
          <Avatar size="md" source={require("../../../assets/Avatar.png")} />
          <VStack justifyContent="center" space={2} flex={1}>
            <Heading color="muted.800" fontSize="xl" fontWeight="semibold" textTransform="capitalize">
              {targetUser.profile.fullname}
            </Heading>
            <Text color="muted.500" numberOfLines={1}>
              {lastMassage || "Tin nhắn cuối cùng"}
            </Text>
          </VStack>
        </HStack>
        <Text color="muted.400" p="4">
          07:00
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default MessageItem;

const styles = StyleSheet.create({});
