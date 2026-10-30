
import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import "./App.css";

const APIKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [sortValue, setSortValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState("");
    const [showSort, setShowSort] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function getMovies() {
            setStatus("Loading movies...");
            setMovies([]);

            let url = baseURL;
            const searchText = search.trim();

            if (searchText !== "") {
                url += "/search/movie?query=" +
                    encodeURIComponent(searchText);
            }
            else if (sortValue !== "") {
                url += "/discover/movie?sort_by=" +
                    sortValue;
            }
            else {
                url += "/movie/popular?";
            }

            if (!url.includes("?")) {
                url += "?";
            }
            else if (!url.endsWith("?")) {
                url += "&";
            }

            url += "api_key=" + APIKey;
            url += "&page=" + currentPage;

            try {
                const response = await fetch(url);

                const data = await response.json();

                let movieList = data.results || [];

                if (searchText !== "" && sortValue !== "") {
                    movieList = [...movieList];

                    if (sortValue === "release_date.asc") {
                        movieList.sort((a, b) =>
                            (a.release_date || "").localeCompare(
                                b.release_date || ""
                            )
                        );
                    }
                    else if (sortValue === "release_date.desc") {
                        movieList.sort((a, b) =>
                            (b.release_date || "").localeCompare(
                                a.release_date || ""
                            )
                        );
                    }
                    else if (sortValue === "vote_average.asc") {
                        movieList.sort((a, b) =>
                            a.vote_average - b.vote_average
                        );
                    }
                    else if (sortValue === "vote_average.desc") {
                        movieList.sort((a, b) =>
                            b.vote_average - a.vote_average
                        );
                    }
                }

                setMovies(movieList);
                setTotalPages(
                    Math.max(1, Math.min(data.total_pages || 1, 500))
                );

                if (movieList.length === 0) {
                    setStatus("No movies found.");
                }
                else {
                    setStatus("");
                }
            }
            catch (error) {
                if (error.name !== "AbortError") {
                    console.error(error);
                    setStatus("Error loading movies.");
                }
            }
        }

        if (APIKey) {
            getMovies();
        }
        else {
            setStatus("Please add your TMDB API key.");
        }

        return () => controller.abort();

    }, [search, sortValue, currentPage]);

    function handleSearch(event) {
        setSearch(event.target.value);
        setCurrentPage(1);
    }

    function changeSort(value) {
        setSortValue(value);
        setCurrentPage(1);
        setShowSort(false);
    }

    function getSortText() {
        if (sortValue === "release_date.asc") {
            return "Release Date (Asc)";
        }
        if (sortValue === "release_date.desc") {
            return "Release Date (Desc)";
        }
        if (sortValue === "vote_average.asc") {
            return "Rating (Asc)";
        }
        if (sortValue === "vote_average.desc") {
            return "Rating (Desc)";
        }
        return "Sort By";
    }

    return (
        <>
            <header className="header">
                <h1>Movie Explorer</h1>
            </header>

            <div className="toolbar">
                <input
                    type="text"
                    id="search"
                    placeholder="Search for a movie..."
                    value={search}
                    onChange={handleSearch}
                />

                <div className="dropdown">
                    <button
                        type="button"
                        id="sortButton"
                        onClick={() => setShowSort(!showSort)}
                    >
                        {getSortText()}
                    </button>

                    {showSort && (
                        <div className="dropdownContent">
                            <div onClick={() => changeSort("")}>
                                Sort By
                            </div>

                            <div onClick={() =>
                                changeSort("release_date.asc")
                            }>
                                Release Date (Asc)
                            </div>

                            <div onClick={() =>
                                changeSort("release_date.desc")
                            }>
                                Release Date (Desc)
                            </div>

                            <div onClick={() =>
                                changeSort("vote_average.asc")
                            }>
                                Rating (Asc)
                            </div>

                            <div onClick={() =>
                                changeSort("vote_average.desc")
                            }>
                                Rating (Desc)
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <main>
                <p className="status">{status}</p>

                <div className="grid">
                    {movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </main>
        </>
    );
}
