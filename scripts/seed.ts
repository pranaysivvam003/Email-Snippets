import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seed() {
  const [{ default: bcrypt }, { db }, { User, Tab, Snippet }] = await Promise.all([
    import("bcryptjs"),
    import("../lib/db"),
    import("../lib/models"),
  ]);
  await db;
  await Promise.all([User.deleteMany({}), Tab.deleteMany({}), Snippet.deleteMany({})]);
  const [admin, user] = await Promise.all([
    User.create({ name: "Snippet Admin", username: "adminsnippetsgallery", passwordHash: await bcrypt.hash("Admin@snippets.8096", 12), role: "admin" }),
    User.create({ name: "Pranay Kumar", username: "pranayksivvam", passwordHash: await bcrypt.hash("Pranay@12345", 12), role: "user" }),
  ]);
  const specs = [["TMobile", "cards"], ["Charter", "cards"], ["General", "cards"], ["Packages", "notepad", "Package process flow notes will be added here by an administrator."], ["Smart Flow", "notepad", "Smart Flow process documentation will be added here by an administrator."], ["Points follow", "cards"], ["Others", "tools"]] as const;
  const tabs = await Promise.all(specs.map(([name, bodyType, content], order) => Tab.create({ name, slug: name.toLowerCase().replace(/\s+/g, "-"), bodyType, content, order })));
  for (const tab of tabs.filter((tab) => tab.bodyType === "cards")) await Snippet.create({ tabId: tab._id, name: `${tab.name} sample header`, description: "A reusable responsive email header block.", desktopCode: '<table role="presentation" width="600"><tr><td>Desktop header</td></tr></table>', mobileCode: '<table role="presentation" width="100%"><tr><td>Mobile header</td></tr></table>' });
  console.log(`Seeded ${admin.username} and ${user.username}`);
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
