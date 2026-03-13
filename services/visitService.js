import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL =
"https://rp-backend-60066119139.development.catalystserverless.in";

export const startVisit = async (schoolId, lat, lon) => {

  const token = await AsyncStorage.getItem("access_token");

  const response = await fetch(
    `${BASE_URL}/server/rp_mobile_visit/rp/start_visit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        school_id: schoolId,
        visit_lat: lat,
        visit_lon: lon,
        visit_timestamp: new Date().toISOString()
      })
    }
  );

  const data = await response.json();

  if(!response.ok){
    throw new Error("Visit start failed");
  }

  return data;
};