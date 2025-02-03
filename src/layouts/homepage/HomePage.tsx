import React from "react";
import Carousel from "./component/Carousel";
import Search from "./component/Search";
import Category from "./component/Category";
import About from "./component/About";


function HomePage () {
    return(
        <div>
            <Carousel/>
            <Search/>
            <Category/>
            <About/>
        </div>
    ); 
}
export default HomePage;