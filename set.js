const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOElIN29DYjFKNHA2bnQzNXBqSnBtS3hzalQyWGFXWjNqaDYrUGhDV1FYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0J5UVUralp2OUM5Q2JITFJBb2lZWi9iYmg5b0hVd2ZGR1g1a1N2MUNYND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4TjNKZDBZbE9XN2RXZGdxWTd2MUNRNTd2ZThUcG1WSjJMK0xCUUV0SEh3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRzFOTUpJNDFnT0NmUE5zYjQ3TWNBWWsrNlp6UHgvV2JhN0Fua2UvMHhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdOVEt6alIvQ0pwRE4ySUQ4UXBEc2xWbFpPRHI4MVN2cHZSOStHQmxQWG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImI5UFFsNXJhNDVRdnZUSnFmeHE4WmdRcjA5cjJ0U1lhYUUxQU9GL1pUZ2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU55U0F1dmdMMWtqMU1mNGwzc3BUc1J6TC8raU0xb0FxTGZSZnQ1a2dtMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVRzZkUwQWIxbGFibC9yUmZCS2FSNVE5dVNuVUlNdHFoMzFqY2pEVE1sWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InkyQVFqaFJIMGZRVXBpZ2dtVTk5S213YUo4c2JGL093dVpYamJ4SGVJWlZUaDRSL1NUTFNvOXB5TzI3eHZHWDV4VDdLWkgzS1dtb05lYmFZSVNFVWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJHRCt2VkM2RU9jRHNvTldnRGJTN3h0Sm9qRnJjMHlrZCtVU0l4NXVEaUlNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJGNnlmb3RDdlFtS1dDVkdUbGdzSmlnIiwicGhvbmVJZCI6IjA2ZWIzM2FlLTc5ODItNDcxNi05ZGEzLWU5NGVkODNlMWQ0YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1VTkrSUZGK2FvNjJMcU93VlpPU1hnVGt1NlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVozbkExcGhzSjhId1BzV29Sd0VvL3haRzhjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRBU01GSFZBIiwibWUiOnsiaWQiOiIyNTU3MTEzODQwMjY6NzdAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09YVDA5MEJFTDd1d0xnR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlR1ODRZR2xFbnhwdU5lMnRHUnd3MnhtM2QwT3RyaDRyRGs3UnN4S0NTZ009IiwiYWNjb3VudFNpZ25hdHVyZSI6IlFYeXg1TUt6VFliWFEzdTB4TE5xNU9UMnhNTUd5bU52Y3ZPZ25qdVNidHJadytBNVhhd2VIT0JSTUdRR3pBc3R3V3VUVlBuRWFuMFU1WHpQNXBZekFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDMXVtblhmdTZDL3ZVdy9zRDZINldERk42KzRpdmZvWkF5NXF1Q25xeDQ0R2duVGc3VnFxN3IvdlJIZUkyaXVKLy9sbTd3SHloN2hBd096WmhSQytnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTcxMTM4NDAyNjo3N0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVN3ZPR0JwUko4YWJqWHRyUmtjTU5zWnQzZERyYTRlS3c1TzBiTVNna29EIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI5MTE1OTc5LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFTQSJ9',
    PREFIXE: process.env.PREFIX || ",",
    OWNER_NAME: process.env.OWNER_NAME || "ERICK BENRIGHT",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255711384026",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BENRIGHT_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '4' ,
    ETAT : process.env.PRESENCE || 'recording',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
