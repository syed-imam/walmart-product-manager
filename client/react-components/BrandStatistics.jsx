import React, { Component } from "react";
import axios from 'axios';
import CirclePercentage from './CirclePercentage';

class BrandStatistics extends React.Component {

    constructor(){
        super();
        this.state = {
            brandNames:{
                brand1: "Cheerios",
                brand2: "Kashi",
                brand3: "Kellogg's",
                brand4: "Post",
            },
            brandStats:[]
        };
        this.submitStatisticsQuery = this.submitStatisticsQuery.bind(this);
    }

    componentWillMount(){
          this.buildBrandsStatList(0, 86399, "cereal","/percentage-of-brands");
    }

    submitStatisticsQuery(e) {
        if (e) {
            e.preventDefault();
        }
        let startTime = (this.timeStartHours.value * 3600) + (this.timeStartMinutes.value) * 60 + (this.timeStartSeconds.value * 1);
        let limitTime = (this.timeLimitHours.value * 3600) + (this.timeLimitMinutes.value * 60) + (this.timeLimitSeconds.value * 1);
        let searchQuery = this.query.value;
        let endpoint1='/percentage-of-brands-in-top3-search-results';
        let endpoint2='/percentage-of-brands';
        if (this.top3results.checked) {
            this.buildBrandsStatList(startTime, limitTime, searchQuery, endpoint1);
        }
        else{
            this.buildBrandsStatList(startTime, limitTime, searchQuery, endpoint2);
        }
    }
    generateQueryOptions(){
        let queries=['cereal', 'cold cereal'];
        let queryOptions=[];
        for(let i=0;i<queries.length;i++) {
            queryOptions.push(<option key={queries[i]} value={queries[i]}>{queries[i]}</option>);
        }
        return queryOptions;
    }

    generateHoursRange(){
        let hours=[];
        for(let i=0;i<=23;i++) {
               hours.push(<option key={i} value={i}>{i}</option>);
         }
        return hours;
     }

    generateMinuteOrSecondRange(){
        let time=[];
        for(let i=0; i<=59; i++){
            time.push(<option key={i} value={i}>{i}</option>);
        }
        return time;
    }

    generateBrandsList(){
        let brands = this.state.brandStats;
        console.log(this.state.brandStats);
        let brandsList= brands.map((brand)=>{
            return <div className="col-md-3" key={brand.brandname}> <CirclePercentage percentage={brand.brandpercent}/> <h2>{brand.brandname}</h2></div>
        });

        return brandsList;
    }


    buildBrandsStatList(startTime, limitTime, searchQuery, url){
        var payLoad={
            timeStart: startTime,
            limitTime: limitTime,
            searchQuery: searchQuery
        };

        axios.post(url, payLoad)
            .then(response => {

                var brandStatisticsArray=[];
                let brandNames=this.state.brandNames;
                for (var brandName in brandNames) {
                    console.log(brandName, brandNames[brandName]);

                    var brandResult = response.data.find(function(brand){
                        return brand._id.brandName === brandNames[brandName];
                    });

                    if(brandResult){
                        brandStatisticsArray.push({brandname:brandNames[brandName], brandpercent:brandResult.percentage});
                    }
                    else{
                        brandStatisticsArray.push({brandname:brandNames[brandName], brandpercent:0.00});
                    }
                }
                this.setState({brandNames:this.state.brandNames, brandStats:brandStatisticsArray});
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
console.log("I am here");
       return (
            <div>
                <div className="well">
                  <div className="row">
                        <div className="form-group col-md-3">
                        <label className="time-text">Time Start</label>
                        <div className="row">
                          <div className="col-md-4">
                              <label className="font-weight-light">Hour</label>
                              <select id="inputState" className="form-control" ref={(value) => { this.timeStartHours = value}}>
                                  {this.generateHoursRange()}
                              </select>
                          </div>
                            <div className="col-md-4">
                                <label className="font-weight-light">Min</label>
                                <select id="inputState" className="form-control" ref={(value) => { this.timeStartMinutes = value}}>
                                    {this.generateMinuteOrSecondRange()}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="font-weight-light">Sec</label>
                                <select id="inputState" className="form-control"  ref={(value) => { this.timeStartSeconds = value}}>
                                    {this.generateMinuteOrSecondRange()}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-md-3">
                        <label className="time-text">Time Limit</label>
                        <div className="row">
                            <div className="col-md-4">
                                <label className="font-weight-light">Hour</label>
                                <select id="inputState" className="form-control" defaultValue="23" ref={(value) => { this.timeLimitHours = value}}>
                                    {this.generateHoursRange()}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="font-weight-light">Min</label>
                                <select id="inputState" className="form-control" defaultValue="59" ref={(value) => { this.timeLimitMinutes = value}}>
                                    {this.generateMinuteOrSecondRange()}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label className="font-weight-light">Sec</label>
                                <select id="inputState" className="form-control" defaultValue="59" ref={(value) => { this.timeLimitSeconds = value}}>
                                    {this.generateMinuteOrSecondRange()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <br/>
                        <div className="row">
                            <br/>
                            <select id="inputState" className="form-control query-class" ref={(value) => { this.query = value}}>
                                {this.generateQueryOptions()}
                            </select>
                       </div>
                    </div>
                      <div className="form-check col-md-2">
                          <label className="form-check-label top-3-result">
                              <input type="checkbox" className="form-check-input" ref={(value) => { this.top3results = value}}/>
                                  Only top 3 results
                          </label>
                      </div>
                    <div className="form-group col-md-2">
                        <div className="row"><br/> <br/>
                            <input className="btn btn-dark submit-button"  type="button" value="Submit"  onClick={this.submitStatisticsQuery}/>
                        </div>
                    </div>
                </div>
            </div>
                <div className="container brands-stats">
                   <div className="row">
                    {this.generateBrandsList()}
                  </div>
                </div>
            </div>
        );
    }


}
export default BrandStatistics;