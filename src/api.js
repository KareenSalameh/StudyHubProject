import axios from 'axios';

export const getLearningQuote = async () => {
  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
        params: {
            category: 'learning',
        },
        headers: {
            'X-API-KEY': 'Qy9JfWXcuh7Ce36xi4nyBg==fjPpEJcftRpXbJU9',
        },
    });
    return response.data[0].quote;
  } catch (error) {
    console.error('Error fetching learning quote:', error);
    return null;
  }
};

