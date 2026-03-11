import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import AppHeader from "../components/AppHeader";
import SchoolBanner from "../components/SchoolBanner";

export default function FinishVisit() {

    const router = useRouter()
    const [modalVisible, setModalVisible] = useState(false)

    const goDashboard = () => {
        setModalVisible(false)

        setTimeout(() => {
            router.replace("/dashboard")
        }, 200)
    }

    return (

        <View style={styles.container}>

            {/* HEADER */}

            <AppHeader
                title="Finish Visit"
            />
            <SchoolBanner />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
            >

                {/* STEP */}

                <Text style={styles.stepLabel}>
                    STEP 6 OF 6
                </Text>


                {/* STEP BAR */}

                <View style={styles.stepRow}>

                    <View style={styles.stepDone} />
                    <View style={styles.stepDone} />
                    <View style={styles.stepDone} />
                    <View style={styles.stepDone} />
                    <View style={styles.stepDone} />
                    <View style={styles.stepActive} />

                </View>
                {/* MAP */}

                <View style={styles.mapCard}>

                    <View style={styles.mapHeader}>
                        <Ionicons name="location" size={20} color="#F97316" />
                        <Text style={styles.mapTitle}>
                            GPS Location Captured
                        </Text>
                    </View>

                    <Image
                        source={{
                            uri: "https://static.vecteezy.com/system/resources/previews/023/522/630/non_2x/map-location-pin-illustration-gps-navigation-icon-free-vector.jpg"
                        }}
                        style={styles.mapImage}
                    />

                </View>

                {/* SUMMARY */}

                <View style={styles.summaryCard}>

                    <Text style={styles.summaryTitle}>
                        Visit Summary
                    </Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Check-in Time</Text>
                        <Text style={styles.value}>09:15 AM</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Check-out Time</Text>
                        <Text style={styles.value}>05:45 PM</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Total Duration</Text>
                        <Text style={styles.duration}>8h 30m</Text>
                    </View>

                </View>


                {/* SUCCESS INFO */}

                <View style={styles.successCard}>
                    <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                    <Text style={styles.successText}>
                        GPS Signal Captured
                    </Text>
                </View>

                <View style={styles.successCard}>
                    <Ionicons name="checkmark-circle" size={18} color="#22C55E" />
                    <Text style={styles.successText}>
                        Duration Recorded
                    </Text>
                </View>


                {/* SUBMIT */}

                <TouchableOpacity
                    style={styles.submitBtn}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.submitText}>
                        Confirm & Submit Visit
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.cancelText}>
                        Cancel and Review
                    </Text>
                </TouchableOpacity>

            </ScrollView>



            {/* SUCCESS MODAL */}

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalCard}>

                        <Ionicons
                            name="checkmark-circle"
                            size={60}
                            color="#22C55E"
                        />

                        <Text style={styles.modalTitle}>
                            Visit Submitted Successfully
                        </Text>

                        <Text style={styles.modalSub}>
                            Your visit data has been recorded successfully.
                        </Text>

                        <TouchableOpacity
                            style={styles.modalBtn}
                            onPress={goDashboard}
                        >

                            <Text style={styles.modalBtnText}>
                                Back to Dashboard
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F3F4F6"
    },

    stepLabel: {
        textAlign: "center",
        marginTop: 15,
        color: "#F97316",
        fontWeight: "600"
    },

    stepRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10
    },

    stepDone: {
        width: 28,
        height: 6,
        backgroundColor: "#F97316",
        borderRadius: 10,
        marginHorizontal: 4
    },

    stepActive: {
        width: 28,
        height: 6,
        backgroundColor: "#FB923C",
        borderRadius: 10,
        marginHorizontal: 4
    },

    mapCard: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 14,
        overflow: "hidden"
    },

    mapHeader: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15
    },

    mapTitle: {
        marginLeft: 8,
        fontWeight: "600"
    },

    mapImage: {
        width: "100%",
        height: 180
    },

    summaryCard: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 14
    },

    summaryTitle: {
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 10
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },

    label: {
        color: "#6B7280"
    },

    value: {
        fontWeight: "600"
    },

    duration: {
        fontWeight: "700",
        color: "#F97316"
    },

    successCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#DCFCE7",
        marginHorizontal: 20,
        padding: 14,
        borderRadius: 12,
        marginTop: 10
    },

    successText: {
        marginLeft: 8,
        color: "#16A34A",
        fontWeight: "600"
    },

    submitBtn: {
        backgroundColor: "#F97316",
        margin: 20,
        padding: 16,
        borderRadius: 14,
        alignItems: "center"
    },

    submitText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16
    },

    cancelText: {
        textAlign: "center",
        color: "#6B7280"
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center"
    },

    modalCard: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 20,
        alignItems: "center",
        width: "80%"
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginTop: 10
    },

    modalSub: {
        color: "#6B7280",
        marginTop: 5,
        textAlign: "center"
    },

    modalBtn: {
        backgroundColor: "#F97316",
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
        width: "100%",
        alignItems: "center"
    },

    modalBtnText: {
        color: "#fff",
        fontWeight: "600"
    }

})