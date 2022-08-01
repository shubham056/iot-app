import React from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'

const Contact = () => {
  return (
    <div>
    <Header/>
      <div>
        {/* MAin Navigation END    */}
        {/* Banner STYLES  */}
        <div className="page-banner">
          <div className="dark-overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="page-content">
                  <h2>Let's Talk</h2>
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
              <div className="col-lg-6 col-sm-12">
                <div className="contact-form2">
                  <h4 className="text-uppercase">Say something</h4>
                  <form action="#">
                    <div className="form-group">
                      <input type="email" placeholder="Put your email" name="email" id="email" className="form-control" />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Write subject " name="subject" id="subject" className="form-control" />
                    </div>
                    <div className="form-group">
                      <textarea name="message" id="message" cols={30} rows={4} placeholder="Write Your Message" className="form-control" defaultValue={""} />
                    </div>
                    <a href="#" className="btn btn-primary">Send</a>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="contact-info info-box">
                  <h4 className="text-uppercase">Get in Touch</h4>
                  <p>Eaque suscipit numquam nesciunt, temporibus? Neque veniam similique dolorem beatae iste, inventore incidunt adipisci.</p>
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
    <Footer/>
    {/* FOOTER STYLES END */}
  </div>
  )
}

export default Contact
