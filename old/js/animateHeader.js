(function() {
  var img, width, height, header, canvas, ctx, flowers, target, animate, animateHeader=true, invert=false;

  initHeader();
  addListeners();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight * 0.7;
    target = {x: 0, y: height};

    header = document.getElementById('newheader');
    header.style.height = height +'px';

    canvas = document.getElementById('canvas-header');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    img = [];
    for(var x = 1; x < 4; x++)
    {
      imgObj = new Image();

      console.log("pictures/flower"+x+".png");
      imgObj.src="pictures/flower"+x+".png";

      img.push(imgObj);
    }

    flowers = [];
    for(var x = 0; x < width /8; x++)
    {
      var f = new Flower();
      flowers.push(f);
    }
    animate();
  }

  function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function scrollCheck() {
    console.log(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
      scrollValue = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if(scrollValue > height) animateHeader = false;
      else animateHeader = true;
      if(scrollValue > 0) {
        if(invert == false) {
          invert = true;
          newheader.style.backgroundColor = '#93bcff';
        }
      }

      else {
        if(invert == true){
          newheader.style.backgroundColor = '#f46f58';
          invert = false;
        }
      }

  }

  function resize() {
      width = window.innerWidth;
      height = window.innerHeight * 0.7;
      newheader.style.height = height+'px';
      canvas.width = width;
      canvas.height = height;
      for(var f in flowers) {
        flowers[f].setX(0);
      }
  }

  function animate() {
    requestAnimationFrame(animate);

    if(animateHeader) {
      ctx.clearRect(0,0,width,height);
      for(var i in flowers) {
        flowers[i].draw();
      }
    }
  }

  function Flower() {
    var _this = this;

    (function() {
      _this.pos ={};
      init();
      console.log(_this);
    })();

    function init() {
      _this.pos.x = -300 + Math.random() * (width+200);
      _this.pos.y = -70-Math.random()*300;
      _this.angular_velocity = 3 + Math.random()*4;
      _this.velocity = 0.4+Math.random()*(0.8);
      _this.scale = 0.2+Math.random()*0.7;
      _this.flower = Math.random() * 3;
      _this.xVelocity = 0.1 + Math.random()*0.1;
      if(invert) {
        _this.pos.y = height + Math.random()*300;
      }
    }

    this.setX = function(x) {
      _this.pos.x = width;
    };


    this.draw = function() {
      if(invert==false) {
        if(_this.pos.y >= height || _this.pos.x >= width)
        {
          init();
        }
      }

      else {
        if(_this.pos.y <= -200 || _this.pos.x >= width)
        {
          init();
        }
      }
      if(invert == false){
        _this.pos.y += _this.velocity;
      }
      else {
        _this.pos.y -= _this.velocity;
      }
      _this.pos.x += _this.xVelocity;
      _this.flower = parseInt(_this.flower);

      var time = new Date();

      ctx.save();
      ctx.translate(_this.pos.x+85, _this.pos.y+83);
      ctx.rotate((((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds())*_this.angular_velocity);
      ctx.scale(_this.scale, _this.scale);
      ctx.drawImage(img[_this.flower], -42, -42, 85, 83);
      ctx.restore();


    }
  };

}) ();
