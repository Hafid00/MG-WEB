import React, { Component } from "react";
import { connect } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Rating } from "primereact/rating";
import { ScrollPanel } from "primereact/scrollpanel";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import {
  fetchPlaces,
  addPlace,
  displayDialog,
  updPlace,
  delPlace
} from "../actions/placesActions";

class Places extends Component {
  constructor() {
    super();
    this.state = {
      place: null,
      files: []
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onplaceSelect = this.onplaceSelect.bind(this);
    this.addNew = this.addNew.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.upFile = React.createRef();
  }
  componentDidMount() {
    this.props.fetchPlaces(this.props.location.state.town);
  }
  onFileChange(event) {
    this.setState({
      files: event.files
    });
  }
  onerr = () => {
    console.log(this.state.files);
  };
  async save(event) {
    let data = new FormData();
    this.state.files.forEach(a => data.append("file", a));
    console.log(this.state.files, data);
    const Body = {
      name: this.state.place.name,
      rating: this.state.place.rating,
      type: this.state.place.type,
      description: this.state.place.description,
      latitude: this.state.place.latitude,
      longitude: this.state.place.longitude,
      town: { id: this.props.location.state.town }
    };
    console.log(Body);
    if (this.newPlace) {
      await this.props.addPlace(
        this.props.location.state.town,
        Body,
        this.props.token,
        data
      );
    } else {
      this.props.updPlace(
        this.props.location.state.town,
        this.state.place.id,
        Body,
        this.props.token
      );
    }
    this.props.displayDialog(true);
  }

  delete() {
    console.log(this.state.place.id);
    this.props.delPlace(
      this.props.location.state.town,
      this.state.place.id,
      this.props.token
    );
    this.props.displayDialog(true);
  }

  updateProperty(property, value) {
    let place = this.state.place;
    place[property] = value;
    this.setState({ place: place });
  }

  onplaceSelect(e) {
    this.newPlace = false;
    this.props.displayDialog(true);
    this.setState({
      place: Object.assign({}, e.data)
    });
    console.log(e);
  }
  addNew() {
    this.newPlace = true;
    this.setState({
      place: {
        name: "",
        rating: 0,
        place: "",
        type: "",
        description: "",
        latitude: "",
        longitude: ""
      }
    });
    this.props.displayDialog(true);
  }
  onHideCallback = () => {
    // this.upFile.current.state.files.map(d =>{ return {...d, objectURL: 'https://s3.eu-west-3.amazonaws.com/newbuckettrvl/1580859925140-index.jpeg'}});
    // this.upFile.current.state.files[0].objectURL =
    //   "https://s3.eu-west-3.amazonaws.com/newbuckettrvl/1580859925140-index.jpeg";

    if (this.state.files.length > 0) {
      this.setState({ files: [] });
    }
    this.upFile.current.clear();

    this.props.displayDialog(false);
    console.log(this.upFile);
  };
  rateTemplate = rowData => {
    return <Rating value={rowData.rating} cancel={false} readonly={true} />;
  };

  render() {
    let footer = (
      <div
        className="clearfix al"
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          style={{ float: "left" }}
          label="Add"
          icon="pi pi-plus"
          onClick={this.addNew}
        />
      </div>
    );

    let dialogFooter = (
      <div>
        {!this.newPlace && (
          <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
        )}
        <Button label="Save" icon="pi pi-check" onClick={this.save} />
      </div>
    );

    return (
      <div className="container mt-5 p-auto">
        <div>
          <DataTable
            footerStyle={{ bg: "transparent" }}
            value={this.props.places}
            paginator={true}
            rows={15}
            footer={footer}
            selectionMode="single"
            selection={this.state.selectedplace}
            onSelectionChange={e => this.setState({ selectedplace: e.value })}
            onRowSelect={this.onplaceSelect}
            resizableColumns={true}
            columnResizeMode="fit"
          >
            <Column
              field="name"
              header="name"
              sortable={true}
              style={{ width: "250px" }}
            />
            <Column
              field="rating"
              header="rating"
              sortable={true}
              body={this.rateTemplate}
              style={{ textAlign: "center", width: "150px" }}
            />
            <Column
              field="type"
              header="type"
              sortable={true}
              style={{ width: "150px" }}
            />
            <Column
              field="latitude"
              header="latitude"
              sortable={true}
              style={{ width: "150px" }}
            />
            <Column
              field="longitude"
              header="longitude"
              sortable={true}
              style={{ width: "150px" }}
            />
            <Column
              field="description"
              header="description"
              sortable={true}
              style={{ width: "250px" }}
            />
          </DataTable>

          <Dialog
            visible={this.props.dialog}
            width="300px"
            header="place Details"
            modal={true}
            footer={dialogFooter}
            onHide={this.onHideCallback}
          >
            {this.state.place && (
              <div className="p-grid p-fluid">
                <ScrollPanel style={{ width: "100%", height: "400px" }}>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="name">Name</label>
                    <InputText
                      id="name"
                      onChange={e => {
                        this.updateProperty("name", e.target.value);
                      }}
                      value={this.state.place.name}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="rating">Rating</label>
                    <Rating
                      value={this.state.place.rating}
                      onChange={e => {
                        this.updateProperty("rating", e.target.value);
                      }}
                    />
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="type">Type</label>
                    <InputText
                      value={this.state.place.type}
                      onChange={e => {
                        this.updateProperty("type", e.target.value);
                      }}
                    />
                  </div>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="latitude">Latitude</label>
                    <InputText
                      id="latitude"
                      onChange={e => {
                        this.updateProperty("latitude", e.target.value);
                      }}
                      value={this.state.place.latitude}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="longitude">Longitude</label>
                    <InputText
                      id="longitude"
                      onChange={e => {
                        this.updateProperty("longitude", e.target.value);
                      }}
                      value={this.state.place.longitude}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                      id="description"
                      onChange={e => {
                        this.updateProperty("description", e.target.value);
                      }}
                      value={this.state.place.description}
                    />
                  </div>
                  <div className="p-col-4 mb-4" style={{ padding: ".75em" }}>
                    <label htmlFor="images">Images</label>
                    <br />
                    <FileUpload
                      ref={this.upFile}
                      name="demo[]"
                      customUpload={true}
                      uploadHandler={e => this.onFileChange(e)}
                      multiple={true}
                      onError={this.onerr}
                      maxFileSize={1000000}
                    />
                  </div>
                </ScrollPanel>
              </div>
            )}
          </Dialog>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.places.places,
    dialog: state.places.displayDialog,
    token: state.user.token
  };
}
const mapDispatchToProps = dispatch => ({
  fetchPlaces: id => {
    dispatch(fetchPlaces(id));
  },
  addPlace: (idtown, data, token, dataImg) => {
    dispatch(addPlace(idtown, data, token, dataImg));
  },
  updPlace: (idtown, id, data, token) => {
    dispatch(updPlace(idtown, id, data, token));
  },
  delPlace: (idtown, id, token) => {
    dispatch(delPlace(idtown, id, token));
  },
  displayDialog: bool => {
    dispatch(displayDialog(bool));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Places);
