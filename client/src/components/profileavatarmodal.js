// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import classNames from 'classnames';

// Material-UI components
import { Button, Avatar, Tooltip, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography, withStyles } from '@material-ui/core';
import { PersonOutline } from '@material-ui/icons';

// Firebase
import firebaseClass from '../firebase';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    twitterAvatar: {
        width: 30,
        height: 30,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    profileAvatarTooltip: {
        backgroundColor: '#000'
    },
    profileAvatarButton: {
        color: '#fff',
        padding: '0',
        fontSize: '1em'
    },
    menuHandleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    menuHandleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '1em'
    },
    menuUpperText: {
        marginRight: '1em'
    },
    menuDivider: {
        borderBottom: '1px solid #80808026'
    },
    menuPersonOutline: {
        color: '#000',
        marginRight: '0.8em'
    },
    profileMenuGrid: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    profileParentGrid: {
        borderBottom: '1px solid #80808026',
        '&:hover': {
            backgroundColor: '#fff'
        }
    },
    profileChildMenuGrid: {
        borderBottom: '1px solid #80808026',
        '&:hover': {
            backgroundColor: '#00acee'
        }
    },
    profileChildMenuGridText: {
        '&:hover': {
            color: '#fff'
        }
    },
    buttonRefClass: {
        paddingTop: '0em'
    },
    popperRootClass: {
        marginTop: '0.5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class ProfileAvatarModal extends Component {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({ 
            open: true 
        });
    };

    handleClose = () => {
        this.setState({ 
            open: false 
        });
    };

    // ----------------------------------------------------------------------------------------------------- //

    render() {
        const { classes, avatarImg, name } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <Tooltip
                    title={
                        <Button className={classes.profileAvatarButton}>
                            Profile and settings
                        </Button>
                    }
                    classes={{
                        tooltip: classes.profileAvatarTooltip
                    }}
                >
                    <Button 
                        buttonRef={node => {
                                this.anchorEl = node;
                        }}
                        className={classes.buttonRefClass}
                    >
                        <Avatar 
                            alt="twitter avatar" 
                            src={avatarImg} 
                            className={classes.twitterAvatar} 
                            aria-owns={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                        />
                    </Button>
                </Tooltip>
                    <Popper 
                        open={open} 
                        anchorEl={this.anchorEl} 
                        transition 
                        disablePortal
                        className={classes.popperRootClass}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose} className={classes.profileParentGrid}>
                                            <Typography variant="subtitle2" className={classes.menuUpperText}>
                                                <div className={classes.handleTextUpperDiv}>
                                                    <span className={classes.menuHandleTextUpper}>{name}</span>
                                                    <span className={classes.menuHandleTextLower}>@{name}</span>
                                                </div>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classNames(classes.menuDivider, classes.profileChildMenuGrid, classes.menuPersonOutline)}>
                                            <PersonOutline className={classes.menuPersonOutline} />
                                            <Typography variant="subtitle1" className={classes.profileChildMenuGridText}>
                                                Profile
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classNames(classes.menuDivider, classes.profileChildMenuGrid)}>
                                            <Typography 
                                                variant="subtitle1" 
                                                className={classes.profileChildMenuGridText}
                                                onClick={() => firebaseClass.signOut()}
                                            >
                                                Log Out @{name}
                                            </Typography>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        );

    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileAvatarModal);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
