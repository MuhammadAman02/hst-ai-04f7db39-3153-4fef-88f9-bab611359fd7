import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OpenAIChat from '@/components/OpenAIChat';
import OpenAIImageGenerator from '@/components/OpenAIImageGenerator';
import { MessageSquare, Image, Settings, Key } from 'lucide-react';

const Index = () => {
  const [apiKeySet, setApiKeySet] = useState(!!import.meta.env.VITE_OPENAI_API_KEY && import.meta.env.VITE_OPENAI_API_KEY !== 'your_openai_api_key_here');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            OpenAI Integration Hub
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Connect with OpenAI's powerful AI models for text generation and image creation
          </p>
          
          {!apiKeySet && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">API Key Required</span>
              </div>
              <p className="text-yellow-700 text-sm">
                Please add your OpenAI API key to the .env file (VITE_OPENAI_API_KEY) to start using the features.
              </p>
            </div>
          )}
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Text Generation
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Image Generation
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <OpenAIChat />
          </TabsContent>

          <TabsContent value="image" className="space-y-6">
            <OpenAIImageGenerator />
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Text Generation
                  </CardTitle>
                  <CardDescription>
                    Generate human-like text responses using GPT models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary">GPT-3.5-turbo</Badge>
                    <p className="text-sm text-gray-600">
                      Perfect for conversations, content creation, code assistance, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Image Generation
                  </CardTitle>
                  <CardDescription>
                    Create unique images from text descriptions using DALL-E
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="secondary">DALL-E</Badge>
                    <p className="text-sm text-gray-600">
                      Generate artwork, illustrations, and creative images from text prompts.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Setup Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>1. Get your OpenAI API Key:</strong>
                      <p className="text-gray-600 ml-4">Visit <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com/api-keys</a> to create an API key</p>
                    </div>
                    <div>
                      <strong>2. Add to Environment:</strong>
                      <p className="text-gray-600 ml-4">Replace "your_openai_api_key_here" in the .env file with your actual API key</p>
                    </div>
                    <div>
                      <strong>3. Start Creating:</strong>
                      <p className="text-gray-600 ml-4">Use the tabs above to generate text or images with AI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;