import { ADD_TODO, UPDATE_TODO } from "../actions";
import { DELETE_ALL } from "../actions";
import { REMOVE_TODO } from "../actions";
import { UPDATE_CHECKBOX } from "../actions";

const initialState = [
    {id: 1, todo: 'Buy Laptop', completed: false},
    {id: 2, todo: 'Master Redux', completed: false},
    {id: 3, todo: 'Watering Plants', completed: true},
];

export const operationsReducer = (state = initialState,action) =>{
    switch(action.type){
        case ADD_TODO:
             return [...state , action.payload];
        case DELETE_ALL:
             return [];
        case REMOVE_TODO:
             const filteredTodos = state.filter((todo) => (todo.id!==action.payload));
             return filteredTodos;
        case UPDATE_TODO:
            let data = action.payload;
            const updatedArray = [];
            state.map((item)=>{
                if(item.id === data.id){
                    item.id=data.id;
                    item.completed= data.completed;
                    item.todo = data.todo;
                }
                updatedArray.push(item);
                
            })
            return updatedArray;
        case UPDATE_CHECKBOX:
            let todoArray=[];
            state.map((item)=>{
                if(item.id===action.payload){
                    item.completed=!item.completed;

                }
                todoArray.push(item);
            })
            return todoArray;
        default: return state;
    }

}


// import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//     {id: 1, todo: 'Buy Laptop', completed: false},
//     {id: 2, todo: 'Master Redux', completed: false},
//     {id: 3, todo: 'Watering Plants', completed: true},
// ];

// const operationsSlice = createSlice({
//     name: "operations",
//     initialState,
//     reducers: {
//         addTodo: (state, action) => {
//             state.push(action.payload);
//         },
//         deleteAll: (state) => {
//             return [];
//         },
//         removeTodo: (state, action) => {
//             return state.filter(todo => todo.id !== action.payload);
//         },
//         updateTodo: (state, action) => {
//             const updatedIndex = state.findIndex(todo => todo.id === action.payload.id);
//             if (updatedIndex !== -1) {
//                 state[updatedIndex] = action.payload;
//             }
//         },
//         updateCheckbox: (state, action) => {
//             const todo = state.find(todo => todo.id === action.payload);
//             if (todo) {
//                 todo.completed = !todo.completed;
//             }
//         }
//     }
// });

// export const {
//     addTodo,
//     deleteAll,
//     removeTodo,
//     updateTodo,
//     updateCheckbox
// } = operationsSlice.actions;

// export default operationsSlice.reducer;
