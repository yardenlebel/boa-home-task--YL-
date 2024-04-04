import React, { useEffect, useState } from 'react';
import { reactExtension, View, Icon, Text, Button,useCheckoutToken, useCartLines,useApi } from '@shopify/ui-extensions-react/checkout';
import CheckBox from './CheckBox.jsx'; 
import SaveItems from './SaveItems.jsx';
import { AppBridgeProvider} from '../../../web/frontend/components/providers/AppBridgeProvider.jsx';
import {QueryProvider } from '../../../web/frontend/components/providers/QueryProvider.jsx';
import { PolarisProvider} from '../../../web/frontend/components/providers/PolarisProvider.jsx';
import { BrowserRouter } from 'react-router-dom';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />
);

const Extension = () => {
  const [cartData, setCartData] = useState([]);
  const [ProductsToSave, setProductsToSave] = useState([]);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [showSaveItems, setShowSaveItems] = useState(false); // State to control SaveItems visibility

  const info=useApi();
  console.log(info)

  //get products in cart
  const cartLines = useCartLines();
  useEffect(()=>{
        setCartData(cartLines.map((val) => ({
          title: val.merchandise.title,
          id: val.merchandise.product.id,
        })));
  },[])
//get checkout token
  const token = info.checkoutToken.current;
  useEffect(() => {
    const fetchCheckoutData = async () => {
        setCheckoutToken(token);
    };
    fetchCheckoutData();
  }, []);

  const handleSubmit = async (e) => {
 setShowSaveItems(true); // Show the SaveItems component
  };

  return (
    
        <View border="base" position="loose">
          <View border="none" padding="tight">
            <Icon source="info" />
          </View>
          <View border="none" padding="tight">
            <Text>Save your cart</Text>
          </View>
          <CheckBox cartData={cartData} setProductsToSave={setProductsToSave} ProductsToSave={ProductsToSave} />
          <View border="none" padding="loose">
            <Button onPress={handleSubmit}>Save</Button>
          </View>
          {showSaveItems &&
              <BrowserRouter>
                <AppBridgeProvider >
                  <SaveItems ProductsToSave={ProductsToSave} checkoutToken={checkoutToken} />
                </AppBridgeProvider>
              </BrowserRouter>
           }

        </View>
 
  );
}