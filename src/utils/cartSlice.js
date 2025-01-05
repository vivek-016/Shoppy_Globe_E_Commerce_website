import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        items:[]
    },
    reducers:{
        addItem(state, action) {
            const existingItem = state.items.find(item => item.id === action.payload.id);
      
            if (existingItem) {
              // If item exists, increase its quantity
              existingItem.quantity += 1;
            } else {
              // Add new item with quantity 1
              state.items.push({ ...action.payload, quantity: 1 });
            }
          },
        removeItem:(state,action)=>{
            
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem&&existingItem.quantity>1) {
                // If item exists, decrease its quantity
                existingItem.quantity -= 1;
            }
            else{
                // remove the item
                state.items = state.items.filter((item)=>item.id!= action.payload.id);
            }
            
        },
        clearCart:(state,aaction)=>{
            state.items.length = 0;
        }
    }
});



export const {addItem, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;