import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useVisit } from "../context/VisitContext";

export default function SchoolBanner(){

const {currentSchool} = useVisit();

if(!currentSchool) return null;

return(

<View style={styles.banner}>

<Ionicons name="school" size={18} color="#F97316"/>

<Text style={styles.name}>
{currentSchool.name}
</Text>

</View>
)}

const styles = StyleSheet.create({

banner:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#FFF7ED",
padding:10,
paddingHorizontal:20
},

name:{
marginLeft:8,
fontWeight:"700",
color:"#F97316"
}

})