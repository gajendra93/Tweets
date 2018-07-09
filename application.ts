let express    = require('express'),
    async      = require('async'),
    cors       = require('cors'),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose');


let config = require('./config.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/tweets', require('./routes/tweetRoutes')());

app.use((error: any, req: any, res: any, next: any) => {
    if (error instanceof SyntaxError && 'body' in error) {
        res.status(400).json({ error: { message: 'Invalid request' }});
    }
    else next();
})

mongoose.connect(config.dbUrl + config.dbName, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', (error: any) => {
    console.error('Error in Mongoose connection', JSON.stringify(error))
})

db.on('open', () => {
    console.info('Mongoose is now connected...');
})

db.on('disconnected', () => {
    console.info('Mongoose is now disconnected..!')
})

app.listen(config.port, (error: any) => {
    if (!error) {
        console.info("Service listening on port %s...", config.port);
    }
    else {
        console.info("Initialization failed with error: %s", JSON.stringify(error));
    }
})