import AdminLayout from "@/layouts/AdminLayout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SpinTip from "@/components/loading/SpinTip";
export default function UpdateEmployee(props) {

  const router = useRouter();


  const { data: session , status} = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/account/login")
    },
  });
  const token = session?.accessToken;

  
  if(status === "loading") {
    return <SpinTip />
  } else 

    return (


        <h2>Hello word</h2>
    )
}

UpdateEmployee.getLayout = (page) => <AdminLayout children={page} />