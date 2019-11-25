import React, { component } from 'react';
import additives from '../../../additives.js'

class References extends Component {
    render () {
        for(let i in additives){
            console.log
        }
        return (
            <h1>{additives}</h1>
        );
    }
}