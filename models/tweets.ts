import * as mongoose from "mongoose";

const mongoosePaginate = require('mongoose-paginate');

let Schema = mongoose.Schema;

let tweets = new Schema({
    uid: String,
    content: String,
    created_at: Date,
    updated_at: Date
});

tweets.plugin(mongoosePaginate);

module.exports = mongoose.model('Tweets', tweets);