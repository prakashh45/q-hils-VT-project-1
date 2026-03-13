import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const BASE_URL =
  "https://rp-backend-60066119139.development.catalystserverless.in";

type QuickItem = {
  icon: string;
  label: string;
  route: any;
};

export default function Dashboard() {

  const router = useRouter();

  const [name, setName] = useState("Resource Person");
  const [schools, setSchools] = useState<any[]>([]);
  const [rpId, setRpId] = useState("");
  const [loading, setLoading] = useState(true);

  /* LOAD DATA WHEN SCREEN OPENS */

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  const loadUser = async () => {

    try {

      const id = await AsyncStorage.getItem("rp_id");
      const storedName = await AsyncStorage.getItem("rp_name");

      if (storedName) {
        setName(storedName);
      }

      if (id) {

        console.log("RP ID:", id);

        setRpId(id);
        loadSchools(id);

      }

    } catch (error) {

      console.log("LOAD USER ERROR:", error);

    }

  };

  /* LOAD SCHOOLS */

  const loadSchools = async (id: string) => {

    try {

      const schoolResponse = await fetch(
        `${BASE_URL}/server/rp_mobile_school/rp/schools?rp_id=${id}`
      );

      const schoolData = await schoolResponse.json();

      console.log("SCHOOLS:", schoolData);

      setSchools(schoolData?.data || []);

    } catch (error) {

      console.log("SCHOOL API ERROR:", error);

    } finally {

      setLoading(false);

    }

  };

  const today = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const quickAccess: QuickItem[] = [
    { icon: "school", label: "Schools", route: "/schools" },
    { icon: "event", label: "Schedule Visit", route: "/schedule" },
    { icon: "payments", label: "Expense", route: "/expense" },
    { icon: "event-busy", label: "Leave", route: "/leave" },
    { icon: "description", label: "Reports", route: "/reports" },
    { icon: "trending-up", label: "Performance", route: "/performance" }
  ];

  return (

    <View style={styles.container}>

      {loading ? (

        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#F97316"/>
        </View>

      ) : (

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* TOP BAR */}

        <View style={styles.topBar}>

          <View style={styles.topLeft}>
            <Text style={styles.dateText}>{today}</Text>
          </View>

          <Ionicons name="notifications" size={22} color="#F97316" />

        </View>

        {/* PROFILE */}

        <View style={styles.profileRow}>

          <View style={styles.avatarBorder}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.avatar}
            />
          </View>

          <View>
            <Text style={styles.hello}>Hello, {name}</Text>
            <Text style={styles.role}>Resource Person</Text>
          </View>

        </View>

        {/* QUICK ACCESS */}

        <Text style={styles.sectionTitle}>QUICK ACCESS</Text>

        <View style={styles.grid}>

          {quickAccess.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickCard}
              onPress={() => router.push(item.route)}
            >
              <MaterialIcons name={item.icon as any} size={28} color="#F97316" />
              <Text style={styles.quickText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

        </View>

        {/* ALERT CARD */}

        <Text style={styles.sectionTitle}>ALERTS & ACTIONS</Text>

        <View style={[styles.alertCard, { borderLeftColor: "#F97316" }]}>

          <View style={[styles.iconBox, { backgroundColor: "#F9731620" }]}>
            <MaterialIcons name="school" size={24} color="#F97316" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>Total Schools Assigned</Text>
            <Text style={styles.alertSub}>Across all zones</Text>
          </View>

          <Text style={[styles.alertCount, { color: "#F97316" }]}>
            {schools.length}
          </Text>

        </View>

      </ScrollView>

      )}

      {/* BOTTOM NAV */}

      <View style={styles.bottomNav}>

        <Ionicons name="home" size={22} color="#F97316" />
        <Ionicons name="business" size={22} color="#9CA3AF" />
        <Ionicons name="wallet" size={22} color="#9CA3AF" />
        <Ionicons name="bar-chart" size={22} color="#9CA3AF" />
        <Ionicons name="person" size={22} color="#9CA3AF" />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

container:{flex:1,backgroundColor:"#F3F4F6"},

loader:{flex:1,justifyContent:"center",alignItems:"center"},

topBar:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
paddingHorizontal:20,
marginTop:40
},

topLeft:{flexDirection:"row",alignItems:"center"},

dateText:{fontSize:12,color:"#6B7280"},

profileRow:{
flexDirection:"row",
alignItems:"center",
paddingHorizontal:20,
marginTop:20,
marginBottom:20
},

avatarBorder:{
borderWidth:3,
borderColor:"#F97316",
borderRadius:40,
padding:2,
marginRight:15
},

avatar:{width:60,height:60,borderRadius:30},

hello:{fontSize:22,fontWeight:"700"},

role:{color:"#6B7280"},

sectionTitle:{
marginLeft:20,
marginBottom:10,
fontWeight:"600",
color:"#6B7280"
},

alertCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
marginHorizontal:20,
padding:15,
borderRadius:16,
marginBottom:15,
borderLeftWidth:4
},

iconBox:{
width:45,
height:45,
borderRadius:12,
justifyContent:"center",
alignItems:"center",
marginRight:15
},

alertTitle:{fontWeight:"600"},

alertSub:{color:"#6B7280",fontSize:12},

alertCount:{fontWeight:"700",fontSize:18},

grid:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"space-between",
paddingHorizontal:20,
marginBottom:25
},

quickCard:{
width:"30%",
backgroundColor:"#fff",
borderRadius:16,
paddingVertical:22,
alignItems:"center",
justifyContent:"center",
marginBottom:15
},

quickText:{
marginTop:8,
fontSize:12,
textAlign:"center"
},

bottomNav:{
position:"absolute",
bottom:0,
left:0,
right:0,
backgroundColor:"#fff",
flexDirection:"row",
justifyContent:"space-around",
paddingVertical:15,
borderTopWidth:1,
borderColor:"#E5E7EB"
}

});