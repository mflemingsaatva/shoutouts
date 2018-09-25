
const { Router } = require('express');
const api = Router();
const qs = require('querystring');
const axios = require('axios');
const textToSpeech = require('@google-cloud/text-to-speech');
const path = require('path');
const fs = require('fs');
const Lame = require('node-lame').Lame;
const client = new textToSpeech.TextToSpeechClient();
const { SLACK_TOKEN, SHOUTOUTS_SERVER, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
const stream = require('stream');
const exec = require('child_process').exec;
// const googleAuthPath = path.join(__dirname, GOOGLE_APPLICATION_CREDENTIALS);

const apiUtil = require('../util/api.util');
const wav = require('node-wav');
api.get('/read', (req, res) => {
    if (!req.query.text) return apiUtil.respond(res, null, 0, 'text query required');

    const request = {
        input: { text: req.query.text },
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'},
    };

    client.synthesizeSpeech(request, (err, response) => {
        if (err) return apiUtil.respond(res, null, 0, err.message);
        // const result = wav.decode(response.audioContent);
        // wav.encode(result.channelData, { sampleRate: result.sampleRate, float: true, bitDepth: 32 });
        const txtFile = path.join(__dirname, `../text/test.txt`);
        const audioFile = path.join(__dirname, `../audio/test.mp3`);
        fs.writeFile(
            txtFile, 
            response.audioContent,
            (err) => {
                if (err) return apiUtil.respond(res, null, 0, err.message);
                const base64js = require('base64-js');
                const byteArray = base64js.toByteArray(fs.readFileSync(txtFile, 'base64'));
                fs.writeFileSync(audioFile, byteArray);
                return apiUtil.respond(res, 'test.mp3');
            }
        );
        // return apiUtil.respond(res, response.audioContent.toString('base64'));

        // const pathToSound = path.join(__dirname, `audio/${new Date()}.wav`);
        // const bufferStream = new stream.PassThrough();
        // bufferStream.end(response.audioContent.data);
        // bufferStream.pipe(process.stdout);
        // bufferStream.on('end', () => console.log('frig'))
        // bufferStream.on('error', (e) => console.log(e))
        // return;
    });

});

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
