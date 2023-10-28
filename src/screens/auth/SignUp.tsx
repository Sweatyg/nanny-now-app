import "firebase/auth";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { useAppDispatch, useAppSelector } from "../../store";
import { Button, Center, HStack, VStack, Text } from "native-base";
import Avatar from "../../components/Avatar";
import { removeLoading, setLoading } from "../../store/loading.reducer";
import { firebaseAuth, firebaseConfig, firebaseDB } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { setPopup } from "../../store/popup.reducer";
import { EPopupType, PopupMassage } from "../../types/popup";
import { PhoneAuthProvider } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { onInputChange, signUpSchema } from "../../utils/form-utils";
import { ValidationError } from "yup";
import LoadingOverlay from "../../components/LoadingOverlay";
import FormInput from "../../components/Form/FormInput";

type Props = {} & NativeStackScreenProps<AuthStackParams, "SignUp">;

type SignUpDataForm = {
  phone: string;
  password: string;
  repassword: string;
};

function setSignupError(message: string): PopupMassage {
  const errorTitle = "Đăng ký thất bại";
  return {
    type: EPopupType.ERROR,
    title: errorTitle,
    message,
  };
}
// function reformatPhoneValue(phone: string) {
//   if (phone[0] === "+") return phone;
//   const vnCode = "+84";
//   if (phone[0] === "0") return vnCode + phone.substring(1);
//   else return vnCode + phone;
// }

const SignUp = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const [dataForm, setDataForm] = useState<SignUpDataForm>({
    phone: "0337676999",
    password: "12345678",
    repassword: "12345678",
  });
  // const recaptchaVerifier = useRef(null);

  function onLoginBack() {
    navigation.navigate("Login", { role: route.params.role });
  }

  async function onSignUp() {
    // Loading
    dispatch(setLoading());
    // Validate
    try {
      await signUpSchema.validate(dataForm);
    } catch (err) {
      const { message } = err as ValidationError;
      dispatch(setPopup(setSignupError(message)));
      dispatch(removeLoading());
      return;
    }
    // Check exist
    const docRef = doc(firebaseDB, "users", dataForm.phone);
    const docSnap = await getDoc(docRef);

    // Move to OTP if didn't exist
    if (docSnap.exists()) {
      dispatch(removeLoading());
      dispatch(
        setPopup({
          type: EPopupType.ERROR,
          title: "Đăng ký thất bại!",
          message: "Người dùng đã tồn tại.",
        })
      );
      return;
    }
    try {
      // const phoneProvider = new PhoneAuthProvider(firebaseAuth);
      // const verificationId = await phoneProvider.verifyPhoneNumber(
      //   reformatPhoneValue(dataForm.phone),
      //   recaptchaVerifier.current!
      // ); // get the verification id

      dispatch(removeLoading());
      // navigation.navigate("OTPVerification", {
      //   dataForm.phone,
      //   password: dataForm.password,
      //   verificationId: verificationId,
      // });
      navigation.navigate("EditProfile", {
        phone: dataForm.phone,
        password: dataForm.password,
        role: route.params.role,
      });
    } catch (err) {
      dispatch(removeLoading());
      setPopup({
        type: EPopupType.ERROR,
        title: "Đăng ký thất bại!",
        message: "Không thể xác thực người dùng. Hãy thử lại!",
      });
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack
          backgroundColor="white"
          flex={1}
          safeArea
          paddingTop="24"
          paddingX={6}
          justifyContent="space-between"
          paddingBottom="8"
        >
          {/* <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} /> */}
          <VStack>
            <Center marginBottom="12">
              <Avatar
                source={require("../../../assets/Logo-Primary.png")}
                size="2xl"
                _stack={{ overflow: "visible" }}
              />
            </Center>
            <VStack justifyContent="space-between" space={3} marginBottom="8">
              <FormInput
                label="Điện thoại"
                value={dataForm.phone}
                keyboardType="phone-pad"
                onChangeText={onInputChange("phone", setDataForm, dataForm)}
              />
              <FormInput
                label="Mật khẩu"
                value={dataForm.password}
                onChangeText={onInputChange("password", setDataForm, dataForm)}
                secureTextEntry
              />
              <FormInput
                label="Nhập lại mật khẩu"
                value={dataForm.repassword}
                secureTextEntry
                onChangeText={onInputChange("repassword", setDataForm, dataForm)}
              />
            </VStack>
            <Button onPress={onSignUp}>Đăng ký</Button>
          </VStack>
          <HStack justifyContent="center" alignItems="center">
            <Text fontSize="md">Bạn đã có tài khoản?</Text>
            <Button variant="link" onPress={onLoginBack} size="lg">
              Đăng nhập
            </Button>
          </HStack>
        </VStack>
      </TouchableWithoutFeedback>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
