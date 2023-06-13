async function connect() {
    if (global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: '192.168.18.20',
            user: 'donarosa',
            password: 'd4321',
            database: 'donarosa'
        }
    );
    global.connection = connection;
    return connection;
}

module.exports = { connect }
