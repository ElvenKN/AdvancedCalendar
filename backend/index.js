const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

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

  let grid = `
<p>October 2022</p>
<table border=1>
 <tr>
  <td>Mon</td>
  <td>Tue</td>
  <td>Wed</td>
  <td>Thu</td>
  <td>Fri</td>
  <td>Sat</td>
  <td>Sun</td>
 </tr>
 <tr>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>1</td>
  <td>2</td>
 </tr>
 <tr>
  <td>3</td>
  <td>4</td>
  <td>5</td>
  <td>6</td>
  <td>7</td>
  <td>8</td>
  <td>9</td>
 </tr>
 <tr>
  <td>10</td>
  <td>11</td>
  <td>12</td>
  <td>13</td>
  <td>14</td>
  <td>15</td>
  <td>16</td>
 </tr>
 <tr>
  <td>17</td>
  <td>18</td>
  <td>19</td>
  <td>20</td>
  <td>21</td>
  <td>22</td>
  <td>23</td>
 </tr>
 <tr>
  <td>24</td>
  <td>25</td>
  <td>26</td>
  <td>27</td>
  <td>28</td>
  <td>29</td>
  <td>30</td>
 </tr>
 <tr>
  <td>31</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
 </tr>
</table>
`;
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


// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
