import React, { useEffect, useState } from "react";
import { Card, Image, Grid, Header, Icon, Divider } from "semantic-ui-react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import './index.css';

let backdropIMG;

const MovieCard = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const history = useHistory();

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=cfe422613b250f702980a3bbf9e90716`
    ).then(result => {
      setMovie(result.data)
    }).catch(err => console.log(err))
  })

  useEffect(() => {
    if (backdropIMG) document.body.style.backgroundImage = 'url(' + backdropIMG + ')'
  });

  if (movie) {
    const { title, tagline, genres, release_date, production_companies,
      runtime, overview, poster_path, vote_average, name } = movie;

    const genresList = nestedDataToString(genres);
    const productionList = nestedDataToString(production_companies);

    if (poster_path) backdropIMG = 'https://image.tmdb.org/t/p/original' + poster_path;

    const handleBack = () => {
      document.body.style.backgroundImage = "none";
      history.goBack()
    }

    return (
      <div className="full-view-card">
        <div>
          <a
            className="back-link"
            onClick={handleBack}
            title="Go back"
          >
            <Icon link size='large' name='arrow alternate circle left outline' />
          </a>
        </div>
        <Card>
          <div className={`full-view-card__image ${poster_path ? "" : "no_image_holder"}`}>
            <Image
              src={poster_path ?
                `http://image.tmdb.org/t/p/w500${poster_path}`
                : require('../../images/glyphicons-basic-picture.svg')
              }
            />
          </div>

          <Card.Content>
            <Header as="h1">{title || name}</Header>
            <Divider />
            <Card.Meta className="tagline">{tagline}</Card.Meta>
            <Card.Description>
              <p>{overview}</p>
              <div className="additional-details">
                <Header sub className="genre-list">{genresList}</Header>
                <p>{productionList}</p>
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
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    )
  }
  return (
    <Header as="h2">No info</Header>
  )
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString;
  if (nestedData !== undefined) {
    nestedData.forEach(function (item) {
      nestedArray.push(item.name);
    });
  }
  resultString = nestedArray.join(', ');
  return resultString;
};

export default MovieCard;
