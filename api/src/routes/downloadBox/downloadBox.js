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
    router   = express.Router(),
    config = require('../../configuration/config');

// Database Connection
let database = 'egadev'
if (config.env === 'production') {
    database = 'egapro'
}
const {db, pgp} = require('../../db/'+database)
const cryptr = require('../../cryptr/crytr')
const boxesLogTable = 'download_boxes_logs'
const boxesTable = 'download_boxes'


router.post('/download-boxes/stats/add', addDownloadBoxData);
router.post('/download-boxes/stats/update', updateDownloadBoxData);
router.get('/download-boxes/stats/dataset-size/:id', getDatasetSize);
router.get('/download-boxes/stats/list', getDownloadBoxData);
router.get('/download-boxes/available', getAvailableDownloadBoxes);
router.get('/download-boxes/list', getDownloadBoxesList);

function getDownloadBoxData(req, res, next) {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    db.any(`select * from ftp_boxes.${boxesLogTable} where created between symmetric $1 and $2`,[startDate,endDate])
        .then(function (data) {
            data.map( value => {
                if(value['enc_key']) {
                    return value['enc_key'] = cryptr.decrypt(value['enc_key'])
                } else {
                    return value['enc_key'] = 'no key found'
                }
            })
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

function addDownloadBoxData(req, res, next) {
    const postData = req.body

    postData.map( value => {
       return value['enc_key'] = cryptr.encrypt(value['enc_key'])
    })

    const cs = new pgp.helpers.ColumnSet(Object.keys(postData[0]), { table: `${boxesLogTable}` });
    let query = pgp.helpers.insert(postData, cs);

    db.task('logs',t => {
        return t.batch([
            t.none(`UPDATE ftp_boxes.${boxesTable} SET in_use=true WHERE box_name = $1`, [postData[0]['box']]),
            db.none(query)
        ]);
    })
    .then(data => {
        const status = data[0] && data[1] ? 400 : 201;
        res.status(status).json({status: 'success'});
    })
    .catch(error => {
        console.log('ERROR:', error);
    });

}

function updateDownloadBoxData(req, res, next) {
    const postData = req.body
    const email = postData['email']
    const box = postData['box']
    const accession_id = postData['accession_id']
    db.task(t => {
        return t.batch([
            t.none(`update ftp_boxes.${boxesLogTable} SET status=true WHERE email = $1 and box=$2 and accession_id=$3`, [email,box,accession_id]),
            t.any(`select * from ftp_boxes.${boxesLogTable} where status=false and email = $1 and box=$2 and accession_id!=$3`, [email,box,accession_id])
                .then(data=>{
                    if(! data.length){
                       return  t.none(`update ftp_boxes.${boxesTable} SET in_use=false where box_name=$1`, [box])
                    } else{
                        return null
                    }
            })

        ]);
    })
    .then(data => {
        const status = data[0] && data[1] ? 400 : 201;
        res.status(status).json({status: 'success'});
    })
    .catch(error => {
        console.log(error)
    });

}

function getDatasetSize(req, res, next){
    const stableID = req.params.id;
    db.any('SELECT (sum(size)/(1024*1024*1024)) as size_in_gb from pea_sync1.file where dataset_stable_id=$1',stableID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: ''
                });
        })
        .catch(function (err) {
            res.status(400)
                .json({
                    status: 'failure',
                    message: err
                });
        });
}


function getAvailableDownloadBoxes(req, res, next){
    db.any(`select * from ftp_boxes.${boxesTable} where in_use=false and password !=$1`,'-')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: ''
                });
        })
        .catch(function (err) {
            res.status(400)
                .json({
                    status: 'failure',
                    message: err
                });
        });
}

function getDownloadBoxesList(req, res, next){
    db.any(`select * from ftp_boxes.${boxesTable} where password !=$1`,'-')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: ''
                });
        })
        .catch(function (err) {
            res.status(400)
                .json({
                    status: 'failure',
                    message: err
                });
        });
}


module.exports = router;
