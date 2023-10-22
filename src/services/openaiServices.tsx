import axios from 'axios';


const apiKey = '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';
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions'; // Example endpoint


async function generateText(prompt: string) {
  try {
    const response = await axios.post(openaiEndpoint, {
      prompt,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error making the API request:', error);
  }
}

export { generateText };
