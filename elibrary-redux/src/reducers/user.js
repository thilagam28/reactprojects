const initialState = {
    loginStatus:false,
    email:'',
    password:''
};

function users(state = initialState, action){

 switch(action.type){
     case 'success' : 
               return {
                   ...state,
                   email:action.payload.email,
                   password:action.payload.password,
                   loginStatus:true
               }
   case 'failure':
       return{
           ...state,
           loginStatus:false
       }
       
       default:          
       return state;   
 }

}

export default users;