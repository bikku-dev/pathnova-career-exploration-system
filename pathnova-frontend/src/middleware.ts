import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

const token = request.cookies.get("token")

const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")

// अगर dashboard open कर रहा है और token नहीं है
if (isDashboard && !token) {

return NextResponse.redirect(new URL("/", request.url))

}

return NextResponse.next()

}

export const config = {

matcher: ["/dashboard/:path*"]

}