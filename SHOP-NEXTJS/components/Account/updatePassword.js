import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { Box, Grid } from "@mui/material";
import { NEXT_API } from "@/config";
import { toast } from "react-toastify";
function UpdatePassword(props) {
    const { children, value, index, ...other } = props;

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: ""
  });


  const updatePassword =  async (e) => {


    e.preventDefault();

    setIsLoading(true);
      // ver
      
    const resGet = await fetch(`${API_URL}/user/update_password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(password)
    });

    const dataGet = await resGet.json();

    if (!resGet.ok) {
      toast.error(dataGet.message);
    } else {
      toast.success("Update successfull");
    }
    setIsLoading(false);

  }
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
     <form onSubmit={updatePassword}>


     <Grid container>
      <Grid xs={6} item>
          <Input.Password className="p-3"
            placeholder="Old password"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            value={password.oldPassword}
            onChange={(e) => setPassword({...password, oldPassword: e.target.value })}
          />
        </Grid>
      </Grid>
      <Grid container className="mt-8">
      <Grid xs={6} item>
          <Input.Password className="p-3"
            placeholder="New password"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            value={password.newPassword}
            onChange={(e) => setPassword({...password, newPassword: e.target.value })}
          />
        </Grid>
      </Grid>

      <Grid container className="mt-8">
        <Grid xs={6} item>
          <Input.Password className="p-3"
            placeholder="Re-type new password"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            value={password.retypeNewPassword}
            onChange={(e) => setPassword({...password, retypeNewPassword: e.target.value })}
          />
        </Grid>
      </Grid>
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
    </div>

    
  );
}

export default UpdatePassword;
