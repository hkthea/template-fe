const roles=[
    {
        level:0x100,
        role:'Master User'
    },
    {
        level:0x01,
        role:'Acceptance Confirmation',
    },
    {
        level:0x02,
        role:'Rejecting Staff'
    },
    {
        level:0x04,
        role:'Airline'
    },
    {
        level:0x08,
        role:'Delivery to Airport'
    }
];

export const getRoles=(level)=>{
    return roles.filter((role)=>role.level<level);
}

export const levelToRoles=(level)=>{
    const result=[];
    for (let iii = 0; iii < roles.length; iii++) {
        const role = roles[iii];
        if((level & role.level)>0)result.push(role.role);
    }
    return result.join(', ');
}