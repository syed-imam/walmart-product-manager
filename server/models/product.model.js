/**
 * Created by Syed Adil Imam on 11/18/2017.
 */
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    query: String,
    name: String,
    customerRatingImage: String,
    msrp: Number,
    mediumImage: String,
    queryTime: Number,
    salePrice: Number,
    brandName: String
});

export default mongoose.model('Product', ProductSchema);

