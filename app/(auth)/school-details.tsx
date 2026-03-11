import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import AppHeader from "../components/AppHeader";
import { useVisit } from "../context/VisitContext";

export default function SchoolDetails() {

  const router = useRouter();

  const { currentSchool } = useVisit();

  const [editMode, setEditMode] = useState(false);

  const [principalName, setPrincipalName] = useState("Dr. Ananya Sharma");
  const [phone, setPhone] = useState("+91 98450 12345");
  const [email, setEmail] = useState("ananya.s@greenwood.com");

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <AppHeader title="School Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >

        {/* SCHOOL HEADER */}

        <View style={styles.schoolHeader}>

          <View style={styles.schoolIcon}>
            <Ionicons name="school" size={26} color="#F97316" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.schoolName}>
              {currentSchool?.name || "School Name"}
            </Text>

            <Text style={styles.schoolId}>
              School ID: {currentSchool?.id || "N/A"}
            </Text>
          </View>

        </View>


        {/* SCHOOL INFORMATION */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            SCHOOL INFORMATION
          </Text>

          {infoRow("Address",
            currentSchool?.address || "Address not available")}

          {infoRow("School Type", "Private Unaided")}

          {infoRow("Zone", "Zone 2")}

          {infoRow("Academic Year", "April - March")}

        </View>


        {/* PRINCIPAL DETAILS */}

        <View style={styles.section}>

          <Text style={styles.sectionTitle}>
            PRINCIPAL DETAILS
          </Text>

          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.inputBox}
            value={principalName}
            editable={editMode}
            onChangeText={setPrincipalName}
          />

          <View style={styles.row}>

            <View style={{ flex: 1 }}>

              <Text style={styles.label}>Phone</Text>

              <TextInput
                style={styles.inputBox}
                value={phone}
                editable={editMode}
                onChangeText={setPhone}
              />

            </View>

            <View style={{ flex: 1 }}>

              <Text style={styles.label}>Email</Text>

              <TextInput
                style={styles.inputBox}
                value={email}
                editable={editMode}
                onChangeText={setEmail}
              />

            </View>

          </View>


          <View style={styles.buttonRow}>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => setEditMode(false)}
            >
              <Text style={styles.confirmText}>
                Confirm Details
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.editText}>
                Edit Details
              </Text>
            </TouchableOpacity>

          </View>

        </View>


        {/* PROGRAMS */}

        <View style={styles.programHeader}>

          <Text style={styles.sectionTitle}>
            Programs Running
          </Text>

          <View style={styles.activeBadge}>
            <Text style={styles.activeText}>3 Active</Text>
          </View>

        </View>


        {programCard(
          router,
          "ACP",
          "Advanced Career Program",
          "12 Classes",
          "24 Sections"
        )}

        {programCard(
          router,
          "FCP",
          "Foundational Career Path",
          "08 Classes",
          "16 Sections"
        )}

        {programCard(
          router,
          "STEM",
          "STEM Excellence Program",
          "06 Classes",
          "12 Sections"
        )}

      </ScrollView>

    </View>

  );

}



function infoRow(label: string, value: string) {

  return (

    <View style={{ marginBottom: 10 }}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>

  );

}



function programCard(
  router: any,
  tag: string,
  title: string,
  classes: string,
  sections: string
) {

  return (

    <TouchableOpacity
      style={styles.programCard}
      onPress={() => router.push("/program-details")}
    >

      <View style={styles.programIcon}>
        <Text style={styles.programTag}>{tag}</Text>
      </View>

      <View style={{ flex: 1 }}>

        <Text style={styles.programTitle}>
          {title}
        </Text>

        <View style={styles.programInfo}>

          <Text style={styles.programText}>
            {classes}
          </Text>

          <Text style={styles.programText}>
            {sections}
          </Text>

        </View>

      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />

    </TouchableOpacity>

  );

}



const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F3F4F6"
  },

  schoolHeader:{
    flexDirection:"row",
    alignItems:"center",
    marginBottom:20
  },

  schoolIcon:{
    backgroundColor:"#FFEAD5",
    padding:15,
    borderRadius:14,
    marginRight:12
  },

  schoolName:{
    fontSize:20,
    fontWeight:"700"
  },

  schoolId:{
    color:"#6B7280",
    marginTop:4
  },

  section:{
    backgroundColor:"#fff",
    padding:18,
    borderRadius:16,
    marginBottom:20
  },

  sectionTitle:{
    fontWeight:"700",
    marginBottom:10
  },

  label:{
    color:"#6B7280",
    marginTop:8
  },

  value:{
    fontWeight:"600",
    marginTop:2
  },

  inputBox:{
    backgroundColor:"#F3F4F6",
    padding:12,
    borderRadius:10,
    marginTop:4
  },

  row:{
    flexDirection:"row",
    gap:10
  },

  buttonRow:{
    flexDirection:"row",
    marginTop:15
  },

  confirmBtn:{
    backgroundColor:"#F97316",
    flex:1,
    padding:12,
    borderRadius:10,
    alignItems:"center",
    marginRight:10
  },

  confirmText:{
    color:"#fff",
    fontWeight:"700"
  },

  editBtn:{
    backgroundColor:"#FFEAD5",
    flex:1,
    padding:12,
    borderRadius:10,
    alignItems:"center"
  },

  editText:{
    color:"#F97316",
    fontWeight:"700"
  },

  programHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:10
  },

  activeBadge:{
    backgroundColor:"#FFEAD5",
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:12
  },

  activeText:{
    color:"#F97316"
  },

  programCard:{
    backgroundColor:"#fff",
    padding:16,
    borderRadius:16,
    flexDirection:"row",
    alignItems:"center",
    marginBottom:15
  },

  programIcon:{
    backgroundColor:"#F3F4F6",
    padding:12,
    borderRadius:10,
    marginRight:12
  },

  programTag:{
    fontWeight:"700",
    color:"#F97316"
  },

  programTitle:{
    fontWeight:"700",
    marginBottom:4
  },

  programInfo:{
    flexDirection:"row",
    gap:15
  },

  programText:{
    color:"#6B7280"
  }

});