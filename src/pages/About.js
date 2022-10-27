import React from 'react'
import { Header } from '../components/includes/Header'
import { Footer } from '../components/includes/Footer'

const About = () => {
  return (
    <div>
      <Header />
      <div>
        {/* MAin Navigation END    */}
        {/* Banner STYLES  */}
        <div className="page-banner">
          <div className="dark-overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-content">
                  <h2>About us</h2>
                  <p className="text-muted lead">Know more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner STYLES  */}
        {/* ABOUT STYLES2  */}
        <section id="about2" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 mt-5">
                <div className="about-img-2">
                  <img src="assets/images/about/combination-chart.png" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 mt-4">
                <div className="about-feature">
                  <h2>About Us</h2>
                  <p>Corporis facilis officia, excepturi dignissimos, vitae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis, iure debitis id. Quaerat.</p>
                  <p>Corporis facilis officia, excepturi dignissimos, vitae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis, iure debitis id. Quaerat. Corporis facilis officia, excepturi dignissimos, vitae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis, iure debitis id. Quaerat.</p>
                  <p>Corporis facilis officia, excepturi dignissimos, vitae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis, iure debitis id. Quaerat.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ABOUT STYLES2  */}
        {/* ABOUT STYLES  */}
        <section id="about" className="pt0 mt-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <ul className="about-list">
                  <li>
                    <div className="about-icon">
                      <i className="icofont icofont-tick-mark" />
                    </div>
                    <h4>Quality service Provide </h4>
                    <p>Reprehenderit ex, quas repudiandae iste perspiciatis! cum ab aspernatur ducimus omnis enim assumenda!</p>
                    <a href="#" className="read-more"> Read More <i className="fa fa-caret-right" /></a>
                  </li>
                  <li>
                    <div className="about-icon">
                      <i className="icofont icofont-tick-mark" />
                    </div>
                    <h4>Save your Money &amp; Time</h4>
                    <p>Reprehenderit ex, quas repudiandae iste perspiciatis! cum ab aspernatur ducimus omnis enim assumenda!</p>
                    <a href="#" className="read-more"> Read More <i className="fa fa-caret-right" /></a>
                  </li>
                  <li>
                    <div className="about-icon">
                      <i className="icofont icofont-tick-mark" />
                    </div>
                    <h4>Real Time Socail Media Analytics</h4>
                    <p>Reprehenderit ex, quas repudiandae iste perspiciatis! cum ab aspernatur ducimus omnis enim assumenda!</p>
                    <a href="#" className="read-more"> Read More <i className="fa fa-caret-right" /></a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="about-img">
                      <img src="assets/images/about/accom-2.jpg" alt className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="about-img">
                      <img src="assets/images/about/about-img.jpg" alt className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="about-img">
                      <img src="assets/images/about/about-img.jpg" alt className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="about-img">
                      <img src="assets/images/about/accom-3.jpg" alt className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ABOUT STYLES END */}
      </div>

      {/* Footer STYLES  */}
      <Footer />
      {/* FOOTER STYLES END */}
    </div>
  )
}

export default About 
