import React from 'react'
import { Header } from '../components/includes/Header'
import { Footer } from '../components/includes/Footer'

const Support = () => {
  return (
    <div>
      <Header />
      <div>
        {/* MAin Navigation END    */}
        {/* Banner STYLES  */}
        <div className="page-banner page-banner-support">
          <div className="dark-overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-content">
                  <h2>Support</h2>
                  <p className="text-muted lead">Know more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Banner STYLES  */}
        {/*  COntact FORM styles  */}
        <section id="contact">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-sm-12">
                <div className="contact-info info-box support-info">
                  <h4 className="text-uppercase">Get in Touch</h4>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  <ul>
                    <li>
                      <i className="fa fa-envelope" />
                      <span>companyname@mail.com</span>
                    </li>
                    <li>
                      <i className="fa fa-mobile" />
                      <span>+234-5657865</span>
                    </li>
                    <li>
                      <i className="fa fa-map-marker" />
                      <span>wel street,park lon, USA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  CONTACT FORM styles END */}
      </div>

      {/* Footer STYLES  */}
      <Footer />
      {/* FOOTER STYLES END */}
    </div>
  )
}

export default Support
