import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { fetchTowns } from "../actions/townsActions";

class TownSelect extends Component {
  constructor() {
    super();
    this.state = {
      town: null,
      towns: null
    };
  }

  componentDidMount() {
    this.props.fetchTowns();
  }
  render() {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-md-4 my-5 mx-auto">
            <div className="card bg-transparent">
              <div className="card-header text-center font-weight-bold bg-transparent">
                Manage
              </div>
              <ul className="list-group list-group-flush">
                <Dropdown
                  filter
                  optionLabel="name"
                  value={this.state.town}
                  options={this.props.townSelect}
                  onChange={e => {
                    this.setState({ town: e.value });
                  }}
                  placeholder="Select a City"
                />
                {this.state.town && (
                  <Link
                    to={{
                      pathname: "/places",
                      state: {
                        town: this.state.town.code,
                        tname: this.state.town.name
                      }
                    }}
                    className="list-group-item btn btn-outline-primary font-weight-bold"
                  >
                    Places
                  </Link>
                )}
                {this.state.town && (
                  <Link
                    to={{
                      pathname: "/hotels",
                      state: {
                        town: this.state.town.code,
                        tname: this.state.town.name
                      }
                    }}
                    className="list-group-item btn btn-outline-primary font-weight-bold"
                  >
                    Hotels
                  </Link>
                )}
                {this.state.town && (
                  <Link
                    to={{
                      pathname: "/restaurants",
                      state: {
                        town: this.state.town.code,
                        tname: this.state.town.name
                      }
                    }}
                    className="list-group-item btn btn-outline-primary font-weight-bold"
                  >
                    Restaurants
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    towns: state.towns.towns,
    townSelect: state.towns.townSelect
  };
}
const mapDispatchToProps = dispatch => ({
  fetchTowns: () => {
    dispatch(fetchTowns());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TownSelect);
