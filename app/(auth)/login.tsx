import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [contact, setContact] = useState("");

  const handleLogin = () => {
    if (!contact) {
      alert("Enter mobile or email");
      return;
    }

    const generatedOtp = "123456";

    router.push({
      pathname: "/(auth)/otp",
      params: { contact, otp: generatedOtp },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Logo */}
      <View style={styles.logoCircle}>
        <Ionicons name="school" size={36} color="#1F2A60" />
      </View>

      <Text style={styles.title}>RP SCHOOL VISIT</Text>
      <Text style={styles.title}>MANAGEMENT</Text>

      {/* Image Card */}
      <Image
        source={require("../../assets/images/school.png")}
        style={styles.image}
      />

      {/* Login Section */}
      <Text style={styles.secureTitle}>Secure Login</Text>
      <Text style={styles.subtitle}>
        Access the school monitoring portal
      </Text>

      <Text style={styles.label}>Mobile Number or Email</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#8A94A6" />
        <TextInput
          placeholder="Enter registered contact details"
          placeholderTextColor="#8A94A6"
          style={styles.input}
          value={contact}
          onChangeText={setContact}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>OFFICIAL PORTAL</Text>
        <View style={styles.line} />
      </View>

      <Text style={styles.footerText}>
        By logging in, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      <View style={styles.authorizedRow}>
        <Ionicons name="shield-checkmark" size={16} color="#8A94A6" />
        <Text style={styles.authorizedText}>
          AUTHORIZED PERSONNEL ONLY
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
  },

  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E5E8F0",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2A60",
  },

  image: {
    width: "100%",
    height: 190,
    borderRadius: 20,
    marginVertical: 25,
  },

  secureTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
    color: "#1E2A3A",
  },

  subtitle: {
    color: "#6C7A93",
    marginBottom: 20,
  },

  label: {
    alignSelf: "flex-start",
    fontWeight: "600",
    marginBottom: 8,
    color: "#1E2A3A",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 12,
    width: "100%",
    height: 55,
    borderWidth: 1,
    borderColor: "#D5DCE6",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#1F2A60",
    width: "100%",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 25,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 15,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#D5DCE6",
  },

  dividerText: {
    marginHorizontal: 10,
    color: "#8A94A6",
    fontWeight: "600",
    letterSpacing: 1,
  },

  footerText: {
    textAlign: "center",
    color: "#6C7A93",
    marginVertical: 10,
  },

  link: {
    color: "#1F2A60",
    fontWeight: "600",
  },

  authorizedRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 6,
  },

  authorizedText: {
    color: "#8A94A6",
    fontSize: 12,
  },
});