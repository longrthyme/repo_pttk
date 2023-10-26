import SpinTip from "@/components/loading/SpinTip";
import { API_URL } from "@/config";
import errorCodes from "@/constant/ErrorCode";
import successCodes from "@/constant/SuccessCode";
import CustomerLayout from "@/layouts/CustomerLayout";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: session } = useSession();
  const token = session?.accessToken;

  const [isChecking, setIsChecking] = useState(false);

  async function onRequestPassword(data) {
    setIsChecking(true);
    const email = data.email;

    const resGet = await fetch(`${API_URL}/forgot-password/${email}`, {
      method: "PUT",
    });

    if (!resGet.ok) {
      const dataGet = await resGet.json();
      toast.error(dataGet.message);
    } else {
      toast.success("Check your email to reset password");
    }
    setIsChecking(false);
  }

  return (
    <div id="app">
      <section className="section">
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
              <div className="login-brand">
                {/* <img src="assets/img/stisla-fill.svg" alt="logo" width={100} className="shadow-light rounded-circle" /> */}
              </div>
              <div className="card card-primary">
                <div className="card-header">
                  <h4>Forgot Password</h4>
                </div>
                <div className="card-body">
                  <p className="text-muted">
                    We will send a link to reset your password
                  </p>
                  <form onSubmit={handleSubmit(onRequestPassword)}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        autofocus
                        {...register("email", {
                          required: errorCodes.EMAIL_IS_REQUIRED,
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: errorCodes.EMAIL_IS_NOT_VALID,
                          },
                        })}
                      />
                      <p>
                        {" "}
                        {errors.email && (
                          <p className="text-red-600 mt-2">
                            {errors?.email.message || "Error"}
                          </p>
                        )}
                      </p>
                    </div>
                    <div className="form-group">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-block mt-4"
                        tabIndex={4}
                      >
                        Forgot Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="simple-footer">Copyright © Balenciaga 2025</div>
            </div>
          </div>
        </div>
      </section>
      {isChecking && <SpinTip className="mt-8" content="Đang check đợi xíu ....." />}
    </div>
  );
}

ForgotPassword.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
