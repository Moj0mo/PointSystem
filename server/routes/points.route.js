const PointController = require('../controllers/points.controller');
//App routes here
module.exports = function(app) {
    app.get('/', PointController.retrievePoints);
    app.get('/balance', PointController.retrievePayerBalance);
    app.post('/add/:payer/:points', PointController.addPointsToPayer);
    app.post('/remove/:payer/:points', PointController.removePointsFromPayer);
    app.get('/transactions', PointController.getTransactions);
    app.post('/spend', PointController.spendPoints);
};