import React from "react";
import { Input, Segment, Image, Grid } from 'semantic-ui-react'
import './index.css';
import Logo from '../../images/tmdb.svg'

const SearchBox = ((props) => {
    return (
        <Segment inverted>
            <Grid verticalAlign='middle'>
                <Grid.Column width={4}>
                    <Image src={Logo} size='small' wrapped />
                </Grid.Column>
                <Grid.Column width={12}>
                    <Input transparent inverted
                        className="full-width"
                        onChange={props.onChange}
                        placeholder="Search Movie Title..." />
                </Grid.Column>
            </Grid>
        </Segment>
    );
})

export default SearchBox;
