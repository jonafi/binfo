const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


let Parser = require('rss-parser');
let parser = new Parser();

let grabData = async (day)=> {
    let output = [];
    let feed = await parser.parseURL(`http://apps.ci.minneapolis.mn.us/CalendarApp/Ex_CalendarRSS.aspx?linkurl=http://www.ci.minneapolis.mn.us/government/calendars.asp&datebook=Garbage%20and%20Recycling%20` + day + `%20Route%20CD&type=rss`);
    for (let i = 0; i < 5; i++) {
      output.push(feed.items[i].title)
    }
    let data = {output};
    console.log(data);
    return data; 


};
 


app.get("/rss", async (req, res) => {
  
res.json(await grabData("Tuesday"))

});



// Listen on port 3000
app.listen(3000, () => {
  console.log("App running on port 3000!");
});
