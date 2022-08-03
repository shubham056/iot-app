import React from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'

const Dashboard = () => {
  return (
    <div>
      <Header />
      {/* MAin Navigation END    */}
      
      <section className="main-slider">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12">
              <div className>
                <div id="left" className="span3">
                  <ul id="menu-group-1" className="nav menu">
                    <li className="item-1 deeper parent active">
                      <a className href="#">
                        <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-1" className="sign"><i className="icofont icofont-plus" /></span>
                        <span className="lbl">User Name</span>
                      </a>
                      <ul className="children nav-child unstyled small collapse" id="sub-item-1">
                        <li className="item-9 deeper parent">
                          <a className href="#">
                            <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-2" className="sign"><i className="icofont icofont-plus" /></span>
                            <span className="lbl">Area Name</span>
                          </a>
                          <ul className="children nav-child unstyled small collapse nav_children" id="sub-item-2">
                            <li className="item-10">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Device 1</span>
                              </a>
                            </li>
                            <li className="item-11">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Device 2</span>
                              </a>
                            </li>
                            <li className="item-11">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Device 3</span>
                              </a>
                            </li>
                            <div className="button_in">
                              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i className="icofont icofont-plus" /> Add Area</button>
                              <button type="button" className="btn btn-primary"><i className="icofont icofont-plus" /> Add Device</button>
                            </div>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <div className="button_left">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i className="icofont icofont-plus" /> Add New Area</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  {/* MultiStep Form */}
                  <div className id="grad1">
                    <div className="justify-content-center mt-0">
                      <div className="text-center">
                        <div className="card">
                          <h2><strong>Sign Up Your User Account</strong></h2>
                          <p>Fill all form field to go to next step</p>
                          <div className="row">
                            <div className="col-md-12 mx-0">
                              <form id="msform">
                                {/* progressbar */}
                                <ul id="progressbar">
                                  <li className="active" id="account"><strong>Step-1</strong></li>
                                  <li id="personal"><strong>Step-2</strong></li>
                                  <li id="confirm"><strong>Finish</strong></li>
                                </ul>
                                {/* fieldsets */}
                                <fieldset>
                                  <div className="form-card">
                                    <h2 className="fs-title">Information</h2>
                                    <div className="second_box third_box">
                                      <div className="form-group">
                                        <label htmlFor="exampleFormControlSelect1">Example select</label>
                                        <select className="form-control" id="exampleFormControlSelect1">
                                          <option>1</option>
                                          <option>2</option>
                                          <option>3</option>
                                          <option>4</option>
                                          <option>5</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <input type="button" name="next" className="next action-button" defaultValue="Next Step" />
                                </fieldset>
                                <fieldset>
                                  <div className="form-card">
                                    <h2 className="fs-title">Information</h2>
                                    <div className="second_box">
                                      <div className="form-inline">
                                        <div className="form-group">
                                          <label htmlFor="inputPassword2" className="sr-only">Type Here</label>
                                          <input type="text" className="form-control" id="inputPassword2" placeholder="Type Here" />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Confirm identity</button>
                                      </div>
                                    </div>
                                  </div>
                                  <input type="button" name="previous" className="previous action-button-previous" defaultValue="Previous" />
                                  <input type="button" name="next" className="next action-button" defaultValue="Next Step" />
                                </fieldset>
                                <fieldset>
                                  <div className="form-card">
                                    <h2 className="fs-title text-center">Success !</h2>
                                    <br /><br />
                                    <div className="row justify-content-center">
                                      <div className="col-3">
                                        <img src="https://img.icons8.com/color/96/000000/ok--v2.png" className="fit-image" />
                                      </div>
                                    </div>
                                    <br /><br />
                                    <div className="row justify-content-center">
                                      <div className="col-7 text-center">
                                        <h5>You Have Successfully Signed Up</h5>
                                      </div>
                                    </div>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="grpah_table">
                    <div className="col-lg-12 box_graph device_name">
                      <div className="widget_categories right-widget top_heding ">
                        <h4>Area Device Name <span /> <i className="icofont icofont-reply-all" /></h4>
                      </div>
                    </div>
                    <div className="col-lg-12 box_graph">
                      <div className="widget_categories right-widget top_heding">
                        <div className="tags top_tag">
                          <a href="#" className="tag-cloud-link ">Control</a>
                          <a href="#" className="tag-cloud-link ">Diagnostic</a>
                          <a href="#" className="tag-cloud-link ">A117</a>
                          <a href="#" className="tag-cloud-link">Trend</a>
                        </div>
                      </div>
                      <div className="tags">
                        <div className="tag_box">
                          <span>XXXXX</span>
                          <a href="#" className="tag-cloud-link ">A101</a>
                        </div>
                        <div className="tag_box">
                          <span>XXXXX</span>
                          <a href="#" className="tag-cloud-link ">A101</a>
                        </div>
                        <div className="tag_box">
                          <span>XXXXX</span>
                          <a href="#" className="tag-cloud-link ">A101</a>
                        </div>
                        <div className="tag_box">
                          <span>XXXXX</span>
                          <a href="#" className="tag-cloud-link ">A101</a>
                        </div>
                      </div>
                      <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="row">
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <div className="row">
                              <div className="tags left_wraper">
                                <a href="#" className="tag-cloud-link bg_green">Power</a>
                                <a href="#" className="tag-cloud-link ">Energy</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                            <div className="row right_wraper">
                              <div className="tags ">
                                <span>XXXXX</span>
                                <a href="#" className="tag-cloud-link bg_green">Daily</a>
                                <a href="#" className="tag-cloud-link">Monthly</a>
                              </div>
                              <div className="graph_wraper">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tags bottom_tag">
                        <a href="#" className="tag-cloud-link bg_green">Total</a>
                        <a href="#" className="tag-cloud-link ">Phase - 1</a>
                        <a href="#" className="tag-cloud-link ">Phase - 2</a>
                        <a href="#" className="tag-cloud-link">Phase - 3</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* Footer STYLES  */}
      <Footer />
      {/* FOOTER STYLES END */}
    </div>
  )
}
export default Dashboard
