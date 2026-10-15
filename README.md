# 🧪 React Scientific Calculator with Custom Theme Engine

A robust, production-ready **Scientific Calculator** built using **React**, **Vite**, and **Tailwind CSS**. This application implements a custom-built mathematical token parser and features a full physical keyboard integration, automatic and manual dark/light theme triggers, and persistent operation log memory tracking.

🌐 **Live Demo:** [https://pcm-scientific-calculator.netlify.app](https://pcm-scientific-calculator.netlify.app)

---

## ✨ Features & Architecture

The application has been modularized and built with scalability and clean history tracing in mind:

*   **⚡ Robust Mathematical Engine:** Safely processes scientific formulations (such as `sin`, `cos`, `tan`, `log`, `ln`, `sqrt`, and exponents `^`) natively bypassing dangerous global `eval()` methods.
*   **🎹 Complete Keyboard Listeners:** Fully accessible via any laptop/desktop layout. Map physical operators directly (`*` for multiply, `/` for divide, `Enter` for result evaluation, `Backspace` to delete, and `Escape` to clear).
*   **📜 State-Driven History Tracking:** Keeps a structured ledger list of previous successful mathematical operations. Allows instant rollback capabilities by clicking old logs to load them into display registers.
*   **🎨 Custom Class Design Tokens:** Synchronized with strict design standards using dynamic custom properties (`var(--bg)`, `var(--accent)`, `var(--text-h)`).
*   **☀️ Persistent Manual Theme Toggle:** Built-in Sun/Moon indicator allowing independent UI layout preference setting, preserved using `localStorage` caching mechanics.

---

## 🛠️ Tech Stack & Dependencies

*   **Framework Node:** React v19+ (Vite Bundling Pipeline Engine)
*   **Styling Architecture:** Tailwind CSS Framework Core Tools
*   **Vector Icon Assets:** Lucide React Icon Pack Framework
*   **Target Cloud Infrastructure:** Netlify Continuous Deployment Pipeline

---

## 🚀 Running the Project Locally

To pull down the dependencies and spin up your development web server matrix locally, run:

```bash
# Install package modules
npm install --legacy-peer-deps

# Boot development environment compiler
npm run dev
```
