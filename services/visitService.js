import API from "./api";

export const startVisit = async (schoolId, lat, long) => {
  const response = await API.post(
    "/server/rp_visits/rp/visits",
    {
      school_id: schoolId,
      check_in_lat: lat,
      check_in_long: long,
    }
  );

  return response.data;
};

export const getActiveVisit = async () => {
  const response = await API.get(
    "/server/rp_visits/rp/visits/active"
  );

  return response.data;
};

export const checkoutVisit = async (visitId, lat, long) => {
  const response = await API.patch(
    `/server/rp_visits/rp/visits/${visitId}/checkout`,
    {
      check_out_lat: lat,
      check_out_long: long,
    }
  );

  return response.data;
};