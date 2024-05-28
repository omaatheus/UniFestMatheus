import { View, StyleSheet } from "react-native";
import AlignedLogin from "../components/AlignedLogin";
import { Button, Text, TextInput } from "react-native-paper";
import { width } from "../constants/measures";
import { useState } from "react";
import { signUpWithEmail } from "../lib/supabase/auth";
import { User } from "../types/User";

export interface Props {
  navigation: any;
}

export default function Register(props: Props) {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    full_name: "",
    age: 0,
    phone: "",
    cpf: "",
  })

  console.log(user);


  async function tryRegister(userData: User) {
    const result = await signUpWithEmail(userData)

    if (result.error) {
      console.log("Error", result.error);
    }

    console.log("Logado com Sucesso!", result);
  }

  return (
    <AlignedLogin>
      <View style={styles.title}>
        <Text style={styles.title}>Sign up</Text>
        <TextInput
          maxLength={70}
          style={styles.generic}
          label="Nome Completo"
          value={user.full_name}
          onChangeText={(text) => setUser({...user, full_name: text})}
        />
        <TextInput
          maxLength={70}
          style={styles.generic}
          label="Email"
          value={user.email}
          onChangeText={(text) => setUser({...user, email: text})}
        />

        <TextInput
          maxLength={11}
          style={styles.generic}
          label="Password"
          value={user.password}
          onChangeText={(text) => setUser({...user, password: text})}
        />
        <TextInput
          maxLength={11}
          style={styles.generic}
          label="Idade"
          keyboardType="numeric"
          value={user.age?.toString()}
          onChangeText={(text) => setUser({...user, age: Number(text)})}
        />
        <TextInput
          maxLength={11}
          style={styles.generic}
          label="Telefone"
          keyboardType="phone-pad"
          value={user.phone}
          onChangeText={(text) => setUser({...user, phone: text})}
        />
        <TextInput
          maxLength={15}
          style={styles.generic}
          label="CPF"
          value={user.cpf}
          onChangeText={(text) => setUser({...user, cpf: text})}
        />
        <Button onPress={() => tryRegister(user)} style={styles.generic} mode="contained">
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
