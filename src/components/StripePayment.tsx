import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, CreditCard } from 'lucide-react';
import { products, createPaymentIntent } from '@/lib/stripe';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

const StripePayment = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async (product: Product) => {
    setIsProcessing(true);
    setSelectedProduct(product);

    try {
      console.log('Processing payment for product:', product);
      
      // Create payment intent
      const paymentIntent = await createPaymentIntent(product.price);
      console.log('Payment intent created:', paymentIntent);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Payment Successful!",
        description: `You have successfully purchased the ${product.name}`,
      });

      console.log('Payment completed successfully for:', product.name);
      
    } catch (error) {
      console.error('Payment failed:', error);
      toast({
        title: "Payment Failed",
        description: "Please check your Stripe configuration and try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setSelectedProduct(null);
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">
          Unlock the full potential of AI with our subscription plans
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="relative hover:shadow-lg transition-shadow">
            {product.id === 'pro' && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{product.name}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
              <div className="text-4xl font-bold text-blue-600 mt-4">
                {formatPrice(product.price)}
                <span className="text-lg text-gray-500 font-normal">/month</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handlePurchase(product)}
                disabled={isProcessing}
                className="w-full"
                variant={product.id === 'pro' ? 'default' : 'outline'}
              >
                {isProcessing && selectedProduct?.id === product.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Subscribe Now
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Stripe Integration Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <strong>1. Get your Stripe Keys:</strong>
              <p className="text-gray-600 ml-4">
                Visit <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  dashboard.stripe.com/apikeys
                </a> to get your API keys
              </p>
            </div>
            <div>
              <strong>2. Add to Environment:</strong>
              <p className="text-gray-600 ml-4">
                Replace the placeholder values in the .env file with your actual Stripe keys
              </p>
            </div>
            <div>
              <strong>3. Backend Integration:</strong>
              <p className="text-gray-600 ml-4">
                In production, payment processing should be handled by your backend server for security
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StripePayment;