
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";
import { useVisit } from "../context/VisitContext";

const BASE_URL =
  "https://rp-backend-60066119139.development.catalystserverless.in";

export default function VisitForm() {

  const router = useRouter();
  const { visitId } = useVisit();

  const [purpose, setPurpose] = useState("Select Purpose");
  const [showDropdown, setShowDropdown] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  const purposes = [
    "Class Observation",
    "Adopted Class",
    "Enabling Session",
    "No Class Observed",
    "Impact Survey"
  ];

  /* SAVE PURPOSE API */

  const savePurpose = async () => {

    try {

      if (!visitId) {
        alert("Visit ID missing");
        return;
      }

      if (purpose === "Select Purpose") {
        alert("Please select visit purpose");
        return;
      }

      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/server/rp_visits/rp/visits/${visitId}/purpose`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            visit_purpose: [purpose],
            remarks: remarks
          })
        }
      );

      const data = await res.json();

      console.log("PURPOSE SAVE RESPONSE:", data);

      if (data?.success) {

        router.push("/class-observation");

      } else {

        alert(data?.message || "Failed to save purpose");

      }

    } catch (e) {

      console.log("Purpose save error", e);
      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  };

  return (

    <View style={styles.container}>

      <AppHeader title="Visit Form" />

      <SchoolBanner />

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>

        <Text style={styles.stepText}>STEP 2 OF 6</Text>

        {/* STEP PROGRESS */}

        <View style={styles.stepRow}>
          <View style={styles.stepDone} />
          <View style={styles.stepActive} />
          <View style={styles.step} />
          <View style={styles.step} />
          <View style={styles.step} />
          <View style={styles.step} />
        </View>

        {/* FORM CARD */}

        <View style={styles.card}>

          {/* PURPOSE */}

          <Text style={styles.label}>Visit Purpose</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text>{purpose}</Text>
            <Ionicons name="chevron-down" size={18} color="#F97316" />
          </TouchableOpacity>

          {showDropdown && (

            <View style={styles.dropdownList}>

              {purposes.map((item, index) => (

                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    setPurpose(item);
                    setShowDropdown(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>

              ))}

            </View>

          )}

          {/* REMARKS */}

          <Text style={styles.label}>Remarks</Text>

          <TextInput
            multiline
            value={remarks}
            onChangeText={setRemarks}
            style={styles.textArea}
            placeholder="Enter remarks"
          />

          {/* BUTTONS */}

          <View style={styles.btnRow}>

            <TouchableOpacity style={styles.draftBtn}>
              <Text style={styles.draftText}>Save Draft</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.nextBtn}
              onPress={savePurpose}
              disabled={loading}
            >

              {loading ? (
                <ActivityIndicator color="#fff"/>
              ) : (
                <Text style={styles.nextText}>Next Step</Text>
              )}

            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </View>

  );

}

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: "#F3F4F6" },

  stepText: {
    textAlign: "center",
    marginTop: 15,
    color: "#6B7280"
  },

  stepRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10
  },

  stepDone: {
    width: 28,
    height: 6,
    backgroundColor: "#F97316",
    borderRadius: 10,
    marginHorizontal: 4
  },

  stepActive: {
    width: 28,
    height: 6,
    backgroundColor: "#F97316",
    borderRadius: 10,
    marginHorizontal: 4
  },

  step: {
    width: 28,
    height: 6,
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    marginHorizontal: 4
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16
  },

  label: {
    fontWeight: "700",
    marginBottom: 6
  },

  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 12
  },

  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5
  },

  option: {
    padding: 14
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 12,
    padding: 16,
    height: 110,
    marginTop: 8
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },

  draftBtn: {
    borderWidth: 2,
    borderColor: "#F97316",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12
  },

  draftText: {
    color: "#F97316",
    fontWeight: "700"
  },

  nextBtn: {
    backgroundColor: "#F97316",
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12
  },

  nextText: {
    color: "#fff",
    fontWeight: "700"
  }

});

