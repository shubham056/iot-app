import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Footer } from '../components/includes/Footer';
import { Header } from '../components/includes/Header';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { login, register as signUp } from "../redux/features/AuthenticationSlice";
import { clearMessage } from "../redux/features/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'


const Portal = () => {
    const [switchForm, setswitchForm] = useState(true)
    const switchFormHandle = () => {
        console.log(switchForm)
        setswitchForm(!switchForm)
        console.log("after", switchForm)
    }

    const [isLoading, setisLoading] = useState(false)
    //const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);


    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
        password: Yup.string().required('Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case (!@#\$%\^&\*) Character"
            ),
    })
    const signupSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required.'),
        lastName: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
        password: Yup.string().required('Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case (!@#\$%\^&\*) Character"
            ),
        confirmPwd: Yup.string().required('Password is required.').oneOf([Yup.ref('password')], 'Passwords does not match.'),
    })
    //validation schema end
    const formOptionsLogin = { resolver: yupResolver(loginSchema) }
    const formOptions = { resolver: yupResolver(signupSchema) }
    const { register, formState: { errors, isSubmitting }, handleSubmit, } = useForm(formOptionsLogin);
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm(formOptions);
    //login submit handler
    const onSubmit = formValue => {
        setisLoading(true)
        //console.log(JSON.stringify(formValue))
        dispatch(login(formValue))
            .unwrap()
            .then(() => {
                setisLoading(false)
            })
            .catch((error) => {
                setisLoading(false)
            });
    }

    const onSubmitSignup = formValue => {
        setisLoading(true)
        //console.log(JSON.stringify(formValue));//print form data to console
        dispatch(signUp(formValue))
            .unwrap()
            .then(() => {
                setisLoading(false)
                // setTimeout(() => {
                //     navigate("/login", { replace: true });
                //  }, 3100);
            })
            .catch(() => {
                setisLoading(false)
            });
    }

    {
        message && toast.info(message, {
            toastId: 23453643
        })
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
                                            <img src="assets/images/slider/slider-1.jpg" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="assets/images/slider/slider-2.jpg" className="d-block w-100" alt="..." />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="assets/images/slider/slider-3.jpg" className="d-block w-100" alt="..." />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                switchForm
                                    ?
                                    <div className="col-lg-4 col-sm-12">
                                        <div className="contact-form2 login_wraper">
                                            <h4 className="text-uppercase">Login to your Account</h4>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register("email")}
                                                        placeholder="Email address"
                                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.email?.message}</span>

                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        {...register("password")}
                                                        placeholder="Password"
                                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors.password?.message}</span>

                                                </div>
                                                {
                                                    isLoading
                                                        ?
                                                        <button style={{ width: "100%" }} className="btn btn-primary">Sign In...  <div className="spinner-border"  style={{width:'1rem',height:'1rem'}}/>
                                                        </button>

                                                        :
                                                        <button style={{ width: "100%" }} type='submit' className="btn btn-primary">Sign In</button>
                                                }


                                                <div className="forgot">
                                                    <a href>Forgot Password?</a>
                                                </div>
                                                <p>Don't have account yet? <Link to="#" onClick={() => switchFormHandle()} style={{ cursor: "pointer" }}>Register</Link></p>
                                            </form>
                                        </div>
                                    </div>
                                    :
                                    <div className="col-lg-4 col-sm-12">
                                        <div className="contact-form2 login_wraper">
                                            <h4 className="text-uppercase">Create an account</h4>
                                            <form onSubmit={handleSubmit2(onSubmitSignup)}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register2("firstName")}
                                                        placeholder="First name"
                                                        className={`form-control ${errors2.firstName ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors2.firstName?.message}</span>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register2("lastName")}
                                                        placeholder="First name"
                                                        className={`form-control ${errors2.lastName ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors2.lastName?.message}</span>
                                                </div>

                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        {...register2("email")}
                                                        placeholder="Email address"
                                                        className={`form-control ${errors2.email ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors2.email?.message}</span>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        {...register2("password")}
                                                        placeholder="Password"
                                                        className={`form-control ${errors2.password ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors2.password?.message}</span>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        {...register2("confirmPwd")}
                                                        placeholder="Confirm Password"
                                                        className={`form-control ${errors2.confirmPwd ? 'is-invalid' : ''}`}
                                                    />
                                                    <span style={{ color: 'red' }}>{errors2.confirmPwd?.message}</span>
                                                </div>
                                                {
                                                    isLoading
                                                        ?
                                                        <button style={{ width: "100%" }} className="btn btn-primary">Sign Up...  <div className="spinner-border"  style={{width:'1rem',height:'1rem'}}/>
                                                        </button>

                                                        :
                                                        <button style={{ width: "100%" }} type='submit' href="#" className="btn btn-primary">Sign Up</button>
                                                }

                                                <br /><br />
                                                <p><a href>
                                                    Already have account? <Link to="#" onClick={() => switchFormHandle()} style={{ cursor: "pointer" }}>SignIn</Link>
                                                </a></p>
                                            </form>


                                        </div>
                                    </div>
                            }


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

export default Portal
