import React from 'react'
import { Footer } from '../components/includes/Footer'
import { Header } from '../components/includes/Header'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div>
            <Header />
            {/* MAin Navigation END    */}
            <section className="dashboard_wraper">

                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="dashboard_wrap">
                                    <div className='text-center'> 
                                        <h1>
                                            Oops!</h1>
                                        <h2>
                                            404 Not Found</h2>
                                        <div className="error-details">
                                            Sorry, an error has occured, Requested page not found!
                                        </div>
                                        <br/>
                                        <div className="error-actions">
                                            <Link to="/" className="btn btn-primary btn-lg m-10" style={{ margin: 10,textTransform:'capitalize' }}><i className="icofont icofont-home"></i>
                                                Take Me Home </Link>
                                            <Link to="/support" className="btn btn-info btn-lg " style={{ margin: 10,textTransform:'capitalize' }}><i className="icofont icofont-envelope"></i> Contact Support </Link>
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

export default NotFound
