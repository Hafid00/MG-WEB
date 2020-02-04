import React, { Component } from 'react';
import { connect } from 'react-redux';
import {DataTable} from 'primereact/datatable';
import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {fetchPlaces} from '../actions/placesActions'


class Places extends Component {
    constructor() {
        super();
        this.state = {
            cars:[],
            car:null,
            displayDialog:false
        };
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.onCarSelect = this.onCarSelect.bind(this);
        this.addNew = this.addNew.bind(this);
    }
    componentDidMount() {
        this.props.fetchPlaces()
    }

    save() {
        let cars = [...this.state.cars];
        if(this.newCar)
            cars.push(this.state.car);
        else
            cars[this.findSelectedCarIndex()] = this.state.car;

        this.setState({cars:cars, selectedCar:null, car: null, displayDialog:false});
    }

    delete() {
        let index = this.findSelectedCarIndex();
        this.setState({
            cars: this.state.cars.filter((val,i) => i !== index),
            selectedCar: null,
            car: null,
            displayDialog: false});
    }

    findSelectedCarIndex() {
        return this.state.cars.indexOf(this.state.selectedCar);
    }

    updateProperty(property, value) {
        let car = this.state.car;
        car[property] = value;
        this.setState({car: car});
    }

    onCarSelect(e){
        this.newCar = false;
        this.setState({
            displayDialog:true,
            car: Object.assign({}, e.data)
        });
    }

    addNew() {
        this.newCar = true;
        this.setState({
            car: {id:'', name: ''},
            displayDialog: true
        });
    }

    render() {

        let footer = <div className="clearfix al" style={{display: 'flex', width:'100%', alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
        </div>;

        let dialogFooter = <div>
                <Button label="Delete" icon="pi pi-times" onClick={this.delete}/>
                <Button label="Save" icon="pi pi-check" onClick={this.save}/>
            </div>;

        return (
            <div>
                <div className="container mx-10" >
                    <DataTable footerStyle={{bg:"transparent"}} style={{padding:'3cm'}} value={this.props.places} paginator={true} rows={15} footer={footer}
                               selectionMode="single" selection={this.state.selectedCar} onSelectionChange={e => this.setState({selectedCar: e.value})}
                               onRowSelect={this.onCarSelect}
                               >
                        <Column field="id" header="id" sortable={true} />
                        <Column field="name" header="name" sortable={true} />
                    </DataTable>

                    <Dialog visible={this.state.displayDialog} width="300px" header="Car Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
                        {
                            this.state.car && 
                            
                            <div className="p-grid p-fluid">
                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="id">Id</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="id" onChange={(e) => {this.updateProperty('id', e.target.value)}} value={this.state.car.id}/>
                                </div>

                                <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="name">Name</label></div>
                                <div className="p-col-8" style={{padding:'.5em'}}>
                                    <InputText id="name" onChange={(e) => {this.updateProperty('name', e.target.value)}} value={this.state.car.name}/>
                                </div>
                            </div>
                        }
                    </Dialog>
                </div>


            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
    places: state.places.places
    };
}

const mapDispatchToProps = dispatch => ({
    fetchPlaces: () => {
        dispatch(fetchPlaces())
    }
});
export default connect(
    mapStateToProps,mapDispatchToProps
)(Places);


