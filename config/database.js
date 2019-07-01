// PostgreSQL database driver
// http://vitaly-t.github.io/pg-promise/index.html
const initOptions = {
    // pg-promise initialization options...
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }
};
const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://dormyuser:@localhost:5432/csc675');

db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });

// const db = pgp(
//     {
//         user: 'csc648',
//         host: 'dormydb.c9dmsmsbcumm.us-west-1.rds.amazonaws.com',
//         port: 5432,
//         database: 'dormyDB',
//         user: 'csc648',
//         password: 'P305kscc'
//     }
// );

module.exports = db;
