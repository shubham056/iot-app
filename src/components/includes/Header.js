import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/AuthenticationSlice";

export const Header = () => {
    const isAuthenticated = useSelector(selectUser);
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
                                {
                                    isAuthenticated
                                        ?
                                        <>
                                         <li><Link to="/logout" class="logout">Logout</Link></li>
                                            {/* <li class="sub_show"><a href="javascript:void(0)"> Surender Kumar <i class="icofont icofont-caret-down"></i></a>

                                                <ul class="sub_nav">
                                                    <li><a href="" class="logout">Logout</a></li>
                                                </ul>
                                            </li> */}
                                        </>
                                        :
                                        <>
                                            <li><Link to="/login"><i className="icofont icofont-login" /> Login</Link></li>
                                            <li><Link to="/signup"><i className="icofont icofont-ui-user" /> Register</Link></li>
                                        </>

                                }


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
                                <Link to="/" className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link page-scroll">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link page-scroll" >Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link page-scroll" >Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
