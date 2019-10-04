process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Tip:
// Brenchmarking the server:
// Use apache benchmark CLI ->
// $ ab -c 6 -n 6 http://localhost:3000/

// Is the file being executed in master mode?
if (cluster.isMaster) 
{
    // Cause index.js to be executed again, but in 
    // child/slave mode
    // The recommended number of slaves is equal to the number of
    // physical cores (or logical) of the CPU
    cluster.fork();
    cluster.fork();
}
else 
{
    // This process is a child, act like a server
    const express = require('express');
    const crypto = require('crypto');
    const app = express();   

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('hey');
        });
    })

    app.get('/fast', (req, res) => {
        res.send("That's fast");
    })

    app.listen(3000);
}