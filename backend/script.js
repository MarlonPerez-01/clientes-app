// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectsToCsv = require('objects-to-csv');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

connection.query(
  'select * from cliente inner join direccion d on cliente.id = d.clienteId inner join documento d2 on cliente.id = d2.clienteId',
  function (error, results) {
    if (error) throw error;

    new ObjectsToCsv(results).toDisk('./reporte-script.csv', {
      allColumns: true,
    });
  },
);

connection.end();
