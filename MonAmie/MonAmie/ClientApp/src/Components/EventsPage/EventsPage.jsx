import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';

class EventsPage extends Component {
    render() {
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
    const { authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connecetedEventsPage = connect(mapStateToProps)(EventsPage);
export { connecetedEventsPage as EventsPage };