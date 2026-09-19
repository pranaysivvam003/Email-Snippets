# Snippet Shelf

Reusable HTML-email snippets organized by offer, with separate user and admin roles. Data is stored in MongoDB.

## Deploy with GitHub and Vercel

1. Create an empty GitHub repository and push this project folder. Do not commit `.env.local`.
2. In MongoDB Atlas, create a database user and allow connections from Vercel. Use a connection string that includes the database name, for example:

   ```text
   mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/snippets-gallery?retryWrites=true&w=majority
   ```

3. In Vercel, choose **Add New → Project**, import the GitHub repository, and set these environment variables for Production, Preview, and Development:

   - `MONGODB_URI`: the complete Atlas connection string.
   - `JWT_SECRET`: a long, unique random value.

4. Deploy. Seed the connected database once from a trusted local terminal:

   ```powershell
   npm run seed
   ```

   The seed command clears application data in the connected database, so do not run it again after adding real content.

5. Visit the deployment URL and sign in. Use the admin account to manage people, offer tabs, snippets, notepad content, and internal-tool links.

## Initial accounts

- Admin: `adminsnippetsgallery` / `Admin@snippets.8096`
- User: `pranayksivvam` / `Pranay@12345`

Change both passwords immediately after the first sign-in.

## Local development

Copy `.env.example` to `.env.local`, complete the values, then run:

```powershell
npm install
npm run seed
npm run dev
```

## Security note

The optional HTML field in Internal Tools is rendered as administrator-provided HTML. Only trusted admins should have access to that field.
