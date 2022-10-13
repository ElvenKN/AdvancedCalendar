const dayjs = require('dayjs');
const sqlite = require('better-sqlite3');
const DEBUG = require('debug')('data')

const db = sqlite('./data/calendar.db');

function getHomework(user, date) {
  const sod = date.startOf('date').unix();
  const eod = date.endOf('date').unix();
  const sql = 'select U.name as user, S.name as subject, H.due, H.description from homeworks H join users U on H.user_id = U.id join subjects S on H.subject_id = S.id where H.user_id = ? and H.due between ? and ? order by H.due';
  const stmt = db.prepare(sql);
  const rows = stmt.all(user, sod, eod);
  for (let row of rows) {
    const d = dayjs.unix(row.due);
    row['date'] = d.format('DD/MMM/YYYY');
    row['time'] = d.format('HH:mm');
  }
  DEBUG(rows);
  return rows;
}

module.exports = { getHomework };
