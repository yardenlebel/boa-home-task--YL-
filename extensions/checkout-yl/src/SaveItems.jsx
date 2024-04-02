import React, { useEffect, useState } from 'react';
import { useCheckoutToken, useCartLines } from '@shopify/ui-extensions-react/checkout';
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryProvider } from '../../../web/frontend/components/providers/QueryProvider.jsx';
import { AppBridgeProvider } from '../../../web/frontend/components/providers/AppBridgeProvider.jsx';
import { PolarisProvider } from '../../../web/frontend/components/providers/PolarisProvider.jsx';

export default function SaveItems(props) {
  console.log('in sbmit')

  // post the saved products
  const fetchData = useAppFetch('/api/saveCheckout', { method: 'POST', body: JSON.stringify({ products: props.ProductsToSave ,checkoutToken: props.checkoutToken}) });

  const handleSubmit = async (e) => {
    console.log('in sbmit')
    e.preventDefault();
    try {
      await fetchData();
      alert('Checkout data saved successfully!');
    } catch (error) {
      console.error('Error saving checkout data:', error);
      alert('Failed to save checkout data. Please try again.');
    }
  };
    return (
      <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
          {handleSubmit()}
         </QueryProvider>
       </AppBridgeProvider>
     </BrowserRouter>
   </PolarisProvider>     );
  }