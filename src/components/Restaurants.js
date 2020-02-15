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
  fetchRestaurants,
  addRestaurant,
  displayDialog,
  updRestaurant,
  delRestaurant
} from "../actions/restaurantsActions";
import { delImages } from "../actions/imagesActions";
import { fetchAvatars } from "../actions/avatarsActions";
import RenderImage from "../Utils/RenderImage";

class Restaurants extends Component {
  constructor() {
    super();
    this.state = {
      restaurant: null,
      selectedImgs: [],
      files: [],
      displayedImgs: []
    };

    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.onrestaurantselect = this.onrestaurantselect.bind(this);
    this.addNew = this.addNew.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.deleteImgs = this.deleteImgs.bind(this);
    this.upFile = React.createRef();
  }
  componentDidMount() {
    this.props.fetchRestaurants(this.props.location.state.town);
    this.props.fetchAvatars();
    console.log(this.props.restaurants);
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
      name: this.state.restaurant.name,
      rating: this.state.restaurant.rating,
      price: this.state.restaurant.price,
      email: this.state.restaurant.email,
      avatar: this.state.restaurant.avatar.code,
      phone: this.state.restaurant.phone,
      description: this.state.restaurant.description,
      latitude: this.state.restaurant.latitude,
      longitude: this.state.restaurant.longitude,
      town: { id: this.props.location.state.town }
    };
    console.log(Body);
    if (this.newRestaurant) {
      await this.props.addRestaurant(
        this.props.location.state.town,
        Body,
        this.props.token,
        data
      );
    } else {
      this.props.updRestaurant(
        this.props.location.state.town,
        this.state.restaurant.id,
        Body,
        this.props.token,
        data
      );
    }
    this.props.displayDialog(true);
  }

  delete() {
    console.log(this.state.restaurant.id);
    this.props.delRestaurant(
      this.props.location.state.town,
      this.state.restaurant.id,
      this.props.token
    );
    this.props.displayDialog(true);
  }

  updateProperty(property, value) {
    let restaurant = this.state.restaurant;
    restaurant[property] = value;
    this.setState({ restaurant: restaurant });
  }

  onrestaurantselect(e) {
    this.newRestaurant = false;
    this.props.displayDialog(true);
    this.setState({
      restaurant: Object.assign({}, e.data),
      displayedImgs: e.data.images
    });
    console.log(e);
  }
  addNew() {
    console.log(this.props.restaurants);
    this.newRestaurant = true;
    this.setState({
      restaurant: {
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
      this.setState({ files: [] });
    }
    this.upFile.current.clear();

    this.props.displayDialog(false);
    console.log(this.upFile);
  };
  avatarTemplate = rowData => {
    return <img src={rowData.avatar} alt={rowData.avatar} width="48px" />;
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
        {!this.newRestaurant && (
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
            value={this.props.restaurants}
            paginator={true}
            rows={15}
            footer={footer}
            selectionMode="single"
            onRowSelect={this.onrestaurantselect}
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
            width="300px"
            header="restaurant Details"
            modal={true}
            footer={dialogFooter}
            onHide={this.onHideCallback}
          >
            {this.state.restaurant && (
              <div className="p-grid p-fluid">
                <ScrollPanel style={{ width: "100%", height: "400px" }}>
                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="name">Name</label>
                    <InputText
                      id="name"
                      onChange={e => {
                        this.updateProperty("name", e.target.value);
                      }}
                      value={this.state.restaurant.name}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="rating">Rating</label>
                    <Rating
                      value={this.state.restaurant.rating}
                      onChange={e => {
                        this.updateProperty("rating", e.target.value);
                      }}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="price">Price</label>
                    <InputText
                      id="price"
                      keyfilter="pint"
                      onChange={e => {
                        this.updateProperty("price", e.target.value);
                      }}
                      value={this.state.restaurant.price}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="phone">Phone</label>
                    <InputMask
                      mask="+999 699999999"
                      id="phone"
                      onChange={e => {
                        this.updateProperty("phone", e.target.value);
                      }}
                      value={this.state.restaurant.phone}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="email">Email</label>
                    <InputText
                      id="email"
                      onChange={e => {
                        this.updateProperty("email", e.target.value);
                      }}
                      value={this.state.restaurant.email}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="latitude">Latitude</label>
                    <InputText
                      id="latitude"
                      onChange={e => {
                        this.updateProperty("latitude", e.target.value);
                      }}
                      value={this.state.restaurant.latitude}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="longitude">Longitude</label>
                    <InputText
                      id="longitude"
                      onChange={e => {
                        this.updateProperty("longitude", e.target.value);
                      }}
                      value={this.state.restaurant.longitude}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                      id="description"
                      onChange={e => {
                        this.updateProperty("description", e.target.value);
                      }}
                      value={this.state.restaurant.description}
                    />
                  </div>

                  <div className="p-col-4" style={{ padding: ".75em" }}>
                    <label htmlFor="avatar">Avatar</label>
                    <br />
                    <Dropdown
                      filter
                      optionLabel="name"
                      value={this.state.restaurant.avatar}
                      options={this.props.avatarSelect}
                      onChange={e => {
                        this.updateProperty("avatar", e.value);
                      }}
                      placeholder="Select an Avatar"
                    />
                  </div>

                  <div className="p-col-4 mb-4" style={{ padding: ".75em" }}>
                    <label htmlFor="images">Images</label>
                    {!this.newRestaurant && (
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
    restaurants: state.restaurants.restaurants,
    dialog: state.restaurants.displayDialog,
    avatarSelect: state.avatars.avatarSelect,
    token: state.user.token
  };
}
const mapDispatchToProps = dispatch => ({
  fetchAvatars: () => {
    dispatch(fetchAvatars());
  },
  fetchRestaurants: id => {
    dispatch(fetchRestaurants(id));
  },
  addRestaurant: (idtown, data, token, dataImg) => {
    dispatch(addRestaurant(idtown, data, token, dataImg));
  },
  updRestaurant: (idtown, id, data, token, dataImg) => {
    dispatch(updRestaurant(idtown, id, data, token, dataImg));
  },
  delRestaurant: (idtown, id, token) => {
    dispatch(delRestaurant(idtown, id, token));
  },
  delImages: (data, token, idtown) => {
    dispatch(delImages(data, token, idtown));
  },
  displayDialog: bool => {
    dispatch(displayDialog(bool));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
