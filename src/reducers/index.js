export const cartReducer = (state = [], action) => {
    switch(action.type){
        case "ADDTOCART" : state.push(action.payload);
                           return state;
        case "REMOVEFROMCART" : state = state.filter((data) => data.id != action.payload.id);
                                return state;
        case "INITIALISECART" : state = action.payload;
                                return state;
        default : return state;
    }
}