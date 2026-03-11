import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./api";

export const requestOtp = async (phone) => {
  const response = await API.post(
    "/server/auth_verify_otp/rp/auth/request-otp",
    {
      identifier: phone,
    }
  );

  return response.data;
};

export const verifyOtp = async (phone, otp) => {
  const response = await API.post(
    "/server/auth_verify_otp/rp/auth/verify-otp",
    {
      identifier: phone,
      otp: otp,
    }
  );

  const data = response.data;

  if (data.success) {
    await AsyncStorage.setItem("access_token", data.access_token);
    await AsyncStorage.setItem("refresh_token", data.refresh_token);

    const profileRes = await API.get("/server/rp_mobile/rp/profile");

    const profile = profileRes.data;

    await AsyncStorage.setItem(
      "rp_id",
      profile.data.ROWID.toString()
    );

    return profile.data;
  }

  return null;
};