// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// * Material-UI components
import { CircularProgress } from '@material-ui/core';

// * Components
import FollowUser from './followuser';
import UnfollowUser from './unfollowuser';
import Error from './error';

// * Apollo Queries
import { COMPARE_FRIENDSHIPS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const TooltipFollowButton = props => {
    const { screen_name, tweetUserId, profileLinkColor, currentUser } = props;
    return (
            <Query 
                query={COMPARE_FRIENDSHIPS} 
                variables={{ target_screenName: screen_name, source_screenName: currentUser }}
                fetchPolicy='cache-first'
            >
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) return <Error />;
                    // * If the data exists, display the follow/unfollow button
                    // * Else render the error - preventing the component tree from unmounting
                    return data.currentUser ?
                        // * If the tool tip is showing the authenticated user, hide the follow/unfollow button - else if not, then display it
                        screen_name === currentUser
                            ?
                            null
                            :
                        data.currentUser.compareRelationship.relationship.target.followed_by === true
                            ?
                        <UnfollowUser
                            id={tweetUserId}
                            screen_name={screen_name}
                            currentUser={currentUser}
                            profileLinkColor={profileLinkColor}
                        />
                            :
                        <FollowUser
                            id={tweetUserId}
                            screen_name={screen_name}
                            currentUser={currentUser}
                        />  
                    :
                    null;     
                }}
            </Query>   
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default TooltipFollowButton;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
