import React from 'react';
import '../Styles/home.css';
import { withRouter } from 'react-router-dom';

class QuickSearchItem extends React.Component {
    handleNavigate = (mealtypeId, mealtypeValue) => {
        const locationId = sessionStorage.getItem('location');
        if (locationId) {
            this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
        }
        else {
            this.props.history.push(`/filter?mealtype=${mealtypeId}&mealtypeValue=${mealtypeValue}`);
        }
    }

    render() {
        const { qsItemData, key } = this.props;
        return (
            <div key={key} className="col-sm-12 col-md-6 col-lg-4" onClick={() => this.handleNavigate(qsItemData.meal_type, qsItemData.name)}>
                <div className="tileContainer">
                    <div className="tileComponent1">
                        <img src={`./${qsItemData.image}`} height="150" width="140" />
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            {qsItemData.name}
                        </div>
                        <div className="componentSubHeading">
                            {qsItemData.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);