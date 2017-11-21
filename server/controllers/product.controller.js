/**
 * Created by Adil Imam on 11/18/2017.
 */
import Product from '../models/product.model';
import axios from 'axios';
import config from '../../config/config'

const walmartApiEndpoint=config.walmartSearchAPI.apiEndPoint;
const walmartApiKey=config.walmartSearchAPI.apiKey;


function queryWalmartApi(req, res, next){
    var search1=req.body.search1;
    var search2=req.body.search2;

    axios.all([
        axios.get(walmartApiEndpoint+"?query="+search1+"&format=json&responseGroup=full&facet=on&apiKey="+walmartApiKey),
        axios.get(walmartApiEndpoint+"?query="+search2+"&format=json&responseGroup=full&facet=on&apiKey="+walmartApiKey)
    ]).then(axios.spread((result1, result2) => {

        var response=[result1.data,result2.data];
        buildModelData(response, next);
        res.send("Success");

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
          console.log("Here");
          const product = new Product({
              query: data.query,
              name: item.name,
              customerRatingImage: item.customerRatingImage,
              msrp: item.msrp,
              salePrice: item.salePrice,
              mediumImage: item.mediumImage,
              brandName: item.brandName,
              queryTime: (hours* 3600) + (minutes*60) + seconds,
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

    Product.find({$or: [{queryTime: {$lte: 63102}}, {queryTime: {$gte: 4246635}}]}).count(function (err, numOfProductsInTimeRange){

          //Aggeregate query to get percentage of brands
            Product.aggregate([{"$match": {"queryTime":{$gte: 60353, $lte: 61234}, "query":"cereal"}},
                { "$group": { "_id": {"brandName":  "$brandName"}, "count": { "$sum": 1 }}},
                { "$project": {"count": 1,"percentage": {"$concat": [ { "$substr": [ { "$multiply": [ { "$divide": [ "$count", {"$literal": numOfProductsInTimeRange }] }, 100 ]}, 0,2 ] }, "", "%" ]}}}
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
                    console.log(JSON.stringify(result));
                    res.send(JSON.stringify(result));
                }
            });
        }
    )
}


function calculatePercentageOfBrandsTop3Results(req, res, next) {

    Product.find({$or: [{queryTime: {$lte: 63102}}, {queryTime: {$gte: 4246635}}]}).count(function (err, numOfProductsInTimeRange){

           //Limit the search result to top 3
            const Limit=3;
            Product.aggregate([{"$match": {'queryTime':{$gte: 60353, $lte: 61234},"query":"cereal"}}, {$limit : Limit},
                { "$group": { "_id": {"brandName":  "$brandName"}, "count": { "$sum": 1 }}},
                { "$project": {"count": 1,"percentage": {"$concat": [ { "$substr": [ { "$multiply": [ { "$divide": [ "$count", {"$literal": Limit }] }, 100 ] }, 0,2 ] }, "", "%" ]}}}
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
                    console.log(JSON.stringify(result));
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

export default {queryWalmartApi, calculatePercentageOfBrands, calculatePercentageOfBrandsTop3Results, requestProducts};
