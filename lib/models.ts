import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({ name: { type: String, required: true }, username: { type: String, required: true, unique: true }, passwordHash: { type: String, required: true }, role: { type: String, enum: ["admin", "user"], default: "user" } }, { timestamps: true });
const TabSchema = new Schema({ name: { type: String, required: true, unique: true }, slug: { type: String, required: true, unique: true }, bodyType: { type: String, enum: ["cards", "notepad", "tools"], default: "cards" }, content: { type: String, default: "" }, order: { type: Number, default: 0 } }, { timestamps: true });
const SnippetSchema = new Schema({ tabId: { type: Schema.Types.ObjectId, ref: "Tab", required: true }, name: { type: String, required: true }, description: { type: String, default: "" }, imageUrl: { type: String, default: "" }, desktopCode: { type: String, default: "" }, mobileCode: { type: String, default: "" } }, { timestamps: true });
const FavoriteSchema = new Schema({ userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, snippetId: { type: Schema.Types.ObjectId, ref: "Snippet", required: true } }, { timestamps: true });
FavoriteSchema.index({ userId: 1, snippetId: 1 }, { unique: true });
const ToolSchema = new Schema({ tabId: { type: Schema.Types.ObjectId, ref: "Tab", required: true }, heading: String, description: String, ctaLabel: String, href: String, html: String }, { timestamps: true });
export const User = models.User || model("User", UserSchema);
export const Tab = models.Tab || model("Tab", TabSchema);
export const Snippet = models.Snippet || model("Snippet", SnippetSchema);
export const Favorite = models.Favorite || model("Favorite", FavoriteSchema);
export const Tool = models.Tool || model("Tool", ToolSchema);
