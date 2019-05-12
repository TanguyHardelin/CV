import React from 'react'

import RavenComponent from './RavenComponent'

import {Container, Row, Col} from 'reactstrap';

class TextImage extends RavenComponent{
   
    renderComputer(){
        return(
            <Container fluid>
                <Row>
                    <Col xs="3">
                        <img src={this.props.src} style={{width:"75%",padding:"10%"}}/>
                    </Col>
                    <Col xs="9" className="vertical-center">
                        <p>{this.props.children}</p>
                    </Col>
                </Row>
            </Container>
            
        )
    }
    renderMobile(){
        return(
            <Container fluid>
                <Row>
                    <Col xs="2">
                        <img src={this.props.src} style={{width:"75%"}} />
                    </Col>
                    <Col xs="10" className="vertical-center">
                        <p >{this.props.children}</p>
                    </Col>
                </Row>
            </Container>
            
        )
    }
};

export default TextImage;