import jwtDecode from "jwt-decode"
// we bring jwt token decoder

const checkUser = ()=>{
    // first we get token from localStorage
    let token = window.localStorage.getItem("jwtToken")
    // if there is a token stored
    if(token){
        // we define current time
        const currentTime = Date.now() /1000
        // decode token 
        let decodedJwtToken = jwtDecode (token)
        // then compare token.exp and current time
        if(decodedJwtToken.exp<currentTime){
            // if token is not valid we return false, else return true
            return false
        } else {
            return true
        }
    } else{
        return false
    }
}

export default checkUser