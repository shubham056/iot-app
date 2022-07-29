import React from 'react'
import { Link } from 'react-router-dom'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'

const ViewListing = () => {
  return (
    <>
          <div>
              <Header/>
              {/* MAin Navigation END    */}
              <section className="dashboard_wraper">
                  <div className="container">
                      <div className="row">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                              <div className="row">
                                  <div className="col-lg-6 mx-auto">
                                      <div className="widget_categories right-widget top_heding">
                                          <h4>Area Device Name <i className="icofont icofont-reply-all" /></h4>
                                          <hr />
                                          <div className="tags top_tag">
                                              <Link to="/" className="tag-cloud-link ">Control</Link>
                                              <Link to="/" className="tag-cloud-link ">Diagnostic</Link>
                                              <Link to="/" className="tag-cloud-link ">A117</Link>
                                              <Link to="/" className="tag-cloud-link">Trend</Link>
                                          </div>
                                      </div>
                                      <div className="tags">
                                          <div className="tag_box">
                                              <span>XXXXX</span>
                                              <Link to="/" className="tag-cloud-link ">A101</Link>
                                          </div>
                                          <div className="tag_box">
                                              <span>XXXXX</span>
                                              <Link to="/" className="tag-cloud-link ">A101</Link>
                                          </div>
                                          <div className="tag_box">
                                              <span>XXXXX</span>
                                              <Link to="/" className="tag-cloud-link ">A101</Link>
                                          </div>
                                          <div className="tag_box">
                                              <span>XXXXX</span>
                                              <Link to="/" className="tag-cloud-link ">A101</Link>
                                          </div>
                                      </div>
                                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                          <div className="row">
                                              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
                                                  <div className="row">
                                                      <div className="tags left_wraper">
                                                          <Link to="/" className="tag-cloud-link bg_green">Power</Link>
                                                          <Link to="/" className="tag-cloud-link ">Energy</Link>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12">
                                                  <div className="row right_wraper">
                                                      <div className="tags ">
                                                          <span>XXXXX</span>
                                                          <Link to="/" className="tag-cloud-link bg_green">Daily</Link>
                                                          <Link to="/" className="tag-cloud-link">Monthly</Link>
                                                      </div>
                                                      <div className="graph_wraper">
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="tags bottom_tag">
                                          <Link to="/" className="tag-cloud-link bg_green">Total</Link>
                                          <Link to="/" className="tag-cloud-link ">Phase - 1</Link>
                                          <Link to="/" className="tag-cloud-link ">Phase - 2</Link>
                                          <Link to="/" className="tag-cloud-link">Phase - 3</Link>
                                      </div>
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
 
    </>
  )
}

export default ViewListing
