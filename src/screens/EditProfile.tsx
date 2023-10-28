import { Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import React, { useEffect, useState } from "react";
import { AuthStackParams, RootStackParams } from "../navigations/config";
import { useAppDispatch, useAppSelector } from "../store";
import { Button, Center, VStack, Stack, Heading, HStack, Icon } from "native-base";
import Avatar from "../components/Avatar";
import * as ImagePicker from "expo-image-picker";
import { firebaseDB, firebaseStorage } from "../firebase";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";
import { removeLoading, setLoading } from "../store/loading.reducer";
import { EGender, EUserRole, Parrent, UserProfile } from "../types/user";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { setPopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import { fillProfileSchema, onInputChange } from "../utils/form-utils";
import LoadingOverlay from "../components/LoadingOverlay";
import { setUser } from "../store/user.reducer";
import { Camera } from "iconsax-react-native";
import FormInput from "../components/Form/FormInput";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import GenderSelect from "../components/Form/GenderSelect";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { ADDRESS_TREE } from "../data/address";
import AddressSelect from "../components/Form/AddressSelect";

type Props = CompositeScreenProps<
  StackScreenProps<RootStackParams, "EditProfile">,
  StackScreenProps<AuthStackParams, "EditProfile">
>;

type ProfileForm = {
  fullname: string;
  district: keyof typeof ADDRESS_TREE;
  age: string;
  avatar: string;
  gender: EGender;
};

const EditProfile = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const editMode = !!user;
  const { isLoading } = useAppSelector((state) => state.loading);
  const [image, setImage] = useState<string | null>(editMode ? user.profile.avatar : null);
  const [formData, setFormData] = useState<ProfileForm>({
    fullname: editMode ? user.profile.fullname : "",
    district: editMode ? user.profile.district : "001",
    age: editMode ? String(user.profile.age) : "",
    avatar: editMode ? user.profile.avatar : "",
    gender: editMode ? user.profile.gender : EGender.None,
  });
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  console.log(formData);

  useEffect(() => {
    if (!status || !status.granted) requestPermission();
  }, []);

  // TODO: Set back action to navigate SignUp
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled) {
      dispatch(setLoading());
      setFormData({ ...formData });
      setImage(result.assets[0].uri);
      dispatch(removeLoading());
    }
  };

  async function uploadImage(uri: string) {
    const blob: any = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const avatarName = uuid.v4() as string;
    const fileRef = ref(firebaseStorage, avatarName);
    await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    const avatarUrl = await getDownloadURL(fileRef);
    return { avatarName, avatarUrl };
  }

  function onGoBack() {
    if (editMode) {
      navigation.goBack();
    } else {
      navigation.navigate("SignUp", { role: route.params.role });
    }
  }

  async function onSubmit() {
    try {
      dispatch(setLoading());
      await fillProfileSchema.validate({
        ...formData,
        age: formData.age.length ? Number(formData.age) : 0,
      });
      const { avatarName, avatarUrl } = await uploadImage(image!);
      const parrentProfile: UserProfile<Parrent> = {
        phone: editMode ? user.phone : route.params.phone,
        password: editMode ? user.password : route.params.password,
        profile: {
          district: formData.district,
          age: formData.age.length ? Number(formData.age) : 0,
          fullname: formData.fullname,
          avatar: avatarUrl,
          avatarName,
          gender: formData.gender,
        },
        role: EUserRole.Parent,
      };
      if (editMode) {
        delete parrentProfile.password;
        const oldAvtName = user?.profile.avatarName;
        await deleteObject(ref(firebaseStorage, oldAvtName));
        await updateDoc(doc(firebaseDB, "users", parrentProfile.phone), parrentProfile as any);
        navigation.goBack();
      } else {
        await setDoc(doc(firebaseDB, "users", parrentProfile.phone), parrentProfile);
      }
      dispatch(setUser(parrentProfile));
      dispatch(removeLoading());
    } catch (err: any) {
      dispatch(removeLoading());
      dispatch(
        setPopup({
          type: EPopupType.ERROR,
          title: editMode ? "Cập nhật thất bại" : "Đăng ký thất bại",
          message: err.message,
        })
      );
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <StatusBar style="light" />
      <HStack
        bg="primary.600"
        safeAreaTop
        justifyContent="space-between"
        alignItems="center"
        pb="2"
      >
        <TouchableOpacity onPress={onGoBack} style={{ width: 40, alignItems: "center" }}>
          <Icon as={Entypo} name="chevron-left" size="2xl" color="white" />
        </TouchableOpacity>
        <Heading color="white" fontSize="lg">
          Thiết lập tài khoản
        </Heading>
        <Stack style={{ width: 30 }} />
      </HStack>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack flex={1} bg="white" paddingX={6}>
          <Center mt="8">
            <VStack space="3">
              {!image && (
                <Center bg="muted.100" style={styles.avtHolder}>
                  <Camera size={32} color="#525252" />
                </Center>
              )}
              {!!image && (
                <Avatar
                  rounded
                  source={{ uri: image }}
                  size="2xl"
                  style={{ overflow: "visible" }}
                />
              )}
              <Button onPress={pickImage} variant="ghost">
                Upload Avatar
              </Button>
            </VStack>
          </Center>
          <VStack justifyContent="space-between" space={3} marginBottom="8">
            <FormInput
              label="Họ và tên"
              value={formData.fullname}
              onChangeText={onInputChange<ProfileForm>("fullname", setFormData, formData)}
            />
            <FormInput
              label="Tuổi"
              value={formData.age}
              onChangeText={onInputChange<ProfileForm>("age", setFormData, formData)}
            />
            <GenderSelect
              selectedValue={formData.gender}
              onValueChange={onInputChange<ProfileForm>("gender", setFormData, formData)}
            />
            <AddressSelect
              district={formData.district}
              setDistrict={onInputChange<ProfileForm>("district", setFormData, formData)}
            />
          </VStack>
          <Button onPress={onSubmit}>{editMode ? "Cập nhật" : "Đăng ký"}</Button>
        </VStack>
      </TouchableWithoutFeedback>
    </>
  );
};

export default React.memo(EditProfile);

const styles = StyleSheet.create({
  avtHolder: { width: 140, height: 140, borderRadius: 70 },
});
