const fs = require('fs');
str = 'this is the text writing by fs and understanding async function'
fs.readFile("4-write-to-file.md" , "utf8", function(err , data){
    if(err){
        console.error(err);
        return;
    }
    console.log(data);
    const update = data+str;
    fs.writeFile("4-write-to-file.md" , update , "utf-8", function(err){
        if(err){
            console.error(err);
            return;
        }
        console.log("file update succesfully");
    })
})
// fs.readFile("4-write-to-file.md" , "utf8", function(err , data){
//     if(err){
//         console.error(err);
//         return;
//     }
//     console.log(data);
// })
console.log("file updating.........");