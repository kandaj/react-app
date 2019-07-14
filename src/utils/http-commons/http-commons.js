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
import axios from 'axios'

export const HTTP = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? "" : 'http://localhost:5000',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`
    },
});

HTTP.interceptors.request.use((config) => {
    const token = localStorage.getItem('user-token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});