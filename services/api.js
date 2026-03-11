import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiFetch = async (url,options={})=>{

const token = await AsyncStorage.getItem("access_token");

return fetch(url,{
...options,
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json",
...options.headers
}
});

}