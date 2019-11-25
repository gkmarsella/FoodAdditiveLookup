import React, { Component } from 'react';
import classes from './AdditiveList.module.css';
import Additives from '../../Additives';
import AdditiveCard from './AdditiveCard/AdditiveCard';

class AdditiveList extends Component {
    state = {
        show: false
    }
    render() {
        const AdditivesFound = (this.props.additives)
        .map( add => {
            if(Additives[add]){
                return (
                    <AdditiveCard
                        key={add}
                        name={add}
                        description={Additives[add].description}
                        uses={Additives[add].uses}
                        risks={Additives[add].risks}
                        image={Additives[add].image}
                    />
                )
            } return false;
        } );
        return (
            <div>
                <ul className={classes.AdditiveList}>
                    {AdditivesFound}
                </ul>
            </div>
        );
    }
}

export default AdditiveList;