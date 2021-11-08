# FetchRewards
A REST API created to handle GET/POST requests to described routes for reward's point management

## Dependencies
- [Node](https://nodejs.org/en/download/) - an open source development platform for executing JavaScript code server-side.
- [Express](https://expressjs.com) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [CORS](https://expressjs.com/en/resources/middleware/cors.html) - a mechanism to allow or restrict requested resources on a web server depend on where the HTTP request was initiated.
## How to install the project
**YOU MUST HAVE NODE INSTALLED PRIOR TO RUNNING THESE COMMANDS**
<br />
<br />
**1.** Clone the repository
<br />
```git clone https://github.com/rgalusha/FetchRewards.git ```
<br />
**2.** Enter the project's root directory
<br />
```cd FetchRewards```
<br />
**3.** Install dependencies
<br />
```npm install```
<br />
**4.** Run the server locally on port 8000
```node server.js```
<br />
Note: You may change the port the server runs on by changing the ```const port = 8000``` to whichever port you wish in the [server.js file](server.js)
<br />
## API Calls
This data is stored locally within the server in memory. Once the server restarts, data will be lost and required to be inputted again. Also, because this server acts as a REST API, you will need to utilize [Postman](https://www.postman.com/downloads/) to best visualize the results.
### Check User Point Balance
**How to Access** - *GET* http://localhost:8000/
<br />
This will display the user's total point balance from all payers.
### Check Payer's Point Balance
**How to Access** - *GET* http://localhost:8000/balance
<br />
This will display all the payers and their current point count for the user.
### Add Points to Payer Balance
**How to Access** - *POST* http://localhost:8000/payer/points
<br />
This will increase a payer's point balance by the specific points defined. This is done through the URL parameters, therefore you will have to replace *payer* with the name of the payer, and *points* with an integer value for points given.
### Remove Points from Payer Balance
**How to Access** - *POST* http://localhost:8000/payer/points
<br />
This will decress a payer's point balance by the specific points defined. This is also done through the URL parameters, therefore you will have to replace *payer* with the name of the payer, and *points* with an integer value for points removed from their balance.
### View Transaction Sheet
**How to Access** - *GET* http://localhost:8000/transactions
<br />
This will allow you to view the transaction sheet from spent points in ascending order, from oldest to most recent transaction.
### Spend User Point Balance
***How to Access** - *POST* http://localhost:8000/spend
<br />
**IMPORTANT**: With this call, you must parse a json object to the body of the request. This must look like ```{"points:" 1000}``` or you will receive HTTP 400 error with a corresponding error message.
