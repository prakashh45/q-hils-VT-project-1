import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "../components/AppHeader";

export default function ModuleProgress() {

  const router = useRouter();

  const programs = [
    "Advanced Career Program",
    "Foundational Career Path",
    "STEM Excellence Program",
  ];

  const levels = ["Year 1", "Year 2", "Year 3"];
  const modules = [1, 2, 3, 4, 5, 6, 7, 8];

  const [program, setProgram] = useState(programs[0]);
  const [level, setLevel] = useState(levels[0]);

  const [showProgram, setShowProgram] = useState(false);
  const [showLevel, setShowLevel] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const [module1, setModule1] = useState(4);
  const [module2, setModule2] = useState(5);
  const [module3, setModule3] = useState(2);

  const [activeRow, setActiveRow] = useState<number | null>(null);

  const saveProgress = () => {
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 3000)
  }

  type ModuleDropdownProps = {
    value: number
    setValue: (val: number) => void
    lastModule: number
    row: number
  }

  const ModuleDropdown = ({ value, setValue, lastModule, row }: ModuleDropdownProps) => {

    const [open, setOpen] = useState(false)

    return (

      <View>

        <TouchableOpacity
          style={styles.dropdownSmall}
          onPress={() => setOpen(!open)}
        >

          <Text>{value}</Text>
          <Ionicons name="chevron-down" />

        </TouchableOpacity>

        {open && (

          <View style={styles.moduleOptions}>

            {modules.map(m => {

              if (m < lastModule) return null

              return (

                <TouchableOpacity
                  key={m}
                  onPress={() => {
                    setValue(m)
                    setActiveRow(row)
                    setOpen(false)
                  }}>
                  <Text style={styles.option}>{m}</Text>
                </TouchableOpacity>

              )

            })}

          </View>

        )}

      </View>

    )

  }

  return (

    <View style={styles.container}>

      {/* HEADER */}

      <AppHeader
        title="Module Progress"
        rightIcon="ellipsis-vertical"
      />

      {/* SUCCESS POPUP */}

      {showPopup && (

        <View style={styles.popup}>

          <Ionicons name="checkmark-circle" size={22} color="#fff" />

          <Text style={styles.popupText}>
            Module progress updated successfully
          </Text>

        </View>

      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* SCHOOL CARD */}

        <View style={styles.schoolCard}>

          <Text style={styles.schoolName}>
            Greenwood Public School
          </Text>

          <View style={styles.row}>

            <Text style={styles.schoolInfo}>
              ID: #44920
            </Text>

            <Text style={styles.schoolInfo}>
              Last Visit: Oct 12, 2023
            </Text>

          </View>

        </View>


        {/* PROGRAM */}

        <Text style={styles.label}>
          Select Program
        </Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowProgram(!showProgram)}
        >

          <Text>{program}</Text>
          <Ionicons name="chevron-down" />

        </TouchableOpacity>

        {showProgram && (

          <View style={styles.dropdownOptions}>

            {programs.map(p => (

              <TouchableOpacity
                key={p}
                onPress={() => {
                  setProgram(p)
                  setShowProgram(false)
                }}
              >

                <Text style={styles.option}>{p}</Text>

              </TouchableOpacity>

            ))}

          </View>

        )}


        {/* LEVEL */}

        <Text style={styles.label}>
          Select Level
        </Text>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowLevel(!showLevel)}
        >

          <Text>{level}</Text>
          <Ionicons name="chevron-down" />

        </TouchableOpacity>

        {showLevel && (

          <View style={styles.dropdownOptions}>

            {levels.map(l => (

              <TouchableOpacity
                key={l}
                onPress={() => {
                  setLevel(l)
                  setShowLevel(false)
                }}
              >

                <Text style={styles.option}>{l}</Text>

              </TouchableOpacity>

            ))}

          </View>

        )}

        {/* बाकीचा तुझा table code same आहे */}
        {/* (मी change केला नाही कारण तू सांगितलं होतं) */}

      </ScrollView>

      {/* SAVE BUTTON */}

      <TouchableOpacity
        style={styles.saveBtn}
        onPress={saveProgress}
      >

        <Ionicons name="save-outline" size={20} color="#fff" />

        <Text style={styles.saveText}>
          Save Module Progress
        </Text>

      </TouchableOpacity>

    </View>

  )

}

const styles = StyleSheet.create({

container:{ flex:1, backgroundColor:"#F3F4F6" },

popup:{
position:"absolute",
top:80,
left:20,
right:20,
backgroundColor:"#10B981",
padding:16,
borderRadius:12,
flexDirection:"row",
alignItems:"center",
zIndex:1000
},

popupText:{ color:"#fff", marginLeft:10, fontWeight:"600" },

schoolCard:{
backgroundColor:"#fff",
margin:20,
padding:18,
borderRadius:16,
borderWidth:1,
borderColor:"#FED7AA"
},

schoolName:{ fontSize:20, fontWeight:"700" },

row:{ flexDirection:"row", marginTop:6 },

schoolInfo:{ color:"#6B7280", marginRight:15 },

label:{ marginLeft:20, marginTop:10, fontWeight:"600" },

dropdown:{
backgroundColor:"#fff",
margin:20,
marginTop:5,
padding:16,
borderRadius:12,
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center"
},

dropdownOptions:{
marginHorizontal:20,
backgroundColor:"#fff",
borderRadius:10,
padding:10
},

option:{ paddingVertical:6 },

dropdownSmall:{
flexDirection:"row",
alignItems:"center",
borderWidth:1,
borderColor:"#E5E7EB",
paddingHorizontal:10,
paddingVertical:5,
borderRadius:8
},

moduleOptions:{
backgroundColor:"#fff",
borderRadius:8,
padding:6
},

saveBtn:{
position:"absolute",
bottom:20,
left:20,
right:20,
backgroundColor:"#F97316",
padding:18,
borderRadius:16,
flexDirection:"row",
justifyContent:"center",
alignItems:"center"
},

saveText:{ color:"#fff", fontWeight:"700", marginLeft:10 }

})