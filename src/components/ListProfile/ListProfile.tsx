import { View, StyleSheet, ListRenderItemInfo } from "react-native";
import React, { useCallback } from "react";
import { FlatList } from "native-base";
import CardItem from "./CardItem";
import NANNY from "../../data/nanny";
import { Nanny, UserProfile } from "../../types/user";

type Props = {
  horizontal?: boolean;
  numColumns?: number;
  style?: any;
  itemStyle?: any;
  scrollEnabled?: boolean;
  data?: UserProfile<Nanny>[];
};

const ListProfile = ({
  data = [],
  horizontal,
  numColumns,
  style,
  itemStyle,
  scrollEnabled = true,
}: Props) => {
  const renderCardItem = useCallback(
    ({ item, index }: ListRenderItemInfo<UserProfile>) => (
      <CardItem
        style={[
          horizontal && styles.horizontal,
          itemStyle,
          index === 0 && { marginTop: !horizontal ? 12 : 0, marginLeft: horizontal ? 16 : 0 },
          index === data.length - 1 && {
            marginBottom: !horizontal ? 12 : 0,
            // marginLeft: horizontal ? 16 : 0,
          },
        ]}
        data={item}
      />
    ),
    []
  );
  const keyExtractor = useCallback((item: UserProfile) => item.phone, []);
  return (
    <View style={[horizontal && { height: 150 }, style]}>
      <FlatList
        data={data}
        horizontal={horizontal}
        ItemSeparatorComponent={() => <View style={{ width: 20, height: 10 }} />}
        renderItem={renderCardItem}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={4}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={numColumns}
        scrollEnabled={scrollEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: 340,
  },
});

export default React.memo(ListProfile);
