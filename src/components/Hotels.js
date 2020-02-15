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
import { FileUpload } from "primereact/fileupload";
import { InputMask } from "primereact/inputmask";
import {
  fetchHotels,
  addHotel,
  displayDialog,
  updHotel,
  delHotel
} from "../actions/hotelsActions";
import { delImages } from "../actions/imagesActions";
import { fetchAvatars } from "../actions/avatarsActions";
import RenderImage from "../Utils/RenderImage";

class Hotels extends Component {
  constructor() {
    super();
    this.state = {
      hotel: null,
      selectedImgs: [],
      files: [],
      displayedImgs: []
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onhotelselect = this.onhotelselect.bind(this);
    this.addNew = this.addNew.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.deleteImgs = this.deleteImgs.bind(this);
    this.upFile = React.createRef();
  }
  componentDidMount() {
    this.props.fetchHotels(this.props.location.state.town);
    this.props.fetchAvatars();
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
      name: this.state.hotel.name,
      rating: this.state.hotel.rating,
      price: this.state.hotel.price,
      email: this.state.hotel.email,
      avatar: this.state.hotel.avatar ? this.state.hotel.avatar.code : null,
      phone: this.state.hotel.phone,
      description: this.state.hotel.description,
      latitude: this.state.hotel.latitude,
      longitude: this.state.hotel.longitude,
      city: this.props.location.state.tname,
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
        this.props.token,
        data
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

  async onhotelselect(e) {
    this.newHotel = false;
    this.props.displayDialog(true);
    await this.setState({
      hotel: Object.assign({}, e.data),
      displayedImgs: e.data.images
    });

    console.log(e, this.state.hotel.images);
  }
  addNew() {
    console.log(this.props.hotels);
    this.newHotel = true;
    this.setState({
      hotel: {
        name: "",
        rating: 0,
        price: null,
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
    if (this.state.files.length > 0) {
      this.setState({ files: [], selectedImg: null });
    }
    this.upFile.current.clear();

    this.props.displayDialog(false);
    console.log(this.upFile);
  };
  avatarTemplate = rowData => {
    return (
      <img
        src={rowData.avatar}
        alt={rowData.avatar}
        width="48px"
        height="48px"
      />
    );
  };
  priceTemplate = rowData => {
    return rowData.price + "   MAD";
  };
  rateTemplate = rowData => {
    return <Rating value={rowData.rating} cancel={false} readonly={true} />;
  };
  onImgClick = (e, p) => {
    let tb = this.state.selectedImgs;
    console.log(e, p);
    if (!p) {
      tb.push(e);
    } else tb = tb.filter(a => a !== e);
    this.setState({ selectedImgs: tb });
  };
  async deleteImgs() {
    await this.props.delImages(
      this.state.selectedImgs,
      this.props.token,
      this.props.location.state.town
    );
    let imgs = this.state.displayedImgs.filter(
      e => !this.state.selectedImgs.includes(e.id.toString())
    );

    this.setState({ selectedImgs: [], displayedImgs: imgs });
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
        <Button
          label="Delete photos"
          icon="pi-trash"
          onClick={this.deleteImgs}
        />
        {!this.newHotel && (
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
            value={this.props.hotels}
            paginator={true}
            rows={15}
            footer={footer}
            selectionMode="single"
            selection={this.state.selectedhotel}
            onSelectionChange={e => this.setState({ selectedhotel: e.value })}
            onRowSelect={this.onhotelselect}
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
              field="price"
              header="price"
              sortable={true}
              body={this.priceTemplate}
              style={{ width: "150px" }}
            />
            <Column
              field="email"
              header="email"
              sortable={true}
              style={{ width: "250px" }}
            />
            <Column
              field="phone"
              header="phone"
              sortable={true}
              style={{ width: "250px" }}
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
            <Column
              field="avatar"
              header="avatar"
              sortable={true}
              body={this.avatarTemplate}
              style={{ textAlign: "center", width: "250px" }}
            />
          </DataTable>

          <Dialog
            visible={this.props.dialog}
            width="200px"
            header="hotel Details"
            modal={true}
            footer={dialogFooter}
            onHide={this.onHideCallback}
          >
            {this.state.hotel && (
              <div className="p-grid p-fluid">
                <ScrollPanel style={{ width: "100%", height: "400px" }}>
                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="name">Name</label>
                    <InputText
                      id="name"
                      onChange={e => {
                        this.updateProperty("name", e.target.value);
                      }}
                      value={this.state.hotel.name}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="rating">Rating</label>
                    <Rating
                      value={this.state.hotel.rating}
                      onChange={e => {
                        this.updateProperty("rating", e.target.value);
                      }}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="price">Price</label>
                    <InputText
                      id="price"
                      keyfilter="pint"
                      onChange={e => {
                        this.updateProperty("price", e.target.value);
                      }}
                      value={this.state.hotel.price}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="phone">Phone</label>
                    <InputMask
                      mask="+999 699999999"
                      id="phone"
                      onChange={e => {
                        this.updateProperty("phone", e.target.value);
                      }}
                      value={this.state.hotel.phone}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="email">Email</label>
                    <InputText
                      id="email"
                      onChange={e => {
                        this.updateProperty("email", e.target.value);
                      }}
                      value={this.state.hotel.email}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="latitude">Latitude</label>
                    <InputText
                      id="latitude"
                      onChange={e => {
                        this.updateProperty("latitude", e.target.value);
                      }}
                      value={this.state.hotel.latitude}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="longitude">Longitude</label>
                    <InputText
                      id="longitude"
                      onChange={e => {
                        this.updateProperty("longitude", e.target.value);
                      }}
                      value={this.state.hotel.longitude}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                      id="description"
                      onChange={e => {
                        this.updateProperty("description", e.target.value);
                      }}
                      value={this.state.hotel.description}
                    />
                  </div>

                  <div style={{ padding: ".75em" }}>
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

                  <div
                    className="p-col-fixed"
                    style={{
                      width: "400px",
                      padding: ".75em"
                    }}
                  >
                    <label htmlFor="images">Images</label>
                    {!this.newHotel && (
                      <div
                        style={{
                          backgroundColor: "white",
                          "border-radius": "1%"
                        }}
                      >
                        {this.state.displayedImgs.map(e => {
                          return (
                            <RenderImage item={e} onClick={this.onImgClick} />
                          );
                        })}
                      </div>
                    )}
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
  updHotel: (idtown, id, data, token, newData) => {
    dispatch(updHotel(idtown, id, data, token, newData));
  },
  delHotel: (idtown, id, token) => {
    dispatch(delHotel(idtown, id, token));
  },
  delImages: (data, token, idtown) => {
    dispatch(delImages(data, token, idtown));
  },
  displayDialog: bool => {
    dispatch(displayDialog(bool));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Hotels);
