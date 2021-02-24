import React from 'react';
import Like from "./Like";

const MoviesTable = (props) => {
    const {movies, onDelete, onLike, onSort} = props;

    return (
        <table className="table table-striped table-sm">
            <thead>
            <tr>
                <th onClick={() => onSort('title')}>Titre</th>
                <th onClick={() => onSort('genre.name')}>Genre</th>
                <th onClick={() => onSort('numberInStock')}>Stock</th>
                <th onClick={() => onSort('dailyRentalRate')}>Note</th>
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
                    <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
                    <td><button onClick={() => onDelete(movie)} className="btn btn-danger">Supprimer</button></td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default MoviesTable;
