import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Center, Column, Heading, Text, VStack } from "native-base";
import { ISchedule, getSchedule } from "../types/schedule";
import { useAppDispatch, useAppSelector } from "../store";
import { removeLoading, setLoading } from "../store/loading.reducer";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import UserSummary from "../components/UserSummary";
import LoadingOverlay from "../components/LoadingOverlay";
import { INanny } from "../types/user";
import moment from "moment";
import { ADDRESS_TREE } from "../data/address";

const ScheduleMeeting = () => {
  const [schedule, setSchedule] = useState<ISchedule | null>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading } = useAppSelector((state) => state.loading);

  useEffect(() => {
    async function loadData() {
      try {
        dispatch(setLoading());
        const loadedSchedule = await getSchedule(user!.phone);
        setSchedule(loadedSchedule as ISchedule);
      } catch (err) {
        console.error(err);
        dispatch(
          setPopup({
            type: EPopupType.ERROR,
            title: "Thông báo",
            message: (err as any).message,
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
    <Column flex={1}>
      {!schedule ? (
        <Center flex={1} bg="white">
          <Heading color="muted.500" fontSize="lg">
            Bạn chưa có lịch hẹn
          </Heading>
        </Center>
      ) : (
        <Column px="4" flex={1} bg="white" py="6">
          <Center borderWidth={0.3} borderColor="primary.700" mb="8" py="3" rounded="lg">
            <Heading fontSize="lg" color="primary.700">
              {moment(schedule.datetime).format("DD - MM - YYYY   HH:mm")}
            </Heading>
          </Center>
          <UserSummary size="lg" user={schedule!.nanny as INanny} />
          <Column space="4">
            <VStack mt="4" space="1">
              <Heading color="primary.600" fontSize="lg" fontWeight="semibold">
                Quận
              </Heading>
              <Text color="muted.800" fontSize={16}>
                {(ADDRESS_TREE as any)[schedule.district]["path_with_type"]}
              </Text>
            </VStack>
            <VStack space="1">
              <Heading color="primary.600" fontSize="lg" fontWeight="semibold">
                Địa chỉ
              </Heading>
              <Text color="muted.800" fontSize={16}>
                {schedule.address}
              </Text>
            </VStack>
            <VStack space="1">
              <Heading color="primary.600" fontSize="lg" fontWeight="semibold">
                Mong muốn
              </Heading>
              <Text color="muted.800" fontSize={16}>
                {schedule.note}
              </Text>
            </VStack>
          </Column>
        </Column>
      )}
    </Column>
  );
};

export default ScheduleMeeting;

const styles = StyleSheet.create({});
