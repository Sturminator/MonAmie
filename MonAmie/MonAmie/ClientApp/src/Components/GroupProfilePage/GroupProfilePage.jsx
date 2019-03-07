import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { groupActions } from '../../Actions';
import { Dimmer, Loader } from 'semantic-ui-react';

class GroupProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        const { match: { params }, group } = this.props;

        var idStr = params.groupId.split("_")[1];
        var id = parseInt(idStr) / 11;

        if (!group.group) {
            this.props.dispatch(groupActions.getGroup(id));
        }
        else if (group.group.groupId != id) {
            this.props.dispatch(groupActions.getGroup(id));
        }
    }

    render() {
        const { group } = this.props;

        if (group.loading)
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
    const { authentication, group } = state;
    const { user } = authentication;
    return {
        user,
        group
    };
}

const connectedGroupProfilePage = connect(mapStateToProps)(GroupProfilePage);
export { connectedGroupProfilePage as GroupProfilePage };