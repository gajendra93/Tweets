const TweetModel = require('../models/tweets');
const config = require('../config.json');

export class TweetsController {

    public static add = (tweet: any) => {
        return new Promise((resolve, reject) => {
            let tweetObj: any = new TweetModel(tweet);
            
            tweetObj.save((error, data) => {
                if (!error) {
                    resolve(data);
                }
                else reject(error);
            })
        })
    }

    public static get = (uid: string) => {
        return new Promise((resolve, reject) => {
            TweetModel.find({ uid }, (error, data) => {
                if (!error) {
                    resolve(data);
                }
                else reject(error);
            })
        })
    }

    public static getAll = () => {
        return new Promise((resolve, reject) => {
            TweetModel.find((error, data) => {
                if (!error) {
                    resolve(data);
                }
                else reject(error);
            })
        })
    }

    public static getPage = (page: number) => {
        return new Promise((resolve, reject) => {
            TweetModel.paginate({}, { page, limit: config.pageSize }, (error, data) => {
                if (!error) {
                    resolve(data);
                }
                else reject(error);
            })
        })
    }

    public static update = (tweet: any) => {
        return new Promise((resolve, reject) =>  {
            TweetModel.update({ uid: tweet.uid }, { $set: tweet }, (error, data) => {
                if (!error) {
                    resolve(data)
                }
                else reject(error);
            })
        })
    }

    public static delete = (uid: string) => {
        return new Promise((resolve, reject) =>  {
            TweetModel.remove({ uid }, (error, data) => {
                if (!error) {
                    resolve(data);
                }
                else reject(error);
            })
        })
    }

}