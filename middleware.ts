import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth.token;

    // Check if the token is expired or missing
    if (!token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (!token && pathname.match(/dashboard/)) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (token && pathname.match(/signin/)) {
      const role = token?.role;
      return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};
