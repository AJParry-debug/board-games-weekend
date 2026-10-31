# Board Games Weekend 2026

A shared schedule for the weekend. Friends open the link, pick their name and claim seats at the games they want to play. Everyone sees changes live.

It runs on two free services:

- **GitHub Pages** hosts the website (the noticeboard everyone looks at).
- **Firebase** stores the schedule (the whiteboard everyone writes on).

Setup takes about 20 minutes. You only do it once.

---

## What's in this folder

| File | What it does | Do you edit it? |
|---|---|---|
| `index.html` | The app itself | No |
| `firebase-backend.js` | Connects the app to Firebase | No |
| `config.js` | Your Firebase settings and organiser PIN | **Yes** |
| `seed.json` | Your weekend: time blocks, players, games and the draft line-up | No |
| `firestore.rules` | Who can read and write the schedule | No, you paste it into Firebase |
| `README.md` | This guide | No |

---

## Part A: Set up Firebase (about 10 minutes)

1. Go to **console.firebase.google.com** and sign in with a Google account.
2. Click **Create a project** (or **Add project**). Call it something like `board-games-weekend`. You can turn **Google Analytics** off, since it isn't needed. Finish creating the project.
3. In the left menu, open **Build → Firestore Database** and click **Create database**.
   - For the location, choose **australia-southeast1 (Sydney)**.
   - Choose **Start in production mode**.
4. Once it's created, open the **Rules** tab. Delete everything in the box, paste in the whole contents of `firestore.rules`, then click **Publish**.
5. Click the **gear icon → Project settings**. Under **Your apps**, click the **web icon `</>`**.
   - Give it a nickname (anything, e.g. `schedule`).
   - Leave **Firebase Hosting** unticked.
   - Click **Register app**.
6. Firebase now shows a block of code containing `const firebaseConfig = { ... }`. Keep that page open, because you need those values in the next step.

## Part B: Fill in config.js (2 minutes)

Open `config.js` in any text editor (Notepad or TextEdit is fine).

1. Change `organiserPin: "CHANGE-ME"` to your own PIN, e.g. `organiserPin: "4821"`.
2. Copy each value from Firebase's `firebaseConfig` into the matching line: `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId` and `appId`. Keep the quote marks around each value.
3. Save the file.

## Part C: Put it on GitHub (about 5 minutes)

1. Sign in at **github.com** (or create a free account).
2. Click **+ → New repository**.
   - Name it `board-games-weekend`.
   - Set it to **Public**. GitHub Pages is only free for public repositories.
   - Click **Create repository**.
3. On the new, empty repository page, click the **uploading an existing file** link.
4. Drag in all six files from this folder, including your edited `config.js`. Click **Commit changes**.
5. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, then choose the branch **main** and the folder **/ (root)**. Click **Save**.
6. Wait a minute or two, then refresh the page. Your site address appears at the top, something like:
   `https://YOUR-USERNAME.github.io/board-games-weekend/`

## Part D: First run (1 minute)

1. Open your site address.
2. Click **Organiser** (top right) and enter your PIN.
3. Click **Load the starting line-up**. Your time blocks, players, games and draft tables appear.
4. Send the link to everyone. That's it.

---

## Day-to-day

- **Friends:** tap an open seat, pick their name the first time, done. Tapping their own seat gives it back.
- **You:** click **Organiser**, enter the PIN once per device, and you can edit tables, time blocks, games, players and covers. **Lock** in the organiser bar turns it off again on that device.
- **Cover images:** in organiser mode, edit a game and paste an image link. From BoardGameGeek: right-click the box art, then **Copy image address**. You can also upload a photo instead.

## Making changes to the app later

Edit the file on GitHub (open it, click the pencil icon, then **Commit changes**). The site updates within a minute or two. Your schedule data lives in Firebase, so updating the app never wipes seats or games.

## Good to know

- **The PIN is a speed bump, not a lock.** Because the repository is public, anyone curious enough to read `config.js` can see it. That's fine for a group of mates, but don't reuse a PIN you use anywhere else.
- **The Firebase `apiKey` is meant to be public.** It identifies your project; it doesn't unlock it. What protects the data is `firestore.rules`.
- **The schedule goes read-only on 1 December 2026.** That stops strangers changing it long after the weekend. To extend it, change the date in `firestore.rules`, paste it into Firebase's **Rules** tab again, and click **Publish**.
- **Cost:** a weekend with a dozen people uses a tiny fraction of Firebase's free allowance.

## If something's not working

| What you see | What to do |
|---|---|
| "The schedule isn't connected to its database yet" | `config.js` still has placeholder values. Check every line was filled in, then upload it again. |
| "Can't reach the live schedule right now" | Check your internet connection. If it persists, check the `projectId` in `config.js` matches Firebase exactly. |
| "The schedule is locked for changes right now" | The Firestore rules are refusing writes. Check you published `firestore.rules` (Part A, step 4) and the date in it hasn't passed. |
| The site shows a 404 page | GitHub Pages can take a few minutes the first time. Also check `index.html` is at the top level of the repository, not inside a folder. |
| "That PIN isn't right" | It must match `organiserPin` in `config.js` exactly. |
