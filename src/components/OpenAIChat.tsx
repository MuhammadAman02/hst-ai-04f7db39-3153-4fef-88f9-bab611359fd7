import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { generateText } from '@/lib/openai';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';

const OpenAIChat = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      console.log('Generating text with prompt:', prompt);
      const result = await generateText(prompt);
      setResponse(result);
      toast({
        title: "Success",
        description: "Text generated successfully!",
      });
    } catch (error) {
      console.error('Error generating text:', error);
      toast({
        title: "Error",
        description: "Failed to generate text. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>OpenAI Chat</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Enter your prompt:
            </label>
            <Input
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
          </div>
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Generate Response
              </>
            )}
          </Button>
        </form>

        {response && (
          <div>
            <label className="block text-sm font-medium mb-2">Response:</label>
            <Textarea
              value={response}
              readOnly
              className="min-h-[200px] bg-gray-50"
              placeholder="Response will appear here..."
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OpenAIChat;