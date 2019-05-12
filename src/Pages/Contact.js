import React from "react";
import { connect } from 'react-redux'

import {Container, Input, Form, FormGroup, Label, Alert, Button, Row} from 'reactstrap';


import RavenComponent from '../Components/RavenComponent';


import Space        from "../Components/Space"


const styleGlobal={
    backgroundColor:"#000",
    color:"white"
}

const styleInput={
    backgroundColor:"#1111",
    border:"1px #2D2D2D solid",
    color:"white"
}
const styleInputError={
    backgroundColor:"#1111",
    border:"1px #FF3937 solid",
    color:"white"
}

class Contact extends RavenComponent{
    constructor(props){
        super(props);

        this.text = this.text["Contact"]

        this.state={
            buttonState:"normal",
            buttonText:this.text[this.props.language.value].send,
            buttonInvalid:{
                email:false,
                name:false,
                enterprise:false,
                object:false,
                content:false
            },
            invalid:false
        }

        this.sendRequestToRaven = this.sendRequestToRaven.bind(this)

        
    }

    getInputStyle(invalid){
        if(invalid){
            return styleInputError
        }
        else{
            return styleInput
        }
    }

    sendRequestToRaven(){
        let state=this.state;
        let valid=true;

        this.callRavenAPI("/tracker/contact/sendEmail").then((data)=>{});

        //Get all infos:
        let email=document.querySelector("#contactEmail").value;
        let name=document.querySelector("#contactName").value;
        let enterprise=document.querySelector("#contactEnterprise").value;
        let object=document.querySelector("#contactObject").value;
        let content=document.querySelector("#contactInfo").value;

        if(email===""){
            state.buttonInvalid.email=true;
            valid=false;
        }
        else{
            state.buttonInvalid.email=false; 
        }
        if(name===""){
            state.buttonInvalid.name=true;
            valid=false;
        }
        else{
            state.buttonInvalid.name=false; 
        }
        if(enterprise===""){
            state.buttonInvalid.enterprise=true;
            valid=false;
        }
        else{
            state.buttonInvalid.enterprise=false; 
        }
        if(object===""){
            state.buttonInvalid.object=true;
            valid=false;
        }
        else{
            state.buttonInvalid.object=false; 
        }
        if(content===""){
            state.buttonInvalid.content=true;
            valid=false;
        }
        else{
            state.buttonInvalid.content=false; 
        }
        if(!valid){
            state.invalid=true;

            this.setState(state);
        }
        else{
            state.invalid=false;
            //Set state of button
            state.buttonState="send";
            state.buttonText=this.text[this.props.language.value].sendToRavenTransition;

        

            this.setState(state)

            //Annimation send:
            let c=0
            let self=this;
            setInterval(()=>{
                c+=1;
                if(c<5){
                    let state=this.state;
                    state.buttonText+=" .";
                    self.setState(state)
                }
                
            },500)

            //Send to Raven:
            this.callRavenAPI("/sendEmail/"+email+"/"+name+"/"+enterprise+"/"+object+"/"+content).then((data)=>{
                if(data.error===false){
                    //Final state:
                    setTimeout(()=>{
                        
                        let state=this.state;
                        state.buttonText=this.text[this.props.language.value].sended;
                        self.setState(state)
                        
                        
                    },500*4)
                }
            })
        }
    }

    render(){
        return(
            <div id="contact" style={styleGlobal}>
                <Container id="contact">
                <Space size={2} />
                <Space size={2} />
                    <Row><h3 className="mediumTitle">{this.text[this.props.language.value].title}</h3></Row>
                    {
                        this.state.invalid && 
                        <div>
                            <Space size={4} />
                            <Alert className="mediumTitle" style={{backgroundColor:"#FF3937",border:"1px #FF3937 solid",color:"white"}}>{this.text[this.props.language.value].alert}</Alert>
                        </div>
                        
                    }
                    <Form>
                            <FormGroup>
                                <Label for="contactEmail">{this.text[this.props.language.value].email}</Label>
                                <Input type="email" id="contactEmail" color="dark" placeholder="example@gmail.com" style={this.getInputStyle(this.state.buttonInvalid.email)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactName">{this.text[this.props.language.value].name}</Label>
                                <Input id="contactName" placeholder="NOM Prénom" style={this.getInputStyle(this.state.buttonInvalid.name)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactEnterprise">{this.text[this.props.language.value].enterprise}</Label>
                                <Input id="contactEnterprise"  style={this.getInputStyle(this.state.buttonInvalid.enterprise)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactObject">{this.text[this.props.language.value].object}</Label>
                                <Input id="contactObject"  style={this.getInputStyle(this.state.buttonInvalid.object)}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="contactInfo">{this.text[this.props.language.value].content}</Label>
                                <Input type="textarea" id="contactInfo"  style={this.getInputStyle(this.state.buttonInvalid.content)}/>
                            </FormGroup>
                    </Form>
                    {this.state.buttonState==="send"?
                        <Button color="success" onClick={this.sendRequestToRaven} disabled block>{this.state.buttonText}</Button>:
                        <Button color="success" onClick={this.sendRequestToRaven} block>{this.state.buttonText}</Button>
                    }
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
export default connect(mapStateToProps)(Contact);