import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BASE_URL =
  "https://rp-backend-60066119139.development.catalystserverless.in";

export default function OtpScreen() {

  const router = useRouter();
  const { phone } = useLocalSearchParams();

  const [enteredOtp, setEnteredOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const verifyOtp = async () => {

    if (loading) return;

    if (!enteredOtp || enteredOtp.trim().length !== 6) {
      Alert.alert("Error", "Please enter valid 6 digit OTP");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/server/auth_verify_otp/rp/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            identifier: phone,
            otp: enteredOtp.trim()
          })
        }
      );

      const data = await response.json();

      console.log("OTP RESPONSE:", data);

      if (!data.success) {
        Alert.alert("Error", data.message || "OTP verification failed");
        return;
      }

      /* STORE RP ID */

      const rpId = String(data.rowid);

      await AsyncStorage.setItem("rp_id", rpId);

      console.log("RP ID STORED:", rpId);

      /* STORE USER INFO */

      await AsyncStorage.multiSet([
        ["rp_name", `${data.first_name ?? ""} ${data.last_name ?? ""}`],
        ["rp_email", data.email ?? ""],
        ["rp_phone", data.phone ?? ""]
      ]);

      console.log("USER DATA SAVED");

      /* NAVIGATE */

      router.replace("/dashboard");

    } catch (error) {

      console.log("OTP ERROR:", error);
      Alert.alert("Error", "Something went wrong while verifying OTP");

    } finally {

      setLoading(false);

    }

  };

  return (

    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.logoCircle}>
        <Ionicons name="key-outline" size={40} color="#F97316" />
      </View>

      <Text style={styles.title}>Verify OTP</Text>

      <Text style={styles.subTitle}>
        Enter the 6-digit code sent to{" "}
        <Text style={styles.highlight}>{phone}</Text>
      </Text>

      <View style={styles.inputBox}>

        <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />

        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Enter 6 digit OTP"
          placeholderTextColor="#9CA3AF"
          value={enteredOtp}
          onChangeText={setEnteredOtp}
        />

      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={verifyOtp}
        disabled={loading}
      >

        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}

      </TouchableOpacity>

      <Text style={styles.resendText}>
        Didn't receive code?{" "}
        <Text style={styles.resendLink}>Resend OTP</Text>
      </Text>

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    padding: 20,
    justifyContent: "center"
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 60,
    backgroundColor: "#FDEDDC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10
  },

  subTitle: {
    textAlign: "center",
    color: "#6B7280",
    marginBottom: 25
  },

  highlight: {
    color: "#F97316",
    fontWeight: "600"
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16
  },

  button: {
    backgroundColor: "#F97316",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  },

  resendText: {
    color: "#6B7280"
  },

  resendLink: {
    color: "#F97316",
    fontWeight: "600"
  }

});