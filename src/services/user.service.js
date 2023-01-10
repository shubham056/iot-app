import axios from "axios";
import authHeader from "./auth-header";
import { toast } from 'react-toastify';


const getUserProfile = (userId) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 1 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/profile/${userId}`, { headers: authHeader() });
};
const updateUserProfile = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 2 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/updateProfile/${userId}`,
        data,
        headers: authHeader()
    })
};

const getUserByID = (userId) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 3 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`usersprofile/userId}`, { headers: authHeader() });
};

const ChangePassword = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 4 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/changePassword/${userId}`,
        data,
        headers: authHeader()
    })
};

const GetTreeViewCategory = (userId) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 5 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getCategory/${userId}`, { headers: authHeader() });
};
const GetAddedDevices = (userId) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 6 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getAddedDevice/${userId}`, { headers: authHeader() });
};
const GetAddedAreas = (userId) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 7 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getAddedArea/${userId}`, { headers: authHeader() });
};


const GetTreeViewData = (userId) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 8 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getTreeViewData/${userId}`, { headers: authHeader() });
};

const GetLinkedDeviceData = (deviceID, Type, dataFormat = null, startDate = null, endDate = null) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 9 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getLinkedDeviceData/${deviceID}/${Type}/${dataFormat}/${startDate}/${endDate}`, { headers: authHeader() });
};

const GetLinkedDeviceStatus = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 10 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getLinkedDeviceStatus/${deviceID}`, { headers: authHeader() });
};

const GetLinkedDeviceTemperatureData = (deviceID, Type, dataFormat = null, startDate = null, endDate = null) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 11 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getLinkedDeviceTempetrueData/${deviceID}/${Type}/${dataFormat}/${startDate}/${endDate}`, { headers: authHeader() });
};

const GetDeviceGraphData = (deviceID, Type, dataFormat = null) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 12 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/GetDeviceGraphData/${deviceID}/${Type}/${dataFormat}`, { headers: authHeader() });
};

const GetLatestDeviceStatsData = (deviceID, Type, dataFormat = null) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 13 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/getLatestDeviceStatsData/${deviceID}`, { headers: authHeader() });
};

const GetControlDeviceData = (deviceID, userID, type = null) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 14 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/get_control_device_data/${deviceID}/${userID}/${type}`, { headers: authHeader() });
};

const AddNewArea = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 15 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/addArea/${userId}`,
        data,
        headers: authHeader()
    })
};

const addUsers = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 16 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/addUsers/${userId}`,
        data,
        headers: authHeader()
    })
};

const insertUpdateControlData = (deviceID, userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 17 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/insert_update_control_device_data/${deviceID}/${userId}`,
        data,
        headers: authHeader()
    })
};

const insertControlData = (deviceID, userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 18 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/insert_control_device_data/${deviceID}/${userId}`,
        data,
        headers: authHeader()
    })
};

const AddRootUser = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 19 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/addRootUser/${userId}`,
        data,
        headers: authHeader()
    })
};

const AddRootUserAfterSignUp = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 20 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/addRootUserAfterSignup/${userId}`,
        data
    })
};

//check for valid device id
const checkDeviceID = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 21 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/check_device_id/${deviceID}`, { headers: authHeader() });
};
//check device status online/offline
const checkDeviceOnlineStatus = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 22 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/check_device_online_ststus/${deviceID}`, { headers: authHeader() });
};
//check for already assign device to user
const checkAssignDeviceID = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 23 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/check_asigned_device_id/${deviceID}`, { headers: authHeader() });
};
//remove assosiated device
const removeAssignDeviceID = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 24 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/remove_associated_device/${deviceID}`, { headers: authHeader() });
};
//forgot password
const forgotPasword = (email) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 25 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/forgot_password/${email}`);
};
//add device to users
const assignDeviceTousers = (email, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 26 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/assign_device_to_user/${email}`,
        data,
        headers: authHeader()
    })
};
//Add device to area
const AddNewDevice = (userId, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 27 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/addDevice/${userId}`,
        data,
        headers: authHeader()
    })
};

const UpdateDeviceConState = (deviceID, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 28 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/updated_device_link_status/${deviceID}`,
        data,
        headers: authHeader()
    })
};



//check device link value 50 or 150
const checkDeviceLinkValue = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 29 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/get_link_device_value/${deviceID}`, { headers: authHeader() });
};

const checkAlreadyAddedDevice = (userId, deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 30 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/check_already_added_device/${userId}/${deviceID}`, { headers: authHeader() });
};
//forgot device id
const forgotDeviceID = (deviceID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 31 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/forgot_associated_device/${deviceID}`, { headers: authHeader() });
};
//delete area name
const deleteAreaName = (areaID, userID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 32 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/delete_area_name/${areaID}/${userID}`, { headers: authHeader() });
};
//move device
const moveDevices = (deviceID, areaID, userID) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 33 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/moveDevices/${deviceID}/${areaID}/${userID}`, { headers: authHeader() });
};
//edit area name
const editAreaName = (areaID, editedAreaName) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 34 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/edit_area_name/${areaID}/${editedAreaName}`, { headers: authHeader() });
};
//edit device name
const editDeviceName = (deviceID, editedDeviceName) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 35 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/edit_device_name/${deviceID}/${editedDeviceName}`, { headers: authHeader() });
};
//delete multiple area name
const deleteAllAreasandDevices = (ids) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 36 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios.get(`users/delete_areas_and_devices/${ids}`, { headers: authHeader() });
};

//reset password check token and time
const resetPassword = (data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 37 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/reset_password`,
        data
    })
};

//------------------------------------------------ Control Page API --------------------------------------------
const postControlData = (deviceID, user_id, device_row_type, type, data) => {
    if (authHeader().expiredToken != undefined && authHeader().expiredToken) {
        console.log("auth", authHeader())
        toast.error("Token has been expired!", { toastId: 38 })
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }
    return axios({
        method: "post",
        url: `users/get_device_certificates/${deviceID}/${user_id}/${device_row_type}/${type}`,
        data,
        headers: authHeader()
    })
}




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
    GetLinkedDeviceStatus,
    GetLinkedDeviceTemperatureData,
    GetLatestDeviceStatsData,
    GetDeviceGraphData,
    deleteAreaName,
    deleteAllAreasandDevices,
    editAreaName,
    editDeviceName,
    moveDevices,
    forgotPasword,
    addUsers,
    resetPassword,
    AddRootUserAfterSignUp,
    assignDeviceTousers,
    postControlData,
    insertUpdateControlData,
    insertControlData,
    GetControlDeviceData
};
export default userService;