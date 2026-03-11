import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";

export default function ClassObservation() {

  const router = useRouter();

  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: ""
  })

  const [remarks, setRemarks] = useState("")
  const [selectedMedia, setSelectedMedia] = useState("")

  const [form, setForm] = useState({
    program: "Select Program",
    class: "Select",
    section: "Select",
    module: "Select Module"
  })

  function renderQuestion(id: "q1" | "q2" | "q3" | "q4", text: string) {

    return (

      <View style={styles.questionRow}>

        <Text style={styles.question}>
          {text}
        </Text>

        <View style={styles.btnRow}>

          <TouchableOpacity
            style={[
              styles.optionBtn,
              answers[id] === "Yes" && styles.selectedYes
            ]}
            onPress={() => setAnswers({ ...answers, [id]: "Yes" })}
          >

            <Text
              style={[
                styles.optionText,
                answers[id] === "Yes" && styles.selectedText
              ]}
            >
              Yes
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            style={[
              styles.optionBtn,
              answers[id] === "No" && styles.selectedNo
            ]}
            onPress={() => setAnswers({ ...answers, [id]: "No" })}
          >

            <Text
              style={[
                styles.optionText,
                answers[id] === "No" && styles.selectedText
              ]}
            >
              No
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    )

  }

  function Dropdown(value: string) {

    return (

      <TouchableOpacity style={styles.dropdown}>

        <Text>{value}</Text>

        <Ionicons name="chevron-down" size={18} />

      </TouchableOpacity>

    )

  }

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <AppHeader
        title="Class Observation"
      />
        <SchoolBanner/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >

        {/* STEP */}

        <Text style={styles.stepLabel}>
          STEP 3 OF 6
        </Text>

        <View style={styles.progressBar}>

          <View style={styles.progressDone} />
          <View style={styles.progressDone} />
          <View style={styles.progressActive} />
          <View style={styles.progressIdle} />
          <View style={styles.progressIdle} />
          <View style={styles.progressIdle} />

        </View>


        {/* SCHOOL CARD */}

        <View style={styles.schoolCard}>

          <View style={styles.row}>
            <Text style={styles.label}>School</Text>
            <Text style={styles.value}>Green Valley Public School</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Visit Date</Text>
            <Text style={styles.value}>Oct 24, 2023</Text>
          </View>

        </View>


        {/* CLASS DETAILS */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Class Details
          </Text>

          <Text style={styles.fieldLabel}>Program Level</Text>
          {Dropdown(form.program)}

          <View style={styles.doubleRow}>

            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Class</Text>
              {Dropdown(form.class)}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.fieldLabel}>Section</Text>
              {Dropdown(form.section)}
            </View>

          </View>

          <Text style={styles.fieldLabel}>Module Teaching</Text>
          {Dropdown(form.module)}

        </View>


        {/* OBSERVATION */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Observation Checklist
          </Text>

          {renderQuestion("q1", "Teacher present?")}
          {renderQuestion("q2", "Students present?")}

          <Text style={styles.mandatory}>
            Mandatory Remarks *
          </Text>

          <TextInput
            value={remarks}
            onChangeText={setRemarks}
            placeholder="State reason for absence..."
            style={styles.textArea}
            multiline
          />

          {renderQuestion("q3", "Teaching as per module?")}
          {renderQuestion("q4", "Class discipline maintained?")}

        </View>


        {/* MEDIA */}

        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Media Evidence
          </Text>

          <View style={styles.mediaRow}>

            {renderMedia("photo", "camera", "Take Photo")}
            {renderMedia("gallery", "image", "Gallery")}
            {renderMedia("video", "videocam", "Record Video")}

          </View>

          <View style={styles.locationBox}>

            <Text style={styles.locText}>
              📍 28.6139° N, 77.2090° E
            </Text>

            <Text style={styles.locText}>
              🕒 10:45 AM, 24 Oct
            </Text>

            <Text style={styles.note}>
              Minimum 1 video required for submission
            </Text>

          </View>

        </View>


        {/* SAVE */}

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => router.push("../observation-summary")}
        >

          <Text style={styles.saveText}>
            Save Observation
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </View>

  )

  function renderMedia(type: string, icon: any, text: string) {

    return (

      <TouchableOpacity
        style={[
          styles.mediaBox,
          selectedMedia === type && styles.mediaBoxActive
        ]}
        onPress={() => setSelectedMedia(type)}
      >

        <Ionicons
          name={icon}
          size={26}
          color={selectedMedia === type ? "#fff" : "#F97316"}
        />

        <Text
          style={
            selectedMedia === type
              ? styles.mediaTextActive
              : styles.mediaText
          }
        >
          {text}
        </Text>

      </TouchableOpacity>

    )

  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F3F4F6"
  },

  stepLabel: {
    textAlign: "center",
    marginTop: 15,
    color: "#F97316",
    fontWeight: "600"
  },

  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10
  },

  progressDone: {
    width: 28,
    height: 6,
    backgroundColor: "#F97316",
    borderRadius: 10,
    marginHorizontal: 4
  },

  progressActive: {
    width: 28,
    height: 6,
    backgroundColor: "#FB923C",
    borderRadius: 10,
    marginHorizontal: 4
  },

  progressIdle: {
    width: 28,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginHorizontal: 4
  },

  schoolCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 16,
    borderRadius: 14
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },

  label: {
    color: "#6B7280"
  },

  value: {
    fontWeight: "600"
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 14
  },

  sectionTitle: {
    color: "#F97316",
    fontWeight: "700",
    marginBottom: 8
  },

  fieldLabel: {
    marginTop: 6,
    marginBottom: 4
  },

  dropdown: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },

  doubleRow: {
    flexDirection: "row",
    gap: 10
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },

  question: {
    flex: 1
  },

  btnRow: {
    flexDirection: "row"
  },

  optionBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 6
  },

  selectedYes: {
    backgroundColor: "#F97316",
    borderColor: "#F97316"
  },

  selectedNo: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444"
  },

  optionText: {
    color: "#374151"
  },

  selectedText: {
    color: "#fff"
  },

  mandatory: {
    color: "red",
    marginTop: 10
  },

  textArea: {
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 10,
    height: 80,
    padding: 10,
    marginTop: 6
  },

  mediaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },

  mediaBox: {
    width: 95,
    height: 95,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },

  mediaBoxActive: {
    backgroundColor: "#F97316",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },

  mediaText: {
    marginTop: 6
  },

  mediaTextActive: {
    marginTop: 6,
    color: "#fff"
  },

  locationBox: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  locText: {
    color: "#6B7280"
  },

  note: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280"
  },

  saveBtn: {
    backgroundColor: "#F97316",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center"
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  }

})