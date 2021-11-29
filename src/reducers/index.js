export const cartReducer = (state = [], action) => {
    switch(action.type){
        case "ADDTOCART" : state.push(action.payload);
                           return state;
        case "REMOVEFROMCART" : var index = state.indexOf(action.payload)
                                state.splice(index,1)
                                return state;
        case "INITIALISECART" : state = action.payload;
                                return state;
        default : return state;
    }
}