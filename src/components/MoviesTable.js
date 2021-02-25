import React, {Component} from 'react';
import Like from "./Like";
import TableHeader from './TableHeader';

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Titre'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Note'},
        {key: 'like'},
        {key: 'delete'}
    ]

    render() {
        const {movies, onDelete, onLike, sortColumn, onSort} = this.props;

        return (
            <table className="table table-striped table-sm">
                <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
                <tbody>
                {movies.map(movie =>
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
                        <td><button onClick={() => onDelete(movie)} className="btn btn-danger">Supprimer</button></td>
                    </tr>
                )}
                </tbody>
            </table>
        );

    }
}

export default MoviesTable;
