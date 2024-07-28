import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const landingEnvVar = process.env.LANDING;
    //
    if (landingEnvVar && request.nextUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api/submit-form|_next/static|favicon.ico|images).*)"],
};
