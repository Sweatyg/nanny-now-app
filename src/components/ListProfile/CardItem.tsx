import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import { Text, VStack } from "native-base";
import { colorTheme } from "../../theme";
import { Nanny, UserProfile } from "../../types/user";
import UserSummary from "../UserSummary";
import { useNavigation } from "@react-navigation/native";

type Props = {
  style?: StyleProp<ViewStyle>;
  px?: string;
  data: UserProfile<Nanny>;
};

const CardItem = ({ px, style, data }: Props) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("NannyDetail", { nanny: data })}
      delayPressIn={50}
      activeOpacity={0.6}
    >
      <VStack style={[styles.container, style]} rounded="lg" px={px}>
        <UserSummary user={data} />
        <Text fontSize="md" color="muted.500" textTransform="capitalize" numberOfLines={2}>
          {data.profile.description[0]}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorTheme.muted[100],
    height: 150,
    padding: 12,
    justifyContent: "space-between",
  },
  info: {},
  description: {
    fontSize: 16,
    textTransform: "capitalize",
  },
});
