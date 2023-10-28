import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/main/Home";
import Notification from "../screens/main/Notification";
import Profile from "../screens/main/Profile";
import { useTheme } from "native-base";
import { useAppSelector } from "../store";
import { EUserRole } from "../types/user";
import {
  ProfileCircle,
  SearchNormal,
  Speedometer,
  Notification as NotificationIcon,
  Heart,
  NoteText,
} from "iconsax-react-native";
import History from "../screens/main/History";
import FavoriteNanny from "../screens/main/FavoriteNanny";
import ScheduleMeeting from "../screens/ScheduleMeeting";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const { colors } = useTheme();
  const user = useAppSelector((state) => state.user.user!);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.muted[500],
        tabBarActiveTintColor: colors.primary[600],
        tabBarShowLabel: false,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.primary[600],
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) =>
            user?.role === EUserRole.Parent ? (
              <SearchNormal size={size} color={color} />
            ) : (
              <Speedometer size={size} color={color} />
            ),
        }}
      />
      <Tab.Screen
        name="ScheduleMeeting"
        component={ScheduleMeeting}
        options={{
          headerShown: true,
          title: "Lịch hẹn",
          tabBarIcon: ({ color, size }) => <NoteText size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="FavoriteNanny"
        component={FavoriteNanny}
        options={{
          tabBarIcon: ({ color, size }) => <Heart size={size} color={color} />,
          headerShown: true,
          title: "Yêu thích",
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, size }) => <NotificationIcon size={size} color={color} />,
          headerShown: false,
          title: "Thông báo",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => <ProfileCircle size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
