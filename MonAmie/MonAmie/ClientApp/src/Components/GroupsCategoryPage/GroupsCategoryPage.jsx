import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationBar } from '../../Components';
import { categoryActions, groupActions } from '../../Actions';
import { Dimmer, Loader, Container, Segment, Divider, Grid, Header } from 'semantic-ui-react';

class GroupsCategoryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        const { match: { params }, categories, groups } = this.props;

        var idStr = params.categoryName.split("_")[1];
        var id = parseInt(idStr) / 11;

        if (!categories.items) {
            this.props.dispatch(categoryActions.getAll());
        }

        if (!groups.items) {
            this.props.dispatch(groupActions.getAllForCategory(id));
        }
        else if (groups.items.id != id) {
            this.props.dispatch(groupActions.getAllForCategory(id));
        }
    }

    render() {
        const { groups } = this.props;

        if (groups.loading)
            return (<div style={{ paddingTop: '600px' }}>
                <Dimmer active>
                    <Loader active size='massive' inline='centered' />
                </Dimmer>
            </div>);

        if (!groups.groups)
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
                <Container fluid style={{ margin: '5px' }}>
                    <Segment fluid='true' style={{ backgroundColor: '#a8d0e6' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h1' textAlign='center'>
                                    <Header.Content style={{ color: 'white' }}>{groups.groups.categoryName}</Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid>
                        <Divider style={{ backgroundColor: 'white' }} />
                    </Segment>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication, categories, groups } = state;
    const { user } = authentication;
    return {
        user,
        categories,
        groups
    };
}

const connecetedGroupsCategoryPage = connect(mapStateToProps)(GroupsCategoryPage);
export { connecetedGroupsCategoryPage as GroupsCategoryPage };