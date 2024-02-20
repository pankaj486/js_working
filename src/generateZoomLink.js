// With Node js
// Generate Token
// Server-to-server oAuth

const axios = require("axios");
const qs = require('querystring');

async function getAccessToken() {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const tokenUrl = 'https://zoom.us/oauth/token';
  
    try {
      const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
      const requestData = {
        grant_type: 'account_credentials',
        account_id: process.env.ACCOUNT_ID,
      };
      const requestHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encodedCredentials}`,
      };

      const response = await axios.post(tokenUrl, qs.stringify(requestData), { headers: requestHeaders });
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error.response.data);
      throw error;
    }
  }

async function createZoomMeetingUrl(topic, startTime, duration) {
    const accessToken = await getAccessToken();
  
    const apiUrl = `https://api.zoom.us/v2/users/me/meetings`;
    const meetingData = {
      topic: topic,
      type: 2,
      start_time: startTime,
      duration: duration,
    };
  
    try {
      const response = await axios.post(apiUrl, meetingData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.join_url
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  }

module.exports = { createZoomMeetingUrl }

// .env configration
CLIENT_ID="Do0_Ej9TT9xwlDBFmg7ZA"
CLIENT_SECRET="XGauX82I2bJOMCbgBhjHF7Wo0ycO9MlG"
ACCOUNT_ID="_EFJGLlGSoWFD6bEyiDYrg"
