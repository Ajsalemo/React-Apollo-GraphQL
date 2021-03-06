// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import classNames from 'classnames';

// * Material-UI components
import { ChatBubbleOutline, BarChart } from '@material-ui/icons';
import { withStyles, Paper, Typography, CircularProgress, Grid, CardMedia } from '@material-ui/core';

// * Apollo Queries
import { SEARCH_TWEETS } from '../apolloclient/apolloqueries';

// * Components
import Error from '../components/error';
import LikeStatus from '../components/likestatus';
import UnLikeStatus from '../components/unlikestatus';
import RetweetModal from '../components/retweetmodal';
import Tweettext from '../components/tweettext';
import UnRetweetStatus from '../components/unretweet';
import ToolTipModal from '../components/tooltipmodal';
import NoResults from '../components/noresults';

// * Helper functions
import { pollMinute, changeGridBackground } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    searchQueryTimelinePaper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1em',
        wordBreak: 'break-word',
        borderRadius: '0%',
        '&:hover': {
            backgroundColor: '#8080801f',
            cursor: 'pointer'
        }
    },
    searchQueryTimelineGrid: {
        height: 'fit-content',
        width: '-webkit-fill-available'
    },
    searchQueryTimelineIcons: {
        fontSize: '1.3em',
        marginRight: '0.5em',
    },
    searchQueryMediaCard: {
        margin: '1em 0',
        height: '20em',
        borderRadius: '3%'    
    },
    errorAndLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    searchQueryOptionsGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    searchQueryOptionsSpacing: {
        marginRight: '2em'
    },
    searchQueryOptionsHover: {
        '&:hover': {
            cursor: 'pointer',
            color: '#005aff59'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const SearchQueryTimeline = props => {
    const { classes, dark_mode, screenName, profileLinkColor, searchQuery, darkModeBorder, darkModeFont, darkModeComponentBackground } = props;
    return (
        <React.Fragment>
            <Query 
                query={SEARCH_TWEETS} 
                pollInterval={pollMinute(1000, 30)} 
                fetchPolicy='network-only'
                variables={{
                    query: searchQuery
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div className={classes.errorAndLoadingDiv} style={{ backgroundColor: changeGridBackground(dark_mode) }}><CircularProgress /></div>;
                    if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                    return (
                        // ! query.length checks to see if there is values being returned, if the values are empty a placeholder will be displayed
                        data.currentUser.searchTweets.statuses.length ?
                            data.currentUser.searchTweets.statuses.map((searchQueryList, i) => {
                                return (
                                    // ! Inline styles are used for dark mode
                                    <Paper className={classes.searchQueryTimelinePaper} key={i} style={{ backgroundColor: darkModeComponentBackground, border: darkModeBorder }}>
                                        <ToolTipModal
                                            name={searchQueryList.user.name}
                                            nickname={searchQueryList.user.screen_name}
                                            statuses_count={searchQueryList.user.statuses_count}
                                            friends_count={searchQueryList.user.friends_count}
                                            followers_count={searchQueryList.user.followers_count}
                                            imgSrc={searchQueryList.user.profile_image_url_https}
                                            id={searchQueryList.id_str}  
                                            tweetUserId={searchQueryList.user.id}
                                            verified={searchQueryList.user.verified}  
                                            profileBannerURL={searchQueryList.user.profile_banner_url}
                                            profileLinkColor={profileLinkColor}
                                            screenName={searchQueryList.user.screen_name}
                                            currentUser={screenName}
                                            darkModeBorder={darkModeBorder}
                                            darkModeFont={darkModeFont}
                                            darkModeComponentBackground={darkModeComponentBackground}    
                                        />
                                        <Grid item className={classes.searchQueryTimelineGrid}>
                                            {/* Tweet text body */}
                                            <Tweettext
                                                name={searchQueryList.user.name}
                                                verified={searchQueryList.user.verified}
                                                nickname={searchQueryList.user.screen_name}
                                                created_at={searchQueryList.created_at}
                                                full_text={searchQueryList.full_text}
                                                id={searchQueryList.id_str}
                                                tweetUserId={searchQueryList.user.id}
                                                darkModeFont={darkModeFont}
                                                darkModeComponentBackground={darkModeComponentBackground}    
                                            />
                                            {/* Tweet Media */}
                                            {searchQueryList.entities.media ?
                                                <CardMedia
                                                    component="img"
                                                    alt="Twitter post's related media"
                                                    className={classes.searchQueryMediaCard}
                                                    image={searchQueryList.entities.media[0].media_url_https}
                                                    title="Twitter post's related media"
                                                />
                                                    :
                                                null
                                            }
                                            <Grid item>
                                                <Typography variant="subtitle2" className={classes.searchQueryOptionsGrid} style={{ color: darkModeFont }}>
                                                    <div className={classNames(classes.searchQueryOptionsSpacing, classes.searchQueryOptionsHover)}>
                                                        <ChatBubbleOutline className={classes.searchQueryTimelineIcons} />
                                                    </div>
                                                    <div className={classNames(classes.searchQueryOptionsGrid, classes.searchQueryOptionsHover)}>
                                                        {/* // * This ternary block displays the option to whether or not to retweet a status */} 
                                                        {/* // * Depending on the returned boolean from the API call */}
                                                        {searchQueryList.retweeted === true
                                                        // * If this status has been retweeted, give the choice to unlike it 
                                                            ?
                                                        <UnRetweetStatus
                                                            id={searchQueryList.id_str}
                                                            retweet_count={searchQueryList.retweet_count}
                                                            screenName={screenName}
                                                            searchQueryParam={searchQuery}
                                                        />
                                                            :
                                                        // * Else, if it hasn't been retweeted - give the option to be able to retweet it
                                                        <RetweetModal
                                                            retweet_count={searchQueryList.retweet_count}
                                                            name={searchQueryList.user.name}
                                                            verified={searchQueryList.user.verified}
                                                            nickname={searchQueryList.user.nickname}
                                                            created_at={searchQueryList.created_at}
                                                            full_text={searchQueryList.full_text}    
                                                            srcImage={searchQueryList.user.profile_image_url_https}  
                                                            id={searchQueryList.id_str}
                                                            profileLinkColor={profileLinkColor}   
                                                            screenName={searchQueryList.user.screen_name}  
                                                            searchQueryParam={searchQuery} 
                                                        />}
                                                    </div>
                                                    <div className={classNames(classes.searchQueryOptionsGrid, classes.searchQueryOptionsHover)}>
                                                        {/* // * This ternary block displays the option to whether or not to like a status */} 
                                                        {/* // * Depending on the returned boolean from the API call */}
                                                        {searchQueryList.favorited === true
                                                        // If this status has been liked alread - give the option to unline it
                                                            ?
                                                        <UnLikeStatus
                                                            id={searchQueryList.id_str}
                                                            favorite_count={searchQueryList.favorite_count} 
                                                            screenName={searchQueryList.user.screen_name}  
                                                            searchQueryParam={searchQuery} 
                                                        />
                                                        // * Else, if it hasn't been liked - give the option to like the status
                                                            :
                                                        <LikeStatus 
                                                            id={searchQueryList.id_str}
                                                            favorite_count={searchQueryList.favorite_count}
                                                            screenName={searchQueryList.user.screen_name}
                                                            searchQueryParam={searchQuery} 
                                                        />}
                                                    </div>
                                                    <BarChart className={classNames(classes.searchQueryTimelineIcons, classes.searchQueryOptionsHover)} />
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                );
                            })
                            :
                        // ! If there are no search results, this message will be displayed
                        <NoResults 
                            dark_mode={dark_mode}
                        />
                    );
                }}
            </Query>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchQueryTimeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

