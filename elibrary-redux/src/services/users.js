
const Users = {
    
    loadUsers(dispatch,email,password) {
        dispatch({
            type: 'success',
            payload:{
                email:email,
                password:password
            }
        })
      
    },


    logout(dispatch) {
        dispatch({
            type: 'failure',
            payload:{
                email:"salman@gmail.comm",
                password:1234
            }
        })
      
    }
}
export default Users;