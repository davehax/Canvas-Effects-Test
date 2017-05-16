var Effects = function(canvas) {

    var self = this;
    var ctx = null;

    var objects = [];

    // function canvasFullscreen() {
    //     var onResize = _.throttle(function(evt) {
    //         canvas.style.height = window.innerHeight + 'px';
    //         canvas.style.width = window.innerWidth + 'px';
    //     }, 66);

    //     if (canvas.classList.contains('fullscreen')) {
    //         onResize();
    //         window.addEventListener('resize', onResize);
    //     }
    // }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function init() {
        // canvasFullscreen();
        ctx = canvas.getContext('2d');

        // generate random amount of circles
        var count = Math.round(Math.abs(Math.random() * 50));
        for (var i = 0; i < count; i++) {
            var circle = new Circle(ctx);
            circle.x = Math.round(Math.random() * canvas.width);
            circle.y = Math.round(Math.random() * canvas.height);
            circle.angle = Math.round(Math.random() * 360);
            objects.push(circle);
        }

        
        ctx.filter = 'blur(3px)'
        render();

        // draw circle with blur
        // var centerX = canvas.width / 2;
        // var centerY = canvas.height / 2;
        // var radius = 10;

        // ctx.beginPath();
        // ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        // ctx.fillStyle = 'green';
        // ctx.fill();
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }

    function toRadians (angle) {
        return angle * (Math.PI / 180);
    }

    function render() {

        // clear canvas
        clear();
        

        // render objects
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            obj.y++;
            obj.y %= canvas.height;

            // sine wave
            obj.origX = obj.origX || obj.x;
            obj.angle = obj.angle || 0;
            obj.angle += 5;
            obj.angle %= 360;
            obj.x = obj.origX + (Math.sin(toRadians(obj.angle)) * 60);

            obj.draw();
        }

        // request next frame
        requestAnimationFrame(render);
    }

    self.init = init;

    return self;

}

var Circle = function(ctx, options) {
    var self = this;

    self.x = 20;
    self.y = 20;

    var radius = 10;

    // var config = {
        
    // }

    // _.assignIn(config, options);

    self.draw = function() {
        ctx.beginPath();
        ctx.arc(self.x, self.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }

    return self;
}

var effects = new Effects(document.querySelector('canvas'));
effects.init();