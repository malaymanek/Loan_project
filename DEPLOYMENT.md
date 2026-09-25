# Render Deployment Guide

This project is fully configured for deployment on [Render](https://render.com) using either **Automated Blueprint (Recommended)** or **Manual Setup**.

---

## ⚡ Method 1: Automated Blueprint Deployment (1-Click)

Render supports deploying the entire stack (Flask REST API + React Vite Frontend) automatically using the [`render.yaml`](./render.yaml) file.

1. **Push your code to GitHub / GitLab**.
2. Go to your [Render Dashboard](https://dashboard.render.com).
3. Click **New +** and select **Blueprint**.
4. Connect your GitHub repository.
5. Render will automatically detect `render.yaml` and provision:
   - **`loan-risk-ml-backend`** (Python Web Service with Gunicorn)
   - **`loan-risk-frontend`** (Static Site with SPA rewrite rules)
6. Click **Apply**. Both services will build and deploy automatically!

---

## 🛠️ Method 2: Manual Deployment on Render

If you prefer to configure each service manually via the Render dashboard:

### Step A: Deploy the Backend (Python Web Service)
1. In Render Dashboard, click **New +** &rarr; **Web Service**.
2. Connect your repository.
3. Configure the following settings:
   - **Name**: `loan-risk-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app --bind 0.0.0.0:$PORT`
   - **Instance Type**: `Free`
4. Click **Create Web Service**.
5. Once deployed, copy your backend URL (e.g., `https://loan-risk-backend.onrender.com`).

---

### Step B: Deploy the Frontend (Static Site)
1. In Render Dashboard, click **New +** &rarr; **Static Site**.
2. Connect your repository.
3. Configure the following settings:
   - **Name**: `loan-risk-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add **Environment Variables**:
   - `VITE_API_URL` = `https://loan-risk-backend.onrender.com/api` *(replace with your backend URL from Step A)*
5. Under **Redirects/Rewrites**, add:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Create Static Site**.

---

## 💡 Standalone Fallback Protection
Even if the backend takes a few seconds to wake up from Render's free tier sleep mode, the frontend features an **in-browser client-side ML engine** that will automatically compute zero-latency loan risk evaluations and factor attribution until the backend is active.
