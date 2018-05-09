const http = require('http'),
    config = require('./config.js').events;
    querystring = require('querystring'),
    //not dynamic data (just for demonstration)
    laptopVotePost = querystring.stringify({
        voteName: 'laptop-companies',
        members: 5,
        participants: 3,
        partiName0: 'apple',
        partiName1: 'dell',
        partiName2: 'lenovo'
    }),
    addToVotePost = querystring.stringify({
        voteName: 'laptop-companies',
        vote: 'apple',
        increase:  3
    }),
    vote = querystring.stringify({
        voteName: 'laptop-companies',
    });
    //dynamic options
function options(path,size,method) {
    const opt = {
        hostname: 'localhost',
        port: '8080',
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': size
        }
    }
    return opt;
}

//httprequest as promsie
function httpRequest(params, postData) {
    return new Promise((resolve, reject) => {
        var req = http.request(params, (res) => {
            // reject on bad status
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            let serverData='';
            console.log(`\nSTATUS: ${res.statusCode}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                serverData += chunk;
            });
            res.on('end', () => {
                console.log(serverData);
                resolve(serverData);
            });
        });
        // reject on request error
        req.on('error', function(err) {
            reject(err);
        });
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
}
    //chaned promises
    httpRequest(options(config.ADDVOTE,laptopVotePost.length,'post'),laptopVotePost).then(() => {
        return httpRequest(options(config.ADDTOVOTE,addToVotePost.length,'post'),addToVotePost);
    }).then(() => {
        return httpRequest(options(config.ADDTOVOTE,addToVotePost.length,'post'),addToVotePost);
    }).then(() => {
        return httpRequest(options(config.PRINTVOTE,vote.length,'post'),vote);
    }).then(() => {
        return httpRequest(options(config.RESETVOTE,vote.length,'post'),vote);
    }).then(() => {
        return httpRequest(options(config.PRINTVOTE,vote.length,'post'),vote);
    });
