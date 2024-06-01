import axios from 'axios';
let TENANT_ID = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
let ACCESS_TOKEN;

// export const authenticateApp = async () => {
//   try {
//     const authResponse = await axios.post(
//       `https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a/oauth2/v2.0/token`,
//       {
//         client_id: '4e051f46-15a3-44c6-80f9-d8b8c1ae241e',
//         scope: 'https://graph.microsoft.com/.default',
//         redirect_uri: 'com.example.studyhub://auth',
//         client_secret: 'e0f42957-ef1f-48ac-b3c8-76c98dc5364b',
//         grant_type: 'client_credentials',
//       }
//     );
//     ACCESS_TOKEN = authResponse.data.access_token;
//   } catch (error) {
//     console.error('Error authenticating app:', error);
//   }
// };


export const createTeamsMeeting = async () => {
    try {
   //   await authenticateApp();

      const response = await axios.post(
        `https://graph.microsoft.com/v1.0/me/onlineMeetings`,
        {
        //  subject: 'Meeting Subject',
          startDateTime: new Date().toISOString(),
          endDateTime: new Date(new Date().getTime() + 3600 * 1000).toISOString(), // 1 hour duration
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${ACCESS_TOKEN}`,
        //   },
        // }
      );
      const meetingUrl = response.data.joinUrl;
      return meetingUrl;
    } catch (error) {
      console.error('Error creating Teams meeting:', error);
      return null;
    }
  };
  
// import axios from 'axios';

// const handleMeeting = async () => {
//   try {
//     const response = await axios.post(
//       `https://graph.microsoft.com/v1.0/me/onlineMeetings`,
//       {
//         startDateTime: new Date().toISOString(),
//         endDateTime: new Date(new Date().getTime() + 3600 * 1000).toISOString(), // 1 hour duration
//         subject: 'Meeting Subject',
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`, // Replace YOUR_ACCESS_TOKEN with the access token
//         },
//       }
//     );

//     const meetingUrl = response.data.joinUrl;
//     if (meetingUrl) {
//       // Open the meeting URL
//       Linking.openURL(meetingUrl);
//     } else {
//       alert('Failed to create Teams meeting');
//     }
//   } catch (error) {
//     console.error('Error creating Teams meeting', error);
//     alert('Failed to create Teams meeting');
//   }
// };
