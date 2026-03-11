import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";

export default function VisitForm(){

const router = useRouter();

const [purpose,setPurpose] = useState("Select Purpose");
const [showDropdown,setShowDropdown] = useState(false);

const purposes = [
"Class Observation",
"Adopted Class",
"Enabling Session",
"No Class Observed",
"Impact Survey"
];

return(

<View style={styles.container}>

{/* HEADER */}

<AppHeader
title="Visit Form"
/>

<SchoolBanner/>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:60}}
>

{/* STEP INFO */}

<Text style={styles.stepText}>
STEP 2 OF 6
</Text>


{/* STEP BAR */}

<View style={styles.stepRow}>

<View style={styles.stepDone}/>
<View style={styles.stepActive}/>
<View style={styles.step}/>
<View style={styles.step}/>
<View style={styles.step}/>
<View style={styles.step}/>

</View>


{/* FORM CARD */}

<View style={styles.card}>


{/* VISIT PURPOSE */}

<Text style={styles.label}>
Visit Purpose
</Text>

<TouchableOpacity
style={styles.dropdown}
onPress={()=>setShowDropdown(!showDropdown)}
>

<Text style={styles.dropdownText}>
{purpose}
</Text>

<Ionicons name="chevron-down" size={18} color="#F97316"/>

</TouchableOpacity>


{showDropdown &&(

<View style={styles.dropdownList}>

{purposes.map((item,index)=>(
<TouchableOpacity
key={index}
style={styles.option}
onPress={()=>{
setPurpose(item)
setShowDropdown(false)
}}
>
<Text>{item}</Text>
</TouchableOpacity>
))}

</View>

)}



{/* RESOURCE PERSON */}

<Text style={styles.label}>
Additional Resource Person
</Text>

<View style={styles.dropdown}>

<Text style={styles.placeholder}>
Search and select person...
</Text>

<Ionicons name="chevron-down" size={18} color="#F97316"/>

</View>



{/* REMARKS */}

<View style={styles.remarkHeader}>

<Text style={styles.label}>
Remarks
</Text>

<Text style={styles.mandatory}>
MANDATORY
</Text>

</View>

<TextInput
placeholder="Enter visit details..."
placeholderTextColor="#9CA3AF"
multiline
style={styles.textArea}
/>

<Text style={styles.note}>
Required for selected visit purpose
</Text>


{/* BUTTONS */}

<View style={styles.btnRow}>

<TouchableOpacity style={styles.draftBtn}>
<Text style={styles.draftText}>
Save Draft
</Text>
</TouchableOpacity>

<TouchableOpacity
style={styles.nextBtn}
onPress={()=>router.push("/class-observation")}
>
<Text style={styles.nextText}>
Next Step
</Text>
</TouchableOpacity>

</View>

</View>

<Text style={styles.bottomNote}>
Complete required fields to proceed
</Text>

</ScrollView>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F3F4F6"
},

stepText:{
textAlign:"center",
marginTop:15,
fontSize:12,
color:"#6B7280"
},

stepRow:{
flexDirection:"row",
justifyContent:"center",
marginVertical:10
},

stepDone:{
width:28,
height:6,
backgroundColor:"#F97316",
borderRadius:10,
marginHorizontal:4
},

stepActive:{
width:28,
height:6,
backgroundColor:"#F97316",
borderRadius:10,
marginHorizontal:4
},

step:{
width:28,
height:6,
backgroundColor:"#D1D5DB",
borderRadius:10,
marginHorizontal:4
},

card:{
backgroundColor:"#fff",
margin:20,
padding:20,
borderRadius:16
},

label:{
fontSize:13,
fontWeight:"700",
marginBottom:6,
color:"#374151"
},

dropdown:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
backgroundColor:"#F3F4F6",
padding:16,
borderRadius:12
},

dropdownText:{
color:"#111"
},

dropdownList:{
backgroundColor:"#fff",
borderRadius:10,
marginTop:5,
marginBottom:10,
elevation:3
},

option:{
padding:14,
borderBottomWidth:0.5,
borderColor:"#ddd"
},

placeholder:{
color:"#9CA3AF"
},

remarkHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginTop:15
},

mandatory:{
color:"#EF4444",
fontSize:11,
fontWeight:"700"
},

textArea:{
borderWidth:1,
borderColor:"#EF4444",
borderRadius:12,
padding:16,
height:110,
marginTop:8
},

note:{
marginTop:6,
color:"#6B7280",
fontSize:12
},

btnRow:{
flexDirection:"row",
justifyContent:"space-between",
marginTop:25
},

draftBtn:{
borderWidth:2,
borderColor:"#F97316",
paddingVertical:14,
paddingHorizontal:28,
borderRadius:12
},

draftText:{
color:"#F97316",
fontWeight:"700"
},

nextBtn:{
backgroundColor:"#F97316",
paddingVertical:14,
paddingHorizontal:35,
borderRadius:12
},

nextText:{
color:"#fff",
fontWeight:"700"
},

bottomNote:{
textAlign:"center",
marginTop:10,
color:"#9CA3AF",
fontSize:12
}

});