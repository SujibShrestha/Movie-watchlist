# Movie Watchlist 🎬

A full-stack **movie watchlist web app** built with TypeScript (frontend) and Node backend.  
Users can search for movies, add them to a personal watchlist, and view details online.

Live Demo: https://movie-watchlist-py3q.vercel.app

## 🚀 Features

✨ Add movies to your watchlist  
✨ Remove movies from your watchlist  
✨ Search movies using an API or local database  
✨ User-friendly interface  
✨ Persistent watchlist (backend storing data)

## 🛠️ Tech Stack

- **Frontend:** TypeScript, React  
- **Backend:** Node.js, Express  
- **Styling:** Tailwind CSS  
- **API:**  TMDb API

## 📁 Project Structure

```bash
├── backend/ – Server code (API, routes, database)
├── frontend/ – Client UI (React + TypeScript)
└── README.md – This documentation
```

## 💻 Getting Started

### 1) Clone the repository
```bash
git clone https://github.com/SujibShrestha/Movie-watchlist.git
cd Movie-watchlist
```
2) Frontend setup
```bash
cd frontend
npm install
npm run dev
```
3) Backend setup
```bash
cd backend
npm install
npm run dev
```
5) Environment variables

Create a .env file in backend with keys like:
#Backend
```bash
PORT = 3000
TMDB_API_KEY = 
TMDB_BASE_URL=
DATABASE_URL=
DIRECT_URL = 
JWT_SECRET = 
JWT_EXPRIES = 
```
FRONTEND_URL = http://localhost:5173

#Frontend
```bash
VITE_API_BASE_URL= backend url
VITE_TMDB_BASE_URL = 
```

📦 Dependencies

React

TypeScript

Express

Axios / Fetch

Cors

tsx (development)

📌 Usage

Visit the homepage

Search for a movie

Click “Add to Watchlist”

View your saved movies

🤝 Contributing

Feel free to open an issue or submit a pull request to improve this project. All contributions are welcome!

📝 License

Add your license here (e.g., MIT).
If no license file exists, write:

MIT License
