import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { HStack, IconButton, Input, ScrollView, Text, VStack, useTheme } from "native-base";
import { ArrowLeft2, ToggleOnCircle, AttachCircle, Camera, Send2 } from "iconsax-react-native";
import ChatItem, { EChatType } from "../components/ChatItem";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../components/Avatar";

const Chat = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  return (
    <VStack bg="white" flex={1} safeAreaTop px="2" py="3" space="4" safeAreaBottom>
      <HStack space={1} bg="white">
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icontBtn}>
          <ArrowLeft2 color={colors.muted[800]} />
        </TouchableOpacity>

        <Avatar size="sm" source={require("../../assets/Avatar.png")} />
        <VStack>
          <Text color="muted.800" fontWeight="bold" fontSize="md">
            Miracle Dorwart
          </Text>
          <HStack alignItems="center" space={1}>
            <ToggleOnCircle variant="Bold" color={colors.green[500]} size={18} />
            {/* <ToggleOffCircle variant="Bold" color={colors.red[500]} /> */}
            <Text color="muted.800" fontSize="sm">
              Online
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <ScrollView px="4" showsVerticalScrollIndicator={false}>
        <ChatItem message="Lorem ipsum dolor sit amet" type={EChatType.RECIEVED} />
        <ChatItem
          message="Lorem ipsum dolor sit amet consectetur. Lectus ipsum est ac "
          type={EChatType.SEND}
        />
        <ChatItem
          message="Lorem ipsum dolor sit amet consectetur. Lectus ipsum est ac "
          type={EChatType.RECIEVED}
        />
        <ChatItem
          message="Lorem ipsum dolor sit amet consectetur. Lectus ipsum est ac "
          type={EChatType.SEND}
        />
      </ScrollView>
      <HStack space={2} alignItems="center" bg="muted.50" rounded="lg" p="1" mx="2">
        <HStack space="2" px="2" borderRightWidth={1} borderRightColor="muted.200">
          <AttachCircle color={colors.muted[500]} />
          <Camera color={colors.muted[500]} />
        </HStack>
        <Input placeholder="Nội dung" fontSize="md" variant="unstyled" flex={1} h="12" />
        <IconButton variant="solid" icon={<Send2 color="white" />} />
      </HStack>
    </VStack>
  );
};

export default Chat;

const styles = StyleSheet.create({
  icontBtn: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
