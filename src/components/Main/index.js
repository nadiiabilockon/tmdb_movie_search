import React, { Component } from 'react';
import SearchBox from '../SearchBox';
import Movies from '../Movies';
import { search } from "../../services/utils";
import { Loader, Header } from 'semantic-ui-react'
import {
    Switch,
    Route
} from "react-router-dom";
import NewCard from "../MovieCard"

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: null,
            loading: false,
            value: ""
        }
    }

    componentDidMount() {
        this.getTrending()
    }

    search = val => {
        this.setState({ loading: true });

        if (!val) {
            return this.getTrending();
        }

        search(
            `https://api.themoviedb.org/3/search/movie?api_key=cfe422613b250f702980a3bbf9e90716&query=${val}`
        ).then(results => {
            this.setState({ movies: results, loading: false });
        })
    };

    getTrending = () => {
        this.setState({ loading: true });
        search(
            `https://api.themoviedb.org/3/trending/all/week?api_key=cfe422613b250f702980a3bbf9e90716`
        ).then(results => {
            this.setState({ movies: results, loading: false });
        })
    }

    onChangeHandler = async e => {
        this.search(e.target.value);
        this.setState({ value: e.target.value });
    };

    renderMovies = () => {
        if (this.state.loading) return <Loader active size='large'>Loading</Loader>

        let movies = <h1>There's no movies</h1>;

        if (this.state.movies) {
            movies = this.state.value ? <Movies list={this.state.movies} /> : <div>
                <Header as='h2' icon='star' color='grey' content='Weekly trending' />
                <Movies list={this.state.movies} />
            </div>;
        }

        return movies;
    }

    render() {
        return (
            <React.Fragment>
                <SearchBox onChange={this.onChangeHandler} />
                <Switch>
                    <Route path="/" exact render={this.renderMovies} />
                    <Route path="/:movieId" component={NewCard} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default Main;
