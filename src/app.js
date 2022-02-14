const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Routes = require('./routes/index');
const { performance } = require('perf_hooks');
require('dotenv').config({
    path: process.env.NODE_ENV === 'development ' ? '.development.env' : '.env'
});


class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.express.use(express.json());
        this.express.use(helmet());
        console.log('[SERVER] Helmet dressed on');
        this.express.use(cors());
        console.log('[SERVER] Cors enabled');
        console.log(`[SERVER] Running on ${process.env.NODE_ENV} mode`);
    }
    routes() {
        this.express.use('/v1', Routes);
        this.express.use((req, res, next) => {
            return res.status(404).json({ message: "Endpoint not available!" })
        });
    }
}

module.exports = new AppController().express