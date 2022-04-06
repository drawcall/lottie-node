(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(function () {
      return factory(root);
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(root);
  } else {
    root.lottie = factory(root);
    root.bodymovin = root.lottie;
  }
})(global || {}, function (global) {
  "use strict";
  /*<%= contents %>*/
  var lottiejs = {};

  var _isFrozen = false;

  function setLocationHref(href) {
    locationHref = href;
  }

  function setSubframeRendering(flag) {
    subframeEnabled = flag;
  }

  function loadAnimation(params) {
    if (standalone === true) {
      params.animationData = JSON.parse(animationData);
    }
    return animationManager.loadAnimation(params);
  }

  function setQuality(value) {
    if (typeof value === "string") {
      switch (value) {
        case "high":
          defaultCurveSegments = 200;
          break;
        case "medium":
          defaultCurveSegments = 50;
          break;
        case "low":
          defaultCurveSegments = 10;
          break;
      }
    } else if (!isNaN(value) && value > 1) {
      defaultCurveSegments = value;
    }
    if (defaultCurveSegments >= 50) {
      roundValues(false);
    } else {
      roundValues(true);
    }
  }

  function inBrowser() {
    return true;
  }

  function installPlugin(type, plugin) {
    if (type === "expressions") {
      expressionsPlugin = plugin;
    }
  }

  function getFactory(name) {
    switch (name) {
      case "propertyFactory":
        return PropertyFactory;
      case "shapePropertyFactory":
        return ShapePropertyFactory;
      case "matrix":
        return Matrix;
    }
  }

  lottiejs.canvas = null;
  lottiejs.setCanvas = function (canvas) {
    lottiejs.canvas = canvas;
  };
  lottiejs.play = animationManager.play;
  lottiejs.pause = animationManager.pause;
  lottiejs.setLocationHref = setLocationHref;
  lottiejs.togglePause = animationManager.togglePause;
  lottiejs.setSpeed = animationManager.setSpeed;
  lottiejs.setDirection = animationManager.setDirection;
  lottiejs.stop = animationManager.stop;
  lottiejs.loadAnimation = loadAnimation;
  lottiejs.setSubframeRendering = setSubframeRendering;
  lottiejs.resize = animationManager.resize;
  //lottiejs.start = start;
  lottiejs.goToAndStop = animationManager.goToAndStop;
  lottiejs.destroy = animationManager.destroy;
  lottiejs.setQuality = setQuality;
  lottiejs.inBrowser = inBrowser;
  lottiejs.installPlugin = installPlugin;
  lottiejs.freeze = animationManager.freeze;
  lottiejs.unfreeze = animationManager.unfreeze;
  lottiejs.getRegisteredAnimations = animationManager.getRegisteredAnimations;
  lottiejs.__getFactory = getFactory;
  lottiejs.version = "[[BM_VERSION]]";

  var standalone = "__[STANDALONE]__";
  var animationData = "__[ANIMATIONDATA]__";
  var renderer = "";
  
  return lottiejs;
});
