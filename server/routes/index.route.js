/**
 * Created by Adil Imam on 11/18/2017.
 */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import productCtrl from '../controllers/product.controller';

const router= express.Router();

router.use(bodyParser.json());

// to support URL-encoded bodies
router.use(bodyParser.urlencoded({
    extended: true
}));

router.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../../client/index.html'))
);


router.post('/walmart-search-api',productCtrl.queryWalmartApi);

router.post('/percentage-of-brands',productCtrl.calculatePercentageOfBrands);

router.post('/percentage-of-brands-in-top3-search-results',productCtrl.calculatePercentageOfBrandsTop3Results);

router.post('/update-brand-name',productCtrl.updateBrandName);

router.get('/request-walmart-products', productCtrl.requestProducts);

router.get('/request-walmart-brands', productCtrl.requestUniqueBrands);




export default router;

