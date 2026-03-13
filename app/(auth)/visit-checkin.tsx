import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";
import { useVisit } from "../context/VisitContext";

const BASE_URL =
"https://rp-backend-60066119139.development.catalystserverless.in";

export default function VisitCheckin(){

const router = useRouter();
const { currentSchool,setVisitId } = useVisit();

const [rpId,setRpId] = useState("");
const [location,setLocation] = useState<any>(null);
const [accuracy,setAccuracy] = useState<number|null>(null);
const [timestamp,setTimestamp] = useState("");
const [address,setAddress] = useState("");

useEffect(()=>{
loadUser();
getLocation();
},[]);

/* LOAD USER */

const loadUser = async()=>{

const id = await AsyncStorage.getItem("rp_id");

if(id){
setRpId(id);
}

};

/* GET GPS LOCATION */

const getLocation = async()=>{

try{

const {status} =
await Location.requestForegroundPermissionsAsync();

if(status !== "granted"){
alert("Location permission denied");
return;
}

const loc = await Location.getCurrentPositionAsync({
accuracy:Location.Accuracy.High
});

const coords = loc.coords;

const lat = coords.latitude;
const lon = coords.longitude;

setLocation({
latitude:lat,
longitude:lon
});

setAccuracy(coords.accuracy ?? null);

setTimestamp(new Date().toLocaleString());

/* FULL GPS DETAILS LOG */

console.log("GPS LOCATION:",coords);

/* GET ADDRESS */

const geo = await Location.reverseGeocodeAsync({
latitude:lat,
longitude:lon
});

if(geo.length>0){

const g = geo[0];

/* ONLY CITY + STATE */

const locationName = [
g.city,
g.region
].filter(Boolean).join(", ");

setAddress(locationName);

console.log("CURRENT LOCATION NAME:",locationName);

}

}catch(e){

console.log("GPS ERROR:",e);

}

};

/* CHECK ACTIVE VISIT */

const checkActiveVisit = async()=>{

try{

const res = await fetch(
`${BASE_URL}/server/rp_visits/rp/visits/active?rp_id=${rpId}`
);

const data = await res.json();

console.log("ACTIVE VISIT:",data);

return data;

}catch(e){

console.log("ACTIVE VISIT ERROR:",e);
return null;

}

};

/* START VISIT */

const startVisitAPI = async(lat:number,lon:number,addr:string)=>{

try{

const res = await fetch(
`${BASE_URL}/server/rp_visits/rp/visits`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

rp_id:rpId,
school_id:currentSchool?.id,
check_in_lat:lat,
check_in_long:lon,
check_in_address:addr

})
}
);

const data = await res.json();

console.log("VISIT START:",data);

return data;

}catch(e){

console.log("VISIT START ERROR:",e);
return null;

}

};

/* CHECKIN */

const handleCheckin = async()=>{

if(!rpId) return alert("RP ID missing");
if(!currentSchool) return alert("School not selected");

const loc = await Location.getCurrentPositionAsync({
accuracy:Location.Accuracy.High
});

const lat = loc.coords.latitude;
const lon = loc.coords.longitude;

let addr = address;

console.log("CURRENT GPS:",lat,lon);

const active = await checkActiveVisit();

if(active?.success && active?.active_visit){

const visitId = active.active_visit.ROWID;

setVisitId(visitId);

router.push("/visit-form");

return;

}

const visit = await startVisitAPI(lat,lon,addr);

if(visit?.success){

const id = visit?.data?.ROWID || visit?.ROWID;

setVisitId(id);

router.push("/visit-form");

}

};

return(

<View style={styles.container}>

<AppHeader title="Visit Check-in"/>
<SchoolBanner/>

<Text style={styles.stepLabel}>
STEP 1 OF 6
</Text>

<ScrollView contentContainerStyle={{paddingBottom:60}}>

<View style={styles.schoolCard}>

<Text style={styles.schoolName}>
{currentSchool?.name}
</Text>

<Text style={styles.schoolId}>
ID: {currentSchool?.id}
</Text>

</View>

<View style={styles.mapCard}>

{location && (

<Image
style={styles.map}
source={{
uri:
`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=600x300&markers=color:red%7C${location.latitude},${location.longitude}`
}}
/>

)}

<View style={styles.coordinateCard}>

<View>

<Text style={styles.coordTitle}>
CURRENT COORDINATES
</Text>

<Text style={styles.coordValue}>
{location
? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
:"Fetching..."}
</Text>

</View>

<View>

<Text style={styles.coordTitle}>
ACCURACY
</Text>

<Text style={styles.accuracy}>
{accuracy ? `± ${accuracy.toFixed(1)} m` : "--"}
</Text>

</View>

</View>

</View>

{/* CURRENT LOCATION NAME */}

<View style={styles.addressCard}>

<Ionicons name="location-outline" size={20} color="#F97316"/>

<Text style={styles.addressText}>
{address || "Fetching current location..."}
</Text>

</View>

<View style={styles.timeCard}>

<Ionicons name="time-outline" size={24} color="#F97316"/>

<View style={{marginLeft:10}}>

<Text style={styles.timeTitle}>
CHECK-IN TIMESTAMP
</Text>

<Text style={styles.timeText}>
{timestamp || "Fetching..."}
</Text>

</View>

</View>

<TouchableOpacity
style={styles.proceedBtn}
onPress={handleCheckin}
>

<Text style={styles.proceedText}>
Proceed to Visit Form
</Text>

<Ionicons name="arrow-forward" size={18} color="#fff"/>

</TouchableOpacity>

</ScrollView>

</View>

)

}

const styles = StyleSheet.create({

container:{flex:1,backgroundColor:"#F3F4F6"},

stepLabel:{
textAlign:"center",
marginTop:10,
color:"#6B7280"
},

schoolCard:{
alignItems:"center",
marginVertical:15
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
marginHorizontal:20,
borderRadius:16,
overflow:"hidden"
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
padding:10,
borderRadius:10,
flexDirection:"row",
justifyContent:"space-between"
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

addressCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
margin:20,
padding:16,
borderRadius:14
},

addressText:{
marginLeft:10,
fontWeight:"600"
},

timeCard:{
backgroundColor:"#fff",
padding:16,
borderRadius:14,
marginHorizontal:20,
flexDirection:"row",
alignItems:"center"
},

timeTitle:{
fontSize:12,
color:"#6B7280"
},

timeText:{
fontWeight:"700"
},

proceedBtn:{
backgroundColor:"#F97316",
marginHorizontal:20,
marginTop:20,
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
}

});