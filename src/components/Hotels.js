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
import { Carousel } from "primereact/carousel";
import { FileUpload } from "primereact/fileupload";

import {
  fetchHotels,
  addHotel,
  displayDialog,
  updHotel,
  delHotel
} from "../actions/hotelsActions";
import { fetchAvatars } from "../actions/avatarsActions";

import "react-dropzone-uploader/dist/styles.css";

class Hotels extends Component {
  constructor() {
    super();
    this.state = {
      hotel: null,
      files: []
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onhotelselect = this.onhotelselect.bind(this);
    this.addNew = this.addNew.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.responsiveSettings = [
      {
        breakpoint: "200px",
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  componentDidMount() {
    this.props.fetchHotels(this.props.location.state.town);
    this.props.fetchAvatars();
  }
  imageTemplate = img => {
    return (
      <div className="p-col-4">
        <img src={URL.createObjectURL(img)} alt="" className="p-col-4" />

        <br />
        <div
          className="mt-4"
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <button
            className="btn btn-outline-dark "
            onClick={() => this.removeImage(img)}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  };
  removeImage = item => {
    let newfiles = this.state.files.filter(e => e.name !== item.name);
    console.log(newfiles);

    this.setState({
      files: newfiles
    });
    console.log(this.state.files);
  };
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
      name: this.state.hotel.name,
      rating: this.state.hotel.rating,
      price: this.state.hotel.price,
      email: this.state.hotel.email,
      avatar: this.state.hotel.avatar.code,
      phone: this.state.hotel.phone,
      description: this.state.hotel.description,
      latitude: this.state.hotel.latitude,
      longitude: this.state.hotel.longitude,
      town: { id: this.props.location.state.town }
    };
    console.log(Body);
    if (this.newHotel) {
      await this.props.addHotel(
        this.props.location.state.town,
        Body,
        this.props.token,
        data
      );
    } else {
      this.props.updHotel(
        this.props.location.state.town,
        this.state.hotel.id,
        Body,
        this.props.token
      );
    }
    this.props.displayDialog(true);
  }

  delete() {
    console.log(this.state.hotel.id);
    this.props.delHotel(
      this.props.location.state.town,
      this.state.hotel.id,
      this.props.token
    );
    this.props.displayDialog(true);
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
      hotel: {
        name: "",
        rating: 0,
        price: "",
        email: "",
        avatar: "",
        phone: "",
        description: "",
        latitude: "",
        longitude: ""
      }
    });
    this.props.displayDialog(true);
  }
  onHideCallback = () => {
    if (this.state.files.length > 0) this.setState({ files: [] });
    this.props.displayDialog(false);
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
            onHide={this.onHideCallback}
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
                        this.updateProperty("avatar", e.value);
                      }}
                      placeholder="Select an Avatar"
                    />
                  </div>

                  <div className="p-col-4 mb-4" style={{ padding: ".75em" }}>
                    <label htmlFor="images">Images</label>
                    <br />
                    <FileUpload
                      name="demo[]"
                      customUpload={true}
                      uploadHandler={e => this.onFileChange(e)}
                      multiple={true}
                      onError={this.onerr}
                      maxFileSize={1000000}
                    />
                    {/* <input
                      onChange={this.onFileChange}
                      type="file"
                      multiple
                      files
                    ></input> */}
                    {/* {this.state.files.length > 0 && (
                      <Carousel
                        value={this.state.files}
                        itemTemplate={this.imageTemplate}
                        style={{ width: "", marginTop: "2em" }}
                        numVisible={1}
                        numScroll={1}
                        responsive={this.responsiveSettings}
                        verticalViewPortHeight="300px"
                        orientation="vertical"
                      />
                    )} */}
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
    hotels: state.hotels.hotels,
    dialog: state.hotels.displayDialog,
    avatarSelect: state.avatars.avatarSelect,
    token: state.user.token
  };
}
const mapDispatchToProps = dispatch => ({
  fetchAvatars: () => {
    dispatch(fetchAvatars());
  },
  fetchHotels: id => {
    dispatch(fetchHotels(id));
  },
  addHotel: (idtown, data, token, dataImg) => {
    dispatch(addHotel(idtown, data, token, dataImg));
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
