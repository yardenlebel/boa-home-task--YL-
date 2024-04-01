import {
    reactExtension,
    Checkbox,	BlockSpacer,InlineStack,
    View,Icon, Text,Button
  } from '@shopify/ui-extensions-react/checkout';
import Item from './Item';


export default function CheckBox() {
  return (
    <View border="none" padding="loose" >
        <Checkbox id="checkbox" name="checkbox">
        Save this information for next time
        </Checkbox>
        <Checkbox id="checkbox" name="checkbox">
          Save this information for next time
        </Checkbox>
     </View>
        )
}
