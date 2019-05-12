import React from "react";
import { connect } from 'react-redux'


//Raven component:
import RavenComponent from '../Components/RavenComponent'

//Sub Pages:
import Header from './Header'
import Introduction from './Introduction'
import Skills from './Skills'
import Projects from './Projects'
import Footer from "./Footer";
import CareerDevelopment from "./CareerDevelopment";
import Contact from "./Contact";

class Main extends RavenComponent{
    constructor(props){
        super(props);

        this.state={
            initialized:false
        }
    }

    componentDidMount(){
        this.callRavenAPI("/getVersion").then((data)=>{
            //Display Raven
            console.log(data.logo+"\n"+data.version)

            this.callRavenAPI("/tracker/new_visit/ravenResume").then((data)=>{});

            let state=this.state;
            state.initialized = true;

            this.setState(state)
        })

     
    }

    render(){
        if(this.state.initialized)
        return(
            <div id="website">
                <Header />
                <Introduction />
                <CareerDevelopment />
                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>
        )
        else{
            return(
                <div></div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        language:state.language
    }
}
export default connect(mapStateToProps)(Main);