# CPSC 349 Homework 3 – Movie Explorer

## Description

Movie Explorer is a React web application that allows users to browse, search, and sort movies using The Movie Database (TMDB) API.

The application displays movie posters, titles, release dates, and average ratings.

## How to Run Locally

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/Homework-3.git
```

**2. Open the project folder**

```bash
cd Homework-3
```

**3. Install dependencies**

```bash
npm install
```

**4. Set up the API key**

Create a `.env` file in the project root and add:

```env
VITE_TMDB_API_KEY= YOUR_TMDB_API_KEY
```

Replace the placeholder with a valid TMDB API key.

**5. Start the application**

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173/`.

## API

Movie data is provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
