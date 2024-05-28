import { Image, Modal, StyleSheet, View } from "react-native";
import { height, width } from "../constants/measures";
import {
  Divider,
  IconButton,
  MD3Colors,
  Surface,
  Text,
} from "react-native-paper";
import AlignedLogin from "./AlignedLogin";
import Places from "../types/Places";
import React from "react";

export interface Props {
  isSimple: boolean;
  messageData?: Places;
  children?: JSX.Element[] | JSX.Element;
  onClose: () => void;
}

export default function PopUp(props: Props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      style={{
        width: width,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onRequestClose={props.onClose}
    >
      <AlignedLogin>
        <View style={styles.box}>
          <IconButton
            icon="close"
            style={styles.closeButton}
            iconColor={MD3Colors.primary100}
            onPress={props.onClose}
          />
          {props.messageData?.image && <Image src={props.messageData.image} />}
          <Text style={styles.title}>{props.messageData?.name}</Text>
          <Text style={styles.message}>{props.messageData?.description}</Text>
          <Divider
            bold
            style={{ marginVertical: 32, backgroundColor: MD3Colors.primary80 }}
          />
          {props.children && (
            <View style={{ flex: 1, flexGrow: 1 }}>{props.children}</View>
          )}
        </View>
      </AlignedLogin>
    </Modal>
  );
}

const styles = StyleSheet.create({
  box: {
    width: width * 0.95,
    height: height * 0.8,
    backgroundColor: MD3Colors.primary10,
    borderRadius: 24,
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  image: {},
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: MD3Colors.primary100,
    marginBottom: 16,
  },
  message: {
    fontSize: 20,
    color: MD3Colors.primary80,
  },
});
