import React from 'react'
import PropTypes from 'prop-types';

import RavenComponent from './RavenComponent'


class Image extends RavenComponent{
    constructor(props){
        super(props);

        this.state={
            imgWidth:this.props.width,
            imgHeight:this.props.height
        }
    }
    componentDidMount(){
        this.getSizesOfWindow();

        let state       =this.state;
        state.imgWidth  =this.props.width   / 100  * this.width;
        state.imgHeight =this.props.height  / 100 * this.height;

        this.setState(state);
    }

    render(){
        if(this.props.full){
            return(
                <img src={this.props.src} style={{width:"100%",marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto",display:"block"}}/>
            )
        }
        else if(this.props.middle){
            return(
                <img src={this.props.src} style={{width:"50%",marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto",display:"block"}}/>
            )
        }
        else{
            return(
                <img src={this.props.src} style={{height:this.state.imgHeight,width:"100%",marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto",display:"block"}}/>
            )
        }
        
    }
};

//Deffinition du module:
Image.propTypes={
    width:PropTypes.number,
    height:PropTypes.number,
    src: PropTypes.element.isRequired
}
Image.defaultProps={
    width:1,
    height:1
}

export default Image;