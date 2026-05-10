# 🌿 AgriReadiness – Digital Assessment & Advisory Toolkit

A multi-step digital readiness assessment for farmers, with AI-powered personalised advisory.

---

## 📁 Project Structure

```
agrireadiness/
├── frontend/
│   ├── index.html      ← Main HTML (multi-step form)
│   ├── style.css       ← Agriculture-themed styles
│   └── script.js       ← Form logic, validation, API call
│
└── backend/
    ├── server.js       ← Express server + Anthropic/Grok API call
    ├── package.json    ← Dependencies
    ├── .env.example    ← Rename to .env and fill in your key
    └── .gitignore      ← Keeps secrets safe
```

---

## 🚀 Running Locally

### Step 1 – Set Up the Backend

```bash
# 1. Go into backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create your .env file
cp .env.example .env

# 4. Edit .env and paste your Anthropic API key:
#    ANTHROPIC_API_KEY=your_key_here

# 5. Start the server
npm start
# or for auto-reload during development:
npm run dev
```

The backend will run at: **http://localhost:3000**

### Step 2 – Set Up the Frontend

No build step required! Just open `frontend/index.html` in your browser.

Make sure `script.js` has the correct API URL:
```js
const API_BASE_URL = "http://localhost:3000";
```

**That's it — the app is running locally!**

---

## 🌐 Deploying the Backend on Render.com (Free)

1. Push your `backend/` folder to a GitHub repository.

2. Go to [https://render.com](https://render.com) → Create Account.

3. Click **New → Web Service** → Connect your GitHub repo.

4. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node

5. Under **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: *(paste your actual API key)*

6. Click **Deploy**. Render gives you a URL like:
   `https://agrireadiness-backend.onrender.com`

7. Copy this URL.

---

## 🌐 Deploying the Frontend on GitHub Pages

1. Push your `frontend/` folder to a GitHub repository (can be the same repo, different folder, or a separate repo).

2. Before pushing, update `script.js`:
   ```js
   const API_BASE_URL = "https://agrireadiness-backend.onrender.com"; // your Render URL
   ```

3. Go to your GitHub repo → **Settings → Pages**.

4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/frontend` (or `/root` if it's the root)

5. Click **Save**. Your site will be live at:
   `https://yourusername.github.io/agrireadiness/`

---

## 🔑 Getting an Anthropic API Key

1. Visit [https://console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** → **Create Key**
4. Copy the key and paste it into your `.env` file (local) or Render environment variables (production)

---

## ⚙️ API Endpoint Reference

### `POST /generate-advisory`

**Request Body:**
```json
{
  "name": "Ravi Kumar",
  "score": 14,
  "category": "Medium",
  "digital_experience": "Low",
  "usability": "Difficult",
  "feedback": "I struggle with internet connectivity in my village"
}
```

**Response:**
```json
{
  "advisory": "Ravi, you are showing real promise in your readiness journey..."
}
```

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | HTML, CSS, JavaScript   |
| Backend   | Node.js + Express       |
| AI        | Anthropic Claude (claude-opus-4-5) |
| Hosting   | GitHub Pages + Render   |

---

## ✅ Features

- 3-step validated form
- Score-based readiness categorisation
- AI advisory (via Anthropic Claude)
- localStorage save & restore
- Responsive mobile-friendly design
- Agriculture earthy theme with animations

---

## ⚠️ Security Notes

- The Anthropic API key is ONLY on the backend
- The frontend never sees or sends the API key
- The backend handles all AI communication securely
