import React from "react";
import { AlertDialog, Button, Center, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removePopup } from "../store/popup.reducer";
import { EPopupType } from "../types/popup";
import Avatar from "./Avatar";

const errorImage = require("../../assets/Error.png");
const successImage = require("../../assets/Info.png");

const PopupOverlay = () => {
  const { popup } = useSelector((state: RootState) => state.popup);
  const dispatch = useDispatch();
  const cancelRef = React.useRef(null);
  const onClose = () => dispatch(removePopup());
  const image = popup?.type === EPopupType.ERROR ? errorImage : successImage;
  if (!popup) return null;
  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={!!popup} onClose={onClose}>
      <AlertDialog.Content paddingX={4} paddingY="8">
        <Center>
          <Avatar source={image} size="lg" style={{ overflow: "visible" }} />
        </Center>
        <AlertDialog.Body>
          <Center>
            <Text fontWeight="700" fontSize="xl" color="primary.600" my="2">
              {popup?.title}
            </Text>
            <Text textAlign="center" fontSize="md" color="muted.500">
              {popup?.message}
            </Text>
          </Center>
        </AlertDialog.Body>
        <Button onPress={onClose} ref={cancelRef}>
          Close
        </Button>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default PopupOverlay;
