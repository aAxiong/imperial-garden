function SiriWave(opt) {
  this.opt = opt || {};

  this.K = 2;
  this.F = 6;
  this.speed = this.opt.speed || 0.1;
  this.noise = this.opt.noise || 0;
  this.phase = this.opt.phase || 0;

  if (!devicePixelRatio) devicePixelRatio = 1;
  this.width = devicePixelRatio * (this.opt.width || 320);
  this.height = devicePixelRatio * (this.opt.height || 100);
  this.MAX = (this.height / 2) - 4;

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.canvas.style.width = "100%";
  this.canvas.style.height = "4rem";

  if(this.opt.container)
  {
    if(this.opt.container.prepend)
    this.opt.container.prepend(this.canvas);
  }
  else if(document.getElementById('canvasBox'))
  {
    if(document.getElementById('canvasBox').prepend)
      document.getElementById('canvasBox').prepend(this.canvas);
  }

  this.ctx = this.canvas.getContext('2d');

  this.run = false;
}

SiriWave.prototype = {

  _globalAttenuationFn: function (x) {
    return Math.pow(this.K * 4 / (this.K * 4 + Math.pow(x, 4)), this.K * 2);
  },

  _drawLine: function (attenuation, color, width) {
    this.ctx.moveTo(0, 0);
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 4;
    var x, y;
    for (var i = -this.K; i <= this.K; i += 0.01) {
      x = this.width * ((i + this.K) / (this.K * 2));
      y = this.height / 2 + this.noise * this._globalAttenuationFn(i) * (1 / attenuation) * Math.sin(this.F * i - this.phase);
      this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  },

  _clear: function () {
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'source-over';
  },

  _draw: function () {
    if (!this.run) return;

    this.phase = (this.phase + this.speed) % (Math.PI * 64);
    this._clear();
    this._drawLine(-2, 'rgba(240,119,154,0.1)');
    this._drawLine(-6, 'rgba(240,119,154,0.2)');
    this._drawLine(4, 'rgba(240,119,154,0.4)');
    this._drawLine(2, 'rgba(240,119,154,0.6)');
    this._drawLine(1, 'rgba(240,119,154,1)', 1.5);

    requestAnimationFrame(this._draw.bind(this), 1000);
  },
  start: function () {
    this.phase = 0;
    this.run = true;
    this._draw();
  },

  stop: function () {
    this.run = false;
    this._clear();
  },

  setNoise: function (v) {
    this.noise = Math.min(v, 1) * this.MAX;
  },

  setSpeed: function (v) {
    this.speed = v;
  },

  set: function (noise, speed) {
    this.setNoise(noise);
    this.setSpeed(speed);
  }

};

export {
  SiriWave
}
