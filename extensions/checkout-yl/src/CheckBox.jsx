import {
    reactExtension,
    Checkbox,	BlockSpacer,InlineStack,
    View,Icon, Text,Button
  } from '@shopify/ui-extensions-react/checkout';


export default function CheckBox(props) {

    const saveProduct=(idx)=>{
        props.setProductsToSave([...props.ProductsToSave,props.cartData[idx].id])
    }
    const removeProduct=(id)=>{
        newarr=props.ProductsToSave.filter(val => val.id !== id);
        props.setProductsToSave(newarr)
    }
    const renderCheckboxes=()=>{
       return props.cartData.map((val,idx)=>{
           return <Checkbox key={idx} id={val.id} onChange={(value) => {
            if(value){
                saveProduct(idx);
            }
            else{
            removeProduct(val.id);}
          }}>
                {val.title}
            </Checkbox>
        })
    }

  return (
    <View border="none" padding="loose" >
       {renderCheckboxes()}
     </View>
        )
}
