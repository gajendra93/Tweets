let shortid = require('shortid'),
    _ = require('lodash');

const TweetModel = require('../models/tweets');
const config = require('../config.json');

export class Tweets {

    public static add = (req: any, res: any) => {
        if (!_.get(req, 'body.content')) return res.status(400).json({error: {message: 'Missing contents in req.body'}});

        let { body: {content} } = req;

        let tweet: any = {
            uid: shortid.generate(),
            content,
            created_at: new Date(),
            updated_at: new Date()
        }

        let tweetObj: any = new TweetModel(tweet);

        tweetObj.save((error, data) => {
            if (!error) {
                res.json({data: {message: 'Tweet added', tweet: data}});
            }
            else res.json({error: {message: JSON.stringify(error)}});
        })
    }

    public static get = (req: any, res: any) => {
        if (!_.get(req, 'params.uid')) return res.status(400).json({error: {message: 'Missing uid in req.params'}});

        let { params: { uid } } = req;

        TweetModel.find({ uid }, (error, data) => {
            if (!error) {
                res.json({data: {tweet: data}});
            }
            else res.json({error: {message: JSON.stringify(error)}});
        })
    }

    public static getAll = (req: any, res: any) => {
        if (_.get(req, 'query.page')) {
            let { query: { page } } = req;

            TweetModel.paginate({}, { page, limit: config.pageSize }, (error, data) => {
                if (!error) {
                    res.json({ data });
                }
                else res.json({error: {message: JSON.stringify(error)}});
            })
        }
        else {
            TweetModel.find((error, data) => {
                if (!error) {
                    res.json({data: {tweets: data}});
                }
                else res.json({error: {message: JSON.stringify(error)}});
            })
        }
        
    }

    public static update = (req: any, res: any) => {
        if (!_.get(req, 'params.uid')) return res.status(400).json({error: {message: 'Missing uid in req.params'}});
        if (!_.get(req, 'body.content')) return res.status(400).json({error: {message: 'Missing contents in req.body'}});
        
        let { params: { uid }, body: { content } } = req;

        let tweetObj: any = {
            content,
            updated_at: new Date()
        }

        TweetModel.update({ uid }, { $set: tweetObj }, (error, data) => {
            if (!error) {
                if (data.nModified) 
                    res.json({data: {message: `Tweet updated with uid: ${uid}`}});
                else 
                    res.json({data: {message: `No tweet found with uid: ${uid}`}});
            }
            else res.json({error: {message: JSON.stringify(error)}});
        })
    }

    public static delete = (req: any, res: any) => {
        if (!_.get(req, 'params.uid')) return res.status(400).json({error: {message: 'Missing uid in req.params'}});

        let { params: { uid } } = req;

        TweetModel.remove({ uid }, (error, data) => {
            if (!error) {
                if (data.nModified) 
                    res.json({data: {message: `Tweet deleted with uid: ${uid}`}});
                else 
                    res.json({data: {message: `No tweet found with uid: ${uid}`}});
            }
            else res.json({error: {message: JSON.stringify(error)}});
        })
    }

}