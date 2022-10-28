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
const GetAddedDevices = (userId) => {
    return axios.get(`users/getAddedDevice/${userId}`, { headers: authHeader() });
};
const GetAddedAreas = (userId) => {
    return axios.get(`users/getAddedArea/${userId}`, { headers: authHeader() });
};


const GetTreeViewData = (userId) => {
    return axios.get(`users/getTreeViewData/${userId}`, { headers: authHeader() });
};

const GetLinkedDeviceData = (deviceID,Type,dataFormat=null) => {
    return axios.get(`users/getLinkedDeviceData/${deviceID}/${Type}/${dataFormat}`, { headers: authHeader() });
};

const GetDeviceGraphData = (deviceID,Type,dataFormat=null) => {
    return axios.get(`users/GetDeviceGraphData/${deviceID}/${Type}/${dataFormat}`, { headers: authHeader() });
};

const GetLatestDeviceStatsData = (deviceID,Type,dataFormat=null) => {
    return axios.get(`users/getLatestDeviceStatsData/${deviceID}`, { headers: authHeader() });
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

const UpdateDeviceConState = (deviceID,data) => {
    return axios({
        method: "post",
        url:`users/updated_device_link_status/${deviceID}`,
        data,
        headers: authHeader()
    })
};



//check device link value 50 or 150
const checkDeviceLinkValue = (deviceID) => {
    return axios.get(`users/get_link_device_value/${deviceID}`, { headers: authHeader() });
};

const checkAlreadyAddedDevice = (userId,deviceID) => {
    return axios.get(`users/check_already_added_device/${userId}/${deviceID}`, { headers: authHeader() });
};
//forgot device id
const forgotDeviceID = (deviceID) => {
    return axios.get(`users/forgot_associated_device/${deviceID}`, { headers: authHeader() });
};
//delete area name
const deleteAreaName = (areaID,userID) => {
    return axios.get(`users/delete_area_name/${areaID}/${userID}`, { headers: authHeader() });
};
//edit area name
const editAreaName = (areaID,editedAreaName) => {
    return axios.get(`users/edit_area_name/${areaID}/${editedAreaName}`, { headers: authHeader() });
};
//edit device name
const editDeviceName = (deviceID,editedDeviceName) => {
    return axios.get(`users/edit_device_name/${deviceID}/${editedDeviceName}`, { headers: authHeader() });
};
//delete multiple area name
const deleteAllAreasandDevices = (ids) => {
    return axios.get(`users/delete_areas_and_devices/${ids}`, { headers: authHeader() });
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
    checkDeviceLinkValue,
    UpdateDeviceConState,
    GetAddedDevices,
    GetAddedAreas,
    checkAlreadyAddedDevice,
    forgotDeviceID,
    GetLinkedDeviceData,
    GetLatestDeviceStatsData,
    GetDeviceGraphData,
    deleteAreaName,
    deleteAllAreasandDevices,
    editAreaName,
    editDeviceName,
};
export default userService;