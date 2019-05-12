import React from "react";
import { connect } from 'react-redux'

import {Container, Row, Col, Badge, Button} from 'reactstrap';


import RavenComponent from '../Components/RavenComponent';


import Space        from "../Components/Space"


class Skills extends RavenComponent{
    constructor(props){
        super(props);

        this.text = this.text["Skills"]

        this.state={
            itemSelected:"Informatique",
            indexSelected:0,
            iconSrc:[],
            reference:0,
            fontSize:"100%"
        }

        for(let i=0;i<this.text[this.props.language.value].cathegories.length;i++){
            this.state.iconSrc.push(this.getIcon(this.text[this.props.language.value].cathegories[i]));
        }

        this.getIcon = this.getIcon.bind(this);
        this.changeIcon =this.changeIcon.bind(this)
    }

    getIcon(element){
        if(element.title===this.state.itemSelected){
            return element.iconColor;
        }
        else{
            return element.iconBW;
        }
    }
    
    changeIcon(item){
        this.callRavenAPI("/tracker/skill/"+item).then((data)=>{});

        let state=this.state;
        state.itemSelected=item;

        for(let i=0;i<this.text[this.props.language.value].cathegories.length;i++){
            if(this.text[this.props.language.value].cathegories[i].title===state.itemSelected){
                state.indexSelected=i;
                state.iconSrc[i]=this.text[this.props.language.value].cathegories[i].iconColor;
            }
            else{
                state.iconSrc[i]=this.text[this.props.language.value].cathegories[i].iconBW;
            }
            
        }
        this.setState(state);
        document.getElementById('skills').scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    getColorFromIndex(index){
        if(index===0){
            return "success"
        }
        else if(index===1){
            return "dark"
        }
        else if(index===2){
            return "success"
        }
        else if(index===3){
            return "dark"
        }
        else if(index===4){
            return "success"
        }
        else if(index===5){
            return "dark"
        }
        else{
            return "secondary"
        }
    }
 
    componentDidMount(){
        
        this.getSizesOfWindow();

        let state          = this.state;
        state.reference    = this.reference;
        if(this.mobile){
            state.fontSize="80%"
        }
        else{
            state.fontSize="100%"
        }

        this.setState(state)
    }

    getStyleOfSkillLine(){
        if(this.mobile){
            return{};
        }
        else{
            return {width:"50%",margin:"0 auto"};
        }
    }
    getSizeOfImagesOfSkillLine(){
        if(this.mobile){
            return 8;
        }
        else{
            return 4;
        }
    }

    render(){
        return(
            <div id="skills" style={{backgroundColor:"#111",color:"white"}}>
                {/* Partie avec affichage simple */}
                <Container>
                    {/* Titre avec les espaces qui vont bien */}
                    <Space size={2} />
                    <Row><h3 className="mediumTitle">{this.text[this.props.language.value].title}</h3></Row>
                    <Space size={6} />

                    
                    <Row style={this.getStyleOfSkillLine()}>
                            {
                                this.text[this.props.language.value].cathegories.map((element,index)=>(
                                    <Col xs="3">
                                        <Button color="link" onClick={()=>this.changeIcon(element.title)} style={{background:"none",border:"none",whidth:"100%",color:"white",outline:"none"}}>
                                            <img src={this.getIconByName(this.state.iconSrc[index])}  style={{marginLeft:"auto",marginRight:"auto",width:this.state.reference/100*this.getSizeOfImagesOfSkillLine(),display:"block"}}/>
                                            <p style={{textAlign:"center",fontSize:this.state.fontSize}}>{element.title}</p>
                                            <Space size={2} />
                                        </Button>
                                    </Col>
                                ))
                            }
                        
                    </Row>
                    <Row>
                        <Col xs="12">
                            {/*Mettre compétence en fonction des compétences ici*/}
                            <Container style={{backgroundColor:"white",color:"black",borderBottomLeftRadius:"2%",borderBottomRightRadius:"2%",borderTopLeftRadius:"2%",borderTopRightRadius:"2%",padding:"30px"}}>
                                <Row>
                                {this.text[this.props.language.value].cathegories[this.state.indexSelected].skill.map((element,index)=>(
                                    
                                    <Col lg={{offset:1,size:5}}>
                                    
                                        <h5><Badge color={this.getColorFromIndex(index)}>{element.title}</Badge></h5>
                                        <ul>
                                        {element.list.map((e)=>(
                                            <li>{e}</li>
                                        ))}
                                        <Space size={2} />
                                        </ul>
                                    </Col>
                                    
                                ))}
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    
                    <Space size={2} />
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
export default connect(mapStateToProps)(Skills);