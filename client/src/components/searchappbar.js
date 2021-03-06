// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// * Material-UI components
import { withStyles, AppBar, Typography, Toolbar } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    searchToolBar: {
        height: '4.5em',
        margin: '0em 10em',
        display: 'flex',
        justifyContent: 'end'
    },
    searchAppBar: {
        marginTop: '2.5em'
    },
    searchAppBarFontColor: {
        color: '#fff',
        fontWeight: 'bold'
    },
    searchAppBarPlaceholder: {
        height: '2.3em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SearchAppBar = props => {
    const { classes, searchQuery, profileLinkColor, dark_mode } = props;
    return (
        <React.Fragment>
            <AppBar 
                position='static' 
                className={classes.searchAppBar}
                // ! This inline style dictates what the user's color theme is set to
                style={{ backgroundColor: `#${profileLinkColor}` }}
            >
                <Toolbar className={classes.searchToolBar}>
                    <Typography variant='h5' className={classes.searchAppBarFontColor}>
                        {searchQuery}
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppBar 
                position='static' 
                className={classes.searchAppBarPlaceholder}
                // ! Inline styles are used for dark mode
                style={{ backgroundColor: dark_mode ? '#000000d4' : '#fff' }}
            >
                <Toolbar></Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchAppBar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
