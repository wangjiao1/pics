function down(e) {
    this.strX = e.pageX;
    this.strY = e.pageY;
    this.strL = this.offsetLeft;
    this.strT = this.offsetTop;
    if (this.setCapture) {
        this.setCapture();
        wangjiaoEvent.on(this, "mousemove", move);
        wangjiaoEvent.on(this, "mouseup", up);
    } else {
        this.MOVE = wangjiaoEvent.processThis(move, this);
        this.UP = wangjiaoEvent.processThis(up, this);
        wangjiaoEvent.on(document, "mousemove", this.MOVE);
        wangjiaoEvent.on(document, "mouseup", this.UP);
    }

    wangjiaoEvent.fire.call(this, "wangjiaoDragStart", e);
}

function move(e) {
    var curL = e.pageX - this.strX + this.strL;
    var curT = e.pageY - this.strY + this.strT;
    this.style.left = curL + "px";
    this.style.top = curT + "px";

    wangjiaoEvent.fire.call(this, "wangjiaoDragMove", e);
}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();
        wangjiaoEvent.off(this, "mousemove", move);
        wangjiaoEvent.off(this, "mouseup", up);
    } else {
        wangjiaoEvent.off(document, "mousemove", this.MOVE);
        wangjiaoEvent.off(document, "mouseup", this.UP);
    }

    wangjiaoEvent.fire.call(this, "wangjiaoDragEnd", e);
}