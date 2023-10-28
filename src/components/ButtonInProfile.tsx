import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, IButtonProps, useTheme } from "native-base";
import { ArrowRight2 } from "iconsax-react-native";

type Props = {} & IButtonProps;

const ButtonInProfile = (props: Props) => {
  const { colors } = useTheme();
  return (
    <Button
      variant="outline"
      borderColor="primary.600"
      size="lg"
      rounded="lg"
      // flex={1}
      rightIcon={<ArrowRight2 variant="Outline" color={colors.primary[600]} />}
      _stack={{ width: "100%", justifyContent: "space-between" }}
      _text={{ fontWeight: "semibold" }}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
};

export default ButtonInProfile;

const styles = StyleSheet.create({});
