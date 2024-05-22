import { Button, Text, TextInput } from "react-native-paper";
import AlignedLogin from "../components/AlignedLogin";
import { width } from "../constants/measures";
import { StyleSheet, View } from "react-native";

interface Props {
  navigation: any;
}

export default function Login(props: Props) {
  return (
    <AlignedLogin>
      <View style={styles.title}>
        <Text style={styles.title}>Log in</Text>
        <TextInput style={styles.generic} label="Email" />
        <TextInput style={styles.generic} label="Password" />
        <Button style={styles.generic} mode="contained">
          Log in
        </Button>
        <Button
          style={styles.generic}
          mode="contained-tonal"
          onPress={() => props.navigation.navigate("Register")}
        >
          Sign up
        </Button>
      </View>
    </AlignedLogin>
  );
}

const styles = StyleSheet.create({
  generic: {
    width: width * 0.8,
    marginBottom: 12,
  },
  form: {
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});
