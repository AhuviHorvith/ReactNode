import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    user: {
        _id:"",
        name:"",
        email:"",
        sumMoney:0,
        categories:[],
        Incomes:[]
    }
}
const userSlice = createSlice({
    name: "User",
    initialState: initialValue,
    reducers: {
        setUser: (state, action) => {
            debugger
            console.log("add userId " + action.payload.id)
            state.user._id = action.payload._id;
            state.user.name=action.payload.name;
            state.user.email=action.payload.email;
            state.user.sumMoney=action.payload.sumMoney;
            state.user.categories=action.payload.categories;
            state.user.Incomes=action.payload.Incomes;
        },
        setUserConect: (state, action) => {
            
            console.log("add userId " + action.payload.id)
            state.user._id = action.payload.json.id;
            state.user.name=action.payload.json.name;
            state.user.email=action.payload.json.email;
            state.user.sumMoney=action.payload.json.sumMoney;
            state.user.categories=action.payload.json.categories;
            state.user.Incomes=action.payload.json.Incomes;
        },
        clearUser: (state) =>{
            state.user._id=""
            state.user.email=""
            state.user.name=""
            state.user.sumMoney=0

        }, 
    }
})

export const { setUser ,setUserConect,clearUser} = userSlice.actions
export default userSlice.reducer

