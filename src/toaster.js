let toaster=false;

export const setToaster=(aToaster)=>{
    if(aToaster)toaster=aToaster;
}

export const getToaster=()=>(toaster);