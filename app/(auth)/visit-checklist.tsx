import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";

export default function VisitChecklist(){

const router = useRouter()

const [items,setItems] = useState([
{icon:"ribbon",title:"Principal Details Verified",verified:false},
{icon:"person",title:"Headmaster Details Verified",verified:false},
{icon:"people",title:"Coordinator Details Verified",verified:false},
{icon:"list",title:"Sections & Strength Verified",verified:false},
{icon:"card",title:"Teacher Assignment Verified",verified:false},
{icon:"eye",title:"Observation Completed",verified:false},
{icon:"image",title:"Media Uploaded",verified:false},
])

const toggleStatus = (index:number)=>{
const updated = [...items]
updated[index].verified = !updated[index].verified
setItems(updated)
}

const allVerified = items.every(item => item.verified)

const finishVisit = ()=>{
if(allVerified){
router.push("/finish-visit")
}else{
Alert.alert("Incomplete Checklist","Please verify all checklist items")
}
}

return(

<View style={styles.container}>

{/* HEADER */}

<AppHeader title="Visit Checklist"/>
<SchoolBanner/>
<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:120}}
>

{/* STEP */}

<Text style={styles.stepLabel}>
STEP 5 OF 6
</Text>

{/* STEP BAR */}

<View style={styles.stepRow}>
<View style={styles.stepDone}/>
<View style={styles.stepDone}/>
<View style={styles.stepDone}/>
<View style={styles.stepDone}/>
<View style={styles.stepActive}/>
<View style={styles.stepIdle}/>
</View>

{/* TITLE */}

<Text style={styles.title}>
Final School Checklist
</Text>

<Text style={styles.subtitle}>
Ensure all tasks are completed before finishing the visit.
</Text>

{/* CHECKLIST ITEMS */}

{items.map((item,index)=>(
<ChecklistItem
key={index}
icon={item.icon}
title={item.title}
verified={item.verified}
onPress={()=>toggleStatus(index)}
/>
))}

{/* FINISH BUTTON */}

<TouchableOpacity
style={[
styles.finishBtn,
!allVerified && styles.finishDisabled
]}
onPress={finishVisit}
>

<Text style={styles.finishText}>
Finish Visit 🔒
</Text>

</TouchableOpacity>

<Text style={styles.bottomNote}>
Complete all red items to finish the visit report.
</Text>

</ScrollView>

</View>

)

}

function ChecklistItem({icon,title,verified,onPress}:any){

return(

<TouchableOpacity
onPress={onPress}
style={[
styles.card,
!verified && styles.errorCard
]}
>

<View style={styles.row}>

<View
style={[
styles.iconBox,
!verified && styles.errorIcon
]}
>

<Ionicons
name={icon}
size={22}
color="#fff"
/>

</View>

<View style={{flex:1}}>

<Text style={styles.cardTitle}>
{title}
</Text>

<Text style={verified ? styles.verifiedText : styles.errorText}>
{verified ? "Verified" : "Tap to Verify"}
</Text>

</View>

<Ionicons
name={verified ? "checkmark-circle" : "alert-circle"}
size={22}
color={verified ? "#22C55E" : "#EF4444"}
/>

</View>

</TouchableOpacity>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F3F4F6"
},

stepLabel:{
textAlign:"center",
marginTop:15,
color:"#F97316",
fontWeight:"600"
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
backgroundColor:"#FB923C",
borderRadius:10,
marginHorizontal:4
},

stepIdle:{
width:28,
height:6,
backgroundColor:"#E5E7EB",
borderRadius:10,
marginHorizontal:4
},

title:{
fontSize:22,
fontWeight:"700",
marginHorizontal:20,
marginTop:10
},

subtitle:{
color:"#6B7280",
marginHorizontal:20,
marginBottom:20
},

card:{
backgroundColor:"#fff",
marginHorizontal:20,
marginBottom:14,
padding:16,
borderRadius:14
},

errorCard:{
backgroundColor:"#FEE2E2"
},

row:{
flexDirection:"row",
alignItems:"center"
},

iconBox:{
width:40,
height:40,
backgroundColor:"#22C55E",
borderRadius:10,
justifyContent:"center",
alignItems:"center",
marginRight:14
},

errorIcon:{
backgroundColor:"#EF4444"
},

cardTitle:{
fontWeight:"600",
fontSize:15
},

errorText:{
color:"#EF4444",
fontSize:12,
marginTop:2
},

verifiedText:{
color:"#16A34A",
fontSize:12,
marginTop:2
},

finishBtn:{
backgroundColor:"#F97316",
marginHorizontal:20,
marginTop:10,
padding:16,
borderRadius:12,
alignItems:"center"
},

finishDisabled:{
backgroundColor:"#CBD5E1"
},

finishText:{
fontWeight:"700",
color:"#fff",
fontSize:16
},

bottomNote:{
textAlign:"center",
color:"#9CA3AF",
fontSize:12,
marginTop:10
}

})