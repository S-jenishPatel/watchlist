import { auth } from "@/auth";
import {
  AFTER_LOGIN_ROUTE,
  authRoutes,
  nextAuthRoutes,
  publicRoutes,
  verifyRoutes,
} from "@/routes";

export default auth((req) => {
  // req.auth
  const isLoggedIn = !!req.auth;

  const path = req.nextUrl.pathname;

  var isVerifyRoute = false;

  if (path.startsWith(nextAuthRoutes)) return;

  if (authRoutes.includes(path) && isLoggedIn) {
    return Response.redirect(new URL(AFTER_LOGIN_ROUTE, req.nextUrl));
  }

  verifyRoutes.forEach((route, index) => {
    if (path.startsWith(route)) {
      isVerifyRoute = true;
    }
  });
  if (isVerifyRoute) {
    return;
  }

  if (!publicRoutes.includes(path) && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
