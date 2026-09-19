import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { User } from "@/lib/models";
import { signSession } from "@/lib/auth";
export async function POST(req:NextRequest){const {username,password}=await req.json();try{await db;const user=await User.findOne({username:String(username).toLowerCase()});if(!user||!await bcrypt.compare(String(password),user.passwordHash))return NextResponse.json({error:"Incorrect username or password."},{status:401});const token=await signSession({id:user._id.toString(),name:user.name,role:user.role});const res=NextResponse.json({ok:true});res.cookies.set("sg_session",token,{httpOnly:true,sameSite:"lax",secure:process.env.NODE_ENV==="production",path:"/",maxAge:60*60*24*7});return res}catch{return NextResponse.json({error:"The database is unavailable. Check the MongoDB connection and try again."},{status:503})}}
