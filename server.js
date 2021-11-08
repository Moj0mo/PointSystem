const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/points.route')(app);

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});