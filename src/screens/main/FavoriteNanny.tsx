import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { Center, Column, Heading, Text } from "native-base";
import { useAppDispatch, useAppSelector } from "../../store";
import { INanny } from "../../types/user";
import { getFavoriteNannies } from "../../types/favorites";
import { removeLoading } from "../../store/loading.reducer";
import LoadingOverlay from "../../components/LoadingOverlay";
import ListProfile from "../../components/ListProfile/ListProfile";
import { Ionicons } from "@expo/vector-icons";
import { colorTheme } from "../../theme";
import { useFocusEffect } from "@react-navigation/native";

const FavoriteNanny = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);
  const { user } = useAppSelector((state) => state.user);
  const [nannies, setNannies] = useState<INanny[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      async function loadData() {
        try {
          const favNannies = await getFavoriteNannies(user!.phone);
          setNannies(favNannies);
        } catch (err) {
        } finally {
          setTimeout(() => dispatch(removeLoading()), 50);
        }
      }
      loadData();
    }, [])
  );
  if (isLoading) return <LoadingOverlay />;
  return (
    <Column flex="1" bg="white" px="4">
      {nannies.length > 0 ? (
        <ListProfile data={nannies} />
      ) : (
        <Center flex={1}>
          <Ionicons name="heart-outline" size={60} color={colorTheme.primary[600]} />
          <Heading fontSize="xl" textAlign="center" color="muted.700">
            Bạn chưa có danh sách ưa thích
          </Heading>
          <Text color="muted.700">Hãy trải nghiệm nhé</Text>
        </Center>
      )}
    </Column>
  );
};

export default FavoriteNanny;

const styles = StyleSheet.create({});
