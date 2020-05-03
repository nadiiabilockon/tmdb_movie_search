import React, { useEffect, useState } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { search } from "../../services/utils";
import axios from "axios";

let backdropIMG;

const MovieCard = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=cfe422613b250f702980a3bbf9e90716`
    ).then(result => {
      setMovie(result.data)
    }).catch(err => console.log(err))
  }, movie)
  // let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
  //   production = data.production,
  //   productionCountries = data.production_countries,
  //   genres = data.genre,
  //   totalRevenue = data.revenue,
  //   productionList = nestedDataToString(production),
  //   productionCountriesList = nestedDataToString(productionCountries),
  //   noData = '-',
  //   genresList = nestedDataToString(genres);
  // backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;

  // if (data.poster == null) {
  //   posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
  // }

  // useEffect(() => {
  //   if (data.backdrop) document.body.style.backgroundImage = 'url(' + backdropIMG + ')'
  // });

  if (movie) {
    const { title, tagline, genre, release, revenue, runtime, overview, poster_path, vote_average, name, id } = movie;

    return (
      <Card>
        <Image
          src={'https://image.tmdb.org/t/p/w500' + poster_path}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Meta>{tagline}</Card.Meta>
          <Card.Description>
            <p>{overview}</p>
            <div className="additional-details">
              {/* <span className="genre-list">{genresList}</span> */}
              {/* <span className="production-list">{productionList}</span> */}
              <Grid columns={2}>
                <Grid.Row className="release-details">
                  <Grid.Column>
                    Original Release: <span className="meta-data">{release}</span>
                  </Grid.Column>
                  <Grid.Column>
                    Running Time: <span className="meta-data">{runtime} mins</span>
                  </Grid.Column>
                  {/* <Grid.Column>Box Office: <span className="meta-data">{totalRevenue}</span></Grid.Column> */}
                  <Grid.Column> Vote Average: <span className="meta-data">{vote_average}</span></Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
  return (<div>......</div>)
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString;
  if (nestedData !== undefined) {
    nestedData.forEach(function (item) {
      nestedArray.push(item.name);
    });
  }
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};

export default MovieCard;
