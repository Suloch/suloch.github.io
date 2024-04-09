(function() {

    var reqreference, img, width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: 0, y: height};

        largeHeader = document.getElementById('newheader');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('canvas-header');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        img = new Image();
        img.onerror = function(){
          console.log("Error in loading image");
        };
        img.src="pictures/flower.svg";

        // create particles
        circles = [];
        for(var x = 0; x < 5; x++) {
            var c = new Circle();
            circles.push(c);
        }
        animate();
    }


    // Event handling
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in circles) {
                circles[i].draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Canvas manipulation
    function Circle() {
        var _this = this;

        // constructor
        (function() {
            _this.pos = {};
            init();
            console.log(_this);
        })();

        function init() {
            _this.pos.x = Math.random()*width;
            _this.pos.y = -10-Math.random()*100;
            _this.angular_velocity = 0.003;
            _this.scale = 0.1+Math.random()*0.3;
            _this.velocity = Math.random();

        }

        this.draw = function() {
            if(_this.pos.y >= height || _this.pos.x >= width) {
                init();
            }
            _this.pos.y += _this.velocity;


            _this.angular_velocity = _this.angular_velocity + 5;
            ctx.save();
            ctx.translate(_this.pos.x+85, _this.pos.y+83);
            ctx.rotate(_this.angular_velocity * -1);
            ctx.drawImage(img, -85, -83, 170, 166);
          //  ctx.rotate(_this.angle);
          //  ctx.translate(-1*(_this.pos.x+85), -1*(_this.pos.y+83));
            ctx.restore();

            console.log("image drawn");



        };
    }

})();
