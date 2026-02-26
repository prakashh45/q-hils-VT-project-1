import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Dashboard() {
  const quickAccess = [
    { icon: "school", label: "Schools" },
    { icon: "payments", label: "Expense" },
    { icon: "event", label: "Leave" },
    { icon: "description", label: "Reports" },
    { icon: "trending-up", label: "Performance" },
    { icon: "add-circle", label: "New Visit", highlight: true },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>RP Visit Manager</Text>
            <Text style={styles.date}>
              Oct 24, 2023 • 09:15 AM
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.activeBadge}>
              <Ionicons name="location" size={14} color="#28C76F" />
              <Text style={styles.activeText}>ACTIVE</Text>
            </View>

            <View style={styles.bellWrapper}>
              <Ionicons
                name="notifications"
                size={22}
                color="#1F2A60"
              />
              <View style={styles.redDot} />
            </View>
          </View>
        </View>

        {/* PROFILE */}
        <View style={styles.profileRow}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>
              Good Morning, Rajesh
            </Text>
            <Text style={styles.role}>
              Regional Planning Officer
            </Text>
          </View>
        </View>

        {/* INSPIRATION CARD */}
        <View style={styles.inspirationCard}>
          <Text style={styles.inspirationTitle}>
            DAILY INSPIRATION
          </Text>
          <Text style={styles.quote}>
            "Education is the most powerful weapon which
            you can use to change the world."
          </Text>
          <Text style={styles.author}>
            — Nelson Mandela
          </Text>
        </View>

        {/* ALERTS */}
        <Text style={styles.sectionTitle}>
          ALERTS & ACTIONS
        </Text>

        {/* CARD 1 */}
        <View style={[styles.alertCard, { borderLeftColor: "#F39C12" }]}>
          <View style={[styles.iconBox, { backgroundColor: "#FDEBD0" }]}>
            <Ionicons name="time" size={20} color="#F39C12" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Pending Visits</Text>
            <Text style={styles.alertSubtitle}>
              3 schools scheduled for today
            </Text>
          </View>
          <Text style={[styles.count, { color: "#F39C12" }]}>
            3
          </Text>
        </View>

        {/* CARD 2 */}
        <View style={[styles.alertCard, { borderLeftColor: "#E74C3C" }]}>
          <View style={[styles.iconBox, { backgroundColor: "#FADBD8" }]}>
            <Ionicons
              name="alert-circle"
              size={20}
              color="#E74C3C"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>
              Incomplete Visit
            </Text>
            <Text style={styles.alertSubtitle}>
              Action required: St. Mary's High
            </Text>
          </View>
          <Text style={[styles.count, { color: "#E74C3C" }]}>
            1
          </Text>
        </View>

        {/* CARD 3 */}
        <View style={[styles.alertCard, { borderLeftColor: "#1F2A60" }]}>
          <View style={[styles.iconBox, { backgroundColor: "#E8ECF8" }]}>
            <Ionicons
              name="shield-checkmark"
              size={20}
              color="#1F2A60"
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>
              Pending Verification
            </Text>
            <Text style={styles.alertSubtitle}>
              Verify attendance records
            </Text>
          </View>
          <Text style={[styles.count, { color: "#1F2A60" }]}>
            2
          </Text>
        </View>

        {/* QUICK ACCESS */}
        <View style={styles.grid}>

  <View style={styles.gridItem}>
    <MaterialIcons name="school" size={28} color="#1F2A60" />
    <Text style={styles.gridText}>Schools</Text>
  </View>

  <View style={styles.gridItem}>
    <MaterialIcons name="payments" size={28} color="#1F2A60" />
    <Text style={styles.gridText}>Expense</Text>
  </View>

  <View style={styles.gridItem}>
    <MaterialIcons name="event" size={28} color="#1F2A60" />
    <Text style={styles.gridText}>Leave</Text>
  </View>

  <View style={styles.gridItem}>
    <MaterialIcons name="description" size={28} color="#1F2A60" />
    <Text style={styles.gridText}>Reports</Text>
  </View>

  <View style={styles.gridItem}>
    <MaterialIcons name="trending-up" size={28} color="#1F2A60" />
    <Text style={styles.gridText}>Performance</Text>
  </View>

  <View style={[styles.gridItem, styles.highlightCard]}>
    <MaterialIcons name="add-circle" size={28} color="#1F2A60" />
    <Text style={styles.gridText}>New Visit</Text>
  </View>

</View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color="#1F2A60" />
        <Ionicons name="business" size={22} color="#9CA3AF" />
        <Ionicons name="wallet" size={22} color="#9CA3AF" />
        <Ionicons name="bar-chart" size={22} color="#9CA3AF" />
        <Ionicons name="person" size={22} color="#9CA3AF" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },

  appTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2A60",
  },

  date: {
    fontSize: 12,
    color: "#6B7280",
  },

  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F8F1",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  activeText: {
    color: "#28C76F",
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "600",
  },

  bellWrapper: {
    marginLeft: 15,
  },

  redDot: {
    position: "absolute",
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 4,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  greeting: {
    fontSize: 18,
    fontWeight: "700",
  },

  role: {
    color: "#6B7280",
  },

  inspirationCard: {
    backgroundColor: "#1F2A60",
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
  },

  inspirationTitle: {
    color: "#A5B4FC",
    fontSize: 12,
    marginBottom: 10,
  },

  quote: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },

  author: {
    color: "#C7D2FE",
    textAlign: "right",
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 15,
    color: "#6B7280",
  },

  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
  },

  iconBox: {
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },

  alertTitle: {
    fontWeight: "700",
  },

  alertSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },

  count: {
    fontWeight: "700",
    fontSize: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
  },

  highlightCard: {
    borderWidth: 1,
    borderColor: "#1F2A60",
  },

  gridText: {
    marginTop: 10,
    fontWeight: "600",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
});