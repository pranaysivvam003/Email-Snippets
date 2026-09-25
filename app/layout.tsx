import "./globals.css";
import "./rich-text.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Snippet Shelf", description: "Reusable HTML email snippets" };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
