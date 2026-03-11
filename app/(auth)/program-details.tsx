import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

export default function ProgramDetails() {

const router = useRouter();
const [editMode,setEditMode] = useState(false);

const [headmasterName,setHeadmasterName] = useState("Dr. Ramesh Sharma");
const [headmasterPhone,setHeadmasterPhone] = useState("+91 98765 43210");
const [headmasterEmail,setHeadmasterEmail] = useState("r.sharma@school.edu");

const [coordName,setCoordName] = useState("Ms. Ananya Iyer");
const [coordPhone,setCoordPhone] = useState("+91 88776 65544");
const [coordEmail,setCoordEmail] = useState("ananya.i@school.edu");

return(

<View style={styles.container}>

{/* HEADER */}

<AppHeader
title="Program Details"
subtitle="ACP · 2023-24"
rightText={editMode ? "Preview" : "Edit"}
onRightPress={()=>setEditMode(!editMode)}
/>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:40}}
>

{/* HEADMASTER */}

<Section title="Headmaster Details" icon="person"/>

<Card>

<InputField
label="NAME"
value={headmasterName}
onChange={setHeadmasterName}
editable={editMode}
/>

<InputField
label="PHONE"
value={headmasterPhone}
onChange={setHeadmasterPhone}
editable={editMode}
/>

<InputField
label="EMAIL"
value={headmasterEmail}
onChange={setHeadmasterEmail}
editable={editMode}
/>

</Card>


{/* COORDINATOR */}

<Section title="Coordinator Details" icon="person-outline"/>

<Card>

<InputField
label="NAME"
value={coordName}
onChange={setCoordName}
editable={editMode}
/>

<InputField
label="PHONE"
value={coordPhone}
onChange={setCoordPhone}
editable={editMode}
/>

<InputField
label="EMAIL"
value={coordEmail}
onChange={setCoordEmail}
editable={editMode}
/>

</Card>


{/* SAVE BUTTON */}

<TouchableOpacity style={styles.saveBtn}>

<Ionicons name="save-outline" size={20} color="#fff"/>

<Text style={styles.saveText}>
Save Changes
</Text>

</TouchableOpacity>


{/* CLASS LIST */}

<View style={styles.classHeader}>

<Text style={styles.classTitle}>
Class List
</Text>

<View style={styles.badge}>
<Text style={styles.badgeText}>
3 Classes
</Text>
</View>

</View>


<ClassCard
number="1"
title="Year 1"
onPress={()=>router.push("/sections-management")}
/>

<ClassCard number="2" title="Year 2"/>

<ClassCard number="3" title="Year 3"/>

</ScrollView>

</View>

);
}



function Section({title,icon}:any){

return(

<View style={styles.sectionRow}>

<MaterialIcons name={icon} size={22} color="#F97316"/>

<Text style={styles.section}>
{title}
</Text>

</View>

)

}



function Card({children}:any){

return(

<View style={styles.card}>
{children}
</View>

)

}



function InputField({label,value,onChange,editable}:any){

return(

<View style={{marginBottom:15}}>

<Text style={styles.label}>
{label}
</Text>

<TextInput
style={styles.input}
value={value}
editable={editable}
onChangeText={onChange}
/>

</View>

)

}



function ClassCard({number,title,onPress}:any){

return(

<TouchableOpacity
style={styles.classCard}
onPress={onPress}
>

<View style={styles.classNumber}>

<Text style={styles.classNumText}>
{number}
</Text>

</View>

<View style={{flex:1}}>

<Text style={styles.className}>
{title}
</Text>

<Text style={styles.classYear}>
Academic Year 2023-24
</Text>

</View>

<Ionicons name="chevron-forward" size={20} color="#9CA3AF"/>

</TouchableOpacity>

)

}



const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F3F4F6"
},

sectionRow:{
flexDirection:"row",
alignItems:"center",
marginHorizontal:20,
marginTop:20
},

section:{
fontSize:18,
fontWeight:"700",
marginLeft:8
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
marginTop:10,
padding:16,
borderRadius:16,
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:10,
elevation:2
},

label:{
fontSize:12,
color:"#6B7280",
marginBottom:6
},

input:{
backgroundColor:"#F3F4F6",
padding:12,
borderRadius:10
},

saveBtn:{
backgroundColor:"#F97316",
margin:20,
padding:16,
borderRadius:14,
flexDirection:"row",
justifyContent:"center",
alignItems:"center"
},

saveText:{
color:"#fff",
fontWeight:"700",
marginLeft:8
},

classHeader:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginHorizontal:20,
marginTop:10
},

classTitle:{
fontSize:18,
fontWeight:"700"
},

badge:{
backgroundColor:"#E5E7EB",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:20
},

badgeText:{
fontSize:12,
color:"#374151"
},

classCard:{
backgroundColor:"#fff",
marginHorizontal:20,
marginTop:15,
padding:16,
borderRadius:16,
flexDirection:"row",
alignItems:"center",
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:10,
elevation:2
},

classNumber:{
width:40,
height:40,
borderRadius:10,
backgroundColor:"#FDE7D8",
justifyContent:"center",
alignItems:"center",
marginRight:12
},

classNumText:{
color:"#F97316",
fontWeight:"700"
},

className:{
fontWeight:"700"
},

classYear:{
color:"#6B7280",
fontSize:12
}

});