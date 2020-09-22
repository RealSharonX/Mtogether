const socket = io.connect();

socket.on("user-tracked", id => {
    console.log(id);
    if (id == sessionOwner) {
        window.location.replace("http://mtogether.herokuapp.com/create/share");
    }
})