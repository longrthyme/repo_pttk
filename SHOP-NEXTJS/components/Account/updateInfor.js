import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import logo_upload from "../../public/images/logo_upload.png";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import SpinTip from "../loading/SpinTip";
import { API_URL } from "@/config";
import { toast } from "react-toastify";
import DataContext from "@/context/DataContext";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import errorCodes from "@/constant/ErrorCode";

function UpdateInformation(props) {
  const { children, value, index, ...other } = props;

  const [isSaving, setIsSaving] = useState(false);

  const { getUserInformation, userInfo } = useContext(DataContext);

  const [userData, setUserData] = useState(null);

  const [userImage, setUserImage] = useState({
    imageData: null,
    imagePrev: null,
  });

  const { data: session } = useSession();
  const token = session?.accessToken;

  useEffect(() => {
    if (token) {
      getUserInformation();
    }
  }, [token]);

  useEffect(() => {
    if (userInfo) {
      setUserData(userInfo);
      setUserImage({...userImage, imagePrev: userInfo.imgURL});
    }
  }, [userInfo]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  console.log("User data " + JSON.stringify(userData));

  const onSaveInformation = async (data) => {
    setIsSaving(true);
    const payload = {
      name: data.name,
      phone_number: data.phoneNumber,
    };

    const formData = new FormData();

    const json = JSON.stringify(payload);
    const blob = new Blob([json], {
      type: "application/json",
    });

    formData.append("user", blob);
    formData.append("image", userImage.imageData);
    //ver
    const resGet = await fetch(`${API_URL}/user/update-profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!resGet.ok) {
      const dataGet = await resGet.json();
      toast.error(dataGet.message);
    } else {
      toast.success("Updated successfully!");
    }
    setIsSaving(false);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {userData ? (
        <form onSubmit={handleSubmit(onSaveInformation)}>
          <Box sx={{ p: 3 }}>
            <div className="flex flex-col justify-around">
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <div className="flex items-center">
                    <div>
                      <Image
                        className="rounded-xl"
                        src={
                          userImage?.imagePrev
                            ? userImage?.imagePrev
                            : logo_upload
                        }
                        width={150}
                        height={150}
                        alt="user_icon"
                      />
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                      <label
                        className="border px-4 text-white py-2 bg-primary-500 font-semibold ml-12 rounded-md hover:bg-primary-600"
                        tabIndex="0"
                        role="button"
                        htmlFor="account-settings-upload-image"
                      >
                        Upload New Photo
                        <input
                          hidden
                          type="file"
                          accept="image/png, image/jpeg"
                          id="account-settings-upload-image"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              setUserImage({
                                imageData: e.target.files[0],
                                imagePrev: URL.createObjectURL(
                                  e.target.files[0]
                                ),
                              });
                            }
                          }}
                        />
                        <span className="MuiTouchRipple-root css-w0pj6f"></span>
                      </label>

                      <p className="mt-4 font-extralight opacity-70">
                        Allowed PNG or JPEG
                      </p>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <div className="mt-8">
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="component-outlined">Name</InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        defaultValue=""
                        label="Name"
                        value={userData.name}
                        {...register("name", {
                          required: errorCodes.NAME_USER_IS_REQUIRED,
                          onChange: (e) =>
                            setUserData({ ...userData, name: e.target.value }),
                        })}
                      />
                    </FormControl>
                    <p>
                      {" "}
                      {errors.name && (
                        <p className="text-red-600  mt-2">
                          {errors?.name.message || "Error"}
                        </p>
                      )}
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="component-outlined">
                        Phone number
                      </InputLabel>
                      <OutlinedInput
                        id="component-outlined"
                        value={userData.phoneNumber}
                        {...register("phoneNumber", {
                          required: errorCodes.PHONE_NUMBER_IS_REQUIRED,
                          pattern: {
                            value: /^([+]\d{2})?\d{10}$/,
                            message: errorCodes.PHONE_NUMBER_NOT_CORRECT_FORMAT,
                          },
                          onChange: (e) => {
                            setUserData({
                              ...userData,
                              phoneNumber: e.target.value,
                            });
                          },
                        })}
                      />
                    </FormControl>
                    <p>
                      {" "}
                      {errors.phoneNumber && (
                        <p className="text-red-600 mt-2">
                          {errors?.phoneNumber.message || "Error"}
                        </p>
                      )}
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="mt-8">
                      <FormControl fullWidth>
                        <InputLabel htmlFor="component-outlined">
                          Email
                        </InputLabel>
                        <OutlinedInput
                          disabled
                          id="component-outlined"
                          defaultValue="abc@gmail.com"
                          label="Name"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...state, email: e.target.value })
                          }
                        />
                      </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className="mt-8">
                      <FormControl fullWidth>
                        <InputLabel htmlFor="component-outlined">
                          Username
                        </InputLabel>
                        <OutlinedInput
                          disabled
                          id="component-outlined"
                          defaultValue="abc"
                          label="Name"
                          //   disabled={true}
                          value={userData.username}
                          onChange={(e) =>
                            setUserData({
                              ...state,
                              username: e.target.value,
                            })
                          }
                        />
                      </FormControl>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Box>
          <div className="">
            <button
              className="bg-primary-600 text-white hover:bg-primary-400 font-semibold rounded-md px-4 py-2 mt-6 border border-1 border-solid rounded-md self-center ml-10"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <SpinTip content="Đang loading....." />
      )}
      {isSaving ? <SpinTip content="Đang lưu...." /> : ""}
    </div>
  );
}

export default UpdateInformation;
