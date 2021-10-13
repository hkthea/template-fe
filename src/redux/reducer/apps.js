const initState={
    app:'',
    title:'',
    backend_version:'',
    backend_update_logs:[],
}

export default (state=initState, action)=>{
    switch (action.type) {
        case 'set-apps':
            const {app, title}=action.payload;
            return {...state, app, title};        
        case 'set-version':
            const {version:appVer, history}=action.payload;
            return {...state, backend_version:appVer, backend_update_logs:history}
        default:
            return {...state};
    }
}