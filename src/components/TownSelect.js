import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { fetchTowns } from "../actions/townsActions";
import { Button } from "react-bootstrap";
import { Dialog } from "primereact/dialog";
import { displayDialog, addTown } from '../actions/townsActions';
import { ScrollPanel } from "primereact/scrollpanel";
import { InputText } from "primereact/inputtext";



class TownSelect extends Component {
  constructor() {
    super();
    this.state = {
      town: null,
      towns: null,
      newTown: null,
    };
  }

  componentDidMount() {
    this.props.fetchTowns();
  }
  updateProperty(property, value) {
    let newTown = this.state.newTown;
    newTown[property] = value;
    this.setState({ newTown });
  }
  onHideCallback = () => {
    this.props.displayDialog(false);
  };
  openDialog = () => {
    this.props.displayDialog(true);
    this.setState({ newTown: { name: '', type: ''}})
  }
  createTown = () => {
    this.props.addTown(this.state.newTown, this.props.token);
    this.props.displayDialog(false);
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
                <Button type="button" class="btn btn-primary" onClick={this.openDialog}>Add a city</Button>
                <Dialog
                  visible={this.props.dialog}
                  width="200px"
                  header="New town"
                  modal={true}
                  onHide={this.onHideCallback}
                >
                  {this.state.newTown && (
              <div className="p-grid p-fluid">
                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="name">Name</label>
                    <InputText
                      id="name"
                      onChange={e => {
                        this.updateProperty("name", e.target.value);
                      }}
                      value={this.state.newTown.name}
                    />
                  </div>

                

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="type">Type</label>
                    <InputText
                      id="type"
                      onChange={e => {
                        this.updateProperty("type", e.target.value);
                      }}
                      value={this.state.newTown.type}
                    />
                  </div>
                  <Button type="button" class="btn btn-primary" onClick={this.createTown}>Save</Button>

              </div>
            )}
          </Dialog>
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
    townSelect: state.towns.townSelect,
    dialog: state.towns.displayDialog,
    token: state.user.token

  };
}
const mapDispatchToProps = dispatch => ({
  fetchTowns: () => {
    dispatch(fetchTowns());
  },
  displayDialog: bool => {
    dispatch(displayDialog(bool));
  },
  addTown: (data, token) => {
    dispatch(addTown(data, token));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TownSelect);
