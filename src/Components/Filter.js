import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restuarants: [],
            locations: [],
            mealtype: undefined,
            location: undefined,
            cuisine: [],
            lcost: undefined,
            hcost: undefined,
            sort: undefined,
            page: 1,
            pageCount: [],
            mealtypeValue: undefined
        }
    }

    componentDidMount() {
        // step-1 : read the query string params from url
        const qs = queryString.parse(this.props.location.search);
        const { mealtype, location, mealtypeValue } = qs;

        const reqObj = {
            mealtype_id: mealtype,
            location_id: location
        };

        // step-2 : filter API call with request params 
        axios({
            url: 'http://localhost:6503/api/restaurantfilter',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
        }).then(res => {
            this.setState({ restuarants: res.data.restaurant, mealtype, location, pageCount: res.data.pageCount, mealtypeValue })
        }).catch()

        axios({
            url: 'http://localhost:6503/api/cityList',
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {
            this.setState({ locations: response.data.city })
        }).catch()
    }

    handleSortChange = (sort) => {
        const { mealtype, location, lcost, hcost, page, cuisine } = this.state;
        const reqObj = {
            sort,
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            page
        };

        // step-2 : filter API call with request params 
        axios({
            url: 'http://localhost:6503/api/restaurantfilter',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
        }).then(res => {
            this.setState({ restuarants: res.data.restaurant, sort, pageCount: res.data.pageCount })
        }).catch()
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, location, sort, page, cuisine } = this.state;
        const reqObj = {
            sort,
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            page
        };

        // step-2 : filter API call with request params 
        axios({
            url: 'http://localhost:6503/api/restaurantfilter',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
        }).then(res => {
            this.setState({ restuarants: res.data.restaurant, lcost, hcost, pageCount: res.data.pageCount })
        }).catch()
    }

    handleLocationChange = (event) => {
        const { mealtype, sort, hcost, lcost, page, cuisine } = this.state;
        const location = event.target.value;
        const reqObj = {
            sort,
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            page
        };

        // step-2 : filter API call with request params 
        axios({
            url: 'http://localhost:6503/api/restaurantfilter',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
        }).then(res => {
            this.setState({ restuarants: res.data.restaurant, location, pageCount: res.data.pageCount })
        }).catch()
    }

    handlePageChange = (page) => {
        const { mealtype, location, sort, hcost, lcost, cuisine } = this.state;
        const reqObj = {
            sort,
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            page
        };

        // step-2 : filter API call with request params 
        axios({
            url: 'http://localhost:6503/api/restaurantfilter',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
        }).then(res => {
            this.setState({ restuarants: res.data.restaurant, page, pageCount: res.data.pageCount })
        }).catch()
    }

    handleCuisineChange = (cuisineId) => {
        const { mealtype, location, sort, hcost, lcost, page, cuisine } = this.state;
        const index = cuisine.indexOf(cuisineId);
        if (index > -1) {
            cuisine.splice(index, 1);
        } else {
            cuisine.push(cuisineId);
        }
        const reqObj = {
            sort,
            mealtype_id: mealtype,
            location_id: location,
            cuisine_id: cuisine.length == 0 ? undefined : cuisine,
            lcost,
            hcost,
            page
        };

        // step-2 : filter API call with request params 
        axios({
            url: 'http://localhost:6503/api/restaurantfilter',
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            data: reqObj
        }).then(res => {
            this.setState({ restuarants: res.data.restaurant, cuisine, pageCount: res.data.pageCount })
        }).catch()
    }

    handleNavigateDetails = (resId) => {
        this.props.history.push(`/details?restaurantId=${resId}`);
    }

    render() {
        const { restuarants, locations, pageCount, mealtypeValue } = this.state;
        return (
            <div>
                <div className="heading-filter">{mealtypeValue} Places in Mumbai</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236" onChange={this.handleLocationChange}>
                                    <option value={0}>Select</option>
                                    {locations.map((item, index) => {
                                        return <option key={index} value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                    })}
                                </select>
                                <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(1)} />
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(2)} />
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(3)} />
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(4)} />
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" name="cuisine" onChange={() => this.handleCuisineChange(5)} />
                                    <span className="checkbox-items">Street Food</span>
                                </div>
                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)} />
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => this.handleCostChange(500, 1000)} />
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1000, 1500)} />
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1500, 2000)} />
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => this.handleCostChange(2000, 50000)} />
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 50000)} />
                                    <span className="checkbox-items">All</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => this.handleSortChange(1)} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            {restuarants.length != 0 ? restuarants.map((item) => {
                                return <div className="Item" onClick={() => this.handleNavigateDetails(item._id)}>
                                    <div>
                                        <div className="small-item vertical">
                                            <img className="img" src={`./${item.image}`} />
                                        </div>
                                        <div className="big-item">
                                            <div className="rest-name">{item.name}</div>
                                            <div className="rest-location">{item.locality}</div>
                                            <div className="rest-address">{item.city}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="margin-left">
                                            <div className="Bakery">CUISINES : {item.cuisine.map((cuisine) => `${cuisine.name}, `)}</div>
                                            <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                        </div>
                                    </div>
                                </div>
                            }) : <div className="no-msg">No Records Found !!!</div>}

                            {restuarants.length != 0 ? <div className="pagination">

                                {pageCount.map((item) => {
                                    return <span className="page-item" onClick={(item) => this.handlePageChange(item)}>{item}</span>
                                })}

                            </div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Filter;

