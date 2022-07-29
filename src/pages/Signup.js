import React from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'

const Signup = () => {
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
                                    <form action="https://themeturn.com/tf-db/promotal-intro/promotal/process.php">
                                        <div className="form-group">
                                            <input type="text" name="first_name" id="first_name" className="form-control" defaultValue placeholder="Enter first name" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="middle_name" id="middle_name" className="form-control" defaultValue placeholder="Enter middle name" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="last_name" id="last_name" className="form-control" defaultValue placeholder="Enter last name" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="last_name" id="last_name" className="form-control" defaultValue placeholder="Email Address" />
                                        </div>
                                        <div className="form-group">
                                            <input type="Password" name="password" id="password" className="form-control" defaultValue placeholder="Enter password" />
                                        </div>
                                        <div className="form-group">
                                            <input type="Password" name="cpassword" id="cpassword" className="form-control" defaultValue placeholder="Enter confirm password" />
                                        </div>
                                        <a href="#" className="btn btn-primary">Sign In</a>
                                        <br /><br />
                                        <p><a href>
                                            Already have account? SignIn
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
