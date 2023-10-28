import { StyleSheet } from "react-native";
import React from "react";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import { AuthStackParams } from "./config";
import PreAuth from "../screens/auth/PreAuth";
import OTPVerification from "../screens/auth/OTPVerification";
import EditProfile from "../screens/EditProfile";
import { useTheme } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator<AuthStackParams>();

const AuthStack = () => {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreAuth" component={PreAuth} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{
            headerShown: true,
            title: "Xác nhận OTP",
            headerStyle: { backgroundColor: colors.primary[600] },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
            title: "Thiết lập tài khoản",
            headerStyle: { backgroundColor: colors.primary[600] },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
