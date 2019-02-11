import React, { Component } from "react";
import { Form, Segment, TextArea, Divider } from "semantic-ui-react";

export default class BioField extends Component {
    state = { currentLength: 0 };

    onTextChange = (e, { value }) => this.setState({ currentLength: value.length });

    render() {
        const { currentLength } = this.state;

        return (
            <Form>
                <Segment style={{ textAlign: "right", fontWeight: "bold" }}>
                    <TextArea
                        style={{ minHeight: 100 }}
                        MaxLength="500"
                        onChange={this.onChange}
                        placeholder="Give a brief bio of yourself"
                    />
                    <Divider />
                    Characters: {currentLength} / 500
        </Segment>
            </Form>
        );
    }
}