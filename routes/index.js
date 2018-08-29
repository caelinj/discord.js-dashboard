const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', { pageTitle: 'Dashboard', user: req.session.user || null });
});

module.exports = router;