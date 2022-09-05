import axios from "axios";
import authHeader from "./auth-header";


const getUserProfile = (userId) => {
    return axios.get(`users/profile/${userId}`, { headers: authHeader() });
};
const updateUserProfile = (userId, data) => {
    return axios({
        method: "post",
        url:`users/updateProfile/${userId}`,
        data,
        headers: authHeader()
    })
};

const getUserByID = (userId) => {
    return axios.get(`usersprofile/userId}`, { headers: authHeader() });
};

const ChangePassword = (userId,data) => {
    return axios({
        method: "post",
        url:`users/changePassword/${userId}`,
        data,
        headers: authHeader()
    })
};

const GetTreeViewCategory = (userId) => {
    return axios.get(`users/getCategory/${userId}`, { headers: authHeader() });
};
const GetTreeViewData = (userId) => {
    return axios.get(`users/getTreeViewData/${userId}`, { headers: authHeader() });
};

const AddNewArea = (userId,data) => {
    return axios({
        method: "post",
        url:`users/addArea/${userId}`,
        data,
        headers: authHeader()
    })
};

const AddRootUser = (userId,data) => {
    return axios({
        method: "post",
        url:`users/addRootUser/${userId}`,
        data,
        headers: authHeader()
    })
};

//check for valid device id
const checkDeviceID = (deviceID) => {
    return axios.get(`users/check_device_id/${deviceID}`, { headers: authHeader() });
};
//check device status online/offline
const checkDeviceOnlineStatus = (deviceID) => {
    return axios.get(`users/check_device_online_ststus/${deviceID}`, { headers: authHeader() });
};
//check for already assign device to user
const checkAssignDeviceID = (deviceID) => {
    return axios.get(`users/check_asigned_device_id/${deviceID}`, { headers: authHeader() });
};
//remove assosiated device
const removeAssignDeviceID = (deviceID) => {
    return axios.get(`users/remove_associated_device/${deviceID}`, { headers: authHeader() });
};
//Add device to area
const AddNewDevice = (userId,data) => {
    return axios({
        method: "post",
        url:`users/addDevice/${userId}`,
        data,
        headers: authHeader()
    })
};






const userService = {
    getUserProfile,
    updateUserProfile,
    getUserByID,
    ChangePassword,
    GetTreeViewCategory,
    AddNewArea,
    GetTreeViewData,
    AddRootUser,
    checkDeviceID,
    checkDeviceOnlineStatus,
    checkAssignDeviceID,
    removeAssignDeviceID,
    AddNewDevice,
};
export default userService;