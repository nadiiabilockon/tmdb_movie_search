import React from "react";
import { Grid } from "semantic-ui-react"
import Movie from "./Movie";

const Movies = ({ list }) => {
    let cards = <h3>Loading...</h3>;

    if (list) {
        cards = list.map((m, i) => <Movie key={i} item={m} />);
    }

    return (
        <Grid columns={3} divided>
            <Grid.Row >
                {cards}
            </Grid.Row>
        </Grid>
    );
};

export default Movies;