import React from "react";
import { Grid } from "semantic-ui-react"
import Movie from "./Movie";

const MovieList = ({ list }) => {
    let cards = <h3>Loading...</h3>;

    if (list) {
        cards = list.map((m, i) => <Movie key={i} item={m} />);
    }

    return (
        <Grid doubling columns={5} divided='vertically'>
            <Grid.Row >
                {cards}
            </Grid.Row>
        </Grid>
    );
};

export default MovieList ;