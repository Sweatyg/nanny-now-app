import { StyleSheet } from "react-native";
import React from "react";
import { HStack, VStack, Text, useTheme, Avatar } from "native-base";
import { Location } from "iconsax-react-native";
import { Nanny, UserProfile } from "../types/user";
import Rating from "./Rating";
import { ADDRESS_TREE } from "../data/address";

type Props = {
  user: UserProfile<Nanny>;
  size?: string;
};

let priceFormat = new Intl.NumberFormat("en-US", {
  currency: "VND",
});

const UserSummary = ({ user, size = "md" }: Props) => {
  const { colors } = useTheme();

  return (
    <HStack>
      <HStack flex={1} space="2">
        <Avatar size="lg" source={{ uri: user.profile.avatar }} />
        <VStack flex={1} justifyContent="space-between">
          <Text
            style={[styles.text, styles.fullname]}
            fontSize={size === "md" ? 18 : 20}
            numberOfLines={1}
          >
            {user.profile.fullname}
          </Text>
          <HStack alignItems="center" space={1}>
            <Location size={size === "md" ? 14 : 15} color={colors.muted[500]} />
            <Text
              color="muted.500"
              style={[styles.text]}
              fontSize={size === "md" ? 14 : 15}
              numberOfLines={1}
              flex={1}
            >
              {ADDRESS_TREE[user.profile.district].name}
            </Text>
          </HStack>
          <Text color="muted.500" style={[styles.text]} fontSize={size === "md" ? 14 : 15}>
            {user.profile.experience} năm làm việc
          </Text>
        </VStack>
      </HStack>
      <VStack alignItems="flex-end" justifyContent="space-between" py="1">
        <Text fontSize={size === "md" ? 17 : 18} color="primary.600" fontWeight="600">
          {priceFormat.format(user.profile.price)} / giờ
        </Text>
        <Rating rate={user.profile.rate || 0} size={size === "md" ? 17 : 19} />
      </VStack>
    </HStack>
  );
};

export default UserSummary;

const styles = StyleSheet.create({
  text: {
    textTransform: "capitalize",
  },
  fullname: {
    fontWeight: "500",
  },
});
