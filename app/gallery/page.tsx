import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Tab, Snippet, Tool, Favorite } from "@/lib/models";
import { getSession } from "@/lib/auth";
import GalleryClient from "./gallery-client";
export default async function Gallery(){const session=await getSession();if(!session)redirect("/login");await db;const tabs=await Tab.find().sort({order:1}).lean();const snippets=await Snippet.find().lean();const tools=await Tool.find().lean();const favorites=await Favorite.find({userId:session.id}).lean();return <GalleryClient session={session} tabs={JSON.parse(JSON.stringify(tabs))} snippets={JSON.parse(JSON.stringify(snippets))} tools={JSON.parse(JSON.stringify(tools))} favorites={favorites.map(f=>f.snippetId.toString())}/>}
