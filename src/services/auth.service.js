import axios from "axios";
const register = (firstName, lastName, email, password, confirmPwd) => {
    return axios.post("signup", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: confirmPwd
    });
};
const login = (email, password) => {
    return axios
        .post("login", {
            email,
            password,
        })
        .then((response) => {
            console.log(response.data.data.token)
            if (response.data.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }
            return response.data;
        });
};
const logout = () => {
    localStorage.removeItem("user");
};
const authService = {
    register,
    login,
    logout,
};
export default authService;
