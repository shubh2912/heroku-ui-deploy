import React from 'react';
import axios from 'axios';

import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            mealTypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'http://localhost:6503/api/cityList',
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ locations: response.data.city })
        }).catch()

        axios({
            url: 'http://localhost:6503/api/mealtype',
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ mealTypes: response.data.mealtype })
        }).catch()
    }

    render() {
        const { locations, mealTypes } = this.state;
        return (
            <div>
                <Wallpaper locationData={locations} />
                <QuickSearch quickSeachData={mealTypes} />
            </div>
        )
    }
}

export default Home;