import AuthContext from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";

import { signIn, useSession } from "next-auth/react";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useRouter } from "next/router";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import errorCodes from "@/constant/ErrorCode";
import successCodes from "@/constant/SuccessCode";

export default function Login() {

  const [error, setError] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onLogin = (data) => {
    

    // login with next-auth
    signIn("credentials", {
      username: data.username,
      password: data.password,
      callbackUrl: `${window.location.origin}/`,
      redirect: false
    })
    .then(({ ok, error }) => {
      if (ok) {
        toast.success(successCodes.AUTHENTICATION_SUCCESS);
          router.push("/");
      } else {
          console.log("result login " + error)
          toast.error(error);
      }
  })


  }
  const { data: session } = useSession();
  const token = session?.accessToken;

  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);


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
                <li className="nav-item" role="presentation" onClick={() => router.push("/account/signUp")}>
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
                    <form onSubmit={handleSubmit(onLogin)}>
                      <div className="wsus__login_input">
                        <i className="fas fa-user-tie" />
                        <input
                          type="text"
                          placeholder=""
                          className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"


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
                        <i className="fas fa-key" />
                        <input
                          type="password"
                          placeholder=""
                          className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                        //   value={loginInfo.password}
                        //   onChange={(e) =>
                        //     setLoginInfo({
                        //       ...loginInfo,
                        //       password: e.target.value,
                        //     })
                        //   }

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


                      <div className="wsus__login_save">
                     
                        <a className="forget_p" href="forgot-password">
                          forget password ?
                        </a>
                      </div>
                      <button className="common_btn" type="submit">
                        login
                      </button>
                      {/* <p className="social_text">Sign in with social account</p> */}
                      {/* <ul className="wsus__login_link">
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
                      </ul> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
Login.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
