import SpinTip from "@/components/loading/SpinTip";
import { API_URL } from "@/config";
import CustomerLayout from "@/layouts/CustomerLayout";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import forgot_password from "../../../public/images/forgot_password.png"

function UpdatePassword(props) {
  const router = useRouter();
  const { token } = router.query;
  console.log("Token is ", token);
  const [account, setAccount] = useState({
    token: token,
    password: "",
    retypePassword: "",
  });

  useEffect(() => {
    setAccount((prev) => ({ ...prev, token: token }));
  }, [token]);

  console.log("Value token is ", account.token);

  const [isLoading, setIsLoading] = useState(false);

  const updatePassword = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const resPos = await fetch(`${API_URL}/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });

    const postData = await resPos.json();

    if (!resPos.ok) {
      toast.error(postData.message);
    } else {
      toast.success("Update password successfully !");
      router.push("/account/login");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="p-6 bg-black text-white flex justify-center font-light mb-20">
        <h3>Update Password</h3>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <div
            className="mt-2 p-8
      "
          >
            {isLoading ? <SpinTip /> : ""}
            <form method="POST" onSubmit={updatePassword}>
              <div className="flex flex-col">
                <label>
                  Password
                  <span className="required">*</span>
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                  required
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                />
              </div>

              <div className={`flex flex-col`}>
                <label>
                  Retype password
                  <span className="required">*</span>
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-4/6 rounded-md border-s-4 border-2 border-grey-100 mt-4 border-solid p-2"
                  required
                  value={account.retypePassword}
                  onChange={(e) =>
                    setAccount({ ...account, retypePassword: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-4/6 rounded-md border-2 border-black mt-4 border-solid p-2 hover:bg-black hover:text-white mb-4"
              >
                Gửi
              </button>
            </form>
          </div>
        </Grid>

        <Grid item xs={6}>

<Image src={forgot_password} width={400} height={400} />
        </Grid>
      </Grid>
    </div>
  );
}

UpdatePassword.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;
export default UpdatePassword;
