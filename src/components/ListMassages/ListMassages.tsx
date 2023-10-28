import { ListRenderItem, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { FlatList } from "native-base";
import { MessageItemProps } from "../../types/message";
import MessageItem from "./MessageItem";

type Props = {
  data: MessageItemProps[];
};

const ListMassages = ({ data }: Props) => {
  const renderMessageItem: ListRenderItem<MessageItemProps> = useCallback(({ item }) => {
    return <MessageItem {...item} />;
  }, []);

  return <FlatList data={data} renderItem={renderMessageItem} />;
};

export default ListMassages;

const styles = StyleSheet.create({});
