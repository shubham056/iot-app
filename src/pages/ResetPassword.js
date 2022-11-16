import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import { Footer } from '../components/includes/Footer';
import { Header } from '../components/includes/Header';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import UserService from "../services/user.service";
import { useParams } from 'react-router-dom';
import moment from 'moment-timezone';


const ResetPassword = () => {
    const navigate = useNavigate();
    let { token } = useParams();
    console.log("routes path", token)



    const [isLoading, setisLoading] = useState(false)
    const Schema = Yup.object().shape({
        new_password: Yup.string().required('New Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirm_password: Yup.string().required('Confirm Password is required.').oneOf([Yup.ref('new_password')], 'Passwords does not match.'),
    });
    const formOptions = { resolver: yupResolver(Schema) }
    const { register, setValue, formState: { errors, isSubmitting }, handleSubmit, resetField } = useForm(formOptions);
    //login submit handler
    const onSubmit = formValue => {
        setisLoading(true)
        console.log("form data", formValue,token)
        const {new_password, confirm_password} = formValue
        const data = {
            new_password,
            confirm_password,
            token
        }
        console.log("post data", data)
        UserService.resetPassword(data)
            .then((res) => {
                setisLoading(false)
                console.log(res)
                if(res.data.message === "invalid_token"){
                    toast.error("Invalid reset password link.", { toastId: 23453643 })
                }if(res.data.message === "time_over"){
                    toast.error("Reset password link is expire. Please try again.", { toastId: 25453643 })
                }if(res.data.message === "successfully_reset"){
                    toast.success("Password successfully Reset.", { toastId: 234536 })
                    navigate('/portal')
                }
            })
            .catch((error) => {
                setisLoading(false)
                console.log(error)
               { error && toast.error(error.response.data.message) }
            });

    }
    return (
        <>
            <div>
                <Header />
                {/* MAin Navigation END    */}
                <section className="main-slider">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-sm-12">
                                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img src="/assets/images/slider/slider-1.jpg" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/assets/images/slider/slider-2.jpg" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="/assets/images/slider/slider-3.jpg" className="d-block w-100" alt="..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12">
                                <div className="contact-form2 login_wraper">
                                    <h4 className="text-uppercase">Reset Password</h4>
                                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                                <button style={{ width: "100%" }} className="btn btn-primary">Submit...  <div className="spinner-border" style={{ width: '1rem', height: '1rem' }} />
                                                </button>

                                                :
                                                <button style={{ width: "100%" }} type='submit' className="btn btn-primary">Submit</button>
                                        }

                                        <p>Already have account? <Link to="/portal" style={{ cursor: "pointer" }}>SignIn</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Footer STYLES  */}
                <Footer />
                {/* FOOTER STYLES END */}
            </div>

        </>
    )
}

export default ResetPassword
