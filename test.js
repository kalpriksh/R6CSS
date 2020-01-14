const fs = require('fs')
const initialConfig = require('./init.json');
let newData;
let config;
    //  var promise = new Promise((res,rej) => {

    //     let newData;        
        fs.readFile('path.txt', (err, buff) => {
            if(err){
                console.log(err);
                
            } else {
                const lines = buff.toString().split(/\r?\n/);
                lines.forEach(line => {
                    if(line.indexOf(`path:`)>=0){
                        newData = line.replace(`path:`,'');
                    }                    
                });
            }
            config = {servers: initialConfig.servers, path: newData}
            // res();
        })
    // })

    // promise.then(() => {
    //     console.log(config);
    // })

