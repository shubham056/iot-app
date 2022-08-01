import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/AuthenticationSlice";

export const Header = () => {
    const isAuthenticated = useSelector(selectUser);
    const { user: currentUser } = useSelector((state) => state.auth);
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
                                            <div className="">
                                                <div className="dropdown">
                                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" style={{textTransform:'capitalize'}}>Welcome <b>{`${currentUser.data.profile.first_name} ${currentUser.data.profile.last_name}`}</b>
                                                    
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link className="dropdown-item" to="/profile">Profile</Link>
                                                        <Link className="dropdown-item" to="/change-password">Change Password</Link>
                                                        <Link className="dropdown-item" to="/logout">Logout</Link>
                                                    </div>
                                                </div>
                                            </div>


                                            {/* <li>Welcome <b></b></li> */}
                                            {/* <li class="sub_show"><Link to="#"> {`${currentUser.data.profile.first_name} ${currentUser.data.profile.last_name}`} <i class="icofont icofont-caret-down"></i></Link>

                                                <ul class="sub_nav">
                                                    <li><Link to="" class="logout">Profile</Link></li>
                                                    <li><Link to="" class="logout">Change Password</Link></li>
                                                    <li><Link to="" class="logout">Logout</Link></li>
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
                    <Link className="navbar-brand" to="/">
                        <img src="assets/images/logo.jpg" alt="logo" className="img-fluid logo" />
                    </Link>
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
                                <Link to="/about-us" className="nav-link page-scroll">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/support" className="nav-link page-scroll" >Support</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact-us" className="nav-link page-scroll" >Contact</Link>
                            </li>
                            {
                                isAuthenticated
                                    ?
                                    <>
                                        <li className="nav-item">
                                            <Link to="/listing" className="nav-link page-scroll">Listing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/view-listing" className="nav-link page-scroll">View Listing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/logout" className="nav-link page-scroll" ><strong>Logout</strong></Link>
                                        </li>
                                    </>

                                    :
                                    null
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
