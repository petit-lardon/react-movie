import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import Like from './Like';
import Pagination from "./Pagination";
import ListGroup from "./ListGroup";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1
    };

    componentDidMount() {
        this.setState({movies: getMovies(), genres: getGenres()});
        console.log('state', this.state);
    }

    handleDelete = (movie) => {
        const movies = [...this.state.movies];
        const i = movies.findIndex(m => m._id === movie._id);

        movies.splice(i, 1);
        this.setState({movies});
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const i = movies.indexOf(movie);

        movies[i] = {...movies[i]};
        movies[i].liked = !movies[i].liked;
        this.setState({movies});
    }

    handlePageChange = (page) => {
        console.log(page);
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        console.log('genre', genre);
        this.setState({selectedGenre: genre});
    }

    render() {
        //const movies = this.state.movies.splice(0, this.state.pageSize);
        //console.log('movies', movies);
        const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;
        console.log('selectedGenre',selectedGenre);
        console.log('allMovies',allMovies);
        const filtered = selectedGenre ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
        console.log('filtered',filtered);
        const movies = paginate(filtered, currentPage, pageSize);

        if (this.state.movies.length === 0) return <p>Pas de film dans la base de données</p>;

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>

                <div className="col">
                    <p>Il y a {filtered.length} films dans la base de données</p>
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Note</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {movies.map(movie =>
                                <tr key={movie._id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre.name}</td>
                                    <td>{movie.numberInStock}</td>
                                    <td>{movie.dailyRentalRate}</td>
                                    <td><Like liked={movie.liked} onClick={() => this.handleLike(movie)} /></td>
                                    <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger">Supprimer</button></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        itemsCount={filtered.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />

                </div>
            </div>
        )

    }
}

export default Movies;
