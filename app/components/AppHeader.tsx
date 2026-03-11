import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
title: string
subtitle?: string
rightIcon?: any
rightText?: string
onRightPress?: () => void
}

export default function AppHeader({
title,
subtitle,
rightIcon,
rightText,
onRightPress
}: Props){

const router = useRouter()

return(

<View style={styles.header}>

<TouchableOpacity onPress={()=>router.back()}>
<Ionicons name="arrow-back" size={24}/>
</TouchableOpacity>

<View style={{alignItems:"center"}}>
<Text style={styles.title}>{title}</Text>

{subtitle && (
<Text style={styles.subtitle}>{subtitle}</Text>
)}
</View>

{rightIcon ? (

<TouchableOpacity onPress={onRightPress}>
<Ionicons name={rightIcon} size={22} color="#F97316"/>
</TouchableOpacity>

) : rightText ? (

<TouchableOpacity onPress={onRightPress}>
<Text style={styles.rightText}>{rightText}</Text>
</TouchableOpacity>

) : (
<View style={{width:30}}/>
)}

</View>

)

}

const styles = StyleSheet.create({

header:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
padding:20,
backgroundColor:"#fff"
},

title:{
fontSize:18,
fontWeight:"700"
},

subtitle:{
fontSize:12,
color:"#6B7280"
},

rightText:{
color:"#F97316",
fontWeight:"600"
}

})