const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const dayjs = require('dayjs');

const MoY = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DoW = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
  res.send("Hello nico!");
});

app.get("/bye", (req, res) => {
  res.send("Bye nico!");
});

app.get('/month', async function(req, res) {
  let y = req.query.y;
  let m = req.query.m;

  let grid = createMonthGrid(y, m);
  res.send(grid);
});

app.get('/day', async function(req, res) {
  let y = req.query.y;
  let m = req.query.m;
  let d = req.query.d;

  let grid = `
<p>Monday 10 October 2022</p>
<table border=1>
 <tr>
  <td>8:00</td>
  <td></td>
 </tr>
 <tr>
  <td>9:00</td>
  <td></td>
 </tr>
 <tr>
  <td>10:00</td>
  <td>History lesson</td>
 </tr>
 <tr>
  <td>11:00</td>
  <td></td>
 </tr>
 <tr>
  <td>12:00</td>
  <td></td>
 </tr>
 <tr>
  <td>13:00</td>
  <td></td>
 </tr>
 <tr>
  <td>14:00</td>
  <td></td>
 </tr>
 <tr>
  <td>15:00</td>
  <td></td>
 </tr>
 <tr>
  <td>16:00</td>
  <td></td>
 </tr>
</table>
`;
  res.send(grid);
});

function createMonthGrid(y, m) {
  const date = dayjs(`${y}-${m}-01`, 'YYYY-MM-DD');
  const dow = date.day(); // 0: Sun, 1: Mon, ..., 6: Sat
  const eom = date.endOf('month').date()

  let grid = '';
  let current = 2 - dow;
  let position = 0;
  grid += '<table border="1">'

  grid += `<tr><th colspan="7">${MoY[m - 1]}</th></tr>`

  grid += '<tr>'
  for (let d = 0; d < 7; ++d) {
    grid += `<th>${DoW[d].slice(0, 3)}</th>`
  }
  grid += '</tr>'

  grid += '<tr>'
  while (true) {
    grid += '<td style="text-align:center">'
    if (current < 1) {
      grid += '<';
    } else if (current > eom) {
      grid += '>';
    } else {
      grid += current;
    }
    grid += '</td>'

    ++current;
    ++position;
    if (position >= 7) {
      if (current > eom) {
        break;
      }
      grid += '</tr>';
      grid += '<tr>';
      position = 0;
    }
  }
  grid += '</tr>'
  grid += '</table>'

  return grid;
}


// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
