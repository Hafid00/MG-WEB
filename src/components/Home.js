import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";



class Home extends Component {
    componentDidMount() {
        console.log(this.props.location.state.town.code);

    }
    render() {
        return (


            <div className="container">
                <div className="row my-5">
                    <div className="col-md-4 my-5 mx-auto">
                        <div className="card bg-transparent" >
                            <div className="card-header text-center font-weight-bold bg-transparent">Manage</div>
                            <ul className="list-group list-group-flush">
                                <Link to="/hotels" className="list-group-item btn btn-outline-primary font-weight-bold">Hotels</Link>
                                <Link to="/restaurants" className="list-group-item btn btn-outline-primary font-weight-bold">Restaurants</Link>
                                <Link to="/places" className="list-group-item btn btn-outline-primary font-weight-bold">Places</Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(Home);
