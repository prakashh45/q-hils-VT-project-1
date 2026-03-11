import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppHeader from "../components/AppHeader";
import { useVisit } from "../context/VisitContext";

export default function VisitSchedule() {

const router = useRouter();
const { visits } = useVisit();

return (

<View style={styles.container}>

{/* HEADER */}

<AppHeader
title="Visit Schedule"
rightIcon="add"
onRightPress={()=>router.push("/addVisit")}
/>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:120}}
>

{/* FILTERS */}

<View style={styles.filterBox}>

<View style={styles.filterRow}>
<Text style={styles.filter}>📅 Date Range</Text>
<Text style={styles.filter}>🏫 School</Text>
<Text style={styles.filter}>📊 Status</Text>
</View>

</View>


{/* UPCOMING VISITS */}

<Text style={styles.sectionTitle}>
Upcoming Visits
</Text>

{visits.map((v:any,index:number)=>(

<View key={index} style={styles.visitCard}>

<Text style={styles.id}>
ID: RP-10{index}
</Text>

<Text style={styles.schoolTitle}>
{v.school}
</Text>

<Text style={styles.info}>
📅 {v.date} • {v.time}
</Text>

<Text style={styles.info}>
📍 {v.district}
</Text>

<TouchableOpacity style={styles.detailBtn}>
<Text style={styles.detailText}>
View Details →
</Text>
</TouchableOpacity>

</View>

))}


{/* TABLE */}

<Text style={styles.sectionTitle}>
All Scheduled Visits
</Text>

<View style={styles.table}>

<View style={styles.tableHeader}>

<View style={styles.col1}>
<Text style={styles.th}>DATE & TIME</Text>
</View>

<View style={styles.col2}>
<Text style={styles.th}>SCHOOL NAME</Text>
</View>

<View style={styles.col3}>
<Text style={styles.th}>DISTRICT</Text>
</View>

</View>


{visits.map((v:any,index:number)=>(

<View key={index} style={styles.row}>

<View style={styles.col1}>
<Text style={styles.date}>{v.date}</Text>
<Text style={styles.time}>{v.time}</Text>
</View>

<View style={styles.col2}>
<Text style={styles.school}>{v.school}</Text>
</View>

<View style={styles.col3}>
<Text style={styles.district}>{v.district}</Text>
</View>

</View>

))}


{/* PAGINATION */}

<View style={styles.pagination}>

<Text style={styles.pageText}>
Showing {visits.length} of 24 visits
</Text>

<View style={styles.pageBtns}>

<TouchableOpacity style={styles.pageBtn}>
<Ionicons name="chevron-back"/>
</TouchableOpacity>

<TouchableOpacity style={styles.pageBtn}>
<Ionicons name="chevron-forward"/>
</TouchableOpacity>

</View>

</View>

</View>

</ScrollView>

</View>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#F3F4F6"
},

filterBox:{
backgroundColor:"#fff",
marginHorizontal:15,
padding:15,
borderRadius:12,
marginTop:10
},

filterRow:{
flexDirection:"row",
justifyContent:"space-between"
},

filter:{
backgroundColor:"#F3F4F6",
padding:8,
borderRadius:8
},

sectionTitle:{
marginLeft:15,
marginTop:20,
fontWeight:"700",
fontSize:16
},

visitCard:{
backgroundColor:"#fff",
marginHorizontal:15,
marginTop:12,
padding:15,
borderRadius:12,
borderLeftWidth:4,
borderLeftColor:"#3B82F6"
},

id:{
color:"#F97316",
fontSize:12
},

schoolTitle:{
fontWeight:"700",
fontSize:16,
marginTop:2
},

info:{
color:"#6B7280",
marginTop:4
},

detailBtn:{
backgroundColor:"#EEF2F7",
padding:10,
borderRadius:10,
marginTop:10
},

detailText:{
textAlign:"center"
},

table:{
backgroundColor:"#fff",
margin:15,
borderRadius:12,
overflow:"hidden"
},

tableHeader:{
flexDirection:"row",
padding:15,
backgroundColor:"#F8FAFC"
},

row:{
flexDirection:"row",
padding:15,
borderTopWidth:1,
borderColor:"#EEF2F7"
},

col1:{
flex:1.2
},

col2:{
flex:1.5
},

col3:{
flex:1
},

th:{
fontSize:12,
color:"#64748B",
fontWeight:"600"
},

date:{
fontSize:13
},

time:{
fontSize:12,
color:"#6B7280"
},

school:{
fontWeight:"600"
},

district:{
color:"#6B7280"
},

pagination:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
padding:15
},

pageText:{
color:"#6B7280",
fontSize:12
},

pageBtns:{
flexDirection:"row"
},

pageBtn:{
backgroundColor:"#F1F5F9",
padding:8,
borderRadius:8,
marginLeft:10
}

});