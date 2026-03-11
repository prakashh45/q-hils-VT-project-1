import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { startVisit } from "../../services/visitService";
import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";
import { useVisit } from "../context/VisitContext";

export default function VisitCheckin(){

const router = useRouter();
const { currentSchool } = useVisit();

const [location,setLocation] = useState<{
latitude:number
longitude:number
}|null>(null)

const [accuracy,setAccuracy] = useState<number|null>(null)
const [timestamp,setTimestamp] = useState("")

const getLocation = async()=>{

try{

const {status} = await Location.requestForegroundPermissionsAsync()

if(status!=="granted"){
alert("Location permission denied")
return
}

const loc = await Location.getCurrentPositionAsync({
accuracy:Location.Accuracy.High
})

setLocation({
latitude:loc.coords.latitude,
longitude:loc.coords.longitude
})

setAccuracy(loc.coords.accuracy ?? null)

const now = new Date()
setTimestamp(now.toLocaleString())

}catch(e){
alert("Unable to fetch GPS")
}

}

useEffect(()=>{
getLocation()
},[])


/* CHECK-IN API */

const handleCheckin = async()=>{

try{

if(!location){
alert("Location not available")
return
}

await startVisit(
currentSchool?.id,
location.latitude,
location.longitude
)

router.push("/visit-form")

}catch(e){

console.log("Checkin error",e)
alert("Unable to start visit")

}

}


return(

<View style={styles.container}>

{/* HEADER */}

<AppHeader title="Visit Check-in"/>
<SchoolBanner/>

<Text style={styles.stepLabel}>
STEP 1 OF 6
</Text>

<ScrollView
showsVerticalScrollIndicator={false}
contentContainerStyle={{paddingBottom:60}}
>

{/* STEP BAR */}

<View style={styles.stepRow}>

<View style={styles.stepActive}/>
<View style={styles.step}/>
<View style={styles.step}/>
<View style={styles.step}/>
<View style={styles.step}/>
<View style={styles.step}/>

</View>

{/* SCHOOL CARD */}

<View style={styles.schoolCard}>

<Text style={styles.schoolName}>
{currentSchool?.name}
</Text>

<Text style={styles.schoolId}>
ID: {currentSchool?.id}
</Text>

</View>

{/* MAP CARD */}

<View style={styles.mapCard}>

<Image
style={styles.map}
source={{
uri: location
? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=600x300&markers=color:red%7C${location.latitude},${location.longitude}`
: "https://maps.googleapis.com/maps/api/staticmap?center=0,0&zoom=1&size=600x300"
}}
/>

<View style={styles.coordinateCard}>

<View>
<Text style={styles.coordTitle}>
Coordinates
</Text>

<Text style={styles.coordValue}>
{location
? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
: "Fetching GPS..."
}
</Text>
</View>

<View>
<Text style={styles.coordTitle}>
Accuracy
</Text>

<Text style={styles.accuracy}>
{accuracy ? `± ${accuracy.toFixed(1)} m` : "--"}
</Text>
</View>

</View>

<View style={styles.gpsBanner}>

<Ionicons name="checkmark-circle" size={18} color="#fff"/>

<Text style={styles.gpsText}>
GPS LOCATION CAPTURED
</Text>

</View>

</View>

{/* TIME CARD */}

<View style={styles.timeCard}>

<Ionicons name="time-outline" size={24} color="#F97316"/>

<View style={{marginLeft:12}}>
<Text style={styles.timeTitle}>
Check-in Timestamp
</Text>

<Text style={styles.timeText}>
{timestamp || "Fetching..."}
</Text>
</View>

</View>

{/* PROCEED BUTTON */}

<TouchableOpacity
style={styles.proceedBtn}
onPress={handleCheckin}
>

<Text style={styles.proceedText}>
Proceed to Visit Form
</Text>

<Ionicons name="arrow-forward" size={18} color="#fff"/>

</TouchableOpacity>

{/* RECALIBRATE */}

<TouchableOpacity
onPress={getLocation}
style={{marginTop:12}}
>
<Text style={styles.recalibrate}>
Recalibrate GPS
</Text>
</TouchableOpacity>

</ScrollView>

</View>

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
fontSize:12,
color:"#6B7280"
},

stepRow:{
flexDirection:"row",
justifyContent:"center",
marginVertical:10
},

stepActive:{
height:6,
width:45,
backgroundColor:"#F97316",
borderRadius:6,
marginRight:6
},

step:{
height:6,
width:22,
backgroundColor:"#FCD9C6",
borderRadius:6,
marginRight:6
},

schoolCard:{
alignItems:"center",
marginVertical:10
},

schoolName:{
fontSize:22,
fontWeight:"700"
},

schoolId:{
color:"#6B7280",
marginTop:4
},

mapCard:{
backgroundColor:"#fff",
borderRadius:16,
overflow:"hidden",
marginTop:15,
marginHorizontal:20
},

map:{
height:200,
width:"100%"
},

coordinateCard:{
position:"absolute",
top:10,
left:10,
right:10,
backgroundColor:"#fff",
padding:12,
borderRadius:10,
flexDirection:"row",
justifyContent:"space-between",
elevation:3
},

coordTitle:{
fontSize:11,
color:"#6B7280"
},

coordValue:{
fontWeight:"700"
},

accuracy:{
fontWeight:"700",
color:"#16A34A"
},

gpsBanner:{
backgroundColor:"#22C55E",
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
padding:12
},

gpsText:{
color:"#fff",
fontWeight:"700",
marginLeft:6
},

timeCard:{
backgroundColor:"#fff",
padding:18,
borderRadius:16,
margin:20,
flexDirection:"row",
alignItems:"center"
},

timeTitle:{
fontSize:12,
color:"#6B7280"
},

timeText:{
fontSize:16,
fontWeight:"700"
},

proceedBtn:{
backgroundColor:"#F97316",
marginHorizontal:20,
marginTop:10,
padding:16,
borderRadius:16,
flexDirection:"row",
justifyContent:"center",
alignItems:"center"
},

proceedText:{
color:"#fff",
fontWeight:"700",
marginRight:6
},

recalibrate:{
textAlign:"center",
color:"#6B7280"
}

})