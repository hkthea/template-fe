const initState={
    firstime:true,
    user:false,    
    token:'',
    errMsg:null,
    isVerify:false,
    newPassMsg:null,
    roles:[]
}

export default (state=initState, {type, payload})=>{
    switch (type) {
        case 'sign-in-success':{
            const {user, token}=payload;
            return {...state, user:{...user}, token:token, firstime:false}
        }            

        case 'sign-out-success':{
            return {...state, user:null, token:'', errMsg:null, firstime:false};
        }  

        case'sign-in':{
            return {...state, errMsg:null}
        }
        case 'sign-in-failed':{
            const {msg} =payload
            return{...state, errMsg:msg}
        }     
        case 'set-verify':{
            return {...state, isVerify:payload.verif, newPassMsg:payload.msg}
        } 
        case 'error-load-session':{
            return {...state, firstime:false};
        }
        default:
            return state;
    }
}