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
import { Dropdown } from "primereact/dropdown";
import Gallery from "react-photo-gallery";

import {
  fetchHotels,
  addHotel,
  displayDialog,
  updHotel,
  delHotel
} from "../actions/hotelsActions";
import { fetchAvatars } from "../actions/avatarsActions";
import { addHotelImages } from "../actions/imagesActions";

import "react-dropzone-uploader/dist/styles.css";
import Conf from "../config/Conf";
import axios from "axios";

class Hotels extends Component {
  constructor() {
    super();
    this.state = {
      hotel: null,
      files: [],
      images: [],
      imageCliqued: "disabled",
      targetToRemove: ""
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onhotelselect = this.onhotelselect.bind(this);
    this.addNew = this.addNew.bind(this);
    this.onImageClique = this.onImageClique.bind(this);
  }
  componentDidMount() {
    this.props.fetchHotels(this.props.location.state.town);
    this.props.fetchAvatars();
  }
  onImageClique = async e => {
    this.setState({ imageCliqued: "", targetToRemove: e });
    console.log(this.state.imageCliqued, e.currentTarget);
  };
  removeImage(a) {
    this.setState({
      files: this.state.files.filter(
        e => e.name !== this.state.targetToRemove.name
      )
    });
    console.log(this.state.files);
  }
  onFileChange = event => {
    this.setState({
      files: this.state.files.concat(Array.from(event.target.files))
    });
  };
  uploadFile = (event, idhotel) => {
    event.preventDefault();
    let data = new FormData();
    this.state.files.forEach(a => data.append("file", a));
    console.log(this.state.files, data);
    this.props.addHotelImages(data, this.props.token, 1);
  };

  save() {
    const Body = {
      name: this.state.hotel.name,
      town: { id: this.props.location.state.town }
    };
    if (this.newHotel) {
      this.props.addHotel(
        this.props.location.state.town,
        Body,
        this.props.token
      );
    } else {
      this.props.updHotel(
        this.props.location.state.town,
        this.state.hotel.id,
        Body,
        this.props.token
      );
    }
  }

  delete() {
    console.log(this.state.hotel.id);
    this.props.delHotel(
      this.props.location.state.town,
      this.state.hotel.id,
      this.props.token
    );
  }

  updateProperty(property, value) {
    let hotel = this.state.hotel;
    hotel[property] = value;
    this.setState({ hotel: hotel });
  }

  onhotelselect(e) {
    this.newHotel = false;
    this.props.displayDialog(true);
    this.setState({
      hotel: Object.assign({}, e.data)
    });
  }

  addNew() {
    this.newHotel = true;
    this.setState({
      hotel: { id: "", name: "" }
    });
    this.props.displayDialog(true);
  }

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
        {!this.newHotel && (
          <Button label="Delete" icon="pi pi-times" onClick={this.delete} />
        )}
        <Button label="Save" icon="pi pi-check" onClick={this.save} />
      </div>
    );

    return (
      <div>
        <div className="container mx-10">
          <DataTable
            footerStyle={{ bg: "transparent" }}
            style={{ padding: "3cm" }}
            value={this.props.hotels}
            paginator={true}
            rows={15}
            footer={footer}
            selectionMode="single"
            selection={this.state.selectedhotel}
            onSelectionChange={e => this.setState({ selectedhotel: e.value })}
            onRowSelect={this.onhotelselect}
          >
            <Column field="id" header="id" sortable={true} />
            <Column field="name" header="name" sortable={true} />
          </DataTable>

          <Dialog
            visible={this.props.dialog}
            width="300px"
            header="hotel Details"
            modal={true}
            footer={dialogFooter}
            onHide={() => this.props.displayDialog(false)}
          >
            {this.state.hotel && (
              <div className="p-grid p-fluid">
                <ScrollPanel style={{ width: "100%", height: "400px" }}>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="name">Name</label>
                    <InputText
                      id="name"
                      onChange={e => {
                        this.updateProperty("name", e.target.value);
                      }}
                      value={this.state.hotel.name}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="rating">Rating</label>
                    <Rating
                      value={this.state.hotel.rating}
                      onChange={e => {
                        this.updateProperty("rating", e.target.value);
                      }}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="price">Price</label>
                    <InputText
                      id="price"
                      onChange={e => {
                        this.updateProperty("price", e.target.value);
                      }}
                      value={this.state.hotel.price}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="phone">Phone</label>
                    <InputText
                      id="phone"
                      onChange={e => {
                        this.updateProperty("phone", e.target.value);
                      }}
                      value={this.state.hotel.phone}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="email">Email</label>
                    <InputText
                      id="email"
                      onChange={e => {
                        this.updateProperty("email", e.target.value);
                      }}
                      value={this.state.hotel.email}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="latitude">Latitude</label>
                    <InputText
                      id="latitude"
                      onChange={e => {
                        this.updateProperty("latitude", e.target.value);
                      }}
                      value={this.state.hotel.latitude}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="longitude">Longitude</label>
                    <InputText
                      id="longitude"
                      onChange={e => {
                        this.updateProperty("longitude", e.target.value);
                      }}
                      value={this.state.hotel.longitude}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                      id="description"
                      onChange={e => {
                        this.updateProperty("description", e.target.value);
                      }}
                      value={this.state.hotel.description}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="avatar">Avatar</label>
                    <br />
                    <Dropdown
                      filter
                      optionLabel="name"
                      value={this.state.hotel.avatar}
                      options={this.props.avatarSelect}
                      onChange={e => {
                        this.updateProperty("avatar", e.target.value);
                      }}
                      placeholder="Select an Avatar"
                    />
                  </div>

                  <div className="p-col-4">
                    <label htmlFor="images">Images</label>
                    <br />
                    <input
                      onChange={this.onFileChange}
                      type="file"
                      multiple
                    ></input>
                    <Gallery
                      photos={this.state.files.map(p => ({
                        src: URL.createObjectURL(p),
                        width: 0.2,
                        height: 0.2
                      }))}
                      onClick={e => this.onImageClique(e)}
                      on
                    />
                    <Button
                      className="btn-outline-primary font-weight-bold mb-2 mt-2"
                      onClick={e => this.removeImage(e.target.value)}
                      label="remove"
                      disabled={this.state.imageCliqued}
                    ></Button>
                  </div>

                  <Button
                    className="btn-outline-primary font-weight-bold mb-5"
                    onClick={this.uploadFile}
                    label="upload"
                  ></Button>
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
    hotels: state.hotels.hotels,
    dialog: state.hotels.displayDialog,
    avatarSelect: state.avatars.avatarSelect,
    token: state.user.token
  };
}
const mapDispatchToProps = dispatch => ({
  addHotelImages: (data, token, idhotel) => {
    dispatch(addHotelImages(data, token, idhotel));
  },
  fetchAvatars: () => {
    dispatch(fetchAvatars());
  },
  fetchHotels: id => {
    dispatch(fetchHotels(id));
  },
  addHotel: (idtown, data, token) => {
    dispatch(addHotel(idtown, data, token));
  },
  updHotel: (idtown, id, data, token) => {
    dispatch(updHotel(idtown, id, data, token));
  },
  delHotel: (idtown, id, token) => {
    dispatch(delHotel(idtown, id, token));
  },
  displayDialog: bool => {
    dispatch(displayDialog(bool));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Hotels);
