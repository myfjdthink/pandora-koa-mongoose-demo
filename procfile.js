'use strict';

module.exports = (pandora) => {

  pandora
    .fork('klg-koa-demo', './dist/App.js');

  /**
   * you can also use cluster mode to start application
   */
  // pandora
  //   .cluster('./.');

  /**
   * you can create another process here
   */
  // pandora
  //   .process('background')
  //   .nodeArgs(['--expose-gc']);

  /**
   * more features please visit our document.
   * https://github.com/midwayjs/pandora/
   */

};