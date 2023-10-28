import React from "react";
import { HStack, useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  rate: number;
  size?: number;
};

function renderStar(num: number) {
  if (num > 0.8) return "ios-star-sharp";
  else if (num >= 0.3 && num <= 0.8) return "ios-star-half-sharp";
  else return "ios-star-outline";
}

const Rating = ({ rate, size = 18 }: Props) => {
  const { colors } = useTheme();

  return (
    <HStack space="0.5">
      <Ionicons name={renderStar(rate)} color={colors.warning[500]} size={size} />
      <Ionicons name={renderStar(rate - 1)} color={colors.warning[500]} size={size} />
      <Ionicons name={renderStar(rate - 2)} color={colors.warning[500]} size={size} />
      <Ionicons name={renderStar(rate - 3)} color={colors.warning[500]} size={size} />
      <Ionicons name={renderStar(rate - 4)} color={colors.warning[500]} size={size} />
    </HStack>
  );
};

export default Rating;
