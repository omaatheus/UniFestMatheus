import { User } from "../../types/User";
import { supabase } from "../supabase/config";

// 
export async function signInWithEmail(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  return error;
}

export async function signUpWithEmail(User: User) {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({
    email: User.email,
    password: User.password,
  });

  return { session, error };
}