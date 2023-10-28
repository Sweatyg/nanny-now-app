import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/user.reducer";
import { Button, Center, HStack, Image, Text, VStack } from "native-base";
import { EUserRole } from "../../types/user";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { StatusBar } from "expo-status-bar";
import FormInput from "../../components/Form/FormInput";
import { onInputChange } from "../../utils/form-utils";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase";
import { setPopup } from "../../store/popup.reducer";
import { EPopupType } from "../../types/popup";

type Props = {} & NativeStackScreenProps<AuthStackParams, "Login">;

type LoginForm = {
  phone: string;
  password: string;
};

const Login = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const [dataForm, setDataForm] = useState<LoginForm>({
    phone: "",
    password: "",
  });

  function onSignUp() {
    navigation.navigate("SignUp", { role: route.params.role });
  }

  async function onLoggedIn() {
    dispatch(setLoading());
    const docRef = doc(firebaseDB, "users", dataForm.phone);
    const docSnap = await getDoc(docRef);
    if (
      docSnap.exists() &&
      docSnap.data().password === dataForm.password &&
      docSnap.data().role == route.params.role
    ) {
      dispatch(
        setUser({ role: route.params.role, phone: dataForm.phone, profile: docSnap.data().profile })
      );
    } else {
      dispatch(
        setPopup({
          type: EPopupType.ERROR,
          title: "Đăng nhập thất bại",
          message: "Số điện thoại hoặc mật khẩu không đúng",
        })
      );
      dispatch(removeLoading());
    }
  }

  return (
    <>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack
          backgroundColor="white"
          flex={1}
          safeArea
          paddingX={6}
          paddingTop="32"
          justifyContent="space-between"
          paddingBottom="8"
        >
          <VStack>
            <Center marginBottom="16">
              <Image
                source={require("../../../assets/Logo-Primary.png")}
                alt="Logo"
                size="xl"
                overflow="visible"
              />
            </Center>
            <VStack justifyContent="space-between" space={3} marginBottom="8">
              <FormInput
                label="Điện thoại"
                value={dataForm.phone}
                onChangeText={onInputChange<LoginForm>("phone", setDataForm, dataForm)}
              />
              <FormInput
                label="Mật khẩu"
                value={dataForm.password}
                secureTextEntry
                onChangeText={onInputChange<LoginForm>("password", setDataForm, dataForm)}
              />
            </VStack>
            <Button onPress={onLoggedIn} rounded="lg">
              Đăng nhập
            </Button>
            <Button variant="link" mt="4">
              Quên mật khẩu?
            </Button>
          </VStack>
          {route.params.role === EUserRole.Parent && (
            <HStack justifyContent="center" alignItems="center">
              <Text fontSize={15}>Bạn chưa có tài khoản?</Text>
              <Button variant="link" size="lg" onPress={onSignUp}>
                Đăng ký
              </Button>
            </HStack>
          )}
        </VStack>
      </TouchableWithoutFeedback>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
