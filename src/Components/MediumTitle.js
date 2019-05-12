import React from 'react'

import RavenComponent from './RavenComponent'


class MediumTitle extends RavenComponent{

    render(){
        return(
            <h5><b>{this.props.children}</b></h5>
        )
    }
};

export default MediumTitle;