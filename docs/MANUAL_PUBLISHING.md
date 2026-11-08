# Publish EMBER with your own accounts
Student: Jaafar Sabra | 72230515 | Instructor: Ghadir Khalil | LIU

Use a Windows or Mac laptop. Your GitHub and Vercel accounts do not have to match your ChatGPT account.

## 1. Extract the ZIP
Extract the whole ZIP. Inside is `ember-repository`, which includes the source, assets, README, screenshots and an existing local Git repository with its genuine development history. Keep the hidden `.git` directory. Do not upload the ZIP file itself to GitHub.

## 2. GitHub - easiest method
1. Download GitHub Desktop from https://desktop.github.com/ and sign in to the GitHub account you want to use.
2. Choose File > Add Local Repository.
3. Choose the extracted `ember-repository` folder. Select the folder containing `package.json`, not its parent and not `src`.
4. Click Add Repository. The History tab should already show multiple development commits.
5. Click Publish repository.
6. Name it `ember-restaurant`. For a public assignment repository, uncheck Keep this code private; if you keep it private, give your instructor access.
7. Publish it to your personal account.
8. Open View on GitHub and copy the repository URL.

Do not create a new repository from scratch or upload the folder through the website if you want to retain the existing history. The package has no existing remote configured.

## 3. Vercel
1. Go to https://vercel.com/ and sign in to the Vercel account you want to use.
2. Choose Add New > Project.
3. Connect the GitHub account containing `ember-restaurant`, or configure the GitHub integration to grant access to that repository.
4. Import `ember-restaurant`.
5. Verify the settings:
   - Framework preset: Vite
   - Root directory: ./ (repository root)
   - Install command: npm install (or the default)
   - Build command: npm run build
   - Output directory: dist
   - Environment variables: none for Phase 1
6. Click Deploy. When it succeeds, open the production `vercel.app` URL.
7. Test Menu, customization, bag, pickup/delivery, order tracking and Contact. Test it on your phone too.
8. Make sure the instructor can visit the final production site without your login. Adjust deployment access in your own Vercel settings if needed.

## 4. Finish the submission
Send the GitHub URL and Vercel production URL back so the report and README can be updated. Add current phone screenshots. The report is still marked Draft only because final links and phone checks are pending.

Individual contribution form: no partner is listed. If the instructor requires a form for solo students, complete the actual-work and assistance sections honestly. Do not invent a percentage split with a partner.

## Optional: run the site locally
Install Node.js 20+ and run in `ember-repository`:
```
npm install
npm run dev
```
Production check:
```
npm run build
```

## Sources
- https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-a-repository-from-your-local-computer-to-github-desktop
- https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop
- https://vercel.com/docs/frameworks/frontend/vite
- https://vercel.com/docs/git
