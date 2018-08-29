const router = require('express').Router();

const { clientId, clientSecret, scopes, redirectUri } = require('../config.json');
const fetch = require('node-fetch');

router.get('/', (req, res) => {
    const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`;
    res.redirect(authorizeUrl);
});

router.get('/callback', (req, res) => {
    const accessCode = req.query.code;
    if (!accessCode) throw new Error('No access code returned frm Discord');

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
            scope: scopes.join('%20'),
            code: accessCode,
        },
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        fetch('https://discordapp.com/api/users/@me', {
            method: 'GET',
            headers: {
                authorization: `${response.token_type} ${response.access_token}`
            },
        })
        .then(res2 => res2.json())
        .then(userResponse => {
            req.session.user = userResponse;
            console.log(userResponse);
            res.redirect('/');
        });
    });
});

module.exports = router;