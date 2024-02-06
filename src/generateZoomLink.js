// With Node js
// Generate Token
require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");


router.get('/accessToken',async (req,res)=>{
    const code = req.query.code;

    console.log({code})

    try{
        const response = await axios.post('https://zoom.us/oauth/token',null,{
            params:{
                grant_type: 'authorization_code',
                code:code,
                redirect_uri: "http://localhost:5005/meeting/accessToken/"
            },
            headers:{
                'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
            }
        });
        res.send(response.data.access_token);    
    }catch(error){
        console.error('Error',error);
        res.send('Error');
    } 
});

module.exports = router


// How to Access on Frontend side(but here handling inside node.js)

const axios = require("axios");


async function createZoomMeetingUrl(meetingDetails) {
    const zoomToken = process.env.MEETING_TOKEN;

    try {
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', meetingDetails, {
            headers: {
                'Authorization': `Bearer ${zoomToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log({check: response.data})
        return response.data;
    } catch (error) {
        throw new Error('Error creating Zoom meeting: ' + error.response.data.message);
    }
}


module.exports = { createZoomMeetingUrl };
// .env configration
ZOOM_API_KEY="vJm4W1xDTNKZQqqlFPxNrw"
ZOOM_API_SECRET="I2Mh9Qz3hrjquW4EFqqECPSvviE3qWMG"
MEETING_TOKEN="eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjVlZTI5NjE3LTJlNWItNDI4Yi1hOGNmLWE5MDkxNTI2N2E2YiJ9.eyJ2ZXIiOjksImF1aWQiOiJmODI4ZTEwZjQxMDhjZTc4OWVlYTk2YzM5NjIzZTBkNSIsImNvZGUiOiIzdnhYWVphbnNKS3poRlFjQ2tkUjJxUTh6TXVYMUJfcnciLCJpc3MiOiJ6bTpjaWQ6dkptNFcxeERUTktaUXFxbEZQeE5ydyIsImdubyI6MCwidHlwZSI6MCwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJyVkVFMGNGRFRFdXhGU0FLMUJqUXNBIiwibmJmIjoxNzA3MTk4ODIzLCJleHAiOjE3MDcyMDI0MjMsImlhdCI6MTcwNzE5ODgyMywiYWlkIjoiX0VGSkdMbEdTb1dGRDZiRXlpRFlyZyJ9.GVtWsgujSZmlqX9oj1YNqKL8rSCpEAVK39Q-UOT4DQpbMwB5blLfD9vGdmqTuGsyQQRxOKNqVA255QEq1wLxpg"

