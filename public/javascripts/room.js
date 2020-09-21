const socket = io.connect();

socket.emit("userIn", roomName);

socket.on("newMusic", song => {
    console.log(song);
})