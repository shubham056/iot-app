import React, { useEffect } from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'
import { useDispatch, useSelector } from "react-redux";
import { register as signUp } from "../redux/features/AuthenticationSlice";
import { clearMessage } from "../redux/features/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Link } from 'react-router-dom';

const Signup = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);
    const initialValues = {
        email: "",
        password: "",
    };

    //form validations schema 
    const signupSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required.'),
        lastName: Yup.string().required('Last name is required.'),
        email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
        password: Yup.string().required('Password is required.')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirmPwd: Yup.string().required('Password is required.').oneOf([Yup.ref('password')], 'Passwords does not match.'),
    })

    //validation schema end
    const formOptions = { resolver: yupResolver(signupSchema) }

    const { register, formState: { errors, isSubmitting }, handleSubmit, } = useForm(formOptions);
    //login submit handler
    const onSubmit = formValue => {
        console.log(JSON.stringify(formValue));//print form data to console
        dispatch(signUp(formValue))
            .unwrap()
            .then(() => {
                console.log("redirect to login")
                console.log(message)
               
            })
            .catch(() => {
              
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
                                    <h4 className="text-uppercase">Register</h4>
                                    
                                    {message && (
                                    <div className="alert alert-warning  alert-dismissible fade show" role="alert">
                                        {message}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    )}

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
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
                                                placeholder="First name"
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
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                {...register("confirmPwd")}
                                                placeholder="Confirm Password"
                                                className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
                                            />
                                            <span style={{ color: 'red' }}>{errors.confirmPwd?.message}</span>
                                        </div>
                                        <button style={{ width: "100%" }} type='submit' href="#" className="btn btn-primary">Sign Up</button>
                                        <br /><br />
                                        <p><a href>
                                            Already have account? <Link to="/login">SignIn</Link>
                                        </a></p>
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
export default Signup
