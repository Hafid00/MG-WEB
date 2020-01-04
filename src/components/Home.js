import React from 'react';
import {connect} from 'react-redux';
class Home extends React.Component {
    state = {  }
    render() {
        return (
            <div>
                <h2>
                    claro
                </h2>
            </div>
        );
    }
}

export default connect()(Home);