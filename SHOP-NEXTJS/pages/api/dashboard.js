import { API_URL } from "@/config";
import cookie from "cookie";

async function categories(req, res) {
  const { token } = cookie.parse(req.headers.cookie);

  switch (req.method) {
    case "GET":
      console.log("Da vao get dashboard");
      const response = await fetch(`${API_URL}/admin/dashboard`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
      });

      const restData = await response.json();
      if (!response.ok) {
        console.log("error in dash" , JSON.stringify(restData));
      } else {
        console.log("val dashboard ", JSON.stringify(restData));
        res.status(200).json({ dashboard : restData });
      }

      break;

    case "DELETE":
      
      break;

    default:
      res.status(404).send("Method are not allowed");
      break;
  }
}

export default categories;
