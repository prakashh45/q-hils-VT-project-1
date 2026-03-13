import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {

    if (!contact) {
      Alert.alert("Error", "Please enter phone number with country code");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch("https://rp-backend-60066119139.development.catalystserverless.in/server/auth_verify_otp/rp/auth/request-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: contact
          }),
        }
      );

      const data = await response.json();

      console.log("SEND OTP:", data);

      if (data.success) {

        Alert.alert("Success", "OTP Sent Successfully");

        router.push({
          pathname: "/otp",
          params: { phone: contact },
        });

      } else {

        Alert.alert("Error", data.message || "OTP sending failed");

      }

    } catch (error) {

      console.log(error);
      Alert.alert("Server Error");

    } finally {

      setLoading(false);

    }

  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* LOGO */}
      <View style={styles.logoCircle}>
        <Ionicons name="school" size={30} color="#F97316" />
      </View>

      <Text style={styles.appTitle}>
        RAMAKRISHNA MISSION GURUGRAM VIVEKANANDA INSTITUTE OF VALUES
      </Text>

      {/* IMAGE */}
      <Image
        source={require("../../assets/images/school.png")}
        style={styles.image}
      />

      {/* LOGIN TITLE */}
      <Text style={styles.loginTitle}>Secure Login</Text>
      <Text style={styles.subTitle}>
        Access the school monitoring portal
      </Text>

      {/* INPUT LABEL */}
      <Text style={styles.label}>Mobile Number or Email</Text>

      {/* INPUT FIELD */}
      <View style={styles.inputBox}>
        <Ionicons name="call-outline" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Enter registered contact details"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          keyboardType="number-pad"
          value={contact}
          onChangeText={setContact}
        />
      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={sendOtp}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>

      {/* FOOTER */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.portalText}>OFFICIAL PORTAL</Text>
        <View style={styles.line} />
      </View>

      <Text style={styles.footerText}>
        By logging in, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text>{" "}
        and{" "}{"\n"}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      <View style={styles.authorizedRow}>
        <Ionicons name="shield-checkmark" size={16} color="#9CA3AF" />
        <Text style={styles.authorizedText}>
          AUTHORIZED PERSONNEL ONLY
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    padding: 20,
  },

  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: "#FDEDDC",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  appTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#F97316",
    marginVertical: 20,
  },

  image: {
    width: "100%",
    height: 180,
    borderRadius: 20,
    marginBottom: 15,
  },

  loginTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  subTitle: {
    color: "#6B7280",
    marginBottom: 20,
  },

  label: {
    alignSelf: "flex-start",
    fontWeight: "600",
    marginBottom: 8,
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
    borderColor: "#E5E7EB",
  },

  input: {
    marginLeft: 10,
    flex: 1,
  },

  button: {
    backgroundColor: "#F97316",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 25,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  portalText: {
    marginHorizontal: 10,
    color: "#9CA3AF",
    fontSize: 12,
    letterSpacing: 2,
  },

  footerText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    marginBottom: 15,
  },

  link: {
    color: "#F97316",
    fontWeight: "600",
  },

  authorizedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  authorizedText: {
    marginLeft: 6,
    fontSize: 12,
    color: "#9CA3AF",
  },
});