
const imageURL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
    let poster = "";

    if (movie.poster_path) {
        poster = imageURL + movie.poster_path;
    }

    return (
        <div className="movie-card">
            {poster ? (
                <img
                    src={poster}
                    alt={movie.title}
                />
            ) : (
                <div className="no-poster">
                    No Poster Available
                </div>
            )}

            <h2>{movie.title}</h2>

            <p>
                Release Date: {movie.release_date || "N/A"}
            </p>

            <p>
                Rating: {movie.vote_average}
            </p>
        </div>
    );
}


