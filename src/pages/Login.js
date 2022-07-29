import React from 'react'
import { Footer } from '../components/includes/Footer';
import { Header } from '../components/includes/Header';

const Login = () => {
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
                  <form action="https://themeturn.com/tf-db/promotal-intro/promotal/process.php">
                    <div className="form-group">
                      <input type="email" placeholder="Email Address" name="email" id="email" className="form-control" />
                    </div>
                    <div className="form-group">
                      <input type="Password" placeholder="Password" name="subject" id="subject" className="form-control" />
                    </div>
                    <a href="#" className="btn btn-primary">Sign In</a>
                    <div className="forgot">
                      <a href>Forgot Password?</a>
                    </div>
                    <p><a href>Don't have account yet? Register</a></p>
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
