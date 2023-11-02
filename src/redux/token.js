const user = localStorage.getItem('user')
const loadToken = async () => {
    if(user){
        const userInfo = JSON.parse(user)
        console.log(userInfo)
        return userInfo.access_token
    }

}
export {loadToken} 