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
const express  = require('express'),
    _        = require('underscore'),
    router   = express.Router()


// Database Connection
const {db} = require('../../db/egapro');

router.get('/user/downloader-success-stats/v2', getUserSuccessStatusV2);
router.get('/user/list', getUserSuggestions);


function getUserSuccessStatusV2(req, res, next) {
    if(req.query.email) {
        db.any(`select * from downloader_api_v2_mirror.downloader_daily_user_stats_mv where user_account=$1`, req.query.email)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: 'success',
                        count: data.length,
                        data: data,
                        message: ''
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    }
}

function getUserSuggestions(req, res, next) {
    if(req.query.value) {
        db.any(`select distinct user_account from downloader_api_v2_mirror.downloader_daily_user_stats_mv where user_account  like \'$1#%\' limit 10`, req.query.value)
            .then(function (data) {
                res.status(200)
                    .json({
                        status: 'success',
                        count: data.length,
                        data: data,
                        message: ''
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    }
}


module.exports = router;