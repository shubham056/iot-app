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

const AddUser = () => {
    const users = useSelector(userData);
    const userID = users.data.profile.id;

    const [isLoading, setisLoading] = useState(false)
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const Schema = Yup.object().shape({
        first_name: Yup.string().required('First name is required.'),
        last_name: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
        password: Yup.string().required('New Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            )
    });
    const formOptions = { resolver: yupResolver(Schema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, resetField } = useForm(formOptions);
    setValue("user_id", userID)

    //submit handler
    const onSubmit = formValue => {
        setisLoading(true)
        const { user_id, first_name, last_name, email, password } = formValue
        let data = {
            first_name,
            last_name,
            email,
            password
        }
        console.log(data)
        console.log(user_id)
        UserService.addUsers(user_id, data)
            .then((res) => {
                console.log("resss",res.data.data.error)
                if(res.data.data.error){
                    toast.error("Email Id already in use, please enter different email id.", { toastId: 13453643 })
                }else{
                    toast.success("User successfully added.", { toastId: 23453643 })
                }
                setisLoading(false)
                
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
                                    <h4 className="text-uppercase text-center">Add User</h4>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <input type="hidden" {...register("user_id")} />
                                                    <input
                                                        type="text"
                                                        {...register("first_name")}
                                                        placeholder="First Name"
                                                        className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.first_name?.message}</span>

                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register("last_name")}
                                                        placeholder="Last Name"
                                                        className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.last_name?.message}</span>

                                                </div>
                                            </div>


                                        </div>
                                        <div className='row'>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        {...register("email")}
                                                        placeholder="email"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.email?.message}</span>

                                                </div>
                                            </div>
                                            <div className='col-md-6'>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        {...register("password")}
                                                        placeholder="New Password"
                                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.password?.message}</span>

                                                </div>
                                            </div>
                                        </div>
                                        {
                                            isLoading
                                                ?
                                                <button style={{ width: "100%" }} className="btn btn-primary">Submit...  <div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                                </button>

                                                :
                                                <button style={{ width: "100%" }} type='submit' className="btn btn-primary">Submit</button>
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

export default AddUser;
