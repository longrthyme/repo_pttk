import { useSession } from "next-auth/react"



export default function Welcome() {

    const { data: session } = useSession()
    const token = session?.accessToken;

    return (

        <div>

            <h2>Token is {token}</h2>
            <h2>Hello welcome </h2>
        </div>
    )
}