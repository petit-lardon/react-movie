import React, {Component} from 'react';
import Like from "./common/Like";
import Table from "./common/Table";
import {Link} from "react-router-dom";

class MoviesTable extends Component {
    columns = [
        {path: 'title',
            label: 'Titre',
            content: (movie) => (
                <Link to={`/movies/${movie._id}`} >{movie.title}</Link>
            )
        },
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Note'},
        {key: 'like',
            content: (movie) => (
                <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
                )},
        {key: 'delete',
            content: (movie) => <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger">Supprimer</button>}
    ]

    render() {
        const {movies, sortColumn, onSort} = this.props;

        return (
            <Table columns={this.columns} sortColumn={sortColumn} onSort={onSort} data={movies} />
        );

    }
}

export default MoviesTable;
