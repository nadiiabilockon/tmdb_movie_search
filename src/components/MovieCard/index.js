import React, { useEffect } from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import './index.css';
let backdropIMG;

const MovieCard = ({ data }) => {

  let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
    production = data.production,
    productionCountries = data.production_countries,
    genres = data.genre,
    totalRevenue = data.revenue,
    productionList = nestedDataToString(production),
    productionCountriesList = nestedDataToString(productionCountries),
    noData = '-',
    genresList = nestedDataToString(genres);
  backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;

  if (data.poster == null) {
    posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
  }

  useEffect(() => {
    document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
  });

  return (
    <Card>
      <Image
        src={posterIMG}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{data.original_title}</Card.Header>
        <Card.Meta>{data.tagline}</Card.Meta>
        <Card.Description>
          {data.overview}
          <p>{data.overview}</p>
          <div className="additional-details">
            <span className="genre-list">{genresList}</span>
            <span className="production-list">{productionList}</span>
            <Grid columns={2}>
              <Grid.Row className="release-details">
                <Grid.Column>
                  Original Release: <span className="meta-data">{data.release}</span>
                </Grid.Column>
                <Grid.Column>
                  Running Time: <span className="meta-data">{data.runtime} mins</span>
                </Grid.Column>
                <Grid.Column>Box Office: <span className="meta-data">{totalRevenue}</span></Grid.Column>
                <Grid.Column> Vote Average: <span className="meta-data">{data.vote}</span></Grid.Column>
              </Grid.Row>
            </Grid>
            </div>
        </Card.Description>
      </Card.Content>
    </Card>
  )
};

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
