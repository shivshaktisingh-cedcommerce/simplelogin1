export const initialState={
   
       user:{
        customer:'',
        username:'',
        password:'',    
       },
        token:'',
        count:1 ,
        selected:10
}

const function1 =(state= initialState , action)=>{
  
    switch(action.type){
        case "SAVEDATA":
            return {
                ...state   , user:action.payload 
            }
        case "SAVETOKEN":
            return {
                ...state   , token:action.payload
            }
         default:
            return state;
    }
}


export default function1
