export const configuration = {
    name: "user",
    path: "./main.js",
    // transpile: false,
    exception: {},
    handlers: {
        lobby:{
            needProtocolRef: false,
            params:[],
        },
        signup: {
            needProtocolRef: false,
            params: [
                '_protocolRef.request.postData','_protocolRef.request.headers.token','_protocolRef.request.trackingHeaders'
            ],
        },
        login: {
            needProtocolRef: false,
            params: ['_protocolRef.request.postData.username', '_protocolRef.request.postData.password','_protocolRef.request.headers.token']
        }, 
        editUser: {
            needProtocolRef: false,
            params: ["_inputData.params.username", '_protocolRef.request.postData','_protocolRef.request.headers.token']
        },
        viewUser: {
            needProtocolRef: false,
            params: ["_inputData.params.username",'_protocolRef.request.headers.token']
        },
    }
}