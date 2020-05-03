import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { truncStr } from "../../../services/utils";

const MovieCard = props => {
    const { title, poster_path, vote_average, name, id } = props.item;

    return (
        <Grid.Column>
            <Card>
                <Image
                    src={poster_path ? `http://image.tmdb.org/t/p/w185${poster_path}` : 'https://react.semantic-ui.com/images/wireframe/image-text.png'}
                    wrapped
                    ui={false}
                    as='a'
                    href={`/${id}`}
                />
                <Card.Content>
                    <Card.Header>{truncStr(title || name, 19)}</Card.Header>
                    <Card.Meta>{vote_average}</Card.Meta>
                </Card.Content>
            </Card>
        </Grid.Column>
    );
};

export default MovieCard;