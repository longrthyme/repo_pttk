import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { Box, Grid } from "@mui/material"
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import errorCodes from "@/constant/ErrorCode";
import successCodes from "@/constant/SuccessCode";
import SpinTip from "../loading/SpinTip";
import { API_URL } from "@/config";
import { useSession } from "next-auth/react";
function UpdatePassword(props) {
  const { children, value, index, ...other } = props;

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();


  const { data: session } = useSession();
  const token = session?.accessToken;

  const onChangePassword = async (data) => {
    setIsLoading(true);

    const requestPass = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      retypeNewPassword: data.retypeNewPassword,
    };

    const resGet = await fetch(`${API_URL}/user/update-password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPass),
    });


    if (!resGet.ok) {
      const dataGet = await resGet.json();
      toast.error(dataGet.message);
    } else {
      toast.success(successCodes.UPDATED_SUCCESSFULL);
    }
    setIsLoading(false);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div className="mt-8">
            <form onSubmit={handleSubmit(onChangePassword)}>
              <Grid container>
                <Grid xs={6} item>
                  <input type="password"
                    className="p-3 border border-1 rounded-xl"
                    placeholder="Old password"
                    {...register("oldPassword", {
                      required: errorCodes.PASSWORD_IS_REQUIRED,
                    })}
                  />
                </Grid>
              </Grid>
              <p>
                {" "}
                {errors.oldPassword && (
                  <p className="text-red-600 mt-2">
                    {errors?.oldPassword.message || "Error"}
                  </p>
                )}
              </p>
              <Grid container className="mt-8">
                <Grid xs={6} item>
                  <input type="password"
                    className="p-3 border border-1 rounded-xl"
                    placeholder="New password"
                    {...register("newPassword", {
                      required: errorCodes.PASSWORD_IS_REQUIRED,
                      minLength: {
                        value: 6,
                        message: errorCodes.PASSWORD_AT_LEAST,
                      },
                    })}
                  />
                </Grid>
              </Grid>
              <p>
                {" "}
                {errors.newPassword && (
                  <p className="text-red-600 mt-2">
                    {errors?.newPassword.message || "Error"}
                  </p>
                )}
              </p>

              <Grid container className="mt-8">
                <Grid xs={6} item>
                  <input type="password"
                    className="p-3 border border-1 rounded-xl"
                    placeholder="Re-type new password"
                    {...register("retypeNewPassword", {
                      required: errorCodes.REPASSWORD_IS_REQUIRED,
                      minLength: {
                        value: 6,
                        message: errorCodes.PASSWORD_AT_LEAST,
                      },
                    })}
                  />
                </Grid>
              </Grid>
              <p>
                {" "}
                {errors.retypeNewPassword && (
                  <p className="text-red-600 mt-2">
                    {errors?.retypeNewPassword.message || "Error"}
                  </p>
                )}
              </p>
              <div className="">
                <button
                  className="bg-primary-600 text-white hover:bg-primary-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </Box>
      )}
      {isLoading ? <SpinTip content="Đang cập nhật ...." /> : ""}
    </div>
  );
}

export default UpdatePassword;
