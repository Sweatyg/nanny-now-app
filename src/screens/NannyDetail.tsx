import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Heading,
  VStack,
  Text,
  Stack,
  ScrollView,
  useTheme,
  HStack,
  Button,
  Divider,
} from "native-base";
import UserSummary from "../components/UserSummary";
import { Heart } from "iconsax-react-native";
import {
  HeaderButtonProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { RootStackParams } from "../navigations/config";
import { useAppDispatch, useAppSelector } from "../store";
import { removeLoading, setLoading } from "../store/loading.reducer";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import { checkFav, createFavorite, removeFavorite } from "../types/favorites";
import LoadingOverlay from "../components/LoadingOverlay";

type NavigationProps = NativeStackScreenProps<RootStackParams, "NannyDetail">;

const NannyDetail = ({ navigation, route }: NavigationProps) => {
  // const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);
  const [isFav, setIsFav] = useState(false);

  const nanny = route.params.nanny;

  async function onFavPress() {
    try {
      if (isFav) {
        await removeFavorite(user!.phone, nanny.phone);
      } else {
        await createFavorite(user!.phone, nanny.phone);
      }
      setIsFav(!isFav);
    } catch (err) {
      console.error(err);
      dispatch(
        setPopup({
          type: EPopupType.ERROR,
          title: "Thông báo",
          message: "Lỗi hệ thống, hãy thử lại!",
        })
      );
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thông tin bảo mẫu",
      headerRight: ({ tintColor }: HeaderButtonProps) => (
        <TouchableOpacity style={{ padding: 2 }} onPress={onFavPress}>
          <Heart color={tintColor} variant={isFav ? "Bold" : "Outline"} />
        </TouchableOpacity>
      ),
    });
  }, [isFav]);

  useEffect(() => {
    async function loadData() {
      try {
        dispatch(setLoading());
        const isFav = await checkFav(user!.phone, nanny.phone);
        setIsFav(isFav);
      } catch (err) {
        console.error(err);
        dispatch(
          setPopup({
            type: EPopupType.ERROR,
            title: "Thông báo",
            message: "Lỗi hệ thống, hãy thử lại!",
          })
        );
      } finally {
        dispatch(removeLoading());
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <ScrollView background="white" flex={1} showsVerticalScrollIndicator={false}>
        <VStack flex={1} bg="white" pt="4" space="5" overflowX="visible">
          <Stack px="5">
            <UserSummary size="lg" user={nanny} />
          </Stack>
          <Button
            flex={1}
            rounded="lg"
            mx="5"
            onPress={() => navigation.navigate("BookingForm", { nanny: nanny.phone })}
          >
            Đặt lịch ngay
          </Button>
          <Divider />
          <VStack mt="4" space="1" px="5">
            <Heading color="primary.600" fontSize="xl" fontWeight="semibold">
              Kinh nghiệm
            </Heading>
            <Text color="muted.800" fontSize={16}>
              Đã có có trên {nanny.profile.experience} năm kinh nghiệm
            </Text>
          </VStack>
          <VStack space="1" px="5">
            <Heading color="primary.600" fontSize="xl" fontWeight="semibold">
              Tuổi
            </Heading>
            <Text color="muted.800" fontSize={16}>
              {nanny.profile.age} tuổi
            </Text>
          </VStack>
          <VStack space="1" px="5">
            <Heading color="primary.600" fontSize="xl" fontWeight="semibold">
              Giới thiệu
            </Heading>
            {nanny.profile.description.map((des) => (
              <Text key={des}>{des}</Text>
            ))}
          </VStack>
          {/* <VStack space="3">
            <Heading color="primary.600" fontSize="xl" fontWeight="semibold" px="5">
              Nhận xét
            </Heading>
            <ListComments />
          </VStack> */}
        </VStack>
      </ScrollView>
    </>
  );
};

export default NannyDetail;

const styles = StyleSheet.create({});
