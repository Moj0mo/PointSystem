const { request, response } = require("express");

//Users total points
let totalPoints = 0;
//Dictionary of payers and their points
let payers = {};
//Transaction history
let transactions = [];

module.exports.retrievePoints = (request, response) => {
    response.status(200).json({
        totalPoints: totalPoints
    });
};

module.exports.retrievePayerBalance = (request, response) => {
    response.status(200).json(payers);
};

module.exports.addPointsToPayer = (request, response) => {
    let { payer, points } = request.params;
    //Attempt to convert the points to an integer, if it fails, return an error
    points = parseInt(points);
    if (isNaN(points)) {
        response.status(400).json({
            error: "Points must be a number"
        });
    } else {
        if (payer in payers) {
            payers[payer] += points;
        } else {
            payers[payer] = points;
        }
        //Increase user's total points
        totalPoints += points;
        //Add transaction to history
        addTransaction(payer, points);
        response.status(200).json({
            message: "Points added successfully",
            payers: payers,
            totalPoints: totalPoints
        });
    };
};

module.exports.removePointsFromPayer = (request, response) => {
    let { payer, points } = request.params;
    //Attempt to convert the points to an integer, if it fails, return an error
    points = parseInt(points);
    if (isNaN(points)) {
        response.status(400).json({
            error: "Points must be a number"
        });
    }
    //Verify payer exists
    if (payer in payers) {
        //Verify payer has enough points
        if (payers[payer] >= points) {
            payers[payer] -= points;
            totalPoints -= points;
            //Add transaction to history
            addTransaction(payer, -points);
            response.status(200).json({
                message: "Points removed successfully",
                payers: payers,
                totalPoints: totalPoints
            });
        } else {
            response.status(400).json({
                error: "Payer does not have enough points"
            });
        }
    } else {
        response.status(400).json({
            error: "Payer does not exist"
        });
    }
};

module.exports.spendPoints = (request, response) => {
    let points = request.body.points;
    if (isNaN(points)) {
        response.status(400).json({
            error: "Points must be a number"
        });
        return;
    }
    //Verify points are positive
    else if (points < 0) {
        response.status(400).json({
            error: "Points to spend must be positive"
        });
        return;
    }
    else if (points > totalPoints) {
        response.status(400).json({
            error: "Not enough points to spend"
        });
        return;
    };
    //Subtract points from total points
    totalPoints -= points;

    //To sift through transactions by oldest
    let index = 0;
    spendTransaction = [];
    while (points > 0) {
        //If points are less than total spend amount and payer has enough total points to pay
        if (transactions[index].points < points && payers[transactions[index].payer] > 0) {
            //Check if payer has already paid points towards this transaction
            let transactionIndex = spendTransaction.findIndex(x => x.payer === transactions[index].payer);
            if (transactionIndex !== -1) {
                //If they have, add the points to the transaction
                spendTransaction[transactionIndex].points += -transactions[index].points;
                //Remove these points from payer balance
                payers[transactions[index].payer] -= transactions[index].points;
            } else {
                //If they haven't, add the points to the transaction
                spendTransaction.push({
                    payer: transactions[index].payer,
                    points: -transactions[index].points
                });
                payers[transactions[index].payer] -= transactions[index].points;
            }
            //Subtract points from payer at transaction
            points -= transactions[index].points;
        } else if (transactions[index].points >= points && payers[transactions[index].payer] > 0) {
            spendTransaction.push({
                payer: transactions[index].payer,
                points: -points
            });
            payers[transactions[index].payer] -= points;
            points = 0;
        };
        index++;
    };
    //Merge our transactions so they form nicely on the transaction report
    for (let i = 0; i < spendTransaction.length; i++) {
        let key = spendTransaction[i].payer;
        for (let j = i + 1; j < spendTransaction.length - i; j++) {
            if (spendTransaction[j].payer === key) {
                spendTransaction[i].points += spendTransaction[j].points;
                spendTransaction.splice(j, 1);
                j--;
            };
        };
    };
    //Add a transaction for each payer that just spent points
    for (item in spendTransaction) {
        addTransaction(spendTransaction[item].payer, spendTransaction[item].points);
    };
    response.status(200).json(spendTransaction);
};

module.exports.getTransactions = (request, response) => {
    response.status(200).json({
        transactions: transactions
    });
};

function addTransaction(payer, points) {
    const currentDate = new Date().toISOString();
    transactions.push({
        payer: payer,
        points: points,
        timestamp: currentDate
    });
}