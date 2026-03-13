import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";

const BASE_URL =
  "https://rp-backend-60066119139.development.catalystserverless.in";

export default function ObservationSummary(){

type Observation = {
  id: string
  program?: string
  subject?: string
  section?: string
  presence?: string
  students?: string
}

const router = useRouter();

const [observations,setObservations] = useState<Observation[]>([])

const visitId = "1"; // normally comes from visit checkin API


/* ---------------- FETCH OBSERVATIONS ---------------- */

const fetchObservations = async () => {

try{

const res = await fetch(
`${BASE_URL}/server/rp/visits/${visitId}/observations`
);

const data = await res.json();

console.log("OBSERVATIONS:",data);

setObservations(data?.data || []);

}catch(e){

console.log("Observation fetch error",e);

}

};

/* ---------------- DELETE OBSERVATION ---------------- */

const deleteObservation = async (id: string) => {

try{

await fetch(
`${BASE_URL}/server/rp/visits/${visitId}/observations/${id}`,
{
method:"DELETE"
}
);

fetchObservations();

}catch(e){

console.log("Delete error",e);

}

};

useEffect(()=>{
fetchObservations();
},[]);

return(

<View style={styles.container}>

{/* HEADER */}

<AppHeader
title="Observation Summary"
rightIcon="information-circle-outline"
/>

<SchoolBanner/>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:120}}
>

{/* STEP */}

<Text style={styles.stepLabel}>
STEP 4 OF 6
</Text>

{/* STEP BAR */}

<View style={styles.stepRow}>

<View style={styles.stepDone}/>
<View style={styles.stepDone}/>
<View style={styles.stepDone}/>
<View style={styles.stepActive}/>
<View style={styles.stepIdle}/>
<View style={styles.stepIdle}/>

</View>

{/* TITLE */}

<Text style={styles.mainTitle}>
Saved Observations
</Text>

<Text style={styles.sub}>
Review your classroom observations before proceeding.
</Text>

{/* CARDS */}

{observations.map((item,index)=>(
<ObservationCard
key={index}
title={item.program || "Program"}
subject={item.subject || "Subject"}
sec={item.section || "Section"}
presence={`Presence: ${item.presence || "--"}`}
students={item.students || ""}
onDelete={()=>deleteObservation(item.id)}
/>
))}

{/* ADD BUTTON */}

<View style={styles.addWrapper}>

<TouchableOpacity
style={styles.addBtn}
onPress={()=>router.push("/visit-form")}
>

<Ionicons name="add" size={20} color="#fff"/>

<Text style={styles.addBtnText}>
Add Observation
</Text>

</TouchableOpacity>

</View>

</ScrollView>

{/* BOTTOM BUTTON */}

<View style={styles.bottomArea}>

<TouchableOpacity
style={styles.proceedBtn}
onPress={()=>router.push("/visit-checklist")}
>

<Text style={styles.proceedText}>
Proceed to Checklist →
</Text>

</TouchableOpacity>

<Text style={styles.footer}>
NGO FIELD MONITORING TOOL V4.2
</Text>

</View>

</View>

)

}

/* ---------------- CARD ---------------- */

function ObservationCard({
  title,
  subject,
  sec,
  presence,
  students,
  onDelete
}: {
  title: string
  subject: string
  sec: string
  presence: string
  students: string
  onDelete: () => void
}) {

return(

<View style={styles.card}>

<View style={styles.rowBetween}>

<Text style={styles.orange}>
{title}
</Text>

<View style={styles.completed}>
<Text style={styles.completedText}>
COMPLETED
</Text>
</View>

</View>

<Text style={styles.subject}>
{subject}
</Text>

<View style={styles.row}>

<Text style={styles.gray}>
{sec}
</Text>

<Text style={styles.gray}>
{presence}
</Text>

</View>

<View style={styles.divider}/>

<View style={styles.rowBetween}>

<Text style={styles.gray}>
{students}
</Text>

<View style={styles.row}>

<TouchableOpacity style={styles.iconRow}>

<Ionicons name="create-outline" size={18} color="#F97316"/>

<Text style={styles.edit}>
Edit
</Text>

</TouchableOpacity>

<TouchableOpacity
style={styles.iconRow}
onPress={onDelete}
>

<Ionicons name="trash-outline" size={18} color="#EF4444"/>

<Text style={styles.delete}>
Delete
</Text>

</TouchableOpacity>

</View>

</View>

</View>

)

}

const styles = StyleSheet.create({
container:{flex:1,backgroundColor:"#F3F4F6"},
stepLabel:{textAlign:"center",marginTop:15,color:"#F97316",fontWeight:"600"},
stepRow:{flexDirection:"row",justifyContent:"center",marginVertical:10},
stepDone:{width:28,height:6,backgroundColor:"#F97316",borderRadius:10,marginHorizontal:4},
stepActive:{width:28,height:6,backgroundColor:"#FB923C",borderRadius:10,marginHorizontal:4},
stepIdle:{width:28,height:6,backgroundColor:"#E5E7EB",borderRadius:10,marginHorizontal:4},
mainTitle:{fontSize:22,fontWeight:"700",marginHorizontal:20},
sub:{color:"#6B7280",marginHorizontal:20,marginBottom:20},
card:{backgroundColor:"#fff",marginHorizontal:20,padding:18,borderRadius:16,marginBottom:18},
row:{flexDirection:"row",justifyContent:"space-between",marginTop:6},
rowBetween:{flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
orange:{color:"#F97316",fontWeight:"700"},
subject:{fontSize:18,fontWeight:"700",marginTop:6},
gray:{color:"#6B7280"},
divider:{height:1,backgroundColor:"#E5E7EB",marginVertical:10},
completed:{backgroundColor:"#DCFCE7",paddingHorizontal:10,paddingVertical:4,borderRadius:12},
completedText:{color:"#16A34A",fontWeight:"600",fontSize:12},
iconRow:{flexDirection:"row",alignItems:"center",marginLeft:12},
edit:{color:"#F97316",marginLeft:4},
delete:{color:"#EF4444",marginLeft:4},
addWrapper:{alignItems:"center",marginVertical:20},
addBtn:{flexDirection:"row",alignItems:"center",backgroundColor:"#F97316",paddingVertical:10,paddingHorizontal:22,borderRadius:25},
addBtnText:{color:"#fff",fontWeight:"700",marginLeft:6},
bottomArea:{position:"absolute",bottom:0,left:0,right:0,backgroundColor:"#fff",padding:20,borderTopWidth:1,borderColor:"#E5E7EB"},
proceedBtn:{backgroundColor:"#F97316",padding:16,borderRadius:14,alignItems:"center"},
proceedText:{color:"#fff",fontWeight:"700",fontSize:16},
footer:{textAlign:"center",marginTop:10,color:"#9CA3AF"}
});