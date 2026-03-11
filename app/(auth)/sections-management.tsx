import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AppHeader from "../components/AppHeader";

export default function SectionsManagement() {

  const [modalVisible, setModalVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null)
const [selectedClass, setSelectedClass] = useState("6");
  const [sections, setSections] = useState([
    {
      class: "6",
      section: "A",
      teacher: "Mr Robert",
      strength: "32",
      infra: "Available",
      slot: "Yes",
      status: "Adopted"
    }
  ]);

const deleteRow = (index: number) => {
    const data = [...sections];
    data.splice(index, 1);
    setSections(data);
  };

  const openAddModal = () => {
    setEditIndex(null);
    setModalVisible(true);
  };

  const openEditModal = (index: number) => {
    setEditIndex(index);
    setModalVisible(true);
  };

 const saveSection = (data: any) => {

    if (editIndex !== null) {

      const updated = [...sections];
      updated[editIndex] = data;
      setSections(updated);

    } else {

      setSections([...sections, data]);

    }

    setModalVisible(false);
  };

  return (

    <View style={styles.container}>

      <AppHeader title="Sections Management" />

      <ScrollView>

        <View style={styles.topRow}>

          <Text style={styles.school}>
            Greenwood High International School
          </Text>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={openAddModal}
          >
            <Ionicons name="add" size={18} color="#fff" />
            <Text style={styles.addText}>Add Section</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.subtitle}>
          Manage student strength and assigned teachers for all sections.
        </Text>

        <View style={styles.card}>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            <View>

              <View style={styles.tableHeader}>

                <Text style={styles.th}>Class</Text>
                <Text style={styles.th}>Section</Text>
                <Text style={styles.th}>Teacher</Text>
                <Text style={styles.th}>Strength</Text>
                <Text style={styles.th}>Infrastructure</Text>
                <Text style={styles.th}>Slot TT</Text>
                <Text style={styles.th}>Status</Text>
                <Text style={styles.thCenter}>Edit</Text>
                <Text style={styles.thCenter}>Delete</Text>

              </View>

              {sections.map((item, index) => (

                <View key={index} style={styles.row}>

                  <Text style={styles.cell}>{item.class}</Text>
                  <Text style={styles.cell}>{item.section}</Text>
                  <Text style={styles.cell}>{item.teacher}</Text>
                  <Text style={styles.cell}>{item.strength}</Text>
                  <Text style={styles.cell}>{item.infra}</Text>
                  <Text style={styles.cell}>{item.slot}</Text>
                  <Text style={styles.cell}>{item.status}</Text>

                  <View style={styles.cellCenter}>
                    <TouchableOpacity onPress={() => openEditModal(index)}>
                      <Ionicons name="create-outline" size={20} color="#F97316" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cellCenter}>
                    <TouchableOpacity onPress={() => deleteRow(index)}>
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>

                </View>

              ))}

            </View>

          </ScrollView>

        </View>

      </ScrollView>

      <SectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={saveSection}
        editData={editIndex !== null ? sections[editIndex] : null}
      />

    </View>

  );
}

function SectionModal({
  visible,
  onClose,
  onSave,
  editData
}: {
  visible: boolean
  onClose: () => void
  onSave: (data: any) => void
  editData: any
}) {

  const [classNo, setClassNo] = useState("6")
  const [section, setSection] = useState("")
  const [teacher, setTeacher] = useState("Select Teacher")
  const [strength, setStrength] = useState("")
  const [infra, setInfra] = useState("Available")
  const [slot, setSlot] = useState("Yes")
  const [status, setStatus] = useState("Adopted")

  const [showClass, setShowClass] = useState(false)
  const [showTeacher, setShowTeacher] = useState(false)
  const [showInfra, setShowInfra] = useState(false)
  const [showSlot, setShowSlot] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {

    if (editData) {
      setClassNo(editData.class)
      setSection(editData.section)
      setTeacher(editData.teacher)
      setStrength(editData.strength)
      setInfra(editData.infra)
      setSlot(editData.slot)
      setStatus(editData.status)
    } else {
      clearForm()
    }

  }, [editData])

  const clearForm = () => {
    setClassNo("6")
    setSection("")
    setTeacher("Select Teacher")
    setStrength("")
    setInfra("Available")
    setSlot("Yes")
    setStatus("Adopted")
  }

  const saveData = () => {

    onSave({
      class: classNo,
      section,
      teacher,
      strength,
      infra,
      slot,
      status
    })

    clearForm()
  }

  return (

    <Modal visible={visible} animationType="fade" transparent>

      <View style={styles.modalOverlay}>

        <View style={styles.modalCard}>

          <ScrollView>

            <Text style={styles.modalTitle}>
              {editData ? "Edit Section" : "Add Section"}
            </Text>

            <Text style={styles.label}>Class</Text>

            <TouchableOpacity
              style={styles.fieldRow}
              onPress={() => setShowClass(!showClass)}
            >
              <Text>{classNo}</Text>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>

            {showClass && (
              <View style={styles.dropdown}>
                {["6", "7", "8", "9", "10"].map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={styles.option}
                    onPress={() => {
                      setClassNo(c)
                      setShowClass(false)
                    }}
                  >
                    <Text>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Section</Text>

            <TextInput
              style={styles.field}
              placeholder="Enter Section"
              value={section}
              onChangeText={setSection}
            />

            <Text style={styles.label}>Teacher</Text>

            <TouchableOpacity
              style={styles.fieldRow}
              onPress={() => setShowTeacher(!showTeacher)}
            >
              <Text>{teacher}</Text>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>

            {showTeacher && (
              <View style={styles.dropdown}>
                {["Mr Robert", "Ms Anna", "Mr Sam"].map((t) => (
                  <TouchableOpacity
                    key={t}
                    style={styles.option}
                    onPress={() => {
                      setTeacher(t)
                      setShowTeacher(false)
                    }}
                  >
                    <Text>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Strength</Text>

            <TextInput
              style={styles.field}
              placeholder="Enter Strength"
              keyboardType="numeric"
              value={strength}
              onChangeText={setStrength}
            />

            <Text style={styles.label}>Infrastructure</Text>

            <TouchableOpacity
              style={styles.fieldRow}
              onPress={() => setShowInfra(!showInfra)}
            >
              <Text>{infra}</Text>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>

            {showInfra && (
              <View style={styles.dropdown}>
                {["Available", "Not Available", "Not Applicable"].map((i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.option}
                    onPress={() => {
                      setInfra(i)
                      setShowInfra(false)
                    }}
                  >
                    <Text>{i}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Slot TT</Text>

            <TouchableOpacity
              style={styles.fieldRow}
              onPress={() => setShowSlot(!showSlot)}
            >
              <Text>{slot}</Text>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>

            {showSlot && (
              <View style={styles.dropdown}>
                {["Yes", "No"].map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.option}
                    onPress={() => {
                      setSlot(s)
                      setShowSlot(false)
                    }}
                  >
                    <Text>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={styles.label}>Section Status</Text>

            <TouchableOpacity
              style={styles.fieldRow}
              onPress={() => setShowStatus(!showStatus)}
            >
              <Text>{status}</Text>
              <Ionicons name="chevron-down" size={18} />
            </TouchableOpacity>

            {showStatus && (
              <View style={styles.dropdown}>
                {["Adopted", "Not Adopted"].map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.option}
                    onPress={() => {
                      setStatus(s)
                      setShowStatus(false)
                    }}
                  >
                    <Text>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.modalBtns}>

              <TouchableOpacity style={styles.cancel} onPress={() => { clearForm(); onClose(); }}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.save} onPress={saveData}>
                <Text style={{ color: "#fff" }}>
                  {editData ? "Update Section" : "Save Section"}
                </Text>
              </TouchableOpacity>

            </View>

          </ScrollView>

        </View>

      </View>

    </Modal>

  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20
  },

  school: { fontSize: 20, fontWeight: "700" },

  subtitle: { marginHorizontal: 20, color: "#6B7280", marginBottom: 10 },

  addBtn: {
    backgroundColor: "#F97316",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8
  },

  addText: { color: "#fff", marginLeft: 5, fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 14,
    padding: 10
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },

  th: {
    width: 120,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontWeight: "700",
    borderRightWidth: 1,
    borderColor: "#E5E7EB"
  },

  thCenter: {
    width: 90,
    textAlign: "center",
    paddingVertical: 12,
    fontWeight: "700",
    borderRightWidth: 1,
    borderColor: "#E5E7EB"
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#F1F1F1"
  },

  cell: {
    width: 120,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderColor: "#E5E7EB"
  },

  cellCenter: {
    width: 90,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#E5E7EB"
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 20
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    maxHeight: "85%"
  },

  modalTitle: { fontSize: 22, fontWeight: "700", marginBottom: 20 },

  label: { marginTop: 14, fontWeight: "600" },

  field: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    backgroundColor: "#fff"
  },

  fieldRow: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff"
  },

  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB"
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#F1F1F1"
  },

  modalBtns: {
    flexDirection: "row",
    marginTop: 30
  },

  cancel: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#F97316",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10
  },

  save: {
    flex: 1,
    backgroundColor: "#F97316",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  }

});