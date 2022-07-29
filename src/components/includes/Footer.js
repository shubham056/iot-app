import React from 'react'

export const Footer = () => {
  return (
    <footer id="main-footer" className="footer-color">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="footer-logo">
            <img src="assets/images/logo2.png" alt className="img-fluid" />
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="footer-menu2">
            <ul>
              <li><a href="#">Content management</a></li>
              <li><a href="#">Email Marketing</a></li>
              <li><a href="#">Social Marketing</a></li>
              <li><a href="#">Keyword Alanytics</a></li>
              <li><a href="#">Site Optimization</a></li>
              <li><a href="#">Pay per click</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="footer-menu2">
            <ul>
              <li><a href="#">Services</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Affiliates</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="footer-menu2">
            <ul>
              <li>06 Highley St, Victoria,california Australia.</li>
              <li>Highley St, park-Victoria, Australia.</li>
              <li>+566-7798093435</li>
              <li>emailbox@email.com</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-6 col-sm-6">
          <div className="footer-btm">
            <p>Business Template made by <span>AGILE INDUSTRIES</span></p>
          </div>
        </div>
        <div className="col-lg-6 col-sm-6">
          <div className="footer-btm text-right">
            <p>Copyright Reserved to <span>AGILE INDUSTRIES @2022</span></p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}
