const express = require('express');
const path = require('path');
const ProductService = require('../services');
const { strings } = require('../utils/lang/es');

const usersRouter = router => {
    router.get('/users', (req, res) => {
        res.send(`route - users`);
    });
};

module.exports = usersRouter;