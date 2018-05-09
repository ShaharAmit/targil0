const express = require('express'),
    eventsConfig = require('./config.js'),
    bodyParser = require('body-parser'),
    config = require('./config.js').events,
    app = express(),
    //port = process.env.PORT || 8080;
    //so the call to server will work as expected since it's local server
    port = 8080,
    votesModule = require('./votesModule.js'),
    votes = new votesModule();
    let request='';
    let messages='';

    //emitter listeneres (not really needed in this kind of app)
    votes.on(config.ADDVOTE,() => {
        votes.addVote(request)
    });
    votes.on(config.ADDTOVOTE,() => {
        votes.addToVote(request)
    });
    votes.on(config.PRINTVOTE,() => {
        votes.printVote(request)
    });
    votes.on(config.RESETVOTE,() => {
        votes.resetVote(request)
    });

    //app parser
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    //app event listeners and emitter fire
    app.post(config.ADDVOTE,(req,res) => {
        request = req.body;
        votes.emit(config.ADDVOTE);
        messages += votes.getMessage();
        res.send(votes.getMessage());
    });
    app.post(config.ADDTOVOTE, (req,res) => {
        request = req.body;
        votes.emit(config.ADDTOVOTE);
        messages += votes.getMessage();
        res.send(votes.getMessage());
    });
    app.post(config.PRINTVOTE, (req,res) => {
        request = req.body;
        votes.emit(config.PRINTVOTE);
        messages += votes.getMessage();
        res.send(votes.getMessage());
    });
    app.post(config.RESETVOTE, (req,res) => {
        request = req.body;
        votes.emit(config.RESETVOTE);
        messages += votes.getMessage();
        res.send(votes.getMessage());
    });
    app.all('*', (req,res) => {
        messages += votes.getMessage();
        res.send(messages);
    });

    app.listen(port);
    console.log(`listening on port ${port}`);