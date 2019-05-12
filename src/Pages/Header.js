import React from "react";
import { connect } from 'react-redux'

import {Container, Row, Col} from 'reactstrap';

import RavenComponent from '../Components/RavenComponent';
import settings from '../settings.json'



class Header extends RavenComponent{
    constructor(props){
        super(props);

        this.state={
            screenWith:0,
            screenHeight:0,
            opacity:0
        }

        this.updateTick=this.updateTick.bind(this);

        this.addUpdateFunction(this.updateTick);

        this.timer=5;

        this.text = this.text["Header"]
    }
    updateTick(){
        if(this.timer>0) this.timer--;
        else if(this.state.opacity<1){
            this.state.opacity+=0.03;
        }
    }


    componentDidMount(){
        
        this.getSizesOfWindow();

        let state          = this.state;
        state.screenHeight = this.height;
        state.screenWith   = this.width;

        this.setState(state);

        this.startUpdatingData();
    }

    render(){
        return(
            <div id="header" style={{width:"100%",height:this.state.screenHeight}}>
                <img id="bannerColor" src={settings["RessourcePath"]+settings["ImagesSrc"]["BannerColor"]} alt={"Image src= "+settings["RessourcePath"]+settings["ImagesSrc"]["BannerColor"]} style={{position:"absolute",top:0,width:"100%",height:this.state.screenHeight,opacity:this.state.opacity,zIndex:1,filter:"blur(2px)"}}/>
                <img id="bannerBW" src={settings["RessourcePath"]+settings["ImagesSrc"]["BannerBW"]} alt={"Image src= "+settings["RessourcePath"]+settings["ImagesSrc"]["BannerBW"]} style={{position:"absolute",top:0,width:"100%",height:this.state.screenHeight,opacity:1-this.state.opacity,zIndex:0}}/>

                <div className="vertical-center" style={{position:"absolute",top:0,width:"100%",height:this.state.screenHeight,opacity:this.state.opacity,zIndex:2}}>
                    <Container fluid style={{margin:"auto",color:"white"}}>
                        <Row >
                            <Col xs="12">
                                <h1 className="text-center">{this.text[this.props.language.value].name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <h3 className="text-center">{this.text[this.props.language.value].title}</h3>
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}
export default connect(mapStateToProps)(Header);