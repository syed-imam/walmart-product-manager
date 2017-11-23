/**
 * Created by Adil Imam on 11/18/2017.
 */
import Product from '../models/product.model';
import mongoose from 'mongoose';
import axios from 'axios';
import config from '../../config/config'

const walmartApiEndpoint=config.walmartSearchAPI.apiEndPoint;
const walmartApiKey=config.walmartSearchAPI.apiKey;


function queryWalmartApi(req, res, next){

    let search1="cereal";
    let search2="cold+cereal";
    axios.all([
        axios.get(walmartApiEndpoint+"?query="+search1+"&format=json&responseGroup=full&facet=on&apiKey="+walmartApiKey),
        axios.get(walmartApiEndpoint+"?query="+search2+"&format=json&responseGroup=full&facet=on&apiKey="+walmartApiKey)
    ]).then(axios.spread((result1, result2) => {

        var response=[result1.data,result2.data];
        buildModelData(response, next);

    })).catch(error => {
        console.log(error);
    });
}


function buildModelData(response, next){
    var date=new Date();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();   //store the number of seconds passed from 00:00:00

  //Loop through both responses and persist that into database
  for(let data of response){
      for (let item of data.items){
          const product = new Product({
              query: data.query,
              name: item.name,
              customerRatingImage: item.customerRatingImage,
              msrp: item.msrp,
              salePrice: item.salePrice,
              mediumImage: item.mediumImage,
              brandName: item.brandName,
              queryTime: (hours* 3600) + (minutes*60) + (seconds * 1),
              productUrl: item.productUrl
          });

          product.save()
              .then(savedProductItem => {
                  console.log("Success");
              })
              .catch(e => next(e));
      }
  }
}

function calculatePercentageOfBrands(req, res, next) {

     let startTime=req.body.timeStart;
     let limitTime=req.body.limitTime;
     let searchQuery=req.body.searchQuery;
     /*
         Queries mongoDB to return percentages of brands in search results within a given time range and a search query
      */
    Product.find({$or: [{queryTime: {$gte: startTime}}, {queryTime: {$lte: limitTime}}]}).count(function (err, numOfProductsInTimeRange){
          //Aggeregate query to get percentage of brands
            Product.aggregate([{"$match": {"queryTime":{$gte: startTime, $lte: limitTime}, "query":searchQuery}},
                { "$group": { "_id": {"brandName":  "$brandName"}, "count": { "$sum": 1 }}},
                { "$project": {"count": 1,"percentage": { "$multiply": [ { "$divide": [ "$count", {"$literal": numOfProductsInTimeRange }] }, 100 ]}}}
            ]).exec((err, productsPercentages) =>{
                if(err) throw err;
                else {
                    var result =[];
                    for(let product of productsPercentages){
                       console.log(product._id.brandName);
                         if(product._id.brandName === "Cheerios" || product._id.brandName === "Post" || product._id.brandName === "Kellogg's" || product._id.brandName === "Kashi")
                         {
                             result.push(product);
                         }
                    }
                    res.send(JSON.stringify(result));
                }
            });
        }
    )
}


function calculatePercentageOfBrandsTop3Results(req, res, next) {
    let startTime=req.body.timeStart;
    let limitTime=req.body.limitTime;
    let searchQuery=req.body.searchQuery;

    Product.find({$or: [{queryTime: {$gte: startTime}}, {queryTime: {$lte: limitTime}}]}).count(function (err, numOfProductsInTimeRange){
           //Limit the search result to top 3
            const Limit=3;
            Product.aggregate([{"$match": {'queryTime':{$gte: startTime, $lte: limitTime},"query": searchQuery}}, {$limit : Limit},
                { "$group": { "_id": {"brandName":  "$brandName"}, "count": { "$sum": 1 }}},
                { "$project": {"count": 1,"percentage": { "$multiply": [ { "$divide": [ "$count", {"$literal": Limit }] }, 100 ] }}}
            ]).exec((err, productsPercentages) =>{
                if(err) throw err;
                else {
                    let result =[];
                    for(let product of productsPercentages){
                        console.log(product._id.brandName);
                        if(product._id.brandName === "Cheerios" || product._id.brandName === "Post" || product._id.brandName === "Kellogg's" || product._id.brandName === "Kashi")
                        {
                            result.push(product);
                        }
                    }
                    res.send(JSON.stringify(result));
                }
            });
        }
    )
}

function requestProducts(req, res){
       Product.find({}, function(err, response){
              res.send(JSON.stringify(response));
        });
}

function requestUniqueBrands(req, res){
    Product.distinct("brandName", function(err, response){
        console.log(response);
        res.send(JSON.stringify(response));
    });
}

/**
 * Function to allow persistent brand name change
 * @param req
 * @param res
 */
function updateBrandName(req, res){

    var id = req.body.id;
    var newBrand= req.body.newBrand;

   Product.findOne({"_id":id}, function(err, doc){
       if(err){ console.log(err); throw err;}
       doc.brandName=newBrand;
       doc.save(function(err, updatedDoc){
          if(err){
              throw err;
          }
           res.send(updatedDoc);
       });
   });
}

export default {queryWalmartApi, calculatePercentageOfBrands, calculatePercentageOfBrandsTop3Results, requestProducts, requestUniqueBrands, updateBrandName};
