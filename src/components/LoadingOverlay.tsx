import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Center, HStack, Heading, Spinner, Stack } from "native-base";

const LoadingOverlay = () => {
  return (
    <Center flex={1} style={styles.container} bg="white" zIndex={2}>
      <HStack space={2} justifyContent="center">
        <Spinner size="lg" accessibilityLabel="Loading posts" />
      </HStack>
    </Center>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    top: 0,
    left: 0,
    backgroundColor: "white"
  },
});
