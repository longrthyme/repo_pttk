export default function Footer() {
  return (
    <footer className="footer_2">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-xl-3 col-sm-7 col-md-6 col-lg-3">
                <div className="wsus__footer_content">
                  <a className="wsus__footer_2_logo" href="#">
                    <img src="images/logo_2.png" alt="logo" />
                  </a>
                  <a className="action" href="callto:+8896254857456"><i className="fas fa-phone-alt" />
                    +8896254857456</a>
                  <a className="action" href="mailto:example@gmail.com"><i className="far fa-envelope" />
                    example@gmail.com</a>
                  <p><i className="fal fa-map-marker-alt" /> San Francisco City Hall, San Francisco, CA</p>
                  <ul className="wsus__footer_social">
                    <li><a className="facebook" href="#"><i className="fab fa-facebook-f" /></a></li>
                    <li><a className="twitter" href="#"><i className="fab fa-twitter" /></a></li>
                    <li><a className="whatsapp" href="#"><i className="fab fa-whatsapp" /></a></li>
                    <li><a className="pinterest" href="#"><i className="fab fa-pinterest-p" /></a></li>
                    <li><a className="behance" href="#"><i className="fab fa-behance" /></a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-sm-5 col-md-4 col-lg-2">
                <div className="wsus__footer_content">
                  <h5>Company</h5>
                  <ul className="wsus__footer_menu">
                    <li><a href="#"><i className="fas fa-caret-right" /> About Us</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Team Member</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Career</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Contact Us</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Affilate</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Order History</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Team Member</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-2 col-sm-5 col-md-4 col-lg-2">
                <div className="wsus__footer_content">
                  <h5>Company</h5>
                  <ul className="wsus__footer_menu">
                    <li><a href="#"><i className="fas fa-caret-right" /> About Us</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Team Member</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Career</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Contact Us</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Affilate</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Order History</a></li>
                    <li><a href="#"><i className="fas fa-caret-right" /> Team Member</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-sm-7 col-md-8 col-lg-5">
                <div className="wsus__footer_content wsus__footer_content_2">
                  <h3>Subscribe To Our Newsletter</h3>
                  <p>Get all the latest information on Events, Sales and Offers.
                    Get all the latest information on Events.</p>
                  <form>
                    <input type="text" placeholder="Search..." />
                    <button type="submit" className="common_btn">subscribe</button>
                  </form>
                  <div className="footer_payment">
                    <p>We're using safe payment for :</p>
                    <img src="images/credit2.png" alt="card" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wsus__footer_bottom">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="wsus__copyright d-flex justify-content-center">
                    <p>Copyright © 2021 Sazao shop. All Rights Reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
  );
}
