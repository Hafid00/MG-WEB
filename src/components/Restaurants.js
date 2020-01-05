import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Restaurants extends Component {
    render() {
        return (
            <div>
                restaus
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Restaurants);