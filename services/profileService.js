import axios from "axios";

const BASE_URL = "https://rp-backend-60066119139.development.catalystserverless.in";

/*
GET PROFILE
Endpoint:
GET /server/rp_mobile/rp/profile
Header:
Authorization: Bearer <access_token>
*/

export const getProfile = async (accessToken) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/server/rp_mobile/rp/profile`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Profile Fetch Error:", error.response?.data || error.message);
    throw error;
  }
};


/*
UPDATE FCM TOKEN
Endpoint:
PUT /server/rp_mobile/rp/profile/fcm-token
*/

export const updateFCMToken = async (accessToken, fcmToken) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/server/rp_mobile/rp/profile/fcm-token`,
      {
        fcm_token: fcmToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("FCM Token Update Error:", error.response?.data || error.message);
    throw error;
  }
};