import React from "react";
import { connect } from 'react-redux'

import {Container, Card, CardImg, CardText, CardBody, CardTitle, Button, Row, Col} from 'reactstrap';


import settings from '../settings.json'

import RavenComponent from '../Components/RavenComponent';


import Text         from "../Components/Text"
import Space        from "../Components/Space"


import ProjectsItem from "../Components/ProjetctsItem.js";

class Projects extends RavenComponent{
    constructor(props){
        super(props)
        this.state={
            mode:"list",
            indexX:0,
            indexY:0,
            imageCardHeight:'0'
        }

        this.text = this.text["Projects"]
    }

    componentDidMount(){
        this.getSizesOfWindow();
        let state = this.state;

        state.imageCardHeight = this.height /100 *35

        this.setState(state)
    }

    selectItem(indexX,indexY){
        let state=this.state;
        state.mode="more";
        state.indexX=indexX;
        state.indexY=indexY;

        this.callRavenAPI("/tracker/project/"+this.text[this.props.language.value].projets[indexX][indexY].title).then((data)=>{});

        this.setState(state);

        document.getElementById('projects').scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    unSelectItem(){
        let state=this.state;
        state.mode="list";

        this.setState(state);
    }

    renderList(){
        return(
            <div id="projects">
                <Container>
                    <Space size={2} />
                    <Row><h3 className="mediumTitle">{this.text[this.props.language.value].title}</h3></Row>
                   
                    <Space size={2} />
                    
                        {
                            this.text[this.props.language.value].projets.map((e,indexX)=>(
                                <div>
                                    <Row>
                                        {e.map((projet,indexY)=>(
                                            <Col lg="4">
                                                <Card >
                                                    <div className="vertical-center" style={{height:this.state.imageCardHeight}}>
                                                        <CardImg top  width="100%" src={settings.RessourcePath+projet.imgSrc}/>
                                                    </div>
                                                    <CardBody>
                                                        <CardTitle>{projet.title}</CardTitle>
                                                        <CardText>{projet.descriptionShort}</CardText>
                                                        {/*Button see more and github*/}
                                                        <Container>
                                                            <Row>
                                                                <Col xs="12">
                                                                    <Button color="success" onClick={()=>this.selectItem(indexX,indexY)} block>
                                                                    {this.text[this.props.language.value].more}
                                                                    </Button>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </CardBody>
                                                </Card>
                                                <Space size="2" />
                                            </Col>  
                                        ))}
                                    </Row>
                                    <Space size={2} />
                                </div>
                            ))
                        }
                    <Space size={5} />
                </Container>
            </div>
        )
    }
    renderMore(){
        return(
            <Container id="projects">
                <Space size={2} />
                <Row>
                    <Col lg="12" style={{display:"flex"}}>
                        <Button color="dark" onClick={()=>this.unSelectItem()} >Retour</Button>
                        <h3 className="mediumTitle">{this.text[this.props.language.value].projets[this.state.indexX][this.state.indexY].title}</h3>
                    </Col>
                </Row>
                <Space size={2} />

                <Row>
                    <Col lg="6">

                        <ProjectsItem items={this.text[this.props.language.value].projets[this.state.indexX][this.state.indexY].mediaList} />
                    </Col>
                    <Col lg="6">
                        <Container>
                            <Row>
                                <h5 >{this.text[this.props.language.value].description}</h5>
                            </Row>
                            <Row>
                                <Text>{this.text[this.props.language.value].projets[this.state.indexX][this.state.indexY].description}</Text>
                            </Row>
                            <Space size={this.text[this.props.language.value].projets[this.state.indexX][this.state.indexY].spaceSize} />
                            <Row>
                                <Container fluid>
                                    <Row>
                                        <Col xs="6">
                                            <h5>{this.text[this.props.language.value].technologies}</h5>
                                            <Container>
                                                {
                                                    this.text[this.props.language.value].projets[this.state.indexX][this.state.indexY].technologies.map((techno)=>(
                                                        <Row>{techno}</Row>
                                                    ))
                                                }
                                            </Container>
                                        </Col>
                                        <Col xs="6">
                                            <a href={this.text[this.props.language.value].projets[this.state.indexX][this.state.indexY].github} style={{color:"white"}}><Button color="dark" block>{this.text[this.props.language.value].github}</Button></a>
                                        </Col>
                                    </Row>
                                </Container>
                            </Row>
                        </Container>
                    </Col>

                </Row>
                <Space size={2} />
            </Container>
        )
    }

    render(){
        if(this.state.mode==="list"){
            return this.renderList()
        }
        else if(this.state.mode==="more"){
            return this.renderMore()
        }
        
    }

};

const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}
export default connect(mapStateToProps)(Projects);