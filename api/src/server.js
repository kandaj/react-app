/*
 *  European Genome-phenome Archive (EGA)
 *
 *  Copyright 2018 EMBL - European Bioinformatics Institute
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
// Basic Setup
const http     = require('http'),
    express  = require('express'),
    parser   = require('body-parser'),
    archiveStatus = require('./routes/archiveStatus/statusFiles'),
    archiveVolume = require('./routes/archiveVolume/dailyArchivedVolume'),
    downloaderStats = require('./routes/downloader/stats'),
    userDownloaderStats = require('./routes/downloader/userStats'),
    downloadBoxStats = require('./routes/downloadBox/downloadBox'),
    path = require("path"),
    webRoot = __dirname + '/../build/',
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json'),
    historyFB = require('connect-history-api-fallback'),
    _ = require('underscore'),
    morgan = require('morgan'),
    config = require('./configuration/config'),
    cors = require('cors')


// Setup express
let app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(morgan('dev'));
app.set('port', process.env.PORT || 5000);
app.set('superSecret', config.secclearret);
app.use(cors())
app.options('*', cors())




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', archiveStatus);
app.use('/api/v1', archiveVolume);
app.use('/api/v1', downloaderStats);
app.use('/api/v1', userDownloaderStats);
app.use('/api/v1', downloadBoxStats);

if (config.env === 'production') {
    app.use(historyFB())
    app.use('/', express.static(webRoot))
} else {
    app.get('/', function (req, res) {
        res.send('<html><body><h1>EGA Internal API</h1></body></html>');
    });
}

app.get('/*', function(req, res) {
    res.sendFile(path.join(webRoot + 'index.html'))
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Create server
 const httpServer = http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening on port ' + app.get('port'));
});

process.on('SIGINT', function () {
    console.log("Closing");
    httpServer.close();
    process.exit(0)
});



