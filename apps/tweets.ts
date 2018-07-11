let shortid = require('shortid'),
    _ = require('lodash');

const TweetModel = require('../models/tweets');
const TweetsController = require('../lib/tweetsController');

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

        TweetsController.add(tweet).then(data => {
            res.json({data: {message: 'Tweet added', tweet: data}});
        })
        .catch(error => {
            res.json({error: {message: JSON.stringify(error)}});
        })
        
    }

    public static get = (req: any, res: any) => {
        if (!_.get(req, 'params.uid')) return res.status(400).json({error: {message: 'Missing uid in req.params'}});

        let { params: { uid } } = req;

        TweetsController.get(uid).then(data => {
            res.json({data: {tweet: data}})
        })
        .catch(error => {
            res.json({error: {message: JSON.stringify(error)}})
        })
        
    }

    public static getAll = (req: any, res: any) => {
        if (_.get(req, 'query.page')) {
            let { query: { page } } = req;

            TweetsController.getPage(page).then(data => {
                res.json({ data })
            })
            .catch(error => {
                res.json({error: {message: JSON.stringify(error)}})
            })
        }
        else {
            TweetsController.getAll().then(data => {
                res.json({data: {tweets: data}})
            })
            .catch(error => {
                res.json({error: {message: JSON.stringify(error)}})
            })
        }
        
    }

    public static update = (req: any, res: any) => {
        if (!_.get(req, 'params.uid')) return res.status(400).json({error: {message: 'Missing uid in req.params'}});
        if (!_.get(req, 'body.content')) return res.status(400).json({error: {message: 'Missing contents in req.body'}});
        
        let { params: { uid }, body: { content } } = req;

        let tweetObj: any = {
            uid,
            content,
            updated_at: new Date()
        }

        TweetsController.update(tweetObj).then((data: any) => {
            if (data.nModified) 
                res.json({data: {message: `Tweet updated with uid: ${uid}`}});
            else 
                res.json({data: {message: `No tweet found with uid: ${uid}`}});
        })
        .catch(error => {
            res.json({error: {message: JSON.stringify(error)}})
        })

    }

    public static delete = (req: any, res: any) => {
        if (!_.get(req, 'params.uid')) return res.status(400).json({error: {message: 'Missing uid in req.params'}});

        let { params: { uid } } = req;

        TweetsController.delete(uid).then((data: any) => {
            if (data.nModified) 
                res.json({data: {message: `Tweet deleted with uid: ${uid}`}});
            else 
                res.json({data: {message: `No tweet found with uid: ${uid}`}});
        })
        .catch(error => {
            res.json({error: {message: JSON.stringify(error)}})
        })
        
    }

}