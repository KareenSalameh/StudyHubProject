import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Linking } from 'react-native';
import { getLearningQuote } from '../API/api';

export const fetchUserData = async (userId, setProfileImageUrl, setUsername) => {
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      setProfileImageUrl(data.profileImageUrl);
      setUsername(data.fullName);
    }
  } catch (error) {
    console.error("Error fetching user photo:", error);
  }
};

export const handleMeeting = async () => {
  const meetingId = '836 905 6609';
  const zoomMeetingLink = `https://zoom.us/j/${meetingId.replace(/\s/g, '')}`;
  Linking.openURL(zoomMeetingLink).catch((err) =>
    console.error('Error opening Zoom meeting:', err)
  );
};

export const formatMeetingTime = (time) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(time).toLocaleString(undefined, options);
};

export const handleQuotePress = async (setQuote) => {
  try {
    const fetchedQuote = await getLearningQuote();
    if (fetchedQuote) {
      setQuote(fetchedQuote);
    } else {
      setQuote('Failed to fetch learning quote.');
    }
  } catch (error) {
    console.error('Error fetching learning quote:', error);
    setQuote('Failed to fetch learning quote.');
  }
};

export const handleClosePress = (setQuote) => {
  setQuote('');
};
