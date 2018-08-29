const router = require('express').Router();

const { clientId, clientSecret, scopes, redirectUri } = require('../config.json');

router.get('/', (req, res) => {
    const authorizeUrl = `https://discordapp.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scopes.join('%20')}`;
    res.redirect(authorizeUrl);
});

router.get('/callback', (req, res) => {
    const accessCode = req.query.code;
    if (!accessCode) throw new Error('No access code returned frm Discord');

    res.send(`Success, got an access code.`);
});

module.exports = router;