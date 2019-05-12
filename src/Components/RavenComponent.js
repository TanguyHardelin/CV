import React from 'react';

import {
    isBrowser,
    isMobile
  } from "react-device-detect";

import settings from '../settings.json'
import text     from '../locale.json'

class RavenComponent extends React.Component{
    constructor(props){
        super(props);

        //State of component:
        this.state={
            text:{
                GlobalNavBar:{},
                Login:{},
                Home:{},
                AddUser:{},
                SignUpModal:{},
                RequestPage:{}
            },
            localTextLoaded:false
        }

        //Information about the window:
        this.width=0;
        this.height=0;
        //The reference is the max value between width and height
        this.reference=0;

        this.mobile=false;      //True if the height > width
        this.computer=false    //True if the width  > height

        //Upadating functions:
        this.updateFunction             = [];
        this.couldStartUpdatingFunction = false

        //text:
        this.text = text

        //Binding function:
        this.updateData             = this.updateData.bind(this);
    }
    //AddUpdateFunction:
    addUpdateFunction(f){
        this.updateFunction.push(f)
        console.log()
    }
    //startUpdatingData:
    startUpdatingData(){
        setInterval(this.updateData,50);
        this.couldStartUpdatingFunction=true;
    }
    //updateData:
    updateData(){
        let self=this
        if(this.couldStartUpdatingFunction===true){
            for(let i=0;i<self.updateFunction.length;i++){
                self.updateFunction[i]();
            }
            self.setState(self.state);
        }
        
    }
    //Call raven with request
    callRavenAPI(request){
        return new Promise((resolve,err)=>{
            fetch(settings.Raven.ravenURL+request,{
                method: 'GET',
                credentials: 'include'
            })
            .then(data => {return data.json()})
            .then((data)=>{
                resolve(data);
            })
        });
    }
    async callRavenAPISync(request){
        let response=await fetch(settings.Raven.ravenURL+request,{
                method: 'GET',
                credentials: 'include'
        });
        console.log("Try to access to: "+settings.ravenURL+request);
        response= await response.json();
        return response;
    }

    //Calculate all size of windows
    getSizesOfWindow(){
        this.width      = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.height     = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.reference   = this.width;
        if(this.height > this.width) this.reference = this.height;
        if(this.height > this.width) this.mobile=true;
        if(this.width  > this.height) this.computer=true;

    }

    replace(t,s,a){
        return t.split(s).join(a);
    }
    stringToSQLString(s){
        s=this.replace(s,' ','_SPACE_');
        s=this.replace(s,';','_POINTVIRGULE_');
        s=this.replace(s,"'",'_SIMPLEC_');
        s=this.replace(s,'"','_SIMPLED_');
        s=this.replace(s,'\r','_CHARIOT_');
        s=this.replace(s,'\t','_TAB_');
        s=this.replace(s,'\n','_RETURN_');
        return s;
    }
    SQLStringToString(s){
        s=this.replace(s,'_SPACE_',' ');
        s=this.replace(s,'_POINTVIRGULE_',';');
        s=this.replace(s,"_SIMPLEC_","'");
        s=this.replace(s,'_SIMPLED_','"');
        s=this.replace(s,'_CHARIOT_','\r');
        s=this.replace(s,'_TAB_','\t');
        s=this.replace(s,'_RETURN_','\n');
        return s;
    }
    copyStringToClipboard (str) {
        // Create new element
        var el = document.createElement('textarea');
        // Set value (string to be copied)
        el.value = str;
        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);
        // Select text inside element
        el.select();
        // Copy text to clipboard
        document.execCommand('copy');
        // Remove temporary element
        document.body.removeChild(el);
     }

     getImageByName(name){
         return settings.RessourcePath+settings.ImagesSrc[name];
     }
     getIconByName(name){
        return settings.RessourcePath+settings.IconsSrc[name];
    }

     renderMobile(){
         return (
             <div>You have to overload this method in your raven component</div>
         )
     }

     renderComputer(){
        return (
            <div>You have to overload this method in your raven component</div>
        )
    }

    render(){
        this.getSizesOfWindow();
        if(isMobile){
            return this.renderMobile();
        }
        else if(isBrowser){
            return this.renderComputer();
        }
        else{
            return this.renderComputer();
        }
    }

    createMultipleElement(number){
        let table=[];

        for(let i=0;i<number;i++){
            table.push(' ')
        }
        
        return table;
    }
}

export default RavenComponent