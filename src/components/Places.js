import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Places extends Component {
    render() {
        return (
            <div>
                places
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Places);