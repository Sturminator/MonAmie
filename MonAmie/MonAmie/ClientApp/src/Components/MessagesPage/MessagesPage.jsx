import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { Redirect } from 'react-router-dom';
import { userActions, friendActions } from '../../Actions';
import { Segment, Container, Grid, Header, Divider, Card, Dimmer, Loader, Button, Popup, Modal, Checkbox, Icon } from 'semantic-ui-react';
import { history } from '../../Helpers';
import modalStyles from '../../Styles/modal.styles';

class MessagesPage extends Component {
    render() {
        const { user, users } = this.props;

        if (!user) {
            return <Redirect to='/login' />
        }

        if (users.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        return (
            <div>
                <NavigationBar>
                </NavigationBar>
                <style>{`html, body {background-color: #24305E !important; } `}</style>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connecetedMessagesPage = connect(mapStateToProps)(MessagesPage);
export { connecetedMessagesPage as MessagesPage };