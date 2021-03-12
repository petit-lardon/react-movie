import React from 'react';
import Form from './form/Form';
import Joi from "joi-browser";
import {getGenres} from "../services/fakeGenreService";
import {getMovie, saveMovie} from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
        genres: [],
        data: {
            title: '', genreId: '', numberInStock: '', dailyRentalRate: ''
        },
        errors: {}
    }

    schemas = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().label('Stock').min(0).max(100),
        dailyRentalRate: Joi.number().required().label('Rate').min(0).max(10)
    }

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push('/movies');
    }

    componentDidMount() {
        const genres = getGenres();
        this.setState({genres});

        const movieId = this.props.match.params.id;
        if(movieId === 'new') return;

        const movie = getMovie(movieId);
        if(!movie) return this.props.history.replace('/not-found');
        this.setState({data: this.mapToViewModel(movie)});
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    render() {
        return (
            <div>
                <h1>MovieForm </h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                    {this.renderButton('Add movie')}
                </form>
            </div>
        )
    }
}

export default MovieForm
