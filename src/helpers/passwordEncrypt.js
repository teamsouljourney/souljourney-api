"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// passwordEncrypt():

const { 
    crypto, 
    SECRET_KEY: keyCode, 
    LOOP_COUNT: loopCount, 
    CHAR_COUNT: charCount, 
    ENC_TYPE: encType 
} = {
    crypto: require('node:crypto'),
    ...process.env
};

const loopCountNum = Number(loopCount);
const charCountNum = Number(charCount);



module.exports = (password) => {

    return crypto.pbkdf2Sync(password, keyCode, loopCountNum, charCountNum, encType).toString('hex')
}

