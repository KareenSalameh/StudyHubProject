import ZoomUs from 'react-native-zoom-us';

const initializeZoom = async () => {
  try {
    await ZoomUs.initialize({
      clientKey: 'kYYkMJj0Spaw9ea8dBtSXw',
      clientSecret: 'XR6P6jMyAp841E67jHao6ua3bTW6J4sd',
    });
    console.log('Zoom SDK Initialized');
  } catch (error) {
    console.log('Error initializing Zoom SDK', error);
  }
};

initializeZoom();



// // Import required modules
// import axios from 'axios';

// // Function to create a Teams meeting
// export const createTeamsMeeting = async () => {
//   try {
//     // Authenticate and obtain access token (replace YOUR_TENANT_ID, YOUR_CLIENT_ID, and YOUR_CLIENT_SECRET)
//     const authResponse = await axios.post(
//       `https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/token`,
//       {
//         client_id: 'YOUR_CLIENT_ID',
//         scope: 'https://graph.microsoft.com/.default',
//         client_secret: 'YOUR_CLIENT_SECRET',
//         grant_type: 'client_credentials',
//       }
//     );

//     // Extract access token
//     const accessToken = authResponse.data.access_token;

//     // Create a Teams meeting (replace YOUR_TEAM_ID)
//     const response = await axios.post(
//       `https://graph.microsoft.com/v1.0/teams/YOUR_TEAM_ID/meetings`,
//       {
//         subject: 'Meeting Subject',
//         startDateTime: new Date().toISOString(),
//         endDateTime: new Date(new Date().getTime() + 3600 * 1000).toISOString(), // 1 hour duration
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     // Extract meeting URL
//     const meetingUrl = response.data.joinUrl;

//     // Return meeting URL
//     return meetingUrl;
//   } catch (error) {
//     console.error('Error creating Teams meeting', error);
//     return null;
//   }
// };
