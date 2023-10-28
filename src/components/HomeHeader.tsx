import { Animated, StyleSheet } from "react-native";
import React from "react";
import { Button, View, Text, useTheme, Stack } from "native-base";
import { SearchNormal } from "iconsax-react-native";
import { useAppDispatch } from "../store";
import { showPopupFilter } from "../store/popup-filter.reducer";
import { colorTheme } from "../theme";

const Max_Header_Height = 140;
const Min_Header_Height = 120;
const Scroll_Distance = Max_Header_Height - Min_Header_Height;

const HomeHeader = ({ animHeaderValue }: any) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const animatedHeaderHeight = animHeaderValue.interpolate({
    inputRange: [0, Scroll_Distance],
    outputRange: [Max_Header_Height, Min_Header_Height],
    extrapolate: "clamp",
  });
  return (
    <Animated.View
      style={{
        height: animatedHeaderHeight,
        backgroundColor: colorTheme.primary[600],
        justifyContent: "center",
        paddingBottom: 8,
      }}
    >
      <Stack px="5" safeAreaTop>
        <Button
          size="lg"
          rounded="lg"
          colorScheme="button"
          leftIcon={<SearchNormal color={colors.muted[400]} />}
          onPress={() => dispatch(showPopupFilter())}
        >
          <Text color="muted.400">Tìm kiếm theo nhu cầu</Text>
        </Button>
      </Stack>
    </Animated.View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
