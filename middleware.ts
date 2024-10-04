
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes =["/list"]


export default function middleWare(req:NextRequest){

    const userIsLogin = true;

    if(!userIsLogin && protectedRoutes.includes(req.nextUrl.pathname)){
        const redirectUrl = new URL('/authorization',req.nextUrl.origin)
        return NextResponse.redirect(redirectUrl.toString())
    }
}