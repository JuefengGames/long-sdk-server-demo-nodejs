/**
 * Token verification operation will be triggered immediately
 * after the player logs in the game to verify the reliability of the login information
 * Developer --> JuefengGames
 */
const axios = require("axios");
const crypto= require("crypto");

const userCheck = async (objs) => {
    const url = `http://g02.api.yiigames.com/api/cp/user/check`;
    let app_id = 81193;
    let mem_id = 92362503;
    let user_token = "JFMIXTK_2040618_80656_53650074";
    const SERVER_KEY = "BD6A0AA04393CD9075CFFBFDA3B1C4C8"; // replace your SERVER_KEY  Which from Juefeng Games;
    let sign = "";
    let sourceStr = "app_id="+app_id+"&mem_id="+mem_id+"&user_token="+user_token+"&app_key="+SERVER_KEY;
    //console.log("before sourceStr ="+sourceStr);
    sign = crypto.createHash('md5').update(sourceStr).digest('hex');
    //console.log("after sign ="+sign);
    const formData = new FormData();
    formData.append('app_id', app_id);
    formData.append('mem_id', mem_id);
    formData.append('user_token', user_token);
    formData.append('sign', sign);
    const res = await axios({
        url,
        method: 'post',
        data: formData,
    }).then((response) => {
        console.log('success result:' + JSON.stringify(response.data));
    }).catch(e=>{
        console.error('error result:' + response);
    });
};

userCheck();