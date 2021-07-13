import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputTxt: '',
            suggestions: []
        }
    }

    handleDDChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('location', locationId);

        axios({
            url: `http://localhost:6503/api/getRestaurantsbycity/${locationId}`,
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ restaurants: response.data.restaurantList })
        }).catch()
    }

    handleInputChange = (event) => {
        const input = event.target.value;
        const { restaurants } = this.state;

        let filteredRes = [];

        if (input.length > 0) {
            filteredRes = restaurants.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
        }
        this.setState(() => ({
            suggestions: filteredRes,
            inputTxt: input
        }))
    }

    selectedText = (restuarant) => {
        this.props.history.push(`/details?restaurantId=${restuarant._id}`)
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;

        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{`${item.name}, ${item.city}`}</li>))
                }
            </ul>
        );
    }

    render() {
        const { locationData } = this.props;
        const { inputTxt } = this.state;
        return (
            <div>
                <img src="./Assets/homepageimg.png" width="100%" height="450" />
                <div>
                    { /* Adding Logo */}
                    <div className="logo">
                        <p>e!</p>
                    </div>

                    <div className="headings">
                        Find the best restaurants, cafes, bars
                    </div>

                    <div className="locationSelector">
                        <select className="locationDropdown" onChange={this.handleDDChange}>
                            <option value="0">Select</option>
                            {locationData.map((item, index) => {
                                return <option key={index} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                            })}
                        </select>
                        <div>
                            <span className="glyphicon glyphicon-search search"></span>
                            <div id="notebooks">
                                <input id="query" className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" value={inputTxt} onChange={this.handleInputChange} />
                                {this.renderSuggestions()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Wallpaper);