import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey || apiKey === 'your_openai_api_key_here') {
  console.warn('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
}

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export const generateText = async (prompt: string): Promise<string> => {
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
  }

  try {
    console.log('Sending request to OpenAI with prompt:', prompt);
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'No response generated';
    console.log('OpenAI response received:', response);
    
    return response;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate text. Please check your API key and try again.');
  }
};

export const generateImage = async (prompt: string, size: '256x256' | '512x512' | '1024x1024' = '512x512'): Promise<string> => {
  if (!apiKey || apiKey === 'your_openai_api_key_here') {
    throw new Error('OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your .env file.');
  }

  try {
    console.log('Sending image generation request to OpenAI with prompt:', prompt);
    
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: size,
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    console.log('OpenAI image generated:', imageUrl);
    return imageUrl;
  } catch (error) {
    console.error('OpenAI Image API error:', error);
    throw new Error('Failed to generate image. Please check your API key and try again.');
  }
};