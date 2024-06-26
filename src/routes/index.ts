/**
 * The routes that dont need user to be authorised
 */
export const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/verify",
  "/api/login",
  "/api/signup",
];
/**
 * next auth.js api routes that should be always available to user
 */
export const nextAuthRoutes = "/api/auth";
/**
 * Login and signup page routes
 */
export const authRoutes = ["/login", "/signup", "/api/login", "/api/signup"];
/**
 * Dynamic Verify routes that are publicly available
 */
export const verifyRoutes = ["/verify", "/api/verify"];
/**
 * Default route to redirect to after user login
 */
export const AFTER_LOGIN_ROUTE = process.env.DOMAIN + "/user/home";
/**
 * Default route to redirect to after user logout
 */
export const AFTER_LOGOUT_ROUTE = process.env.DOMAIN + "/login";
