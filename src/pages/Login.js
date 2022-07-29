import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Footer } from '../components/includes/Footer';
import { Header } from '../components/includes/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import { login, register as signUp } from "../redux/features/AuthenticationSlice";
import { clearMessage } from "../redux/features/Message";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const Login = () => {
  //define states
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


  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Enter valid email id.').required('Email id is required.'),
    password: Yup.string().required('Password is required.')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  })
  //validation schema end
  const formOptionsLogin = { resolver: yupResolver(loginSchema) }
  const { register, formState: { errors, isSubmitting }, handleSubmit, } = useForm(formOptionsLogin);
  //login submit handler
  const onSubmit = formValue => {

    console.log(JSON.stringify(formValue));//print form data to console
    dispatch(login(formValue))
      .unwrap()
      .then((response) => {
        console.log("redirect to dashboard")
        toast("Wow so easy!");
        { alert.show("Logged in successfully.") }
      })
      .catch(() => {
        { message && alert.show("Please enter valid credentials.") }
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
                    <button type='submit' className="btn btn-primary">Sign In</button>
                    <div className="forgot">
                      <a href>Forgot Password?</a>
                    </div>
                    <p>Don't have account yet? <Link to="/signup"> Register</Link></p>
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

export default Login;
