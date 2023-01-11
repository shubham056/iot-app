import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer id="main-footer" className="footer-color">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="footer-logo">
            <img src="/assets/images/logo2.png" alt="img" className="img-fluid" />
          </div>
          <div className="footer-menu2">
            <ul>
              <li>06 Highley St, Victoria,california Australia.</li>
              <li>+566-7798093435</li>
              <li>emailbox@email.com</li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="footer-menu2">
            <ul>
              <li><Link to="/">Content management</Link></li>
              <li><Link to="/">Email Marketing</Link></li>
              <li><Link to="/">Social Marketing</Link></li>
              <li><Link to="/">Keyword Alanytics</Link></li>
              <li><Link to="/">Site Optimization</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="footer-menu2">
            <ul>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms &amp; Conditions</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Affiliates</Link></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="footer-menu2">
            <ul>
              <li><Link to="/">Services</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms &amp; Conditions</Link></li>
              <li><Link to="/">FAQ</Link></li>
              <li><Link to="/">Affiliates</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-12 col-sm-12">
          <div className="footer-btm text-center">
            <p>Copyright Reserved to <span>AGILE INDUSTRIES @2022</span></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}
