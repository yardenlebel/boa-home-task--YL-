import React, { useEffect, useState } from 'react';
import { reactExtension, View, Icon, Text, Button,InlineLayout, useCartLines,useApi } from '@shopify/ui-extensions-react/checkout';
import CheckBox from './CheckBox.jsx'; 
import SaveItems from './SaveItems.jsx';
import { AppBridgeProvider} from '../../../web/frontend/components/providers/AppBridgeProvider.jsx';
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
    
        <View border="base" inlineAlignment={"start"} >
          <InlineLayout columns={['20%', 'fill']}>
          <View border="none" padding={"tight"} >

             <Icon source="info" appearance="decorative"/>
             </View>
             <View border="none" padding={"tight"} >
            <Text size='medium'>Save your cart</Text>
          </View>
          </InlineLayout>
           
          <View  border="none" padding="base">
          <CheckBox cartData={cartData} setProductsToSave={setProductsToSave} ProductsToSave={ProductsToSave} />
          </View>
          <View border="none"  padding="base">
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