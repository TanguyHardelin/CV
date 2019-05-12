import React from "react";
import { connect } from 'react-redux'

import {Container, Row, Col, Button} from 'reactstrap';

import RavenComponent from '../Components/RavenComponent';


import Space        from "../Components/Space"

import settings from '../settings.json'

class Footer extends RavenComponent{
    constructor(props){
        super(props);

        this.state={
        }

        this.goToGithub     = this.goToGithub.bind(this);
        this.gotToLinkedin  = this.gotToLinkedin.bind(this);
        
    }

    goToGithub(){
        
    }
    gotToLinkedin(){
    }

    render(){
        return(
            <div style={{backgroundColor:"#000000",width:"100%"}}>


                <Container>
                    <Space size={10} />
                    
                    
                    <Row>
                        <Col xs={{size:1,offset:5}}>
                        <a href={settings.githubPage} ><Button onClick={this.goToGithub} style={{background:"none",border:"none",outline:"none"}}><img src={this.getIconByName("githubIcon")} style={{width:"75%"}} /></Button></a>
                        </Col>
                        <Col xs={{size:1}}>
                        <a href={settings.linkedinPage} ><Button onClick={this.gotToLinkedin} style={{background:"none",border:"none",outline:"none"}}><img src={this.getIconByName("linkedinIcon")} style={{width:"75%"}} /></Button></a>
                        </Col>
                    </Row>
                  
                </Container>
                
                <div class="footer-copyright text-center py-3">2019 - Tanguy Hardelin</div>
                
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}
export default connect(mapStateToProps)(Footer);