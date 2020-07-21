let Parser = require('rss-parser');
let parser = new Parser();

const grabData = async (day)=> {
    let output = [];
    let feed = await parser.parseURL(`http://apps.ci.minneapolis.mn.us/CalendarApp/Ex_CalendarRSS.aspx?linkurl=http://www.ci.minneapolis.mn.us/government/calendars.asp&datebook=Garbage%20and%20Recycling%20` + day + `%20Route%20CD&type=rss`);
    for (let i = 0; i < 5; i++) {
      //  console.log(feed.items[i].title)
      output.push(feed.items[i].title)
    }
    console.log(output);
return(output);
};


grabData("Tuesday");