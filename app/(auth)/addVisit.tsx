import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import AppHeader from "../components/AppHeader";
import { useVisit } from "../context/VisitContext";

export default function AddVisit() {

    const router = useRouter();
    const { addVisit } = useVisit();

    const [school, setSchool] = useState("");
    const [district, setDistrict] = useState("");

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);

    const [remarks, setRemarks] = useState("");

    const [filteredSchools, setFilteredSchools] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const schools: string[] = [
        "Green Valley School",
        "Sunrise Public School",
        "Oxford International School",
        "Delhi Public School",
        "St. Mary's School",
        "Modern High School"
    ];

    const handleSearch = (text: string) => {

        setSchool(text);

        if (text.length > 0) {

            const filtered = schools.filter((s) =>
                s.toLowerCase().includes(text.toLowerCase())
            );

            setFilteredSchools(filtered);
            setShowDropdown(true);
        } else {

            setShowDropdown(false);

        }

    };

    const saveSchedule = () => {

        addVisit({
            date: date.toDateString(),
            time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            school,
            district
        })

        router.back()

    }
    return (

        <View style={styles.container}>

            <AppHeader title="Add New Visit" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >

                <View style={styles.card}>

                    <Text style={styles.label}>
                        School Name
                    </Text>

                    <View style={styles.inputBox}>

                        <Ionicons name="search-outline" size={18} color="#9CA3AF" />

                        <TextInput
                            placeholder="Select or search school"
                            style={styles.input}
                            value={school}
                            onChangeText={handleSearch}
                        />

                    </View>

                    {showDropdown && (

                        <View style={styles.dropdown}>

                            {filteredSchools.map((item, index) => (

                                <TouchableOpacity
                                    key={index}
                                    style={styles.dropdownItem}
                                    onPress={() => {
                                        setSchool(item)
                                        setShowDropdown(false)
                                    }}
                                >

                                    <Text>{item}</Text>

                                </TouchableOpacity>

                            ))}

                        </View>

                    )}

                    <Text style={styles.note}>
                        Note: You cannot schedule duplicate visits to the same school on the same day.
                    </Text>

                    <Text style={styles.label}>
                        District
                    </Text>

                    <View style={styles.pickerBox}>

                        <Picker
                            selectedValue={district}
                            onValueChange={(v) => setDistrict(v)}
                        >

                            <Picker.Item label="Select District" value="" />
                            <Picker.Item label="North District" value="North District" />
                            <Picker.Item label="South District" value="South District" />
                            <Picker.Item label="East District" value="East District" />
                            <Picker.Item label="West District" value="West District" />

                        </Picker>

                    </View>

                    <Text style={styles.label}>
                        Visit Date
                    </Text>

                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setShowDate(true)}
                    >

                        <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />

                        <Text style={styles.dateText}>
                            {date.toDateString()}
                        </Text>

                    </TouchableOpacity>

                    {showDate && (

                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(e, d) => {
                                setShowDate(false)
                                if (d) setDate(d)
                            }}
                        />

                    )}

                    <Text style={styles.label}>
                        Visit Time
                    </Text>

                    <TouchableOpacity
                        style={styles.inputBox}
                        onPress={() => setShowTime(true)}
                    >

                        <Ionicons name="time-outline" size={18} color="#9CA3AF" />

                        <Text style={styles.dateText}>
                            {time.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </Text>

                    </TouchableOpacity>

                    {showTime && (

                        <DateTimePicker
                            value={time}
                            mode="time"
                            display="default"
                            onChange={(e, t) => {
                                setShowTime(false)
                                if (t) setTime(t)
                            }}
                        />

                    )}

                    <Text style={styles.label}>
                        Remarks (Optional)
                    </Text>

                    <TextInput
                        placeholder="Add any specific instructions or notes for this visit..."
                        multiline
                        value={remarks}
                        onChangeText={setRemarks}
                        style={styles.textArea}
                    />

                </View>

            </ScrollView>

            <View style={styles.footer}>

                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => router.back()}
                >

                    <Text style={styles.cancelText}>
                        Cancel
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={saveSchedule}
                >

                    <Ionicons name="calendar-outline" size={18} color="#fff" />

                    <Text style={styles.saveText}>
                        Save Schedule
                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F3F4F6"
    },

    card: {
        backgroundColor: "#fff",
        margin: 20,
        padding: 20,
        borderRadius: 16
    },

    label: {
        fontWeight: "600",
        marginTop: 12,
        marginBottom: 6
    },

    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F3F4F6",
        padding: 12,
        borderRadius: 10
    },

    input: {
        flex: 1,
        marginLeft: 8
    },

    dateText: {
        marginLeft: 8,
        fontWeight: "500"
    },

    pickerBox: {
        backgroundColor: "#F3F4F6",
        borderRadius: 10
    },

    note: {
        fontSize: 12,
        color: "#6B7280",
        marginTop: 5
    },

    textArea: {
        backgroundColor: "#F3F4F6",
        borderRadius: 10,
        padding: 12,
        height: 90,
        textAlignVertical: "top"
    },

    dropdown: {
        backgroundColor: "#fff",
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        maxHeight: 150
    },

    dropdownItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F3F4F6"
    },

    footer: {
        flexDirection: "row",
        padding: 20,
        backgroundColor: "#fff"
    },

    cancelBtn: {
        flex: 1,
        backgroundColor: "#E5E7EB",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginRight: 10
    },

    cancelText: {
        fontWeight: "600"
    },

    saveBtn: {
        flex: 2,
        backgroundColor: "#F97316",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    saveText: {
        color: "#fff",
        marginLeft: 8,
        fontWeight: "600"
    }

});