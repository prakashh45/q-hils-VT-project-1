import { Ionicons } from "@expo/vector-icons";
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

// ─── Config ───────────────────────────────────────────────────────────────────
const BASE_URL =
  "https://rp-backend-60066119139.development.catalystserverless.in";

// ─── Types ────────────────────────────────────────────────────────────────────
interface School {
  id: string;
  ROWID?: string;
  school_name: string;
  address?: string;
  last_visited?: string;
  zone?: string;
  school_type?: string;
  status?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function fetchSchools(rpId: string) {

  const res = await fetch(
    "/server/rp_mobile_school/rp/schools",
    {
      headers:{
        "Content-Type":"application/json",
        rp_id: rpId
      }
    }
  );

  const json = await res.json();

  console.log("SCHOOLS:",json);

  return json?.data || [];

}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Schools() {
  const router = useRouter();
  const { setCurrentSchool, rpId } = useVisit(); // rpId must be stored in VisitContext after login

  const [schools, setSchools] = useState<School[]>([]);
  const [filtered, setFiltered] = useState<School[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active filter values
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  // ── Load data ────────────────────────────────────────────────────────────
  const loadSchools = async (showSpinner = true) => {
    if (!rpId) {
      setError("No RP ID found. Please login again.");
      setLoading(false);
      return;
    }
    if (showSpinner) setLoading(true);
    setError(null);
    try {
      const data = await fetchSchools(rpId);
      setSchools(data);
      setFiltered(data);
    } catch (err: any) {
      setError(err.message ?? "Failed to load schools.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSchools();
  }, [rpId]);

  // ── Search & filter ──────────────────────────────────────────────────────
  useEffect(() => {
    let result = [...schools];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.school_name?.toLowerCase().includes(q) ||
          String(s.id ?? s.ROWID ?? "").includes(q)
      );
    }
    if (activeZone) result = result.filter((s) => s.zone === activeZone);
    if (activeType) result = result.filter((s) => s.school_type === activeType);
    if (activeStatus) result = result.filter((s) => s.status === activeStatus);

    setFiltered(result);
  }, [search, schools, activeZone, activeType, activeStatus]);

  // ── Derived filter options ───────────────────────────────────────────────
  const zones = [...new Set(schools.map((s) => s.zone).filter(Boolean))];
  const types = [...new Set(schools.map((s) => s.school_type).filter(Boolean))];
  const statuses = [...new Set(schools.map((s) => s.status).filter(Boolean))];

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

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <AppHeader title="School Master" />

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#F97316" />
        <TextInput
          placeholder="Search schools by name or ID"
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* FILTERS */}
      <View style={styles.filterRow}>
        <FilterButton
          label={activeZone ?? "Zone"}
          active={!!activeZone}
          onPress={() => cycleFilter(zones as string[], activeZone, setActiveZone)}
        />
        <FilterButton
          label={activeType ?? "School Type"}
          active={!!activeType}
          onPress={() => cycleFilter(types as string[], activeType, setActiveType)}
        />
        <FilterButton
          label={activeStatus ?? "Status"}
          active={!!activeStatus}
          onPress={() =>
            cycleFilter(statuses as string[], activeStatus, setActiveStatus)
          }
        />
      </View>

      {/* CONTENT */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#F97316" />
          <Text style={styles.loadingText}>Loading schools…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Ionicons name="cloud-offline-outline" size={48} color="#F97316" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => loadSchools()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                loadSchools(false);
              }}
              colors={["#F97316"]}
              tintColor="#F97316"
            />
          }
        >
          {filtered.length === 0 ? (
            <View style={styles.center}>
              <Ionicons name="school-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>No schools found</Text>
            </View>
          ) : (
            filtered.map((school) => (
              <SchoolCard
                key={school.ROWID ?? school.id}
                school={school}
                router={router}
                setCurrentSchool={setCurrentSchool}
              />
            ))
          )}
        </ScrollView>
      )}

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavItem icon="school" label="SCHOOLS" active />


      </View>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.filterBtn, active && styles.filterBtnActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, active && styles.filterTextActive]}>
        {label}
      </Text>
      <Ionicons
        name={active ? "close-circle" : "chevron-down"}
        size={16}
        color={active ? "#fff" : "#F97316"}
      />
    </TouchableOpacity>
  );
}

function SchoolCard({
  school,
  router,
  setCurrentSchool,
}: {
  school: School;
  router: any;
  setCurrentSchool: any;
}) {
  const schoolId = school.ROWID ?? school.id;
  const lastVisited = school.last_visited
    ? new Date(school.last_visited).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "N/A";

  return (
    <View style={styles.card}>
      <Text style={styles.schoolId}>ID: #{schoolId}</Text>
      <Text style={styles.schoolName}>{school.school_name}</Text>

      {school.address && (
        <View style={styles.row}>
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text style={styles.subText}>{school.address}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={16} color="#6B7280" />
        <Text style={styles.subText}>Last Visited: {lastVisited}</Text>
      </View>

      {(school.zone || school.school_type) && (
        <View style={styles.tagRow}>
          {school.zone && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{school.zone}</Text>
            </View>
          )}
          {school.school_type && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{school.school_type}</Text>
            </View>
          )}
          {school.status && (
            <View
              style={[
                styles.tag,
                school.status === "ACTIVE" ? styles.tagActive : styles.tagInactive,
              ]}
            >
              <Text style={styles.tagText}>{school.status}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            setCurrentSchool({ id: schoolId, name: school.school_name, address: school.address });
            router.push("/school-details");
          }}
        >
          <Ionicons name="information-circle-outline" size={20} color="#F97316" />
          <Text style={styles.actionText}>DETAILS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => {
            setCurrentSchool({ id: schoolId, name: school.school_name, address: school.address });
            router.push("/module-progress");
          }}
        >
          <Ionicons name="bar-chart-outline" size={20} color="#F97316" />
          <Text style={styles.actionText}>PROGRESS</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.startBtn}
        onPress={() => {
          setCurrentSchool({
            id: schoolId,
            name: school.school_name,
            address: school.address,
          });
          router.push("/visit-checkin");
        }}
      >
        <Ionicons name="location" size={18} color="#fff" />
        <Text style={styles.startText}>Start Visit</Text>
      </TouchableOpacity>
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={active ? styles.navItemActive : styles.navItem}
      onPress={onPress}
    >
      <Ionicons name={icon} size={22} color={active ? "#F97316" : "#9CA3AF"} />
      <Text style={active ? styles.navTextActive : styles.navText}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  // Search
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 15,
  },
  searchInput: { marginLeft: 10, flex: 1, color: "#111827" },

  // Filters
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEAD5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterBtnActive: { backgroundColor: "#F97316" },
  filterText: { marginRight: 5, color: "#F97316", fontWeight: "600", fontSize: 12 },
  filterTextActive: { color: "#fff" },

  // States
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 40 },
  loadingText: { marginTop: 12, color: "#6B7280" },
  errorText: { marginTop: 12, color: "#EF4444", textAlign: "center" },
  emptyText: { marginTop: 12, color: "#9CA3AF" },
  retryBtn: {
    marginTop: 16,
    backgroundColor: "#F97316",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: { color: "#fff", fontWeight: "700" },

  // Card
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
  },
  schoolId: { color: "#9CA3AF", fontSize: 12 },
  schoolName: { fontSize: 18, fontWeight: "700", marginVertical: 6, color: "#111827" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  subText: { marginLeft: 6, color: "#6B7280", flex: 1 },

  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginVertical: 8 },
  tag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagActive: { backgroundColor: "#D1FAE5" },
  tagInactive: { backgroundColor: "#FEE2E2" },
  tagText: { fontSize: 11, color: "#374151", fontWeight: "600" },

  actionRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 15 },
  actionBtn: {
    backgroundColor: "#FFF4E6",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    width: "48%",
  },
  actionText: { marginTop: 5, fontSize: 11, color: "#F97316", fontWeight: "600" },

  startBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F97316",
    paddingVertical: 14,
    borderRadius: 14,
  },
  startText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: "#E5E7EB",
  },
  navItem: { alignItems: "center" },
  navItemActive: { alignItems: "center" },
  navText: { fontSize: 11, color: "#9CA3AF", marginTop: 4 },
  navTextActive: { fontSize: 11, color: "#F97316", marginTop: 4 },
});
