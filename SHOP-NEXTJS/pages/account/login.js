import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useRouter } from "next/router";

export default function Auth() {
  const { login, error, isLoading, user } = useContext(AuthContext);

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });


  const [signUp, setSignUp] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: ""
  });


  const { data: session } = useSession();
  const token = session?.accessToken;

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  // handle sign up

  //
  const onSignUp = async (e) => {
    e.preventDefault();

    const resPos = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp),
    });

    // extract the JSON response body
    let resData = await resPos.json();

    if (!resPos.ok) {
      toast.error(resData.message);
      return;
    } else {
      toast.success("Register successfully !");
    }
    setRegister(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    signIn("credentials", {
      username: loginInfo.username,
      password: loginInfo.password,
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <section id="wsus__login_register">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 m-auto">
            <div className="wsus__login_reg_area">
              <ul className="nav nav-pills mb-3" id="pills-tab2" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab2"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-homes"
                    type="button"
                    role="tab"
                    aria-controls="pills-homes"
                    aria-selected="true"
                  >
                    login
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab2"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profiles"
                    type="button"
                    role="tab"
                    aria-controls="pills-profiles"
                    aria-selected="true"
                  >
                    signup
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent2">
                <div
                  className="tab-pane fade show active"
                  id="pills-homes"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab2"
                >
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
                            setLoginInfo({
                              ...loginInfo,
                              username: e.target.value,
                            })
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
                            setLoginInfo({
                              ...loginInfo,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="wsus__login_save">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                          >
                            Remember me
                          </label>
                        </div>
                        <a className="forget_p" href="forgot-password">
                          forget password ?
                        </a>
                      </div>
                      <button className="common_btn" type="submit">
                        login
                      </button>
                      <p className="social_text">Sign in with social account</p>
                      <ul className="wsus__login_link">
                        <li>
                          <a href="#">
                            <i className="fab fa-google" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                      </ul>
                    </form>
                  </div>
                </div>

                {/* start sign up */}

                <div
                  className="tab-pane fade"
                  id="pills-profiles"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab2"
                >
                  <div className="wsus__login">
                    <form action="" onSubmit={onSignUp} method="post">
                      <div className="wsus__login_input">
                        <i className="fas fa-user-tie" />
                        <input
                          type="text"
                          placeholder="Username"
                          name="username"
                          value={signUp.username}
                          onChange={(e) =>
                            setSignUp({ ...signUp, username: e.target.value })
                          }
                        />
                      </div>
                      <div className="wsus__login_input">
                        <i className="far fa-envelope" />
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={signUp.email}
                          onChange={(e) =>
                            setSignUp({ ...signUp, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="wsus__login_input">
                        <i className="fas fa-key" />
                        <input
                          type="text"
                          placeholder="Password"
                          name="password"
                          value={signUp.password}
                          onChange={(e) =>
                            setSignUp({ ...signUp, password: e.target.value })
                          }
                        />
                      </div>
                      <div className="wsus__login_input">
                        <i className="fas fa-key" />
                        <input
                          type="text"
                          placeholder="Confirm Password"
                          name="rePassword"
                          value={signUp.rePassword}
                          onChange={(e) =>
                            setSignUp({ ...signUp, rePassword: e.target.value })
                          }
                        />
                      </div>
                      <div className="wsus__login_save">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckDefault03"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault03"
                          >
                            I consent to the privacy policy
                          </label>
                        </div>
                      </div>
                      <button className="common_btn" type="submit">
                        signup
                      </button>
                    </form>
                  </div>
                </div>

                {/* end sign up */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
Auth.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
