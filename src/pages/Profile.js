import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Footer } from '../components/includes/Footer';
import { Header } from '../components/includes/Header';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../redux/features/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import UserService from "../services/user.service";



const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    //console.log(user.data.profile)
    const userID = user.data.profile.id;

    const [content, setContent] = useState("");
    const [isLoading, setisLoading] = useState(false)
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    useEffect(() => {
        UserService.getUserProfile(userID).then(
            (response) => {
                setContent(response.data.data);
                setValue("user_id", response.data.data.profile.id)
                setValue("firstName", response.data.data.profile.first_name)
                setValue("lastName", response.data.data.profile.last_name)
                setValue("email", response.data.data.profile.email)
            },
            (error) => {
                { error && toast.error(error.response.data.message, { toastId: 2603453643 }) }
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setContent(_content);
            }
        );
    }, []);


    const profileSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required.'),
        lastName: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
    });
    const formOptions = { resolver: yupResolver(profileSchema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, } = useForm(formOptions);

    //submit handler
    const onSubmit = formValue => {
        setisLoading(true)
        const { user_id, firstName, lastName, email } = formValue
        const data = {
            email,
            first_name: firstName,
            last_name: lastName
        }
        // let updateUserProfile = {
        //     id: userID,
        //     first_name: firstName,
        //     last_name: lastName,
        //     email,
        //     last_login_date: users.data.profile.last_login_date,
        //     status: 1,
        //     username: users.data.profile.username
        // }
        // let updateUserData = 
        //     {
        //         type: "success", message: "User logged in Successfully", data:
        //         {
        //             token: users.data.token,
        //             refreshToken:users.data.refreshToken,
        //             profile: updateUserProfile
        //         }
        //     }

        // console.log("updateUserData======",updateUserData)


        UserService.updateUserProfile(user_id, data)
            .then(() => {
                setisLoading(false)
                ///localStorage.setItem("user", JSON.stringify(updateUserData));
                toast.success("Password successfully changed.", { toastId: 23453643 })
            })
            .catch((error) => {
                setisLoading(false)
                { error && toast.info(error.response.data.message, { toastId: 234536467686787 }) }
            });
    }



    return (
        <>
            <div>
                <Header />
                {/* MAin Navigation END    */}
                {/*  login FORM styles  */}
                <section className="login_wraper">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-sm-12">
                                <div className="contact-form2">
                                    <h4 className="text-uppercase text-center">Update Profile</h4>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <input type="hidden" {...register("user_id")} />
                                            <input
                                                type="text"
                                                {...register("firstName")}
                                                placeholder="First name"
                                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                            />
                                            <span style={{ color: 'red' }}>{errors.firstName?.message}</span>

                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                {...register("lastName")}
                                                placeholder="Last name"
                                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                            />
                                            <span style={{ color: 'red' }}>{errors.lastName?.message}</span>

                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                {...register("email")}
                                                placeholder="Email address"
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                readOnly
                                            />
                                            <span style={{ color: 'red' }}>{errors.email?.message}</span>

                                        </div>
                                        {
                                            isLoading
                                                ?
                                                <button style={{ width: "100%" }} className="btn btn-primary">Update...  <div className="spinner-border" />
                                                </button>

                                                :
                                                <button style={{ width: "100%" }} type='submit' className="btn btn-primary">Update</button>
                                        }

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*  login FORM styles END */}
                {/* Footer STYLES  */}

                <Footer />

                {/* FOOTER STYLES END */}
            </div>

        </>
    )
}

export default Profile;
