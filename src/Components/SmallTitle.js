import React from 'react'

import RavenComponent from './RavenComponent'


class MediumTitle extends RavenComponent{

    render(){
        return(
            <h7><b>{this.props.children}</b></h7>
        )
    }
};

export default MediumTitle;