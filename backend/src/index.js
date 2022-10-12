const express = require('express');
const dayjs = require('dayjs');

const DEBUG = require('debug')('index')

const app = express();
const port = 8080; // default port to listen

const DayNames = [
  "", // make these work 1-based
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]
const MonthNames = [
  "", // make these work 1-based
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

// default home page: show current month
app.get("/", (req, res) => {
  DEBUG('/');
  res.send(showMonth(0, 0, true));
});

// show desired year
app.get('/year', async function(req, res) {
  const y = Number(req.query.y);
  DEBUG('/year: y=%d', y);
  res.send(showYear(y));
});

// show desired month
app.get('/month', async function(req, res) {
  const y = Number(req.query.y);
  const m = Number(req.query.m);
  DEBUG('/month: y=%d, m=%d', y, m);
  res.send(showMonth(y, m, true));
});

// show desired day
app.get('/day', async function(req, res) {
  let y = req.query.y;
  let m = req.query.m;
  let d = req.query.d;
  DEBUG('/day: y=%d, m=%d, d=%d', y, m, d);
  res.send('NOT IMPLEMENTED');
});

function showYear(y) {
  let grid = '';
  let m = 0;
  grid += "<div>";
  grid += `<table border=3 style='border-collapse:collapse'>`;
  grid += '<tr>';
  grid += `<td style='text-align:left; border-right:none; background-color: #FFE4E1;'>`;
  grid += `<a style='text-decoration:none; color:#FF00FB;' title='${y - 1}' href='/year?y=${y - 1}'>◀</a>`;
  grid += `</td>`;
  grid += `<td colspan=2 style='border-left: none; border-right: none;'><div style='text-align:center; font-size:200%; background-color: #FFE4E1;'>${y}</div></td>`;
  grid += `<td style='text-align:right; border-left:none; background-color: #FFE4E1;'>`
  grid += `<a style='text-decoration:none; color:#FF00FB;' title='${y + 1}' href='/year?y=${y + 1}'>▶</a>`;
  grid += `</td>`
  grid += '</tr>';

  for (let r = 0; r < 3; ++r) {
    grid += '<tr>';
    for (let c = 0; c < 4; ++c) {
      ++m;
      let month = showMonth(y, m, false);
      grid += `<td style='border:none; vertical-align: top;'>${month}</td>`;
    }
    grid += '</tr>';
  }
  grid += '</table>';
  grid += "</div>";
  return grid;
}

function showMonth(y, m, alone) {
  let grid = '';
  const today = dayjs()
  if (!y) y = today.year();
  if (!m) m = today.month() + 1;
  const date = dayjs(`${y}-${m}-01`, 'YYYY-MM-DD');
  let dow = date.day(); // 0: Sun, 1: Mon, ..., 6: Sat
  if (dow == 0) {
    dow = 7 // 7: Sun, 1: Mon, ..., 6: Sat
  }
  const eom = date.endOf('month').date()
  let pos_week = 0;
  let pos_month = 2 - dow;
  if (alone) {
    grid += "<div style='width: 750px; height: 500px; position: absolute; top:0; bottom: 0; left: 0; right: 0; margin: auto;'>";
  } else {
    grid += "<div>";
  }
  if (alone) {
    grid += "<table border=3 class='center' style='border-collapse:collapse; table-layout:fixed; width: 750px; font-size:300%;'>"
  } else {
    grid += "<table border=3 class='center' style='border-collapse:collapse; font-size:150%;'>"
  }
  const dprev = date.subtract(1, 'month').endOf('month');
  let py = dprev.year();
  let pm = dprev.month() + 1;
  let pd = dprev.date();
  const dnext = date.add(1, 'month').startOf('month');
  let ny = dnext.year();
  let nm = dnext.month() + 1;

  grid += "<tr>"
  if (alone) {
    grid += `<td style='text-align:left; border-right:none; background-color: #F5FFFA;'>`;
    grid += `<a style='text-decoration:none; color:#FF00FB;' title='${y - 1}' href='/month?y=${y - 1}&m=${m}'>◀</a> <a style='text-decoration:none; color:#730BD9;' title='${MonthNames[pm]}' href='/month?y=${py}&m=${pm}'>◂</a>`;
    grid += `</td>`;
    grid += "<td colspan=2 style='text-align:center; font-size:80%; border:none; font-weight: bold; background-color: #F5FFFA;'>"
    grid += `${MonthNames[m]}`;
    grid += "</td>"
    grid += "<td style='text-align:center; border:none; font-weight: bold; background-color: #F5FFFA;'>"
    grid += `<a style='text-decoration:none; color:#FF00FB;' title='Today' href='/month?y=${today.year()}&m=${today.month() + 1}'>🎯</a>`;
    grid += "</td>"
    grid += "<td colspan=2 style='text-align:center; font-size:80%; border:none; font-weight: bold; background-color: #F5FFFA;'>"
    grid += `<a href='/year?y=${y}'>${y}</a>`;
    grid += "</td>"
    grid += `<td style='text-align:right; border-left:none; background-color: #F5FFFA;'><a style='text-decoration:none; color:#730BD9;' title='${MonthNames[nm]}' href='/month?y=${ny}&m=${nm}'>▸</a> <a style='text-decoration:none; color:#FF00FB;' title='${y + 1}' href='/month?y=${y + 1}&m=${m}'>▶</a>`;
    grid += `</td>`
  } else {
    grid += "<td colspan=7 style='text-align:center; font-size:80%; border:none; font-weight: bold; background-color: #F5FFFA;'>"
    grid += `<a href='/month?y=${y}&m=${m}'>${MonthNames[m]}, ${y}</a>`;
    grid += "</td>"
  }
  grid += "</tr>"

  grid += "<tr>"
  for (let d = 1; d <= 7; ++d) {
    grid += "<td style='text-align:center; font-weight: bold; font-size:70%; background-color:#FFF5EE'>"
    grid += DayNames[d].slice(0, 3);
    grid += "</td>"
  }
  grid += "</tr>"

  grid += "<tr>"
  while (true) {
    let content = '&nbsp;';
    let style = 'text-align:center;';
    if (pos_month < 1) {
      content = pd + pos_month;
      style += ' background-color:#F5F5F5; color:#787878;'
    } else if (pos_month > eom) {
      content = pos_month - eom;
      style += ' background-color:#F5F5F5; color:#787878;'
    } else {
      content = pos_month;
      style += ' color:#191970;'
      const current = date.date(pos_month)
      if (current.isSame(today, 'date')) {
        // today
        style += ' background-color:#EEFCBD;'
      } else if (pos_week == 5 || pos_week == 6) {
        // Sat or Sun
        style += ' background-color:#A5F0E7A0;'
      }
    }
    grid += `<td><div style='${style}'>${content}</div></td>`;
    ++pos_week;
    ++pos_month;
    if (pos_week == 7) {
      if (pos_month > eom) {
        break;
      }
      pos_week = 0;
      grid += '</tr><tr>';
    }
  }
  grid += "</tr>"
  grid += "</table>"
  grid += "</div>";
  return grid;
}


// start the Express server
app.listen(port, () => {
  DEBUG('server started at http://localhost:%d', port);
});
