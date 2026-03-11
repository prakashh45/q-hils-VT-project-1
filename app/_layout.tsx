import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { VisitProvider } from "./context/VisitContext";

export default function RootLayout() {

const [hasPermission,setHasPermission] = useState<boolean | null>(null);
const [attempts,setAttempts] = useState(0);

const requestPermissions = async()=>{

const camera = await Camera.requestCameraPermissionsAsync();
const location = await Location.requestForegroundPermissionsAsync();

if(camera.status==="granted" && location.status==="granted"){
setHasPermission(true);
}else{
setHasPermission(false);
setAttempts(prev => prev + 1);
}

};

useEffect(()=>{
requestPermissions();
},[]);


/* PERMISSION DENIED SCREEN */

if(hasPermission===false){

return(

<SafeAreaProvider>

<SafeAreaView style={styles.container}>

<Text style={styles.title}>
Permission Required
</Text>

<Text style={styles.text}>
Camera and Location permission is required to use this app.
</Text>

{/* FIRST TWO ATTEMPTS */}

{attempts < 2 ? (

<TouchableOpacity
style={styles.button}
onPress={requestPermissions}
>

<Text style={styles.buttonText}>
Allow Permission
</Text>

</TouchableOpacity>

) : (

<>

<Text style={styles.warning}>
Permission denied multiple times. Please enable it from Settings.
</Text>

<TouchableOpacity
style={styles.settingsButton}
onPress={()=>Linking.openSettings()}
>

<Text style={styles.buttonText}>
Open Settings
</Text>

</TouchableOpacity>

</>

)}

</SafeAreaView>

</SafeAreaProvider>

);

}


/* LOADING STATE */

if(hasPermission===null){
return null;
}


/* APP START */

return(

<SafeAreaProvider>

<SafeAreaView style={styles.safeContainer}>

<VisitProvider>

<Stack screenOptions={{headerShown:false}}/>

</VisitProvider>

</SafeAreaView>

</SafeAreaProvider>

);

}


const styles = StyleSheet.create({

safeContainer:{
flex:1,
backgroundColor:"#F3F4F6"
},

container:{
flex:1,
justifyContent:"center",
alignItems:"center",
padding:25
},

title:{
fontSize:22,
fontWeight:"600",
marginBottom:10
},

text:{
fontSize:16,
textAlign:"center",
marginBottom:25
},

button:{
backgroundColor:"#007AFF",
paddingVertical:12,
paddingHorizontal:30,
borderRadius:8
},

settingsButton:{
backgroundColor:"#FF3B30",
paddingVertical:12,
paddingHorizontal:30,
borderRadius:8,
marginTop:15
},

buttonText:{
color:"#fff",
fontSize:16,
fontWeight:"600"
},

warning:{
marginTop:15,
marginBottom:15,
fontSize:15,
color:"red",
textAlign:"center"
}

});