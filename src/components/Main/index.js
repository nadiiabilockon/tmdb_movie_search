import React, { Component } from 'react';
// import SearchBox from '../';
import MovieCard from '../MovieCard';

const Bloodhound = require('bloodhound-js');

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movieID: 157336 // set initital load movie - Interstellar
        }
    }
    render() {
        return (
            <div>
                {/* <SearchBox fetchMovieID={this.fetchMovieID.bind(this)} /> */}
                <MovieCard data={this.state} />
            </div>
        )
    }

    fetchApi(url) {

        fetch(url).then((res) => res.json()).then((data) => {
            this.setState({
                movieID: data.id,
                original_title: data.original_title,
                tagline: data.tagline,
                overview: data.overview,
                homepage: data.homepage,
                poster: data.poster_path,
                production: data.production_companies,
                production_countries: data.production_countries,
                genre: data.genres,
                release: data.release_date,
                vote: data.vote_average,
                runtime: data.runtime,
                revenue: data.revenue,
                backdrop: data.backdrop_path

            })
        })

            .catch((err) => console.log('Movie not found!'))

    }

    fetchMovieID(movieID) {
        let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
        this.fetchApi(url)
    }

    componentDidMount() {
        let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
        this.fetchApi(url)
    }
}
export default Main;
