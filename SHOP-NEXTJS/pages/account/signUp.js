import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useRouter } from "next/router";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import errorCodes from "@/constant/ErrorCode";

export default function Auth() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: session } = useSession();
  const token = session?.accessToken;

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);

  const onSubmit = async (data) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
      rePassword: data.rePassword,
    };

    const resPos = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // extract the JSON response body
    let resData = await resPos.json();

    if (!resPos.ok) {
      if (resPos.status == "400") {
        resData.error.map((err) => toast.error(err.split(":")[1]));
      } else {
        toast.error(resData.message);
      }

      return;
    } else {
      toast.success("Register successfully !");
      reset();
    }
  };

  return (
    <section id="wsus__login_register">
      <div className="container">
        <div className="row">
          <div className="col-xl-5 m-auto">
            <div className="wsus__login_reg_area">
              <ul className="nav nav-pills mb-3" id="pills-tab2" role="tablist">
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => router.push("/account/login")}
                >
                  <button
                    className="nav-link"
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
                <li
                  className="nav-item"
                  role="presentation"
                  onClick={() => router.push("/account/signUp")}
                >
                  <button
                    className="nav-link active"
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
                {/* <div
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
                </div> */}

                {/* start sign up */}

                <div
                  className="tab-pane fade show active"
                  id="pills-profiles"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab2"
                >
                  <div className="wsus__login">
                    <form
                      action=""
                      onSubmit={handleSubmit(onSubmit)}
                      method="post"
                    >
                      <div className="wsus__login_input">
                        <i className="fas fa-user-tie" />
                        <input
                          type="text"
                          placeholder="Username"
                          // name="username"
                          // value={signUp.username}
                          // onChange={(e) =>
                          //   setSignUp({ ...signUp, username: e.target.value })
                          // }
                          {...register("username", {
                            required: errorCodes.USERNAME_IS_REQUIRED,
                            minLength: {
                              value: 5,
                              message: errorCodes.USERNAME_IS_NOT_MEET,
                            },
                          })}
                        />
                      </div>
                      <p>
                        {" "}
                        {errors.username && (
                          <p className="text-red-600 ml-10 mt-2">
                            {errors?.username.message || "Error"}
                          </p>
                        )}
                      </p>
                      <div className="wsus__login_input">
                        <i className="far fa-envelope" />
                        <input
                          type="text"
                          placeholder="Email"
                          // name="email"
                          // value={signUp.email}
                          // onChange={(e) =>
                          //   setSignUp({ ...signUp, email: e.target.value })
                          // }
                          {...register("email", {
                            required: errorCodes.EMAIL_IS_REQUIRED,
                            pattern: {
                              value: /^\S+@\S+\.\S+$/,
                              message: errorCodes.EMAIL_IS_NOT_VALID,
                            },
                          })}
                        />
                      </div>
                      <p>
                        {" "}
                        {errors.email && (
                          <p className="text-red-600 ml-10 mt-2">
                            {errors?.email.message || "Error"}
                          </p>
                        )}
                      </p>
                      <div className="wsus__login_input">
                        <i className="fas fa-key" />
                        <input
                          type="text"
                          placeholder="Password"
                          // name="password"
                          // value={signUp.password}
                          // onChange={(e) =>
                          //   setSignUp({ ...signUp, password: e.target.value })
                          // }
                          {...register("password", {
                            required: errorCodes.PASSWORD_IS_REQUIRED,
                            minLength: {
                              value: 6,
                              message: errorCodes.PASSWORD_AT_LEAST,
                            },
                          })}
                        />
                      </div>
                      <p>
                        {" "}
                        {errors.password && (
                          <p className="text-red-600 ml-10 mt-2">
                            {errors?.password.message || "Error"}
                          </p>
                        )}
                      </p>
                      <div className="wsus__login_input">
                        <i className="fas fa-key" />
                        <input
                          type="text"
                          placeholder="Confirm Password"
                          // name="rePassword"
                          // value={signUp.rePassword}
                          // onChange={(e) =>
                          //   setSignUp({ ...signUp, rePassword: e.target.value })
                          // }
                          {...register("rePassword", {
                            required: errorCodes.REPASSWORD_IS_REQUIRED,
                            minLength: {
                              value: 6,
                              message: errorCodes.REPASSWORD_IS_NOT_MEET,
                            },
                          })}
                        />
                      </div>
                      <p>
                        {" "}
                        {errors.rePassword && (
                          <p className="text-red-600 ml-10 mt-2">
                            {errors?.rePassword.message || "Error"}
                          </p>
                        )}
                      </p>
                      <div className="wsus__login_save">
                        <div
                          className="form-check form-switch"
                          onClick={() => router.push("/account/login")}
                        >
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault03"
                          >
                            Sign in
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
