import React from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'

const Home = () => {
  return (
    <>
      <div>
        <Header />
        {/* MAin Navigation END    */}
        {/* Banner Slider Start    */}
        <div id="banner-slider" className="carousel slide">
          
          <div className="carousel-inner">
            <div className="carousel-item ">
              <div className="slider1">
                <div className="dark-overlay" />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-sm-12 m-auto text-center">
                      <div className="slider-content white ">
                        <h1>Internet of things (IoT), data <br />visualization, hardware monitors</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                        <a href="#" className="btn btn-primary circled">Learn More</a>
                        <a href="#" className="btn btn-trans-white ml5 circled">Services</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item active ">
              <div className="slider2">
                <div className="dark-overlay" />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-sm-12 m-auto text-center">
                      <div className="slider-content white ">
                        <h1>Internet of things (IoT), data <br />visualization, hardware monitors</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                        <a href="#" className="btn btn-primary circled">Learn More</a>
                        <a href="#" className="btn btn-trans-white ml5 circled">Services</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="slider3">
                <div className="dark-overlay" />
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8 col-sm-12 m-auto text-center ">
                      <div className="slider-content white ">
                        <h1>Internet of things (IoT), data <br />visualization, hardware monitors</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                        <a href="#" className="btn btn-success ml5 circled">Services</a>
                        <a href="#" className="btn btn-trans-white circled">Learn More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#banner-slider" role="button" data-slide="prev">
            <span className="fa fa-long-arrow-left" aria-hidden="true" />
          </a>
          <a className="carousel-control-next" href="#banner-slider" role="button" data-slide="next">
            <span className="fa fa-long-arrow-right" aria-hidden="true" />
          </a>
        </div>
        {/* Banner Slider End    */}
        {/* Top Features STYLES  */}
        <section id="top-features">
          <div className="container">
            <div className="top-feature-bg">
              <div className="row">
                <div className="col-lg-4 col-sm-6 ">
                  <div className="feature-box data-aos" data-aos="fade-up">
                    <div className="feature-icon">
                      <i className="icofont icofont-diamond" />
                    </div>
                    <h4>Modern Design</h4>
                    <p>Clean and Fresh Design to use.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="feature-box data-aos" data-aos="fade-up" data-aos-delay={300}>
                    <div className="feature-icon">
                      <i className="icofont icofont-wallet" />
                    </div>
                    <h4>Affordable Cost</h4>
                    <p>Clean and Fresh Design to use.</p>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="feature-box data-aos" data-aos="fade-up" data-aos-delay={400}>
                    <div className="feature-icon">
                      <i className="icofont icofont-users" />
                    </div>
                    <h4>Exerienced Team</h4>
                    <p>Clean and Fresh Design to use.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Top Features STYLES  */}
        <div className="clearfix" />
        {/* Pricing STYLES  */}
        <section id="pricing" className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto col-sm-12 data-aos" data-aos="fade-up">
                <div className="section-heading text-center">
                  <h2>Heading Text</h2>
                  <p className="text-muted lead">Great service with best options</p>
                  <div className="seperator" />
                </div>
              </div>
              <div className="col-lg-12 m-auto col-sm-12 data-aos" data-aos="fade-up">
                <div className="value_wraper">
                  <div className="value_output">
                    <span className="value_name">Source Utillity(Line)</span>
                    <span id="rangeValue">Output Load 0%</span>
                    <input className="range" type="range" name="dsd" defaultValue={0} min={0} max={1000} />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="pricing-box data-aos" data-aos="fade-up">
                  <h4>Solor Panels</h4>
                  <span id="rangeValue">519 W</span>
                  <input className="range" type="range" name="" defaultValue="519 W" min={519} max={1000} />
                  <h4>77.3 V / 8A</h4>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="pricing-box data-aos" data-aos="fade-up">
                  <h4>Ac Output</h4>
                  <span id="rangeValue">519 W</span>
                  <input className="range" type="range" name="" defaultValue="519 W" min={519} max={1000} />
                  <h4>77.3 V / 8A</h4>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="pricing-box data-aos" data-aos="fade-up">
                  <h4>Battery Info</h4>
                  <span id="rangeValue">519 W</span>
                  <input className="range" type="range" name="" defaultValue="519 W" min={519} max={1000} />
                  <h4>77.3 V / 8A</h4>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="pricing-box data-aos" data-aos="fade-up">
                  <h4>Input / Grid</h4>
                  <span id="rangeValue">519 W</span>
                  <input className="range" type="range" name="" defaultValue="519 W" min={519} max={1000} />
                  <h4>77.3 V / 8A</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* PRICING STYLES END */}
        {/* ABOUT STYLES2  */}
        <section className="bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-6 data-aos" data-aos="fade-right">
                <div className="about-img-2">
                  <img src="assets/images/about/combination-chart.png" alt className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6 col-sm-6 data-aos" data-aos="fade-left">
                <div className="about-feature">
                  <h2>Trusted partners Reliable Product Supply</h2>
                  <p>Corporis facilis officia, excepturi dignissimos, vitae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis, iure debitis id. Quaerat.</p>
                  <ul>
                    <li>
                      <h3><span><i className="icofont icofont-search" /></span>Research</h3>
                      <p>we are relaible itae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis</p>
                    </li>
                    <li>
                      <h3><span><i className="icofont icofont-code" /></span>Development</h3>
                      <p>we are relaible itae aut fugiat maiores est blanditiis distinctio, reiciendis voluptatibus labore cum nobis</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="about-btn">
              <div className="row">
                <div className="col-lg-9">
                  <h3>Let's Work together</h3>
                  <p className="text-muted">Start Your project with easy pricing and attract your visitors</p>
                </div>
                <div className="col-lg-2 text-right">
                  <a href="#" className="btn btn-primary circled">See Pricing</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ABOUT STYLES2  */}
        {/* Reviews STYLES  */}
        <section id="review" className>
          <div className="feature-overlay" />
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto col-sm-12">
                <div className="owl-carousel owl-theme " id="review-carousel">
                  <div className="review-content">
                    <div className="client-review-img">
                      <img src="assets/images/clients/img-1.jpg" alt className="img-fluid " />
                    </div>
                    <p>High Life narwhal, banh mi PBR single-origin coffee Odd Future actually aliqua polaroid befor.We design beautiful modern engaging websites that always latest responsive technologies.</p>
                    <div className="client-info">
                      <h3>Jessy Thomas</h3>
                      <p>CEO</p>
                    </div>
                  </div>
                  <div className="review-content">
                    <div className="client-review-img">
                      <img src="assets/images/clients/img-1.jpg" alt className="img-fluid " />
                    </div>
                    <p>Focus on engaging, reusable content that decrease the cost per leads while helps you to increase profits margin.modern engaging websites that always latest responsive technologies.</p>
                    <div className="client-info">
                      <h3>Jessy Thomas2</h3>
                      <p>CEO</p>
                    </div>
                  </div>
                  <div className="review-content">
                    <div className="client-review-img">
                      <img src="assets/images/clients/img-1.jpg" alt className="img-fluid " />
                    </div>
                    <p>High Life narwhal, banh mi PBR single-origin coffee Odd Future actually aliqua polaroid befor.We design beautiful modern engaging websites that always latest responsive technologies.</p>
                    <div className="client-info">
                      <h3>Jessy Thomas3</h3>
                      <p>CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* REVIEWS STYLES END */}
        {/* Footer STYLES  */}

        <Footer />

        {/* FOOTER STYLES END */}
      </div>

    </>
  )
}

export default Home