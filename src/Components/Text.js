import React from 'react'

import RavenComponent from './RavenComponent'


class Text extends RavenComponent{

    render(){
        return(
            <p style={{"textAlign":"justify"}}>{this.props.children}</p>
        )
    }
};

export default Text;