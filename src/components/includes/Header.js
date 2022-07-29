import React from 'react'

export const Header = () => {
    return (
        <header>
            <div className="top_heder">
                <div className="container">
                    <div className="top_bx">
                        <div className="top_left">
                            <ul>
                                <li>
                                    <span><i className="icofont icofont-email" /> email@companyname.com</span>
                                </li>
                                <li>
                                    <span><i className="icofont icofont-phone" /> +234-5657865</span>
                                </li>
                            </ul>
                        </div>
                        <div className="top_right">
                            <ul>
                                <li><a href><i className="icofont icofont-login" /> Login</a></li>
                                <li><a href><i className="icofont icofont-ui-user" /> Register</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src="assets/images/logo.jpg" alt="logo" className="img-fluid logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#about">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#blog">Support</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link page-scroll" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
