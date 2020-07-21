const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


let Parser = require('rss-parser');
let parser = new Parser();

let grabData = async (day,service)=> {
    let output = [];
    let urlRequested;
    if(service === "Recycling"){
       urlRequested = `http://apps.ci.minneapolis.mn.us/CalendarApp/Ex_CalendarRSS.aspx?linkurl=http://www.ci.minneapolis.mn.us/government/calendars.asp&datebook=Garbage%20and%20Recycling%20` + day + `%20Route%20CD&calendar=Recycling%20Calendar%20(Wed%20CD)&type=rss`;
    }
    else{
       urlRequested = `http://apps.ci.minneapolis.mn.us/CalendarApp/Ex_CalendarRSS.aspx?linkurl=http://www.ci.minneapolis.mn.us/government/calendars.asp&datebook=Garbage%20and%20Recycling%20` + day +`%20Route%20CD&calendar=Garbage%20Calendar%20(`+ day + `)&type=rss`; 
    }
   
    let feed = await parser.parseURL(urlRequested);
    console.log(urlRequested);
       
    
    for (let i = 0; i < feed.items.length; i++) {
        output.push(feed.items[i]);
    }
    let data = {output};
    console.log(data);
    return data; 


};
 


app.get("/rss/:day/:service", async (req, res) => {
  
res.json(await grabData(req.params.day, req.params.service))

});



// Listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});
