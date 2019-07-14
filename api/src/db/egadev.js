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
const promise = require('bluebird');
const configProperties = require('../configuration/config');
const dbProperties = configProperties.db.egadev;
const pipelineLogScript = '/Users/kandaj/get_pipeline_log.sh';

const config = {
    host: dbProperties.host,
    port: dbProperties.port,
    database: dbProperties.database,
    user: dbProperties.user,
    password:dbProperties.password,
    poolSize:10
};

let options = {
    // Initialization Options
    promiseLib: promise,
    connect: function (client, dc, isFresh) {
        if (isFresh) {
            client.query('SET search_path = ftp_logs');
        }
    }
};

const pgp = require('pg-promise')(options);

const db = pgp(config);



module.exports = {db, pgp};

process.on('SIGINT', function () {
    console.log("Ending Postgres connection pool");
    db.$pool.end();
    pgp.end();
});

