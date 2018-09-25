
const { Router } = require('express');
const api = Router();
const qs = require('querystring');
const axios = require('axios');

const { SLACK_TOKEN, SHOUTOUTS_SERVER } = process.env;

const apiUtil = require('../util/api.util');

api.get('/users/:userId', (req, res) => {
    const params = qs.stringify({
        token: SLACK_TOKEN,
        user: req.params.userId,
    });

    axios.post('https://slack.com/api/users.info', params)
        .then(response => response.data)
        .then(data => apiUtil.respond(res, data))
        .catch(err => apiUtil.respond(res, null, 500, err.message));
});

//     {
//         giver: 'Ebru',
//         getter: 'Rui',
//         message: 'great job from the server!',
//         giverAvatarUrl: 'https://www.readersdigest.ca/wp-content/uploads/sites/14/2011/01/4-ways-cheer-up-depressed-cat.jpg'
//     },

// talks to our backend getting recorded shoutouts
api.get('/shoutouts', (req, res) => {
    const fakeData = [{"id":1,"created_at":"2018-09-24 20:10:13","updated_at":"2018-09-24 20:10:13","text":"@jlim bdfgfwfs","giver":"eyucesar","giver_id":"U7Z9DHB3M","receiver":"jlim"},{"id":2,"created_at":"2018-09-24 20:14:45","updated_at":"2018-09-24 20:14:45","text":"@mfleming for the awesome UI","giver":"eyucesar","giver_id":"U7Z9DHB3M","receiver":"mfleming"},{"id":3,"created_at":"2018-09-24 20:46:56","updated_at":"2018-09-24 20:46:56","text":"@rnakata blabla","giver":"eyucesar","giver_id":"U7Z9DHB3M","receiver":"rnakata"}];
    apiUtil.request({
        url: `${SHOUTOUTS_SERVER}/api/all`,
        method: 'GET',
    }).then(data => {
        console.log('response from shoutouts server', data)
        const formatted = data.map(so => {
            return {
                giver: so.giver,
                giverId: so.giver_id,
                getter: so.receiver,
                timestamp: so.created_at,
                message: so.text,
            };
        });

        apiUtil.respond(res, formatted);
    })
    .catch(err => apiUtil.respond(res, 
        fakeData.map(so => {
            return {
                giver: so.giver,
                giverId: so.giver_id,
                getter: so.receiver,
                timestamp: so.created_at,
                message: so.text,
            };
        })
    ));
});

module.exports = api;
