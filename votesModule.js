const config = require('./config.js').events
    events = require('events');

module.exports = class votes extends events.EventEmitter {
    constructor() {
        super();
        this.votes = [];
        this.message = '';
    }

    addVote(vote) {
        if(this.votes.hasOwnProperty(vote.voteName)) {
            this.message = '\n' + vote.voteName + ' already exist';
        } else {
            this.votes[vote.voteName] = {
                members: vote.members
            }
            for(let i=0; i<vote.participants; i++) {
                this.votes[vote.voteName][vote['partiName'+i]] = 0;
            }
            this.message = '\nvote: ' + vote.voteName + ' created';
        }
        console.log(this.message + '\n');
    }
    addToVote(vote) {
        try {
            if(this.votes.hasOwnProperty(vote.voteName)) {
                this.message = '\n' + vote.voteName + ' vote exist';
                if (this.votes[vote.voteName].hasOwnProperty(vote.vote)) {
                    this.message += '\n' + vote.vote + ' participant exist';
                    if (vote.increase) {
                        this.message += '\nchecking to increase by: ' + vote.increase;
                        if(Number(vote.increase)+this.votes[vote.voteName][vote.vote] <= this.votes[vote.voteName]['members']) {
                            this.votes[vote.voteName][vote.vote] += Number(vote.increase);
                            this.message += '\n' + vote.vote + ' increased succesfully by: ' +vote.increase;
                        } else {
                            this.message += '\nillegale vote - too many members voted'
                        }
                    } else {
                        this.message += '\nno vote increasment';
                    }
                } else {
                    this.message += '\n' + vote.vote + ' does not exist';
                }
            } else {
                this.message += '\n' + vote.voteName + ' does not exist';
            }
        } catch (err) {
            this.message += '\n' + err;
        }
        console.log(this.message + '\n');
    }
    printVote(vote) {
        if(this.votes.hasOwnProperty(vote.voteName)) {
            this.message = '\n' + vote.voteName + ' vote exist';
            this.message += '\n' + JSON.stringify({[vote.voteName]: this.votes[vote.voteName]});
        } else {
            this.message += '\n' + vote.voteName + ' not exist';
        }
        console.log(this.message + '\n');
    }
    resetVote(vote) {
        if(this.votes.hasOwnProperty(vote.voteName)) {
            this.message = '\n' + vote.voteName + ' vote exist';
            for(const participant in this.votes[vote.voteName]) {
                if(participant!=='members') {
                    this.votes[vote.voteName][participant] = 0;
                }
            }
            this.message += '\n' + vote.voteName + ' vote has been reset';
        } else {
            this.message += '\n' + vote.voteName + ' not exist';
        }
        console.log(this.message + '\n');
    }
    getMessage() {
        return this.message;
    }
}