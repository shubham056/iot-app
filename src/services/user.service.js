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

const userService = {
    getUserProfile,
    updateUserProfile,
    getUserByID,
    ChangePassword
};
export default userService;