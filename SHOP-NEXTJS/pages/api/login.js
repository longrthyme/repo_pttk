import { API_URL } from "@/config";
import cookie from 'cookie'


// async function handleLogin(req, res) {
//   if (req.method !== "POST") {
//     res.status(405).end();
//     return;
//   }
  

//   // here we just get the response HTTP. use for check the status (.ok() method)
//   const response = await fetch(`${API_URL}/authenticate`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(req.body),
//   });

//   // extract the JSON response body
//   let data = await response.json();

//   if (response.ok) {
//     res.setHeader(
//         'Set-Cookie',
//         cookie.serialize('token', data.loginInformation.jwtToken, {
//           httpOnly: true,
//           maxAge: 60 * 60 * 24 * 7, // 1 week
//           sameSite: 'strict',
//           path: '/',
//         })
//       )

    

//     res.status(200).json({ user: data.loginInformation.role });
//   } else {
//     res.status(500).json({ message: data.message });
//   }
// }



async function handleLogin(req, res) {
  console.log("Da vao api login");
    // here we just get the response HTTP. use for check the status (.ok() method)
  const response = await fetch(`${API_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });

    const resPost = await response.json();

    if(!response.ok) {
      console.log("error login is " + JSON.stringify(resPost));
      res.status(500).json({ message: resPost});
    }
    else {
      console.log("information login is " + JSON.stringify(resPost.loginInformation));
       res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', resPost.loginInformation.jwtToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ user: resPost.loginInformation });

    }

}

export default handleLogin;
