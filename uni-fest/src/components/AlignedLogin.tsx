import { View, StyleSheet } from "react-native";
import { JSX } from "react";
import { height, width } from "../constants/measures";

interface Props {
  children: JSX.Element[] | JSX.Element;
}
export default function AlignedLogin(props: Props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
