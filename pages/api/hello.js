// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://twilio-sms.p.rapidapi.com/2010-04-01/Account',
  headers: {
    'X-RapidAPI-Key': 'f8c1533f81mshc1b6bd9178e235ep1c3040jsn20cf7c7a1f63',
    'X-RapidAPI-Host': 'twilio-sms.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});