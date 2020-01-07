const fs = require('fs');
const path = require('path');

//initial config
const config = require('./config.json');

const servers = config.servers;

//  fs.readFile(filePath, (err,buff) =>{

//     if(err)
//     {
//         console.log(err);
//     }
//     const newData = buff.toString().replace("DataCenterHint=default","DataCenterHint=cus");

//     fs.writeFile("temp.txt",newData, (err) =>{

//         if(err)
//         {
//             console.log(err);
//         }
//         console.log("file written");
//     })
// })

// fs.writeFile("temp.txt",data, (err) =>{

//     if(err)
//     {
//         console.log(err);
//     }
//     console.log("file written");
// })