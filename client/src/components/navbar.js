// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Avatar, AppBar, Typography, Toolbar, CircularProgress } from '@material-ui/core';
import { Home, OfflineBolt, NotificationsNone, Message } from '@material-ui/icons';

// Image
import twitterminilogo from '../images/twitterminilogo.png';

// Apollo Queries
import { GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// Components
import TweetModal from '../components/tweetmodal';
import ProfileAvatarModal from '../components/profileavatarmodal';
import SearchTweets from '../components/searchtweets';
import Error from '../components/error';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    appBar: {
        backgroundColor: '#fff',
        height: '2.7em'
    },
    notificationDiv: {
        display: 'flex',
        paddingBottom: '0em',
        width: '25%',
        justifyContent: 'space-between',
        [theme.breakpoints.up(599)]: {
            paddingBottom: '0.6em'
        }
    },
    innerText: {
        verticalAlign: 'super',
        [theme.breakpoints.down(1413)]: {
            display: 'none'
        }
    },
    colorDefault: {
        textDecoration: 'none',
        color: 'gray',
        paddingBottom: '0em',
        '&:hover': {
            color: '#00acee',
            cursor: 'pointer',
            borderBottom: '2px solid #00acee'
        }
    },
    avatarDiv: {
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '0.5em',
        [theme.breakpoints.up(599)]: {
            paddingBottom: '1em'
        }
    },
    twitterAvatar: {
        width: 30,
        height: 30,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    avatarMediaQuery: {
        margin: '0em 0.3em',
        [theme.breakpoints.down(889)]: {
            display: 'none'
        }
    },
    searchDiv: {
        display: 'flex',
        marginTop: '0.5em',
        justifyContent: 'space-between',
        height: '3em',
        width: 'auto',
        paddingBottom: '1em',
        [theme.breakpoints.up(599)]: {
            marginTop: '0',
            paddingBottom: '1em'
        }
    },
    tweetButton: {
        backgroundColor: '#00acee',
        color: '#fff'
    },
    toolBar: {
        justifyContent: 'center'
    },
    navAnchor: {
        paddingTop: '0.3em'
    },
    errorAndLoadingDiv: {
        width: '25%',
        paddingBottom: '1em',
        display: 'flex',
        justifyContent: 'center'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Navbar = props => {
    const { classes, avatarImg, name, screenName, profileLinkColor } = props;
    return (
        <React.Fragment>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <div className={classes.notificationDiv}>
                        <Typography variant="subtitle2" className={classes.navAnchor}>
                            <Link to='/main' className={classes.colorDefault}>
                                <Home /><span className={classes.innerText}>Home</span>
                            </Link>
                        </Typography>
                        <Typography variant="subtitle2" className={classes.colorDefault}>
                            <OfflineBolt /><span className={classes.innerText}>Moments</span>
                        </Typography>
                        <Typography variant="subtitle2" className={classes.colorDefault}>
                            <NotificationsNone /><span className={classes.innerText}>Notifications</span>
                        </Typography>
                        <Typography variant="subtitle2" className={classes.colorDefault}>
                            <Message /><span className={classes.innerText}>Messages</span>
                        </Typography>
                    </div>
                    {/* // *! This refetchs the authenticating users timeline */}
                    <Query
                        query={GET_AUTHUSER_TWEETS}
                        fetchPolicy='network-only'
                    >
                        {({ loading, error, data, refetch }) => {
                            if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>
                            if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                            return (
                                <div className={classes.avatarDiv} onClick={() => refetch()}>
                                    <Avatar alt="twitter logo" src={twitterminilogo} className={classes.twitterAvatar} /> 
                                </div>        
                            );
                        }}
                    </Query>
                    <div className={classes.searchDiv}>
                        <SearchTweets />
                        <ProfileAvatarModal
                            avatarImg={avatarImg}
                            name={name}
                            screenName={screenName}
                        />
                        {/* Classes component for the modal to submit tweets */}
                            <TweetModal 
                                profileLinkColor={profileLinkColor}  
                                avatarImg={avatarImg}
                                screenName={screenName}                                              
                            />
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Navbar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
