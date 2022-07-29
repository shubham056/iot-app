import React from 'react'
import { Header } from '../components/includes/Header'
import { Footer } from '../components/includes/Footer'

const About = () => {
  return (
    <div>
  <Header/>
  {/* MAin Navigation END    */}
  <section className="dashboard_wraper">
    <div className="container">
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="row">
            <div className="dashboard_wrap">
              <h1>About Us</h1>
              <ul>
                <li>
                  <a href>
                    <p>Add Area</p>
                    <p className="order_text">Lorem Ipsum Tag Line</p>
                  </a>
                </li>
                <li>
                  <a href>
                    <p>Add Device</p>
                    <p className="order_text">Lorem Ipsum Tag Line</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Footer STYLES  */}
  <Footer/>
  {/* FOOTER STYLES END */}
</div>
  )
}

export default About 
