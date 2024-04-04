import React, { useEffect } from 'react';
import { useAuthenticatedFetch } from '../../../web/frontend/hooks/useAuthenticatedFetch';

export default function SaveItems(props) {
    const baseUrl = 'https://bias-nextel-phrase-shaved.trycloudflare.com/api/';
    const appfetch=useAuthenticatedFetch();
    const fetchSaveCheckout = async (products, checkoutToken) => {
      try {
        //i tried to use useAuthenticatedFetch but 
        const response = await appfetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ products, checkoutToken }),
        });
  
        if (!response.ok) {
          console.error('Error:', response);
          throw new Error('Failed to save checkout data');
        }
  
        const data = await response.json();
        console.log('Checkout data saved successfully:', data);
        alert('Checkout data saved successfully');
      } catch (error) {
        console.error('Error saving checkout data:', error);
      }
    };

    fetchSaveCheckout(props.ProductsToSave, props.checkoutToken);


  // Render null since the component doesn't render any JSX directly
  return null;
}