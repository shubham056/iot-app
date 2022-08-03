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
                        <span className="lbl">Menu Group ii</span>
                      </a>
                      <ul className="children nav-child unstyled small collapse" id="sub-item-1">
                        <li className="item-9 deeper parent">
                          <a className href="#">
                            <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-2" className="sign"><i className="icofont icofont-plus" /></span>
                            <span className="lbl">Menu 1</span>
                          </a>
                          <ul className="children nav-child unstyled small collapse nav_children" id="sub-item-2">
                            <li className="item-10">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 1.1</span>
                              </a>
                            </li>
                            <li className="item-11">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 1.2</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="item-12 deeper parent">
                          <a className href="#">
                            <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-5" className="sign"><i className="icofont icofont-plus" /></span>
                            <span className="lbl">Menu 2</span>
                          </a>
                          <ul className="children nav-child unstyled small collapse nav_children" id="sub-item-5">
                            <li className="item-13">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 2.1</span>
                              </a>
                            </li>
                            <li className="item-14">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 2.2</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li className="item-8 deeper parent">
                      <a className href="#">
                        <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-8" className="sign"><i className="icofont icofont-plus" /></span>
                        <span className="lbl">Add Device</span>
                      </a>
                      <ul className="children nav-child unstyled small collapse" id="sub-item-8">
                        <li className="item-9 deeper parent">
                          <a className href="#">
                            <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-9" className="sign"><i className="icofont icofont-plus" /></span>
                            <span className="lbl">Menu 1</span>
                          </a>
                          <ul className="children nav-child unstyled small collapse nav_children" id="sub-item-9">
                            <li className="item-10">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 1.1</span>
                              </a>
                            </li>
                            <li className="item-11">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 1.2</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="item-12 deeper parent">
                          <a className href="#">
                            <span data-toggle="collapse" data-parent="#menu-group-1" href="#sub-item-12" className="sign"><i className="icofont icofont-plus" /></span>
                            <span className="lbl">Menu 2</span>
                          </a>
                          <ul className="children nav-child unstyled small collapse nav_children" id="sub-item-12">
                            <li className="item-13">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 2.1</span>
                              </a>
                            </li>
                            <li className="item-14">
                              <a className href="#">
                                <span className="sign"><i className="icofont icofont-bubble-right" /></span>
                                <span className="lbl">Menu 2.2</span>
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-sm-12">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="welcome_wraper">
                    <div className="section-heading text-center">
                      <h2>Welcome</h2>
                      <p className>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                      <div className="seperator" />
                    </div>
                  </div>
                  <div className="second_box" style={{ display: 'none' }}>
                    <form className="form-inline">
                      <div className="form-group">
                        <label htmlFor="inputPassword2" className="sr-only">Type Here</label>
                        <input type="text" className="form-control" id="inputPassword2" placeholder="Type Here" />
                      </div>
                      <button type="submit" className="btn btn-primary">Confirm identity</button>
                    </form>
                  </div>
                  <div className="second_box third_box" style={{ display: 'none' }}>
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
                  <div className="grpah_table" style={{ display: 'none' }}>
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
