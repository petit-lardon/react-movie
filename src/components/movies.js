import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from './Like';
import Pagination from "./Pagination";

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
    };

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

    render() {
        //const movies = this.state.movies.splice(0, this.state.pageSize);
        //console.log('movies', movies);
        const { pageSize, currentPage } = this.state;

        if (this.state.movies.length === 0) return <p>Pas de film dans la base de données</p>;

        return (
            <React.Fragment>
                <p>Il y a {this.state.movies.length} films dans la base de données</p>
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
                        {this.state.movies.map(movie =>
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
                    itemsCount={this.state.movies.length}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
        )

    }
}

export default Movies;
