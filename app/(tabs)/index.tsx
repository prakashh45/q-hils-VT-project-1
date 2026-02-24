import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Logo Circle */}
      <View style={styles.logoCircle}>
        <Text style={{fontSize:30}}>🎓</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>RP SCHOOL VISIT</Text>
      <Text style={styles.title}>MANAGEMENT</Text>

      {/* School Image */}
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1580582932707-520aed937b7b" }}
        style={styles.image}
      />

      {/* Login Text */}
      <Text style={styles.loginTitle}>Secure Login</Text>
      <Text style={styles.subtitle}>
        Access the school monitoring portal
      </Text>

      {/* Input Label */}
      <Text style={styles.label}>Mobile Number or Email</Text>

      {/* Input with Icon */}
      <View style={styles.inputBox}>
        <Ionicons name="person-circle-outline" size={22} color="#6b7280" />
        <TextInput
          placeholder="Enter registered contact details"
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      {/* Official Portal */}
      <Text style={styles.portal}>OFFICIAL PORTAL</Text>

      {/* Terms Text */}
      <Text style={styles.terms}>
        By logging in, you agree to our{" "}
        <Text style={styles.link}>Terms of Service</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>

      {/* Authorized */}
      <Text style={styles.auth}>AUTHORIZED PERSONNEL ONLY</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flexGrow:1,
    alignItems:"center",
    backgroundColor:"#F2F4F7",
    padding:20,
  },

  logoCircle:{
    marginTop:40,
    width:90,
    height:90,
    borderRadius:50,
    backgroundColor:"#E2E5EA",
    alignItems:"center",
    justifyContent:"center",
  },

  title:{
    fontSize:22,
    fontWeight:"bold",
    color:"#1E2A78",
    textAlign:"center",
  },

  image:{
    width:"100%",
    height:200,
    borderRadius:20,
    marginVertical:20,
  },

  loginTitle:{
    fontSize:26,
    fontWeight:"bold",
    marginTop:10,
  },

  subtitle:{
    color:"gray",
    marginBottom:20,
  },

  label:{
    alignSelf:"flex-start",
    fontWeight:"600",
    marginBottom:5,
  },

  inputBox:{
    width:"100%",
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#E5E7EB", // grey bg
    borderRadius:12,
    paddingHorizontal:12,
    paddingVertical:14,
  },

  input:{
    marginLeft:10,
    flex:1,
    fontSize:16,
  },

  button:{
    width:"100%",
    backgroundColor:"#232C7B",
    padding:18,
    borderRadius:12,
    alignItems:"center",
    marginTop:20,
  },

  buttonText:{
    color:"#fff",
    fontSize:18,
    fontWeight:"bold",
  },

  portal:{
    marginTop:30,
    color:"#9ca3af",
    letterSpacing:2,
  },

  terms:{
    marginTop:10,
    textAlign:"center",
    color:"#6b7280",
  },

  link:{
    color:"#1E2A78",
    textDecorationLine:"underline",
  },

  auth:{
    marginTop:10,
    color:"#9ca3af",
    fontWeight:"600",
  },
});