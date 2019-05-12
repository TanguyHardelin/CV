import React from 'react'

import {Row} from 'reactstrap';

import RavenComponent from './RavenComponent'


class Space extends RavenComponent{
    constructor(props){
        super(props);

        let state={
            space:[]
        }

        for(let i=0;i<this.props.size;i++){
            state.space.push(" ");
        }

        this.state=state;
    }

    render(){
        return(
            this.state.space.map((e)=>(
                <Row><p>    </p></Row>
            ))
        )
    }
};

export default Space;