import React from 'react'
import PropTypes from 'prop-types';

import {Container, Row, Col} from 'reactstrap';
import RavenComponent from './RavenComponent'
import Image                from './Image'
import Text                 from './Text'
import MediumTitle          from './MediumTitle'
import Space from './Space';


class SkillIllustration extends RavenComponent{
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
        if(this.props.center){
            return(
                <Container>
                        <div className="verticalCenter">
                            <Row>
                                <Image width={15} height={15} src={this.props.src}></Image>
                            </Row>
                            <Row><p>  </p></Row>
                            <Row><h6 style={{textAlign:"center",width:"100%"}}>{this.props.title.toUpperCase()}</h6></Row>
                            <Row>
                                <Text>{this.props.children}</Text>
                            </Row>
                        </div>
                </Container>
                
            )
        }
        else{
            return(
                <Container>
                        <Row>
                            <Image width={10} height={10} src={this.props.src}></Image>
                        </Row>
                        <Space size={2} />
                        <Row><h6 style={{textAlign:"center",width:"100%"}}>{this.props.title}</h6></Row>
                        <Space size={1} />
                        <Row style={{textAlign:"center",width:"100%"}}>
                            <p>{this.props.children}</p>
                        </Row>
                        
                </Container>
                
            )
        }
        
    }
};

//Deffinition du module:
SkillIllustration.propTypes={
    title:PropTypes.element.isRequired,
    src: PropTypes.element.isRequired
}

export default SkillIllustration;