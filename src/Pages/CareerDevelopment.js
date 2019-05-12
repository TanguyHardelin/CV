import React from "react";
import { connect } from 'react-redux'

//Reactstrap component
import {Container, Row, Col,Badge } from 'reactstrap';

//My own component
import RavenComponent from '../Components/RavenComponent';
import Space          from "../Components/Space"


class CareerDevelopment extends RavenComponent{
    constructor(props){
        super(props);

        this.state={
            elementMarginLeftImage:0
        }

        this.text = this.text["CareerDevelopment"]
    }

    
    render(){
        return(
            <Container>
                <Space size={5} />
                <Row><h2 className="mediumTitle">{this.text[this.props.language.value].title}</h2></Row>
                <Space size={5} />
                {
                    this.text[this.props.language.value].elements.map((e,index)=>(
                        <div>
                            <div style={{display:"flex"}}>
                                <div>
                                    <h2><Badge color={e.color}>{e.title}</Badge></h2>
                                </div>
                                <div style={{marginLeft:"1%",width:"100%",justifyContent:"center" }}>
                                    <hr />
                                </div>
                            </div>
                            <Space size={2} />
                            
                            {
                                e.elements.map((element)=>(
                                    <div>
                                        {/*We display the date*/}
                                        <Row>
                                        <div style={{marginLeft:"auto",marginRight:"1%"}}><h4><Badge color={e.color}>{element.date}</Badge></h4></div>
                                        </Row>
                                        <Row>
                                            {/*Then we diplay content*/}
                                            <Col xs="12">
                                                <Container>
                                                    {/*Title*/}
                                                    <Row>
                                                        <h4>{element.title}</h4>
                                                    </Row>
                                                    {/*Localisation*/}
                                                    <Row>
                                                        <i style={{textAlign:"justify"}}>{element.localisation}</i>
                                                    </Row>
                                                    {/*Content*/}

                                                    <Row><p style={{textAlign:"justify"}}>{element.content}</p></Row>
                                                    {
                                                        element.skillsTitle &&
                                                        <Row>
                                                            <p style={{textAlign:"justify"}}><h6>{element.skillsTitle}</h6> {element.skills}</p>
                                                        </Row>
                                                    }
                                                </Container>                                      
                                            </Col>
                                        </Row>
                                        <Space size={2} />
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <Space size={5} />
            </Container>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}
export default connect(mapStateToProps)(CareerDevelopment);