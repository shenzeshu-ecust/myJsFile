 // Node.js 下有require
 const { rejects } = require('assert');
 let fs = require('fs')
 fs.readFile('./1-let.html', (err, data) => {
         if (err) throw err;
         console.log(data.toString());
     })
     // 使用Promise封装
 const p = new Promise((resolve, reject) => {
     fs.readFile('./22.html', (err, data) => {
         if (err) reject(err);
         resolve(data)
     })
 })
 p.then((value) => {
     console.log(value.toString());
 }, (err) => {
     console.log(err);
 })