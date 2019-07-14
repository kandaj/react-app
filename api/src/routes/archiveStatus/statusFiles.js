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
const pipelineLogScript = '/nfs/ega/private/ega/test_production/Archive_pipeline/stage1/pipelineLog.sh';


// Database Connection
const {db} = require('../../db/egadev');

router.get('/audit/file-count', getFileCount);

router.get('/audit/process-log/:id', getProcessLog);

router.get('/audit/pipeline-log/:id', getPipelineLog);

router.get('/audit/file-details/:id', getFileDetails);

router.get('/audit/files/:id/:page', getStatusFiles);

router.get('/audit/archive-status-terms', getArchiveStatusTerms)

router.post('/audit/update-status', updateStatus);




function getFileCount(req, res, next) {
    db.any('select count(*) as total, archive_status_id from audit_sync1.audit_file where archive_status_id in (1,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,22,23,24,25,34,35,50,51,52) group by archive_status_id')
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

function getProcessLog(req, res, next) {
    let stableID = req.params.id;
    db.one('SELECT * FROM audit_sync1.audit_archive_process_log where stable_id=$1',stableID)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: ''
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getPipelineLog(req, res, next) {
    let exec = require('child_process').exec;
    exec(pipelineLogScript+" "+req.params.id, function(err, stdout, stderr) {
        res.status(200).send(JSON.stringify(stdout));
    });
}

function getFileDetails(req, res, next) {
    let stableID = req.params.id;
        db.multi('select * from audit_sync1.audit_file a where a.stable_id=$1;select * from audit_sync1.audit_md5 m where m.file_stable_id=$1',stableID)
        .spread(function (info,md5_info) {
            const data = [...info]
            data[0].check_sum = md5_info
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: ''
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getStatusFiles(req, res, next) {
    const statusID = req.params.id;
    const page = req.params.page;
    const itemsPerPage = req.query.itemsPerPage || 10
    db.multi('select count(*) from audit_sync1.audit_file where archive_status_id=$1;select * from audit_sync1.audit_file where archive_status_id=$1 LIMIT $3  OFFSET ($2 - 1) * $3',[statusID,page,itemsPerPage])
        .spread(function (count,data) {
            res.status(200)
                .json({
                    status: 'success',
                    count: parseInt(count[0].count),
                    data: data,
                    message: ''
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getArchiveStatusTerms(req, res, next) {
    db.any('SELECT * FROM audit_sync1.audit_archive_status_terms')
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

function updateStatus(req, res, next) {
    let stableIds = req.body[0].stableIDs;
    let statusID = req.body[0].statusID;
    db.tx(t => {
        const queries = stableIds.map(stableId => {
            return t.none('UPDATE audit_file SET archive_status_id=$1 WHERE stable_id = $2', [statusID,stableId]);
        });
        return t.batch(queries);
    })
    .then(data => {
        return res.status(201).json({
            status: 'success',
            data: data.length,
            count: data.length,
            message: ''
        });
    })
    .catch(error => {
    });
}




module.exports = router;
