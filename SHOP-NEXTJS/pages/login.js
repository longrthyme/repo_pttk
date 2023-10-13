import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";

import { signIn, useSession } from 'next-auth/react'

export default function Login() {

    const { login, error, isLoading, user } = useContext(AuthContext);
    
    const [loginInfo, setLoginInfo] = useState({
      username: "",
      password: "",
    });
  

    

    
    

    const handleLogin = (e) => {
        e.preventDefault()
    
        signIn('credentials',
          {
            username : loginInfo.username,
            password: loginInfo.password,
            callbackUrl: `${window.location.origin}/welcome`
          }
        )
      }





    return (

        <section id="wsus__login_register">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 m-auto">
              <div className="wsus__login_reg_area">
                <ul className="nav nav-pills mb-3" id="pills-tab2" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab2" data-bs-toggle="pill" data-bs-target="#pills-homes" type="button" role="tab" aria-controls="pills-homes" aria-selected="true">login</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab2" data-bs-toggle="pill" data-bs-target="#pills-profiles" type="button" role="tab" aria-controls="pills-profiles" aria-selected="true">signup</button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent2">
                  <div className="tab-pane fade show active" id="pills-homes" role="tabpanel" aria-labelledby="pills-home-tab2">
                    <div className="wsus__login">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="wsus__login_input">
                          <i className="fas fa-user-tie" />
                          <input
                  type="text"
                  placeholder=""
                  className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                  required
                  value={loginInfo.username}
                  onChange={(e) =>
                    setLoginInfo({ ...loginInfo, username: e.target.value })
                  }
                />
                        </div>
              
                        <div className="wsus__login_input">
                          <i className="fas fa-key" />
                          <input
                    type="password"
                    placeholder=""
                    className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                    required
                    value={loginInfo.password}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, password: e.target.value })
                    }
                  />
                        </div>
                    
                        <div className="wsus__login_save">
                          <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Remember
                              me</label>
                          </div>
                          <a className="forget_p" href="forgot-password">forget password ?</a>
                        </div>
                        <button className="common_btn" type="submit">login</button>
                        <p className="social_text">Sign in with social account</p>
                        <ul className="wsus__login_link">
                          <li><a href="#"><i className="fab fa-google" /></a></li>
                          <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                          <li><a href="#"><i className="fab fa-twitter" /></a></li>
                          <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                        </ul>
                      </form>
                    </div>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}