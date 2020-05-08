import React, { PureComponent } from "react";
import { Input, Image, Grid } from 'semantic-ui-react'
import './index.css';
import Logo from '../../images/tmdb.svg'

class SearchBox extends PureComponent {
    render() {
        return (
            <div className="nav">
                <Grid verticalAlign='middle'>
                    <Grid.Column width={4}>
                        <Image src={Logo} alt="Logo" size='small' wrapped />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Input transparent inverted
                            className="full-width"
                            onChange={this.props.onChange}
                            placeholder="Search Movie Title..." />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default SearchBox;
