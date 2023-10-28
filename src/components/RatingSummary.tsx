import { StyleSheet } from "react-native";
import React from "react";
import { HStack, Image, useTheme, Text } from "native-base";

type Props = {
  rating: number;
};

const RatingSummary = ({ rating }: Props) => {
  return (
    <HStack backgroundColor="white" borderRadius="full" style={styles.container}>
      <Text fontSize={16} paddingRight={1}>
        {rating.toPrecision(1)}
      </Text>
      <Image source={require("../../assets/Star.png")} alt="Star" style={styles.rating} />
    </HStack>
  );
};

export default RatingSummary;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 26,
    width: 60,
  },
  rating: { width: 16, height: 16 },
});
