import emailService from "../services/email.service.js";
import userService from "../services/user.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await userService.createUser({ name, email, password, role });
    if (!user) return errorResponse(res, "User registration failed", 400);
    emailService.emailSender(
      email,
      `<a href="http://localhost:5000/api/auth/activate/${email}">Click Here To Activate Your Account</a>`
    );
    return successResponse(res,"User registered successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const { token, user } = await userService.loginUser({
      email,
      password,
      role,
    });
    if(token) {
      res.cookie("token", token, {
        httpOnly: true,
        secure: false
      });
    }
    if (!token) return errorResponse(res,  "Login failed", 400);

    return successResponse(res,{token,user}, "Login successful", 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const activateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.activateUser(id);

    if (!user) {
      return errorResponse(res, "Account activation failed" , 400);
    }
    const redirectUrl = user
      ? "http://localhost:4000/login?activated=true"
      : "http://localhost:4000/login?activated=error";

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Activating...</title>
          <meta http-equiv="refresh" content="0; URL='${redirectUrl}'" />
          <script>
            window.location.href = "${redirectUrl}";
          </script>
        </head>
        <body>
          <p>Activating account... If not redirected, 
          <a href="${redirectUrl}">click here</a>.</p>
        </body>
      </html>
    `);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const logout = async (req, res) => {
  await userService.logoutUser(res);
  return successResponse(res, "Logout successful", 200);
};
