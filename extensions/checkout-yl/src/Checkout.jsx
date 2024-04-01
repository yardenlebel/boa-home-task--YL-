import React from 'react';
import { reactExtension, View, Icon, Text, Button } from '@shopify/ui-extensions-react/checkout';
import CheckBox from './CheckBox'; 
import { AppBridgeProvider } from '../../../web/frontend/components/providers/AppBridgeProvider';
import { PolarisProvider } from '../../../web/frontend/components/providers/PolarisProvider'; 
import { useAppQuery } from '../../../web/frontend/hooks'; 

export default reactExtension(
  'purchase.checkout.block.render',
  () => <App />,
);

const App = () => {
  return (
    <AppBridgeProvider>
      <PolarisProvider>
        <MyExtension />
      </PolarisProvider>
    </AppBridgeProvider>
  );
};

function MyExtension() {
  // Fetch cart data using useAppQuery hook
  const { data: cartData, loading, error } = useAppQuery({ url: 'https://careful-yet-backgrounds-faster.trycloudflare.com/admin/api/unstable/checkouts/2295c1e1ce04995ca7aae0239aba230f.json' });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View border="base" position="loose">
      <View border="none" padding="tight">
        <Icon source="info" />
      </View>
      <View border="none" padding="tight">
        <Text>Save your cart</Text>
      </View>

      <CheckBox /> 
      <Text>{cartData}</Text>

      <View border="none" padding="loose">
        <Button onPress={() => console.log('Save button clicked')}>Save</Button>
      </View>
    </View>
  );
}