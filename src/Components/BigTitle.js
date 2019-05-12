import React from 'react'

import RavenComponent from './RavenComponent'


class BigTitle extends RavenComponent{

    render(){
        return(
            <h2><b>{this.props.children}</b></h2>
        )
    }
};

export default BigTitle;