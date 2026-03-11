import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AppHeader from "../components/AppHeader";

export default function ModuleProgress() {

  const modules = [1,2,3,4,5,6,7,8];

  const programs = [
    "Advanced Career Program",
    "Foundational Career Path",
    "STEM Excellence Program"
  ]

  const levels = ["Year 1","Year 2","Year 3"]

  const [program,setProgram] = useState(programs[0])
  const [level,setLevel] = useState(levels[0])

  const [showProgram,setShowProgram] = useState(false)
  const [showLevel,setShowLevel] = useState(false)

  const [showPopup,setShowPopup] = useState(false)

  const saveProgress = ()=>{
    setShowPopup(true)
    setTimeout(()=>setShowPopup(false),3000)
  }

  const sections = [
    {
      id:1,
      name:"Class 4 - Section A",
      teacher:"Ms. Sarah Jenkins",
      module:4,
      date:"12 Feb 2026, 11:32 AM"
    },
    {
      id:2,
      name:"Class 5 - Section B",
      teacher:"Mr. Robert Chen",
      module:5,
      date:"10 Feb 2026, 09:15 AM"
    },
    {
      id:3,
      name:"Class 6 - Section A",
      teacher:"Ms. Anita Gupta",
      module:2,
      date:"14 Feb 2026, 02:45 PM"
    }
  ]

  const [selectedModules,setSelectedModules] = useState<any>({})

  const Dropdown = ({section}:any)=>{

    const [open,setOpen] = useState(false)

    const currentValue =
      selectedModules[section.id] ?? section.module

    return(

      <View>

        <TouchableOpacity
          style={styles.dropdownSmall}
          onPress={()=>setOpen(!open)}
        >
          <Text>
            {currentValue}
          </Text>

          <Ionicons name="chevron-down" size={16}/>
        </TouchableOpacity>

        {open && (

          <View style={styles.moduleOptions}>

            {modules
              .filter(m => m >= section.module)
              .map(m=>(
              <TouchableOpacity
                key={m}
                onPress={()=>{
                  setSelectedModules({
                    ...selectedModules,
                    [section.id]:m
                  })
                  setOpen(false)
                }}
              >
                <Text style={styles.option}>{m}</Text>
              </TouchableOpacity>
            ))}

          </View>

        )}

      </View>

    )

  }

  return (

<View style={styles.container}>

<AppHeader
title="Module Progress"
rightIcon="ellipsis-vertical"
/>

{showPopup && (

<View style={styles.popup}>
<Ionicons name="checkmark-circle" size={22} color="#fff"/>
<Text style={styles.popupText}>
Module progress updated successfully
</Text>
</View>

)}

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:120}}
>

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


{/* PROGRAM DROPDOWN */}

<Text style={styles.label}>
Select Program
</Text>

<TouchableOpacity
style={styles.dropdown}
onPress={()=>setShowProgram(!showProgram)}
>

<Text>{program}</Text>
<Ionicons name="chevron-down"/>

</TouchableOpacity>

{showProgram &&(

<View style={styles.dropdownOptions}>

{programs.map(p=>(

<TouchableOpacity
key={p}
onPress={()=>{
setProgram(p)
setShowProgram(false)
}}
>

<Text style={styles.option}>{p}</Text>

</TouchableOpacity>

))}

</View>

)}


{/* LEVEL DROPDOWN */}

<Text style={styles.label}>
Select Level
</Text>

<TouchableOpacity
style={styles.dropdown}
onPress={()=>setShowLevel(!showLevel)}
>

<Text>{level}</Text>
<Ionicons name="chevron-down"/>

</TouchableOpacity>

{showLevel &&(

<View style={styles.dropdownOptions}>

{levels.map(l=>(

<TouchableOpacity
key={l}
onPress={()=>{
setLevel(l)
setShowLevel(false)
}}
>

<Text style={styles.option}>{l}</Text>

</TouchableOpacity>

))}

</View>

)}


<Text style={styles.sectionTitle}>
Section-wise Progress
</Text>

{/* TABLE SAME AS YOUR ORIGINAL */}

<View style={styles.table}>

<View style={styles.tableHeader}>

<Text style={styles.headerText}>SECTION</Text>
<Text style={styles.headerText}>ASSIGNED TEACHER</Text>
<Text style={styles.headerText}>LAST MODULE UPDATED</Text>
<Text style={styles.headerText}>UPDATE MODULE</Text>

</View>

{sections.map(section=>{

const selected =
  selectedModules[section.id] ?? section.module

return(

<View
key={section.id}
style={[
styles.rowCard,
selected > section.module && {backgroundColor:"#E8F7EF"}
]}
>

<View style={styles.col1}>
<Text style={styles.sectionName}>
{section.name}
</Text>

{selected > section.module && (
<Text style={styles.updatedTag}>
Updated
</Text>
)}
</View>

<View style={styles.col2}>
<Text>{section.teacher}</Text>
</View>

<View style={styles.col3}>
<Text>
Module {section.module}
</Text>

<Text style={styles.date}>
{section.date}
</Text>
</View>

<View style={styles.col4}>
<Dropdown section={section}/>
</View>

</View>

)

})}

</View>

</ScrollView>

<TouchableOpacity
style={styles.saveBtn}
onPress={saveProgress}
>

<Ionicons name="save-outline" size={20} color="#fff"/>

<Text style={styles.saveText}>
Save Module Progress
</Text>

</TouchableOpacity>

</View>

)

}

const styles = StyleSheet.create({

container:{flex:1,backgroundColor:"#F3F4F6"},

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

popupText:{color:"#fff",marginLeft:10,fontWeight:"600"},

schoolCard:{
backgroundColor:"#fff",
margin:20,
padding:18,
borderRadius:16
},

schoolName:{fontSize:20,fontWeight:"700"},

row:{flexDirection:"row",marginTop:6},

schoolInfo:{color:"#6B7280",marginRight:15},

label:{marginLeft:20,marginTop:10,fontWeight:"600"},

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

sectionTitle:{
fontSize:18,
fontWeight:"700",
marginHorizontal:20,
marginBottom:10
},

table:{
backgroundColor:"#fff",
marginHorizontal:20,
borderRadius:16,
overflow:"hidden"
},

tableHeader:{
flexDirection:"row",
padding:12,
backgroundColor:"#F1F5F9"
},

headerText:{
flex:1,
fontSize:12,
fontWeight:"700"
},

rowCard:{
flexDirection:"row",
padding:14,
borderTopWidth:1,
borderColor:"#E5E7EB"
},

col1:{flex:1},
col2:{flex:1},
col3:{flex:1},
col4:{flex:1},

sectionName:{fontWeight:"600"},

updatedTag:{
backgroundColor:"#C7F3D8",
paddingHorizontal:6,
paddingVertical:2,
borderRadius:6,
marginTop:6
},

date:{
color:"#6B7280",
fontSize:12
},

dropdownSmall:{
flexDirection:"row",
alignItems:"center",
borderWidth:1,
borderColor:"#D1D5DB",
paddingHorizontal:8,
paddingVertical:4,
borderRadius:6
},

moduleOptions:{
backgroundColor:"#fff",
padding:6,
borderRadius:6,
elevation:3
},

option:{padding:6},

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

saveText:{color:"#fff",fontWeight:"700",marginLeft:10}

});