/**
 * Players purchase props in the game, and Juefeng Games will call this API after completing the payment.
 * For API-related parameters and signature rules, please check the API documentation.
 * JuefengGames --> Developer
 *
 */

const express = require('express');
const app = express();
const crypto = require('crypto');
app.use(express.urlencoded({ extended: true }));

app.post('/juefeng/callback', (req, res) => {
    const { amount, gameArea,gameRole,orderId,payTime,payWay,productDesc, productName ,remark,sign} = req.body;
    console.log(" Received Params ：orderId={}",req.body.orderId);
    const SERVER_KEY = "BD6A0AA04393CD9075CFFBFDA3B1C4C8"; // replace your SERVER_KEY  Which from Juefeng Games;
    let devSignStr =
        "amount="+amount+
        "&gameArea="+gameArea+
        "&gameRole="+gameRole+
        "&orderId="+orderId+
        "&payTime="+payTime+
        "&payWay="+payWay+
        "&productDesc="+productDesc+
        "&productName="+productName+
        "&remark="+remark+ SERVER_KEY;
    let mySign = crypto.createHash('md5').update(devSignStr).digest('hex');
    console.log(" mySign={}, juefengSign={} ,devSignStr={} ",mySign,sign,devSignStr);
    if (mySign!==sign){
        res.status(505).send('error sign');
        return;
    }
    /**
     *  business processing here
     *  check order and goods info.
     */
    res.status(200).send('success');
});

const PORT = 9000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});