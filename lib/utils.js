var Util = {
  dir: function (vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist: function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  norm: function (vec) {
    return Util.dist([0,0], vec);
  },

  randomVec: function (length) {
    // var deg = 2 * Math.PI * Math.random();
    var deg = 2 * Math.PI * Math.random();

    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  attackVec: function (length, pos, attackPos) {
    // var deg = 2 * Math.PI * Math.random();

    var x = attackPos[0] - pos[0];
    var y = attackPos[1] - pos[1];

    var deg;
    if (x > 0 && y > 0) {
        deg = Math.atan(x/y);
    } else if (x > 0 && y < 0) {
        deg = Math.atan(x/y) - Math.PI;
    } else if (x < 0 && y > 0) {
        deg = Math.atan(x/y);
    } else if (x < 0 && y < 0) {
        deg = Math.atan(x/y) - Math.PI;
    }

    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  scale: function (vec, m) {
    // return [vec[0] * m, vec[1], m];
    return [vec[0] * m, vec[1] * m , m];

  },

  inherits: function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass; }
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  },
};

module.exports = Util;
