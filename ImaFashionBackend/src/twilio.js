const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

function mandarMensagem(body) {
  return client.messages.create({
    body,
    from: process.env.TWILIO_NUMBER,
    to: "+5562982520093",
  });
}

module.exports = { mandarMensagem };
