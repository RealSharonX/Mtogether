const socket = io.connect();
socket.emit("userIn", roomName);

socket.on("newMusic", song => {
    console.log("recieved change")
    change(song);
})

function change(id) {
    let vid = id;
    if (id == "7achwa") {
        vid = "dQw4w9WgXcQ"
    }
    let content = document.getElementById("ct");
    let frame = `https://www.youtube.com/embed/${vid}`;
    console.log(frame);
    content.remove();
    let ct = document.createElement("DIV");
    document.body.appendChild(ct);
    let yt = document.createElement("IFRAME");
    yt.id = "ct";
    yt.src = `${frame}?autoplay=1`;
    yt.width = "1280";
    yt.height="720";
    yt.frameborder="0";
    yt.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ct.appendChild(yt);
}