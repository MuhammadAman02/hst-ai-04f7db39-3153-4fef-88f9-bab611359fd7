import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export const generateText = async (prompt: string, model: string = 'gpt-3.5-turbo') => {
  try {
    console.log('Sending request to OpenAI with prompt:', prompt);
    
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: model,
      max_tokens: 1000,
      temperature: 0.7,
    });

    console.log('OpenAI response received:', completion);
    return completion.choices[0]?.message?.content || 'No response generated';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to generate text from OpenAI');
  }
};

export const generateImage = async (prompt: string, size: '256x256' | '512x512' | '1024x1024' = '512x512') => {
  try {
    console.log('Sending image generation request to OpenAI with prompt:', prompt);
    
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: size,
    });

    console.log('OpenAI image response received:', response);
    return response.data[0]?.url || '';
  } catch (error) {
    console.error('OpenAI Image API Error:', error);
    throw new Error('Failed to generate image from OpenAI');
  }
};

export default openai;