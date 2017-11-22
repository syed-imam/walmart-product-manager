import React, { Component } from "react";
class CirclePercentage extends React.Component{

    constructor(props){
        super();
        console.log(props);
        this.state={percentage:props.percentage};
    }

    render() {

        var roundPercentage=Math.round(this.state.percentage);
        var brandPercentage="c100 p"+roundPercentage+" dark big green";
        return (
            <div>
                <div className="clearfix">

                    <div className={brandPercentage}>
                        <span>{roundPercentage}%</span>
                        <div className="slice">
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CirclePercentage;