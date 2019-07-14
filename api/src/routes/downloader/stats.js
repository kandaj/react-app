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

router.get('/downloader-volume-stats/v2/daily-volume', getDailyVolumeV2);
router.get('/downloader-success-stats/v2/daily-status', getDailySuccessStatusV2);
router.get('/downloader-volume-stats/v3/daily-volume', getDailyVolumeV3);
router.get('/downloader-success-stats/v3/daily-status', getDailySuccessStatusV3);


function getDailyVolumeV2(req, res, next) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    db.any(`select * from downloader_api_v2_mirror.downloader_daily_volume where day_mon_year between symmetric $1 and $2`,[startDate,endDate])
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

function getDailySuccessStatusV2(req, res, next) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    db.any(`select * from downloader_api_v2_mirror.downloader_daily_success_failure where day_mon_year between symmetric $1 and $2`, [startDate,endDate])
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

function getDailyVolumeV3(req, res, next) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    db.any(`select * from pea_test.downloader_daily_stats where day_mon_year between symmetric $1 and $2`,[startDate,endDate])
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

function getDailySuccessStatusV3(req, res, next) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    db.any(`select * from pea_test.daily_success_failure where day_mon_year between symmetric $1 and $2`,[startDate,endDate])
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


module.exports = router;