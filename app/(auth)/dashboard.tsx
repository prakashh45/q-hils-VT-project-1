import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";


export default function Dashboard() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

  try {

    const token = await AsyncStorage.getItem("access_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    /* PROFILE API */

    const profileResponse = await fetch(
      "https://rp-backend-60066119139.development.catalystserverless.in/server/rp_mobile/rp/profile",
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    const profile = await profileResponse.json();

    console.log("PROFILE:",profile);

    if(profile?.data?.name){
      setName(profile.data.name);
    }

    /* SCHOOLS API */

    /* SCHOOLS API */

/* SCHOOLS API */

const rpId = await AsyncStorage.getItem("rp_id");

const schoolResponse = await fetch(
  "https://rp-backend-60066119139.development.catalystserverless.in/server/rp_mobile_school/rp/schools",
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "rp_id": rpId ? rpId : ""
    }
  }
);

const schoolData = await schoolResponse.json();

console.log("SCHOOLS:", schoolData);

setSchools(schoolData?.data || []);
  } catch (error) {

    console.log("Dashboard error:", error);

  } finally {

    setLoading(false);

  }

};
  return (

    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* TOP BAR */}

        <View style={styles.topBar}>

          <View style={styles.topLeft}>

            <Text style={styles.dateText}>
              Oct 24, 2023 • 09:15 AM
            </Text>

            <View style={styles.activeBadge}>

              <Ionicons
                name="location-outline"
                size={14}
                color="#16A34A"
                style={{ marginRight: 4 }}
              />

              <Text style={styles.activeText}>ACTIVE</Text>

            </View>

          </View>

          <Ionicons name="notifications" size={22} color="#F97316" />

        </View>

        {/* PROFILE */}

        <View style={styles.profileRow}>

          <View style={styles.avatarBorder}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.avatar}
            />
          </View>

          <View>
            <Text style={styles.hello}>Hello, {name || "User"}</Text>
            <Text style={styles.role}>Resource Person</Text>
          </View>

        </View>

        {/* INSPIRATION */}

        <View style={styles.inspirationCard}>

          <Text style={styles.inspirationTitle}>
            DAILY INSPIRATION
          </Text>

          <Text style={styles.quote}>
            "Education is the most powerful weapon which you can use to change the world."
          </Text>

          <Text style={styles.author}>
            — Nelson Mandela
          </Text>

        </View>

        {/* QUICK ACCESS */}

        <Text style={styles.sectionTitle}>QUICK ACCESS</Text>

        <View style={styles.grid}>

          <TouchableOpacity
            style={styles.quickCard}
            onPress={() => router.push("/schools")}
          >
            <MaterialIcons name="school" size={28} color="#F97316" />
            <Text style={styles.quickText}>Schools</Text>
          </TouchableOpacity>

          {quickItem("event", "Schedule Visit")}
          {quickItem("payments", "Expense")}
          {quickItem("event-busy", "Leave")}
          {quickItem("description", "Reports")}
          {quickItem("trending-up", "Performance")}

        </View>

        {/* ALERTS */}

        <Text style={styles.sectionTitle}>ALERTS & ACTIONS</Text>

        {alertCard(
          "school",
          "#F97316",
          "Total Schools Assigned",
          "Across all zones",
          schools.length.toString()
        )}

      </ScrollView>

      {/* BOTTOM NAV */}

      <View style={styles.bottomNav}>

        <Ionicons name="home" size={22} color="#F97316" />
        <Ionicons name="business" size={22} color="#9CA3AF" />
        <Ionicons name="wallet" size={22} color="#9CA3AF" />
        <Ionicons name="bar-chart" size={22} color="#9CA3AF" />
        <Ionicons name="person" size={22} color="#9CA3AF" />

      </View>

    </View>

  );
}

function alertCard(icon: any, color: string, title: string, sub: string, count: string) {
  return (
    <View style={[styles.alertCard, { borderLeftColor: color }]}>
      <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
        <MaterialIcons name={icon} size={24} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.alertTitle}>{title}</Text>
        <Text style={styles.alertSub}>{sub}</Text>
      </View>

      <Text style={[styles.alertCount, { color }]}>{count}</Text>
    </View>
  )
}

function quickItem(icon: any, label: string) {
  return (
    <TouchableOpacity style={styles.quickCard}>
      <MaterialIcons name={icon} size={28} color="#F97316" />
      <Text style={styles.quickText}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#F3F4F6" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  topBar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginTop: 40 },

  topLeft: { flexDirection: "row", alignItems: "center" },

  dateText: { fontSize: 12, color: "#6B7280", marginRight: 10 },

  activeBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#DCFCE7", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },

  activeText: { fontSize: 10, color: "#16A34A", fontWeight: "600" },

  profileRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 20, marginBottom: 20 },

  avatarBorder: { borderWidth: 3, borderColor: "#F97316", borderRadius: 40, padding: 2, marginRight: 15 },

  avatar: { width: 60, height: 60, borderRadius: 30 },

  hello: { fontSize: 22, fontWeight: "700" },

  role: { color: "#6B7280" },

  inspirationCard: { backgroundColor: "#F97316", marginHorizontal: 20, borderRadius: 20, padding: 20, marginBottom: 25 },

  inspirationTitle: { color: "#FFEAD5", fontSize: 12, marginBottom: 10 },

  quote: { color: "#fff", fontStyle: "italic", lineHeight: 22 },

  author: { color: "#fff", textAlign: "right", marginTop: 10 },

  sectionTitle: { marginLeft: 20, marginBottom: 10, fontWeight: "600", color: "#6B7280" },

  alertCard: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", marginHorizontal: 20, padding: 15, borderRadius: 16, marginBottom: 15, borderLeftWidth: 4 },

  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: "center", alignItems: "center", marginRight: 15 },

  alertTitle: { fontWeight: "600" },

  alertSub: { color: "#6B7280", fontSize: 12 },

  alertCount: { fontWeight: "700", fontSize: 18 },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 25 },

  quickCard: { width: "30%", backgroundColor: "#fff", borderRadius: 16, paddingVertical: 22, alignItems: "center", justifyContent: "center", marginBottom: 15 },

  quickText: { marginTop: 8, fontSize: 12, textAlign: "center" },

  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderColor: "#E5E7EB" }

});