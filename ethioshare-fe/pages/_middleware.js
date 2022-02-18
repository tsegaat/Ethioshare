import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

const secret = process.env.ACCESS_TOKEN

export default function middleware(req) {
    const { cookies } = req
    const token = cookies.userToken
    const url = req.url

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