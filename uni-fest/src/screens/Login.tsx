import { Button, Text, TextInput } from "react-native-paper";
import AlignedLogin from "../components/AlignedLogin";

export default function Login() {
  return (
    <AlignedLogin>
        <Text>Log in</Text>
        <TextInput label="Email" />
        <TextInput label="Password" />
        <Button mode="contained">Log in</Button>
        <Button>Sign up</Button>
    </AlignedLogin>
  );
}
