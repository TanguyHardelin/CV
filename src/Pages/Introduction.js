import React from "react";
import { connect } from 'react-redux'

import {Container, Button, Row, Col} from 'reactstrap';

import RavenComponent from '../Components/RavenComponent';

import Image        from "../Components/Image"
import Text         from "../Components/Text"
import TextImage    from "../Components/TextImage"
import MediumTitle  from "../Components/MediumTitle"
import Space        from "../Components/Space"


import settings from '../settings.json'

class Introduction extends RavenComponent{
    constructor(props){
        super(props);

        this.state={
            screenWith:0,
            screenHeight:0
        }

        this.text = this.text["Introduction"]

        this.downloadResume = this.downloadResume.bind(this);
        this.contactMe      = this.contactMe.bind(this);
    }
    downloadResume(){
        this.callRavenAPI("/tracker/introduction/downloadResume").then((data)=>{});
    }
    contactMe(){
        this.callRavenAPI("/tracker/introduction/contactMe").then((data)=>{});
        document.getElementById('contact').scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    componentDidMount(){
        
        this.getSizesOfWindow();

        let state          = this.state;
        state.screenHeight = this.height;
        state.screenWith   = this.width;

        this.setState(state);
    }

    renderComputer(){
        return(
            <div id="introduction" style={{backgroundColor:"#111",color:"white",width:"100%"}}>
                <Container>
                    <Space size={5} />
                    <Row>
                        <Col lg={{size:4}}>
                            <Image src={settings["RessourcePath"] + settings["ImagesSrc"]["Profile"]} full/>
                            
                        </Col>

                        <Col lg={{size:8}}>
                            <Container fluid>
                                <Row>
                                    <Col xs="12">
                                        <MediumTitle>{this.text[this.props.language.value].title}</MediumTitle>
                                        <Text>
                                            {this.text[this.props.language.value].introduction}
                                        </Text>
                                    </Col>
                                   
                                </Row>
                                
                                <Row>
                                    <Col lg="6">
                                        <Space size={1} />

                                        <div><MediumTitle>{this.text[this.props.language.value].contactTitle}</MediumTitle></div>
                                        <Space size={1} />
                                        <TextImage src={this.getImageByName("IntroductionGmail")}>{this.text[this.props.language.value].email}</TextImage>
                                        <TextImage src={this.getImageByName("IntroductionPhone")}>{this.text[this.props.language.value].phone}</TextImage>
                                        <TextImage src={this.getImageByName("IntroductionAddress")}>{this.text[this.props.language.value].address}</TextImage>
                                        <TextImage src={this.getImageByName("IntroductionLinkedin")}><a href={this.text[this.props.language.value].linkedinLink} style={{color:"white"}}>{this.text[this.props.language.value].linkedin}</a></TextImage>
                                        <TextImage src={this.getImageByName("IntroductionGithub")}><a  href={this.text[this.props.language.value].githubLink}  style={{color:"white"}}>{this.text[this.props.language.value].github}</a></TextImage>
                                    </Col>
                                    <Col className="vertical-center" lg={{size:6}}>
                                     
                                        
                                        <a href={this.text[this.props.language.value].CVLink} style={{marginBottom:"1%",color:"white"}}><Button onClick={this.downloadResume} block>{this.text[this.props.language.value].downloadResume}</Button></a>
                                        <Button onClick={this.contactMe}  block>{this.text[this.props.language.value].contact}</Button>
                                        
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Space size={5} />
                </Container>
            </div>
        )
    }

    renderMobile(){
        return(
            <div id="introduction" style={{backgroundColor:"#111",color:"white",width:"100%"}}>
                <Container>
                    <Space size={5} />
                    <Row>
                        <Col lg={{size:3}}>
                            <Image src={settings["RessourcePath"] + settings["ImagesSrc"]["Profile"]} middle/>
                            <Space size={2} />

                            <MediumTitle>{this.text[this.props.language.value].contactTitle}</MediumTitle>
                            <Space size={1} />
                            <TextImage src={this.getImageByName("IntroductionGmail")}>{this.text[this.props.language.value].email}</TextImage>
                            <Space size={1} />
                            <TextImage src={this.getImageByName("IntroductionPhone")}>{this.text[this.props.language.value].phone}</TextImage>
                            <Space size={1} />
                            <TextImage src={this.getImageByName("IntroductionAddress")}>{this.text[this.props.language.value].address}</TextImage>
                            <Space size={1} />
                            <TextImage src={this.getImageByName("IntroductionLinkedin")}>{this.text[this.props.language.value].linkedin}</TextImage>
                            <Space size={1} />
                            <TextImage src={this.getImageByName("IntroductionGithub")}>{this.text[this.props.language.value].github}</TextImage>
                            <Space size={1} />
                        </Col>

                        <Col lg={{size:9}}>
                            
                            <MediumTitle>{this.text[this.props.language.value].title}</MediumTitle>
                            <Text>
                                {this.text[this.props.language.value].introduction}
                            </Text>
                                
                        
                        </Col>
                        
                    </Row>
                    <Space size={5} />
                </Container>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}
export default connect(mapStateToProps)(Introduction);