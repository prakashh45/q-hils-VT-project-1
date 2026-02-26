import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function OtpScreen() {
  const router = useRouter();
  const { contact, otp } = useLocalSearchParams();
  const [enteredOtp, setEnteredOtp] = useState("");

  const verifyOtp = () => {
    if (!enteredOtp) {
      Alert.alert("Error", "Please enter OTP");
      return;
    }

    if (enteredOtp === otp) {
      Alert.alert("Success", "Login Successful!");
      router.replace("/dashboard"); // 
    } else {
      Alert.alert("Error", "Invalid OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>OTP sent to {contact}</Text>

      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        maxLength={6}
        value={enteredOtp}
        onChangeText={setEnteredOtp}
        placeholder="Enter 6 digit OTP"
      />

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#1F2A60",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});