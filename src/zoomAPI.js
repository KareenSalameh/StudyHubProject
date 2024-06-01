import axios from 'axios';

export const createZoomMeeting = async () => {
  const zoomToken = 'oNwUynWIQIGKt3DgCpQyqw'; // Generate JWT token for authorization

  try {
    const response = await axios.post(
      'https://api.zoom.us/v2/users/me/meetings',
      {
        topic: 'Test Meeting',
        type: 1, // Instant meeting
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${zoomToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const { join_url } = response.data;
    return join_url;
  } catch (error) {
    console.log('Error creating Zoom meeting', error);
    return null;
  }
};
