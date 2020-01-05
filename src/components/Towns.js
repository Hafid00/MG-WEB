import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class Towns extends Component {
    render() {
        return (
            <div>
                towns
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Towns);