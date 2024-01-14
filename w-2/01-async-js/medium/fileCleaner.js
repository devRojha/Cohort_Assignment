const fs = require('fs');
var res = "";
fs.readFile("filecheck.txt" , "utf-8" ,function(err , data){
    if(err){
        console.error(err);
        return;
    }
    let i = 0;
    while(i < data.length){
        if(data[i] == " "){
            i++; 
            while(data[i] == " "){
                i+=1;
            }
            res += " ";
        }
        else{
            res += data[i];
            i++;
        }
    }
    res.trim();
    fs.writeFile("filecheck.txt", res , "utf-8", function(err){
        if(err){
            console.error(err);
            return;
        }
        console.log("file clear");
    })
})


//            hii    my name    is   devraj.             