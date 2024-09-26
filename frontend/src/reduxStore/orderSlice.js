import { createSlice } from "@reduxjs/toolkit";
const orderSlice=createSlice({
    name:"order",
    initialState:{
        orders:[],
        singleOrder:null,
        orderHistory:[],
        orderById:null,
    },
    reducers:{
        setOrders:(state,action)=>{
            state.orders=action.payload
        },
        setSingleOrder:(state,action)=>{
            state.singleOrder=action.payload
        },
        setOrderHistory:(state,action)=>{
            state.orderHistory=action.payload
        },
        setOrderById:(state,action)=>{
            state.orderById=action.payload
        }
       
    }
})

export const {setOrders,setSingleOrder,setOrderHistory,setOrderById}=orderSlice.actions
export default orderSlice.reducer