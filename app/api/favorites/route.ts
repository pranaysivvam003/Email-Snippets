import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";import { Favorite } from "@/lib/models";import { sessionFromRequest } from "@/lib/auth";
export async function POST(req:NextRequest){const s=await sessionFromRequest(req);if(!s)return NextResponse.json({error:"Unauthorized"},{status:401});const {snippetId}=await req.json();await db;const found=await Favorite.findOne({userId:s.id,snippetId});if(found){await found.deleteOne();return NextResponse.json({favorited:false})}await Favorite.create({userId:s.id,snippetId});return NextResponse.json({favorited:true})}
