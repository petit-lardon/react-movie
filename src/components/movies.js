import React, { Component } from "react";
import {Link} from "react-router-dom";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from './MoviesTable';
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import SearchBox from "./form/SearchBox";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: {path: 'title', order: 'asc'}
    };

    componentDidMount() {
        const genres = [{_id: '', name: 'Tous'}, ...getGenres()];
        this.setState({movies: getMovies(), genres});
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
        this.setState({currentPage: page});
    }

    handleGenreSelect = (genre) => {
        this.setState({searchQuery: "", selectedGenre: genre, currentPage: 1});
    }

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    }

    handleSearch = (query) => {
        this.setState({searchQuery: query, selectedGenre: null, currentPage: 1});
    }

    render() {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            sortColumn,
            searchQuery,
            movies: allMovies
        } = this.state;

        let filtered = allMovies;

        if(searchQuery) {
            filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        }
        else if (selectedGenre && selectedGenre._id) {
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);

        if (this.state.movies.length === 0) return <p>Pas de film dans la base de données</p>;

        return (
            <div className="row">
                <div className="col-2">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>

                <div className="col">
                    <Link to="/movies/new" className="btn btn-primary" style={{marginBottom: 30}}>New movie</Link>
                    <p>Il y a {filtered.length} films dans la base de données</p>

                    <SearchBox value={searchQuery} onChange={this.handleSearch} />

                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />
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
