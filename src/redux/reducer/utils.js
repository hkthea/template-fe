const initState={
    toaster:null,
    loader:false
}

export default (state=initState, action)=>{
    switch (action.type) {
        case 'set-toaster':
            return {...state, toaster:action.payload}
        case 'show-loader':
            return {...state, loader:true}
        case 'hide-loader':
            return {...state, loader:false};
        default:
            return state;
    }
}