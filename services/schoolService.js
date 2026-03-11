import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSchools = async () => {

  try {

    const rpId = await AsyncStorage.getItem("rp_id");

    if (!rpId) {
      console.log("rp_id not found");
      return [];
    }

    const response = await fetch(
      "https://rp-backend-60066119139.development.catalystserverless.in/server/rp_mobile_school/rp/schools",
      {
        method: "GET",
        headers: {
          rp_id: rpId,
        },
      }
    );

    const data = await response.json();

    console.log("Schools:", data);

    if (response.ok) {
      return data.data || [];
    }

    return [];

  } catch (error) {

    console.log("Schools API error:", error);
    return [];

  }

};