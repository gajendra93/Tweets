let express = require('express');

import { Tweets } from '../apps/tweets';

let tweetRoutes = () => {
    let router: any = new express.Router();

    router.post('/', Tweets.add);
    router.get('/', Tweets.getAll);
    router.get('/:uid', Tweets.get);
    router.put('/:uid', Tweets.update);
    router.delete('/:uid', Tweets.delete);

    return router;
}

module.exports = tweetRoutes;

