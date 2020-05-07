import React, { Component } from 'react';
import SearchBox from '../../components/SearchBox';
import Movies from '../../components/MovieList';
import { search } from "../../services/utils";
import { Loader, Header, Divider } from 'semantic-ui-react'
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import MovieCard from "../../components/MovieCard"

class MovieView extends Component {
    state = {
        movies: null,
        loading: false,
        value: ""
    }

    componentDidMount() {
        this.getTrending()
    }

    search = val => {
        this.setState({ loading: true });

        const { location, history } = this.props;

        if (!val) {
            return this.getTrending();
        }

        search(
            `https://api.themoviedb.org/3/search/movie?api_key=cfe422613b250f702980a3bbf9e90716&query=${val}`
        ).then(results => {
            if (location.pathname !== '/') {
                history.push("/")
            }

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
        document.body.style.backgroundImage = "none";

        if (this.state.loading) return <Loader active size='large'>Loading</Loader>

        let movies = <Divider className="white-color" horizontal>
            <Header as='h3'>There's no movies</Header>
        </Divider>;

        if (this.state.movies && this.state.movies.length) {
            movies = this.state.value ?
                <Movies list={this.state.movies} />
                : <div>
                    <Divider horizontal><Header className="white-color" as='h2'
                        icon='star'
                        content='Weekly trending' /></Divider>
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
                    <Route path="/:movieId" component={MovieCard} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default withRouter(MovieView);
