


export async function deleteCookie(req, res) {

    console.log("Da vao delete cookie");

    res.cookies.set('next-auth.session-token', {
        httpOnly: true,
        maxAge: 0, // 0 second hours in seconds
      })
      return res

}