export async function userLogIn(username, password) {
    try {
        if ((username == null | username === "") || (password == null || password === "")) {
            throw new Error('missing username or password');
        }
        return new Promise(function(resolve) {
            setTimeout(() => {
                resolve({token: 'exampleToken123', sucess: true})
            }, 2000)
        });            
    } catch (err) {
        return new Promise(function(resolve, reject) {
            reject({msg: 'something bad happen', sucess: false})
        })
    }
}