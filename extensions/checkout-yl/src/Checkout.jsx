import React, { useEffect, useState } from 'react';
import { reactExtension, View, Icon, Text, Button,useCheckoutToken, useCartLines } from '@shopify/ui-extensions-react/checkout';
import CheckBox from './CheckBox.jsx'; 
import { BrowserRouter, Route } from 'react-router-dom';
import { QueryProvider } from '../../../web/frontend/components/providers/QueryProvider.jsx';
import { AppBridgeProvider } from '../../../web/frontend/components/providers/AppBridgeProvider.jsx';
import { PolarisProvider } from '../../../web/frontend/components/providers/PolarisProvider.jsx';
import SaveItems from './SaveItems.jsx';
import { useAppFetch } from '../../../web/frontend/hooks/useAppFetch.js'; 
import { useAuthenticatedFetch } from '../../../web/frontend/hooks/useAuthenticatedFetch.js';

// const App = () => {
//   return (
//     <PolarisProvider>
//        <BrowserRouter>
//          <AppBridgeProvider>
//            <QueryProvider>
//               <Extension  />
//            </QueryProvider>
//         </AppBridgeProvider>
//       </BrowserRouter>
//     </PolarisProvider> 
//   );
// };

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />
);

const Extension = () => {
  const [cartData, setCartData] = useState([]);
  const [ProductsToSave, setProductsToSave] = useState([]);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [getDataFlag, setGetDataFlag] = useState(true);
 
  //get products in cart
  const cartLines = useCartLines();
  useEffect(()=>{
        setCartData(cartLines.map((val) => ({
          title: val.merchandise.title,
          img: val.merchandise.image,
          id: val.merchandise.product.id,
        })));
  },[getDataFlag])
//get checkout token
  const token = useCheckoutToken()
  useEffect(() => {
    const fetchCheckoutData = async () => {
        setCheckoutToken(token);
    };
    fetchCheckoutData();
  }, [getDataFlag]);

  const handleSubmit = async (e) => {
 console.log('in');
  <SaveItems ProductsToSave={ProductsToSave} checkoutToken={checkoutToken}/>
          

  };

  return (
    <View border="base" position="loose">
      <View border="none" padding="tight" >
        <Icon source="info" />
      </View>
      <View border="none" padding="tight">
        <Text>Save your cart</Text>
      </View>
      <CheckBox cartData={cartData} setProductsToSave={setProductsToSave} ProductsToSave={ProductsToSave}/>
      <View border="none" padding="loose">
        <Button onPress={() => {handleSubmit()}}>Save</Button>
      </View>
    </View>
  );
}