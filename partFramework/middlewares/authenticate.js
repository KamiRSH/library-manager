const Authentication = require("../services/authenticationService/authentication")
const loader = require("@partFramework/loader").getInstance()
async function authenticate(token, trackingHeaders,next){
    const authentication = loader.get("authentication")
    if (await authentication.authenticateToken(token, trackingHeaders)){
        next()
    }
    
}
module.exports = {
    function: authenticate,
    needProtocolRef: false,
    params: [
        '_protocolRef.request.headers.token','_protocolRef.request.trackingHeaders'
      ]
}