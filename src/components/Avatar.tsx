import { StyleSheet } from "react-native";
import React from "react";
import { Image, ImageProps, ImageStyle } from "expo-image";
import { Center, IStackProps, Stack } from "native-base";

type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  rounded?: boolean;
  _stack?: IStackProps;
} & ImageProps;

const Avatar = ({ size = "md", style, rounded, _stack, ...imageProps }: Props) => {
  let imgSize = 0;
  if (size === "sm") {
    imgSize = 48;
  } else if (size === "md") {
    imgSize = 64;
  } else if (size === "lg") {
    imgSize = 80;
  } else if (size === "xl") {
    imgSize = 100;
  } else {
    imgSize = 140;
  }
  return (
    <Center
      rounded={rounded ? "full" : undefined}
      overflow={rounded ? "hidden" : "visible"}
      {..._stack}
    >
      <Image
        {...imageProps}
        style={[
          {
            width: imgSize,
            height: imgSize,
            overflow: "visible",
          },
          style as ImageStyle,
        ]}
      />
    </Center>
  );
};

export default Avatar;

const styles = StyleSheet.create({});
