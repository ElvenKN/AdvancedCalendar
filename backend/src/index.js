const express = require('express');
const dayjs = require('dayjs');

const DEBUG = require('debug')('index')

const app = express();
const port = 8080; // default port to listen

// default home page: show current month
app.get("/", (req, res) => {
  const today = dayjs()
  const y = today.year();
  const m = today.month() + 1;
  showMonth(res, y, m);
});

// show desired month
app.get('/month', async function(req, res) {
  const y = Number(req.query.y);
  const m = Number(req.query.m);
  showMonth(res, y, m);
});

function showMonth(res, y, m) {
  DEBUG('/month: y=%d, m=%d', y, m);

  let grid = createMonthGrid(y, m);
  res.send(grid);
}

// show desired day
app.get('/day', async function(req, res) {
  let y = req.query.y;
  let m = req.query.m;
  let d = req.query.d;
  DEBUG('/day: y=%d, m=%d, d=%d', y, m, d);

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
  const today = dayjs()
  let dow = date.day(); // 0: Sun, 1: Mon, ..., 6: Sat
  if (dow == 0) {
    dow = 7 // 7: Sun, 1: Mon, ..., 6: Sat
  }
  DEBUG('dow=%d', dow);
  const eom = date.endOf('month').date()
  const DayNames = [
    "",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  const MonthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let grid = '';
  let pos_week = 0;
  let pos_month = 2 - dow;
  grid += "<div style='width: 750px; height: 500px; position: absolute; top:0; bottom: 0; left: 0; right: 0; margin: auto;'>";
  grid += "<table border=3 class='center' style='border-collapse:collapse; table-layout:fixed; width: 750px; font-size:300%;'>"
  grid += "<tr>"
  let pm = m - 1;
  let py = y;
  if (pm == 0) {
    py -= 1
    pm = 12
  }
  let nm = m + 1;
  let ny = y;
  if (nm == 13) {
    ny += 1
    nm = 1
  }
  grid += `<td style='text-align:left; border-right:none;'><a style='text-decoration:none; color:#FF00FB;' title='${y - 1}' href='/month?y=${y - 1}&m=${m}'>◀</a> <a style='text-decoration:none; color:#730BD9;' title='${MonthNames[pm]}' href='/month?y=${py}&m=${pm}'>◂</a></td>`
  grid += "<td colspan=2 style='text-align:center; border:none; font-weight: bold;'>"
  grid += `${MonthNames[m]}`;
  grid += "</td>"
  grid += "<td style='text-align:center; border:none; font-weight: bold;'>"
  grid += `<a style='text-decoration:none; color:#FF00FB;' title='Today' href='/month?y=${today.year()}&m=${today.month() + 1}'>🎯</a>`;
  grid += "</td>"
  grid += "<td colspan=2 style='text-align:center; border:none; font-weight: bold;'>"
  grid += `${y}`;
  grid += "</td>"
  grid += `<td style='text-align:right; border-left:none;'><a style='text-decoration:none; color:#730BD9;' title='${MonthNames[nm]}' href='/month?y=${ny}&m=${nm}'>▸</a> <a style='text-decoration:none; color:#FF00FB;' title='${y + 1}' href='/month?y=${y + 1}&m=${m}'>▶</a></td>`
  grid += "</tr>"
  grid += "<tr>"
  for (let d = 1; d <= 7; ++d) {
    grid += "<td style='text-align:center;'>"
    grid += DayNames[d].slice(0, 3);
    grid += "</td>"
  }
  grid += "</tr>"
  grid += "<tr>"
  while (true) {
    let content = '&nbsp;';
    let style = 'text-align:center;';
    if (pos_month < 1) {
      style += ' background-color:#F5F5F5;'
    } else if (pos_month > eom) {
      style += ' background-color:#F5F5F5;'
    } else {
      content = pos_month;
      const current = date.date(pos_month)
      if (current.isSame(today, 'date')) {
        // today
        style += ' background-color:#EEFCBD;'
      } else if (pos_week == 5 || pos_week == 6) {
        // Sat or Sun
        style += ' background-color:#A5F0E7A0;'
      }
    }
    grid += '<td>'
    grid += `<div style='${style}'>`
    grid += content;
    grid += "</div>"
    grid += "</td>"
    ++pos_week;
    ++pos_month;
    if (pos_week == 7) {
      grid += '</tr>';
      pos_week = 0;
      if (pos_month > eom) {
        break;
      }
      grid += "<tr>"
    }
  }
  grid += "</table>"
  grid += "</div>";
  return grid;
}


// start the Express server
app.listen(port, () => {
  DEBUG('server started at http://localhost:%d', port);
});
