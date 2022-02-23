import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.ACCESS_TOKEN

export default function middleware(req) {
    const { cookies } = req
    const url = req.url

    const token = cookies.accessToken

    if (url.includes("/sign-in")) {
        if (token) {
            try {
                verify(token, secret)
                return NextResponse.redirect('/main')
            } catch {
                return NextResponse.next()
            }
        }
        return NextResponse.next()
    }

    if (url.includes("/main")) {
        if (token === undefined) {
            return NextResponse.redirect('/sign-in')
        }

        try {
            verify(token, secret)
            return NextResponse.next()
        } catch {
            return NextResponse.redirect('/sign-in')
        }
    }

    return NextResponse.next()
}