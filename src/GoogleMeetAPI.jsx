//import GoogleMeet from 'react-native-google-meet';

// Initialize the Google Meet library
GoogleMeet.configure({
  apiKey: 'AIzaSyBYqv2OUa0RIyJt37fPoejyzXZjQWhfoBA',
});

export const createMeeting = async () => {
    try {
      const meetingLink = await GoogleMeet.createMeeting({
        title: 'Study Group Meeting',
        duration: 60, // Meeting duration in minutes
      });
      console.log('Meeting link:', meetingLink);
      return meetingLink; // Return the meeting link
    } catch (error) {
      console.log('Error creating meeting:', error);
      throw error; // Throw the error to be caught in the calling component
    }
  };

  export const joinMeeting = async (meetingLink) => {
    try {
      await GoogleMeet.joinMeeting(meetingLink);
    } catch (error) {
      console.log('Error joining meeting:', error);
      throw error; // Throw the error to be caught in the calling component
    }
  };

  GoogleMeet.addEventListener('meetingStarted', () => {
    console.log('Meeting started');
  });
  
  GoogleMeet.addEventListener('meetingEnded', () => {
    console.log('Meeting ended');
  });