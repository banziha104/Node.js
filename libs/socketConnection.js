require("../libs/removeByValue")();

module.exports = (io) =>{
    let userList = [];
    io.on('connection', (socket) => {
        socket.on('disconnect', function(){
            userList.removeByValue(user.displayname);
            io.emit('leave', userList);
        });
        socket.on('client message', (data) => {
            let session = socket.request.session.passport;
            let user = (typeof session !== "undefined")? (session.user) : "";
            if(userList.indexOf(user.displayname) === -1){
                userList.push(user.displayname);
            }

            io.emit('join',userList);

            socket.on('client message', (data)=>{
               io.emit('server message', { message : data.message, displayname : user.displayname})
            });
        });
    });
};