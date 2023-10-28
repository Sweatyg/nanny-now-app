import { StyleSheet } from "react-native";
import React from "react";
import { HStack, Heading, VStack, Text, Divider } from "native-base";
import Rating from "../Rating";
import { UserRating } from "../../types/rating";
import Avatar from "../Avatar";

type Props = UserRating;

const CommentItem = (props: Props) => {
  return (
    <VStack space="1.5" py="3">
      <HStack justifyContent="space-between" px="5">
        <HStack space="3.5">
          <Avatar source={require("../../../assets/Avatar.png")} size="sm" />
          <VStack justifyContent="space-between" py="0.5">
            <Heading fontSize={16} color="muted.800">
              Kierra Workman
            </Heading>
            <Rating rate={4} size={15} />
          </VStack>
        </HStack>
        <Text color="muted.400" py="1">
          2 ngày trước
        </Text>
      </HStack>
      <Text color="muted.800" pl="20">
        {props.description}
      </Text>
      <Divider />
    </VStack>
  );
};

export default CommentItem;

const styles = StyleSheet.create({});
