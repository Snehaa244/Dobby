# 🚀 DobbyDrive

> A powerful, modern file management system inspired by Google Drive — built with the MERN stack and supercharged with AI capabilities via MCP (Model Context Protocol).

---

## ✨ Why DobbyDrive?

DobbyDrive isn't just another cloud storage clone — it's a **fully-featured, premium file management system** designed for developers, teams, and individuals who want a beautiful, fast, and intelligent way to manage their files.

### 🎯 What Makes It Special?

- **🧙‍♂️ Smart AI Integration** — Powered by MCP, allowing AI agents to manage your files through natural language
- **📁 Infinite Nested Folders** — Create folders within folders to any depth — just like Google Drive
- **🖼️ Image Upload & Preview** — Upload images to any folder with instant preview
- **📊 Smart Size Calculation** — Automatically calculates folder sizes (including all nested content)
- **🔐 Secure & Isolated** — JWT authentication keeps every user's data private and secure
- **💎 Premium UI** — Stunning glassmorphism design with smooth animations and a modern SaaS aesthetic

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Vite), Tailwind CSS, Lucide React, Axios, React Router |
| **Backend** | Node.js, Express, MongoDB, Mongoose, JWT, Multer |
| **AI Integration** | MCP (Model Context Protocol) SDK |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🚦 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dobby-drive.git
cd dobby-drive
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dobby-drive
JWT_SECRET=your-super-secret-jwt-key
```

Create the uploads directory:

```bash
mkdir uploads
```

Start the backend server:

```bash
npm run dev
```

> ✅ Backend runs at: `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

> ✅ Frontend runs at: `http://localhost:5173`

---

## 📱 Key Features

### 🔐 Authentication
- Secure Signup & Login with JWT
- Protected routes and API endpoints
- User-specific data isolation

### 📂 Folder Management
- Create unlimited nested folders
- Visual folder tree in sidebar
- Delete and organize with ease

### 🖼️ Image Management
- Upload images to any folder
- Instant image preview
- Drag & drop support (coming soon)

### ⭐ Starred Files
- Mark important folders as starred
- Quick access from sidebar
- Filter and find instantly

### 🔍 Search & Filter
- Search folders by name
- Filter to view starred items only

### 🤖 MCP AI Integration
- Exposes all drive actions as MCP tools
- AI agents can manage files via natural language
- Perfect for automation and smart workflows

---

## 🤖 MCP (Model Context Protocol) Integration

DobbyDrive comes with a built-in **MCP Server** that exposes your drive as AI-compatible tools.

### Start the MCP Server

```bash
cd mcp-server
npm install
npm start
```

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `signup` | Register a new user |
| `login` | Authenticate and get JWT token |
| `create_folder` | Create a new folder (supports nested via `parentId`) |
| `list_folders` | List folders and images in a directory |
| `get_folder_tree` | Get the full sidebar folder tree |
| `upload_image` | Upload an image to a folder |

### Example MCP Usage

Once the MCP server is running, AI agents can execute commands like:

```
"Create a folder called 'Projects' in my drive"
"List all folders in my drive"
"Upload my logo to the 'Assets' folder"
```

---

## 🌍 Deployment

### Backend (Render / Railway)

1. Push your code to GitHub
2. Create a new **Web Service** on Render
3. Set Root Directory to `backend`
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`

> ⚠️ **Note:** For production, replace Multer's local storage with **Cloudinary** or **AWS S3** to persist uploaded files.

### Frontend (Vercel / Netlify)

1. Import your repository on Vercel
2. Set Root Directory to `frontend`
3. Framework Preset: `Vite`
4. Build Command: `npm run build`
5. Update API URLs in `frontend/src/utils/api.js` and `frontend/src/context/AuthContext.jsx` to point to your live backend

---

## 🧪 Test Credentials

Want to try it quickly? Create a new account or use:

- **Email:** `test@dobby.com`
- **Password:** `password123`

---

## 📂 Project Structure

```
dobby-drive/
├── backend/           # Express + MongoDB API
│   ├── controllers/   # Business logic
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & upload middleware
│   └── uploads/       # Local file storage
├── frontend/          # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page views
│   │   ├── context/     # Auth context
│   │   └── utils/       # API & helpers
│   └── public/
├── mcp-server/        # MCP AI integration
│   └── index.js       # MCP tool definitions
└── README.md
```

---

## 🎨 UI Preview

DobbyDrive features a **premium glassmorphism design** with:

- 🌟 Gradient backgrounds and accents
- ✨ Smooth scroll animations
- 🎭 Beautiful hero section
- 📱 Fully responsive layout
- 🧭 Intuitive sidebar navigation

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

---

## 📄 License

MIT License — feel free to use this project for learning, building, or inspiration!

---

## 🙌 Acknowledgments

- Inspired by Google Drive
- Built with ❤️ using the MERN stack
- AI-powered by MCP (Model Context Protocol)

---

<div align="center">

### 🌟 Star this repo if you found it useful!

Made with ❤️ by **DobbyDrive Team**

</div>
