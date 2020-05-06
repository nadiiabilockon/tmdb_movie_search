import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { truncStr } from "../../../services/utils";
import { Link } from "react-router-dom";
import './index.css';

const MovieCard = props => {
    const { title, poster_path, vote_average, name, id } = props.item;

    return (
        <Grid.Column className="movies">
            <Link to={`/${id}`}>
                <Card className={poster_path ? "" : "no_image_holder"}>
                    <Image
                        src={poster_path ? `http://image.tmdb.org/t/p/w185${poster_path}` : require('../../../images/glyphicons-basic-picture.svg')}
                        wrapped
                        ui={false}
                    />
                    <Card.Content>
                        <Card.Header>{truncStr(title || name, 19)}</Card.Header>
                        <Card.Meta>{vote_average}</Card.Meta>
                    </Card.Content>
                </Card>
            </Link>
        </Grid.Column>
    );
};

export default MovieCard;