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

    fetch({
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
        req.session.DiscordAuth = response;
    });
});

module.exports = router;