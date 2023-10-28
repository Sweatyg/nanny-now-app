import { ListRenderItem, StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import CommentItem from "./CommentItem";
import { FlatList, VStack } from "native-base";
import { UserRating } from "../../types/rating";
import { USER_RATINGS } from "../../data/user-rating";

const ListComments = () => {
  const renderMessageItem: ListRenderItem<UserRating> = useCallback(({ item }) => {
    return <CommentItem {...item} />;
  }, []);

  // return (
  //   <FlatList
  //     data={USER_RATINGS}
  //     renderItem={renderMessageItem}
  //     showsVerticalScrollIndicator={false}
  //   />
  // );
  return (
    <VStack>
      {USER_RATINGS.map((userRating) => (
        <CommentItem {...userRating} key={userRating.fromUser.phone} />
      ))}
    </VStack>
  );
};

export default ListComments;

const styles = StyleSheet.create({});
