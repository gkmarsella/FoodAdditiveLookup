import React from 'react';
import classes from './AdditiveCard.module.css';

const additiveCard = (props) => {
    return (        
        <div className={classes.Additive}>
            <h4>{props.name}</h4>
            <img src={props.image} alt='Smiley Face'></img>
            <p>Description: {props.description}</p>
            <p>Uses: {props.uses}</p>
            <p>Health Risks: {props.risks}</p>
        </div>
    );
};

export default additiveCard;