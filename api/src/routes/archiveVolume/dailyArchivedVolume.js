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

router.get('/daily-archive-volume', getDailyArchiveVolume);
router.get('/daily-archive-volume/recent/', getRecentDailyArchiveVolume);


function getDailyArchiveVolume(req, res, next) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    db.any(`select * from ega_archive_mirror.fire_monitor_all_mv where date_f between symmetric $1 and $2`,[startDate,endDate])
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

function getRecentDailyArchiveVolume(req, res, next) {
    db.any(`select * from ega_archive_mirror.fire_monitor_all_mv where date_f is not null order by date_f desc limit 5`)
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