import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import AppHeader from "../components/AppHeader";
import { useVisit } from "../context/VisitContext";

const BASE_URL =
  "https://rp-backend-60066119139.development.catalystserverless.in";

/* ---------------- TYPES ---------------- */

interface School {
  school_id: string
  school_name: string
  address?: string
  zone?: string
  school_type?: string
  status?: string
}

/* ---------------- COMPONENT ---------------- */

export default function Schools() {

  const router = useRouter();
  const { setCurrentSchool } = useVisit();

  const [rpId, setRpId] = useState("");

  const [schools, setSchools] = useState<School[]>([]);
  const [filtered, setFiltered] = useState<School[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  /* ---------------- LOAD USER ---------------- */

  const loadUser = async () => {

    try {

      const id = await AsyncStorage.getItem("rp_id");

      if (id) {

        setRpId(id);
        loadSchools(id);

      }

    } catch (e) {

      console.log("LOAD USER ERROR:", e);

    }

  };

  useEffect(() => {
    loadUser();
  }, []);

  /* ---------------- FETCH SCHOOLS ---------------- */

  const fetchSchools = async (id: string): Promise<School[]> => {

    try {

      const res = await fetch(
        `${BASE_URL}/server/rp_mobile_school/rp/schools?rp_id=${id}`
      );

      const json = await res.json();

      console.log("SCHOOLS:", json);

      if (Array.isArray(json.data)) return json.data;

      return [];

    } catch (error) {

      console.log("SCHOOL API ERROR:", error);
      return [];

    }

  };

  /* ---------------- LOAD SCHOOLS ---------------- */

  const loadSchools = async (id: string, spinner = true) => {

    if (spinner) setLoading(true);

    try {

      const data = await fetchSchools(id);

      setSchools(data);
      setFiltered(data);

    } catch (e) {

      console.log("LOAD SCHOOL ERROR:", e);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  };

  /* ---------------- SEARCH + FILTER ---------------- */

  useEffect(() => {

    let result = [...schools];

    if (search.trim()) {

      const q = search.toLowerCase();

      result = result.filter(
        (s) =>
          s.school_name?.toLowerCase().includes(q) ||
          String(s.school_id).includes(q)
      );

    }

    if (activeZone) result = result.filter((s) => s.zone === activeZone);
    if (activeType) result = result.filter((s) => s.school_type === activeType);
    if (activeStatus) result = result.filter((s) => s.status === activeStatus);

    setFiltered(result);

  }, [search, schools, activeZone, activeType, activeStatus]);

  /* ---------------- FILTER OPTIONS ---------------- */

  const zones = [...new Set(schools.map(s => s.zone).filter(Boolean))] as string[];
  const types = [...new Set(schools.map(s => s.school_type).filter(Boolean))] as string[];
  const statuses = [...new Set(schools.map(s => s.status).filter(Boolean))] as string[];

  const cycleFilter = (
    options: string[],
    current: string | null,
    setter: (v: string | null) => void
  ) => {

    if (!options.length) return;

    if (!current) setter(options[0]);
    else {

      const idx = options.indexOf(current);
      setter(idx + 1 < options.length ? options[idx + 1] : null);

    }

  };

  /* ---------------- UI ---------------- */

  return (

    <View style={styles.container}>

      <AppHeader title="School Master" />

      {/* SEARCH */}

      <View style={styles.searchBox}>

        <Ionicons name="search" size={20} color="#F97316" />

        <TextInput
          placeholder="Search schools"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

      </View>

      {/* FILTERS */}

      <View style={styles.filterRow}>

        <FilterButton
          label={activeZone ?? "Zone"}
          active={!!activeZone}
          onPress={() => cycleFilter(zones, activeZone, setActiveZone)}
        />

        <FilterButton
          label={activeType ?? "Type"}
          active={!!activeType}
          onPress={() => cycleFilter(types, activeType, setActiveType)}
        />

        <FilterButton
          label={activeStatus ?? "Status"}
          active={!!activeStatus}
          onPress={() => cycleFilter(statuses, activeStatus, setActiveStatus)}
        />

      </View>

      {/* CONTENT */}

      {loading ? (

        <View style={styles.center}>
          <ActivityIndicator size="large" color="#F97316" />
        </View>

      ) : (

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadSchools(rpId, false);
              }}
            />
          }
        >

          {filtered.length === 0 ? (

            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No Schools Found</Text>
            </View>

          ) : (

            filtered.map((school) => (

              <SchoolCard
                key={school.school_id}
                school={school}
                router={router}
                setCurrentSchool={setCurrentSchool}
              />

            ))

          )}

        </ScrollView>

      )}

    </View>

  );

}

/* ---------------- SCHOOL CARD ---------------- */

function SchoolCard({ school, router, setCurrentSchool }: any) {

  return (

    <View style={styles.card}>

      <Text style={styles.schoolId}>
        ID: #{school.school_id}
      </Text>

      <Text style={styles.schoolName}>
        {school.school_name}
      </Text>

      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {

          setCurrentSchool({
            id: school.school_id,
            name: school.school_name
          });

          router.push("/visit-checkin");

        }}
      >

        <Ionicons name="play" size={18} color="#fff"/>

        <Text style={styles.startText}>
          Start Visit
        </Text>

      </TouchableOpacity>

    </View>

  );

}

/* ---------------- FILTER BUTTON ---------------- */

function FilterButton({ label, active, onPress }: any) {

  return (

    <TouchableOpacity
      style={[styles.filterBtn, active && styles.filterBtnActive]}
      onPress={onPress}
    >

      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>

    </TouchableOpacity>

  );

}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({

container:{flex:1,backgroundColor:"#F3F4F6"},

searchBox:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
margin:20,
padding:12,
borderRadius:12
},

searchInput:{flex:1,marginLeft:10},

filterRow:{
flexDirection:"row",
justifyContent:"space-around",
marginBottom:10
},

filterBtn:{
backgroundColor:"#FFEAD5",
padding:10,
borderRadius:10
},

filterBtnActive:{backgroundColor:"#F97316"},

filterText:{color:"#F97316"},

filterTextActive:{color:"#fff"},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

emptyBox:{
alignItems:"center",
marginTop:60
},

emptyText:{
color:"#6B7280"
},

card:{
backgroundColor:"#fff",
margin:20,
padding:20,
borderRadius:16
},

schoolId:{color:"#6B7280"},

schoolName:{
fontSize:18,
fontWeight:"700",
marginVertical:5
},

startBtn:{
marginTop:10,
backgroundColor:"#F97316",
padding:12,
borderRadius:10,
alignItems:"center",
flexDirection:"row",
justifyContent:"center"
},

startText:{color:"#fff",marginLeft:6}

});