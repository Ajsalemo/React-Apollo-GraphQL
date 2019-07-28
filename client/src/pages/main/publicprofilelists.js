// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import PublicProfileHandle from '../../components/publicprofilehandle';
import Recommended from '../../components/recommended';
import ListsComponent from '../../components/listscomponent';
import Trending from '../../components/trending';

// Pages
import NotFound from './notfound';

// Apollo Query
import { VERIFY_USER, SHOW_USER } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicListsContainerStyle: {
        marginTop: '0.7em',
        display: 'flex',
        justifyContent: 'center'
    },
    publicListsHandlerGrid: {
        width: 'auto',
        paddingRight: '0em'
    },
    publicListsTimelineItem: {
        marginRight: '0.6em'
    },
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let PublicProfileLists = props => {
    const param = props.match.params.params; 
    const { classes } = props;
    return (
        <React.Fragment>
            <Query
                query={SHOW_USER}
                variables={{
                    screen_name: param
                }}
            >
                {({ loading: loadingOne, error: errorOne, data: one }) => (
                    <Query query={VERIFY_USER}>
                        {({ loading: loadingTwo, error: errorTwo, data: two }) => {
                            if (loadingOne || loadingTwo) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                            if (errorOne || errorTwo) return <div><NotFound /></div>;                 
                            return (
                                <React.Fragment>
                                    <Navbar 
                                        profileLinkColor={one.currentUser.showUser.profile_link_color}
                                        avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                        name={two.currentUser.verifyCredentials.name}
                                        screenName={two.currentUser.verifyCredentials.screen_name}
                                    /> 
                                    <PublicProfileBanner
                                        URLparam={param}
                                        profileBannerURL={one.currentUser.showUser.profile_banner_url}
                                    />
                                    <ProfileBannerBar 
                                        URLparam={param}
                                        screenName={one.currentUser.showUser.screen_name}
                                        statusCount={one.currentUser.showUser.statuses_count}
                                        friendsCount={one.currentUser.showUser.friends_count}
                                        followersCount={one.currentUser.showUser.followers_count}
                                        favouritesCount={one.currentUser.showUser.favourites_count}
                                        tweetUserId={one.currentUser.showUser.id}
                                        profileLinkColor={one.currentUser.showUser.profile_link_color}
                                        currentUser={two.currentUser.verifyCredentials.screen_name}
                                        avatarImg={one.currentUser.showUser.profile_image_url_https}
                                    />
                                    <Grid container className={classes.publicListsContainerStyle}>
                                        <Grid item xs={8} sm={8} md={2} className={classes.publicListsHandlerGrid}>
                                            <PublicProfileHandle 
                                                URLparam={param}
                                                currentUser={two.currentUser.verifyCredentials.screen_name}
                                                screenName={one.currentUser.showUser.screen_name}
                                                verified={one.currentUser.showUser.verified}
                                                description={one.currentUser.showUser.description}
                                                createdAt={one.currentUser.showUser.created_at}
                                                name={one.currentUser.showUser.name}
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                                avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                            />
                                        </Grid>
                                        <Grid item md={4} className={classes.publicListsTimelineItem}>
                                            <ListsComponent 
                                                screenName={one.currentUser.showUser.screen_name}
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            />
                                        </Grid>
                                        <Grid item md={2}>
                                            <Recommended />
                                            <Trending 
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            );
                        }}
                    </Query>
                )}
            </Query>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

PublicProfileLists = withStyles(styles)(PublicProfileLists);

export default withRouter(PublicProfileLists);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
