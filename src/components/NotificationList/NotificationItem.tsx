import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { HStack, VStack, Text, useTheme } from "native-base";
import { Clock } from "iconsax-react-native";
import { NotificationItemProps } from "../../types/notification";
import Avatar from "../Avatar";

type Props = { mt?: any } & NotificationItemProps;

const NotificationItem = ({ fromUser, mt }: Props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity>
      <HStack space="2" mt={mt}>
        <Avatar source={require("../../../assets/Avatar.png")} />
        <VStack flex="1" justifyContent="space-between">
          <Text fontSize={16} color="muted.800">
            <Text textTransform="capitalize" fontWeight="semibold" color="primary.600">
              {fromUser.profile.fullname}
            </Text>{" "}
            đã nhận lịch làm bảo mẫu ngày 06/08 lúc 07:00AM - 10:00AM
          </Text>
          <HStack space={1} alignItems="center">
            <Clock color={colors.muted[500]} size={18} />
            <Text color="muted.500">1 giờ trước</Text>
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({});
