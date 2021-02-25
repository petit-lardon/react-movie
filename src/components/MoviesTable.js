import React, {Component} from 'react';
import Like from "./Like";
import TableHeader from './TableHeader';
import TableBody from "./TableBody";

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Titre'},
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
            <table className="table table-striped table-sm">
                <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody columns={this.columns} data={movies} />
            </table>
        );

    }
}

export default MoviesTable;
