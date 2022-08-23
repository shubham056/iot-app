import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Footer } from '../components/includes/Footer';
import { Header } from '../components/includes/Header';
import { toast } from 'react-toastify';



import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/AuthenticationSlice";
import { clearMessage } from "../redux/features/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import UserService from "../services/user.service";
import { userData } from "../redux/features/AuthenticationSlice";

const ChangePassword = () => {
    const users = useSelector(userData);
    const userID = users.data.profile.id;

    const [isLoading, setisLoading] = useState(false)
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const Schema = Yup.object().shape({
        current_password: Yup.string().required('Current Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        new_password: Yup.string().required('New Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirm_password: Yup.string().required('Confirm Password is required.').oneOf([Yup.ref('new_password')], 'Passwords does not match.'),
    });
    const formOptions = { resolver: yupResolver(Schema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, resetField  } = useForm(formOptions);
    setValue("user_id", userID)

    //submit handler
    const onSubmit = formValue => {
        setisLoading(true)
        const { user_id, current_password, new_password, confirm_password } = formValue
        let data = {
            current_password,
            new_password,
            confirm_password
        }
        console.log(data)
        console.log(user_id)
        UserService.ChangePassword(user_id, data)
            .then(() => {
                setisLoading(false)
                toast.success("Password successfully changed.", {toastId: 23453643})
                resetField('current_password');
                resetField('new_password');
                resetField('confirm_password');
            })
            .catch((error) => {
                setisLoading(false)
                { error && toast.error(error.response.data.message) }
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
                                    <h4 className="text-uppercase text-center">Change Password</h4>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <input type="hidden" {...register("user_id")} />
                                            <input
                                                type="password"
                                                {...register("current_password")}
                                                placeholder="Current Password"
                                                className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}
                                            />
                                            <span style={{ color: 'red' }}>{errors.current_password?.message}</span>

                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                {...register("new_password")}
                                                placeholder="New Password"
                                                className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}
                                            />
                                            <span style={{ color: 'red' }}>{errors.new_password?.message}</span>

                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                {...register("confirm_password")}
                                                placeholder="Confirm Password"
                                                className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                                            />
                                            <span style={{ color: 'red' }}>{errors.confirm_password?.message}</span>

                                        </div>
                                        {
                                            isLoading
                                                ?
                                                <button style={{ width: "100%" }} className="btn btn-primary">Update...  <div className="spinner-border"  style={{width:'1rem',height:'1rem'}}/>
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

export default ChangePassword;
