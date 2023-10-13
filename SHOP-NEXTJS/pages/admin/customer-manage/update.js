import AdminLayout from "@/layouts/AdminLayout"
import { useSession } from "next-auth/react";

export default function UpdateEmployee() {


    
  const { data: session } = useSession();
  const token = session?.accessToken;


  useEffect(() => {

    if(session?.role == "CUSTOMER") {
      router.push("/unauthorized")
    }
  } , [session]);




    return (


        <h2>Hello word</h2>
    )
}

UpdateEmployee.getLayout = (page) => <AdminLayout children={page} />