import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Hotels extends Component {
    render() {
        return (
            <div>
                hotels
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Hotels);