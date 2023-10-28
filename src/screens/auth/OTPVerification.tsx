import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { Button, Center, Heading, Text, VStack } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../navigations/config";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import { useAppDispatch } from "../../store";
import { setPopup } from "../../store/popup.reducer";
import { EPopupType } from "../../types/popup";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { colorTheme } from "../../theme";
import { removeLoading, setLoading } from "../../store/loading.reducer";

type Props = NativeStackScreenProps<AuthStackParams, "OTPVerification">;

const OTPVerification = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { verificationId, password, phone } = route.params;
  const [OTP, setOTP] = useState("");  
  console.log(OTP, OTP.length);
  
  async function verifyOTP() {
    try {
      dispatch(setLoading());
      
      const credential = PhoneAuthProvider.credential(verificationId, "694104"); // get the credential
      await signInWithCredential(firebaseAuth, credential); // verify the credential
      dispatch(removeLoading());
      navigation.navigate("FillProfile", { phone, password });
    } catch (err) {
      console.log(err);
      
      dispatch(removeLoading());
      dispatch(
        setPopup({
          type: EPopupType.ERROR,
          title: "Xác thực thất bại!",
          message: "Mã OTP nhập không chính xác. Hãy thử lại",
        })
      );
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <VStack flex={1} bg="white" safeAreaBottom alignItems="center" pt="24">
        <VStack alignItems="center" space="2">
          <Heading size="md" fontWeight="semibold">
            Mã xác thực OTP đã được gửi tới
          </Heading>
          <Heading size="md" fontWeight="semibold">
            SĐT {phone.substring(0, 6) + "xxx"}
          </Heading>
        </VStack>
        <OTPInputView
          pinCount={6}
          style={{ width: "80%", height: 100 }}
          codeInputFieldStyle={styles.inputField}
          placeholderCharacter="_"
          placeholderTextColor={colorTheme.muted[300]}
          onCodeChanged={setOTP}
          onCodeFilled={verifyOTP}
        />
        <Center>
          <Text>Bạn không nhận được OTP?</Text>
          <Button variant="link">Gửi lại</Button>
        </Center>
      </VStack>
    </TouchableWithoutFeedback>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colorTheme.primary[600],
    color: colorTheme.primary[600],
    fontSize: 20,
  },
});
