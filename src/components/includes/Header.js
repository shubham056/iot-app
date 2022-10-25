import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/AuthenticationSlice";

export const Header = () => {
    let activeStyle = {
        // textDecoration: "underline",
        // color: 'blue'
    };

    let activeClassName = "underline";
    const isAuthenticated = useSelector(selectUser);
    const { user: currentUser } = useSelector((state) => state.auth);
    return (
        <header>

            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="assets/images/logo.jpg" alt="logo" className="img-fluid logo" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse " id="navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            {
                                isAuthenticated
                                    ?
                                    <li className="nav-item">
                                        <NavLink
                                            style={({ isActive }) =>
                                                isActive ? activeStyle : undefined
                                            }
                                            to="/dashboard"
                                            className="nav-link page-scroll">
                                            Dashboard
                                        </NavLink>
                                    </li>

                                    :
                                    <li className="nav-item">
                                        <NavLink
                                            style={({ isActive }) =>
                                                isActive ? activeStyle : undefined
                                            }
                                            to="/"
                                            className="nav-link page-scroll">
                                            Home
                                        </NavLink>
                                    </li>
                            }

                            <li className="nav-item">
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    to="/about-us"
                                    className="nav-link page-scroll">
                                    About
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    to="/support"
                                    className="nav-link page-scroll" >
                                    Support
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    style={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }
                                    to="/contact-us"
                                    className="nav-link page-scroll" >
                                    Contact
                                </NavLink>
                            </li>
                            {
                                isAuthenticated
                                    ?
                                    <>
                                        {/* <li className="nav-item">
                                            <Link to="/listing" className="nav-link page-scroll">Listing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/view-listing" className="nav-link page-scroll">View Listing</Link>
                                        </li> */}
                                        <div className="top_right">
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false" style={{ textTransform: 'capitalize', borderRadius: 25 }}>Welcome <b>{`${currentUser.data.profile.first_name} ${currentUser.data.profile.last_name}`}</b>

                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                                    <Link className="dropdown-item" to="/change-password">Change Password</Link>
                                                    <Link className="dropdown-item" to="/logout">Logout</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                    :
                                    <li className="nav-item">
                                        <Link className="btn btn-primary btn-sm circled" to="/portal">Portal</Link>
                                    </li>
                            }



                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
