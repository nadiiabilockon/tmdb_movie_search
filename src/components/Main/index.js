import React, { Component } from 'react';
import SearchBox from '../SearchBox';
import Movies from '../Movies';
import { search } from "../../services/utils";

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: null,
            movieID: 157336, 
            loading: false,
            value: ""
        }
    }

    search = async val => {
        this.setState({ loading: true });
        const results = await search(
            `https://api.themoviedb.org/3/search/movie?api_key=cfe422613b250f702980a3bbf9e90716&query=${val}`
        );
        const movies = results;

        this.setState({ movies, loading: false });
    };

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    get renderMovies() {
        let movies = <h1>There's no movies</h1>;
        if (this.state.movies) {
            movies = <Movies list={this.state.movies} />;
        }

        return movies;
    }
    render() {
        return (
            <div>
                <SearchBox onChange={this.onChangeHandler} />
                {this.renderMovies}
            </div>
        )
    }
}

export default Main;
