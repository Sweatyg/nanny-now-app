import { ListRenderItem, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { Divider, FlatList } from "native-base";
import { NotificationItemProps } from "../../types/notification";
import NotificationItem from "./NotificationItem";

type Props = {
  data: NotificationItemProps[];
};

const NotificationList = ({ data }: Props) => {
  const renderNotificationItem: ListRenderItem<NotificationItemProps> = useCallback(({ item, index }) => {
    return <NotificationItem {...item} mt={index===0 && "2"} />;
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={renderNotificationItem}
      keyExtractor={item => item.fromUser.phone}
      ItemSeparatorComponent={() => <Divider my="3" bg="muted.100" />}
    />
  );
};

export default NotificationList;

const styles = StyleSheet.create({});
