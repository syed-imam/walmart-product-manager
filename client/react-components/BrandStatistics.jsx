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
            brandStats:[],
            brandOptions:[]
        };
        this.submitStatisticsQuery = this.submitStatisticsQuery.bind(this);
    }

    componentDidMount(){
        this.generateBrandOptions();
        this.buildBrandsStatList(0, 86399, "cereal","/percentage-of-brands");
    }

    handleChange(number, event){
        switch(number){
            case 1:
                this.setState({brandNames:{brand1:event.target.value, brand2:this.state.brandNames.brand2, brand3:this.state.brandNames.brand3, brand4:this.state.brandNames.brand4}});
                break;
            case 2:
                this.setState({brandNames:{brand1:this.state.brandNames.brand1, brand2:event.target.value, brand3:this.state.brandNames.brand3, brand4:this.state.brandNames.brand4}})
                break;
            case 3:
                this.setState({brandNames:{brand1:this.state.brandNames.brand1, brand2:this.state.brandNames.brand2, brand3:event.target.value, brand4:this.state.brandNames.brand4}})
                break;
            case 4:
                this.setState({brandNames:{brand1:this.state.brandNames.brand1, brand2:this.state.brandNames.brand2, brand3:this.state.brandNames.brand3, brand4:event.target.value}})
        }
    }


    submitStatisticsQuery(e) {
        if (e) {
            e.preventDefault();
        }
     //Make sure brands are unique
        if(this.state.brandNames.brand1 !== this.state.brandNames.brand2 && this.state.brandNames.brand1 !== this.state.brandNames.brand3 &&
            this.state.brandNames.brand1 !== this.state.brandNames.brand4 && this.state.brandNames.brand2 !== this.state.brandNames.brand3 &&
            this.state.brandNames.brand2 !== this.state.brandNames.brand4 && this.state.brandNames.brand3 !== this.state.brandNames.brand4)
        {
        let startTime = (this.timeStartHours.value * 3600) + (this.timeStartMinutes.value) * 60 + (this.timeStartSeconds.value * 1);
        let limitTime = (this.timeLimitHours.value * 3600) + (this.timeLimitMinutes.value * 60) + (this.timeLimitSeconds.value * 1);
        if(startTime<limitTime) {
            let searchQuery = this.query.value;
            let endpoint1 = '/percentage-of-brands-in-top3-search-results';
            let endpoint2 = '/percentage-of-brands';
            if (this.top3results.checked) {
                this.buildBrandsStatList(startTime, limitTime, searchQuery, endpoint1);
            }
            else {
                this.buildBrandsStatList(startTime, limitTime, searchQuery, endpoint2);
            }
        }
        else{
            $(".modal-body").html("<h4>Limit time has to be greater than Start time</h4>");
            $("#errorModal").modal();
        }
        }
        else{
            $(".modal-body").html("<h4>Brands are not unique</h4>")
            $("#errorModal").modal();
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

    generateBrandOptions(){
        let brandOptionsAjax=[];
        axios.get('/request-walmart-brands')
            .then(function (response) {
                let brandList=response.data;
                for(var i=0; i<brandList.length; i++){
                    brandOptionsAjax.push(<option key={i} value={brandList[i]}> {brandList[i]} </option>);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            brandNames:{
                brand1: "Cheerios",
                brand2: "Kashi",
                brand3: "Kellogg's",
                brand4: "Post",
            },
            brandStats:[],
            brandOptions: brandOptionsAjax
        });

    }

    generateBrandsList(){
        let brands = this.state.brandStats;
        let brandsList= brands.map((brand)=>{
            return <div className="col-md-3" key={brand.brandname}> <CirclePercentage percentage={brand.brandpercent}/> <h2 className="brand-headings">{brand.brandname}</h2></div>
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

       return (
            <div>
                <div className="well">
                    <div className="row">
                        <div className="form-group col-md-3">
                            <label className="">Brand 1</label>
                            <select id="brand1" className="form-control" value={this.state.brandNames.brand1}  onChange={this.handleChange.bind(this,1)}>
                                {this.state.brandOptions}
                            </select>
                        </div>

                        <div className="form-group col-md-3">
                            <label className="">Brand 2</label>
                            <select id="inputState" className="form-control" value={this.state.brandNames.brand2} onChange={this.handleChange.bind(this, 2)}>
                                {this.state.brandOptions}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label className="">Brand 3</label>
                            <select id="inputState" className="form-control" value={this.state.brandNames.brand3} onChange={this.handleChange.bind(this, 3)}>
                                {this.state.brandOptions}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label className="time-text">Brand 4</label>
                            <select id="inputState" className="form-control" value={this.state.brandNames.brand4} onChange={this.handleChange.bind(this, 4)}>
                                {this.state.brandOptions}
                            </select>
                        </div>
                    </div>
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
                        <div className="row">
                            <label className="time-text">Query Term</label>
                            <br/>
                            <select id="inputState" className="form-control query-class" ref={(value) => { this.query = value}}>
                                {this.generateQueryOptions()}
                            </select>
                       </div>
                    </div>
                      <div className="form-check col-md-3">
                          <label className="form-check-label top-3-result">
                              <input type="checkbox" className="form-check-input" ref={(value) => { this.top3results = value}}/>
                                  Only top 3 results
                          </label>
                      </div>
                    <div className="form-group col-md-1">
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

                <div className="modal fade" id="errorModal" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header alert alert-danger">
                                <h5 className="modal-title" id="exampleModalLabel">Alert</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default BrandStatistics;