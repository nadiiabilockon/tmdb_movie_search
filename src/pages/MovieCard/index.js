import React, { useEffect, useState } from "react";
import { Card, Image, Grid, Header, Divider } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton"
import axios from "axios";
import './index.css';

let backdropIMG = '';

const MovieCard = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=cfe422613b250f702980a3bbf9e90716`
    ).then(result => {
      setMovie(result.data)
    }).catch(err => console.log(err))
  }, [])

  const renderMovie = () => {
    const { title, tagline, genres, release_date,
      runtime, overview, poster_path, vote_average, name } = movie;

    const genresList = genres && genres.map(g => <span key={g.id}>{g.name}</span>)

    if (poster_path) {
      backdropIMG = 'https://image.tmdb.org/t/p/original' + poster_path;
      document.body.style.transition = 'background-image 0.5s ease-in-out;'
      document.body.style.backgroundImage = 'url(' + backdropIMG + ')'
    }

    return (
      <React.Fragment>
        <div className={`full-view-card__image ${poster_path && "no_image_holder"}`}>
          <Image
            src={poster_path ?
              `http://image.tmdb.org/t/p/w500${poster_path}`
              : require('../../images/glyphicons-basic-picture.svg')
              
            }
            alt="Poster image"
          />
        </div>

        <Card.Content>
          <Header as="h1">{title || name}</Header>
          <Divider />
          <Card.Meta className="tagline">{tagline}</Card.Meta>
          <Card.Description>
            <p>{overview}</p>
            <div className="additional-details">
              <Grid columns={2}>
                <Grid.Row className="release-details">
                  <Grid.Column>
                    Original Release: <span className="meta-data">{release_date}</span>
                  </Grid.Column>
                  <Grid.Column>
                    Running Time: <span className="meta-data">{runtime} mins</span>
                  </Grid.Column>
                  <Grid.Column> Vote Average: <span className="meta-data">{vote_average} / 10</span></Grid.Column>
                </Grid.Row>
              </Grid>
              <div className="genre-list">{genresList}</div>
            </div>
          </Card.Description>
        </Card.Content>
      </React.Fragment>
    )
  }

  return (
    <div className="full-view-card">
      <BackButton />
      <Card>
        {movie && renderMovie()}
      </Card>
    </div>
  )
}

export default MovieCard;
