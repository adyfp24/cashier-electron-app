const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
const PORT = 5500;
const server = app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));

module.exports = server;