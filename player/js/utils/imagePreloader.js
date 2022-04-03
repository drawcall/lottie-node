var onlyCanvas;
var ImagePreloader = (function () {
  var createOnlyFakeImg = function () {
    if (!onlyCanvas) {
      onlyCanvas = createTag("canvas");
      onlyCanvas.width = 1;
      onlyCanvas.height = 1;
      var ctx = onlyCanvas.getContext("2d");
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(0, 0, 1, 1);
    }
    return onlyCanvas;
  };

  function imageLoaded() {
    this.loadedAssets += 1;
    if (this.loadedAssets === this.totalImages) {
      if (this.imagesLoadedCb) {
        this.imagesLoadedCb(null);
      }
    }
  }

  function getAssetsPath(assetData, assetsPath, original_path) {
    var path = "";
    if (assetData.e) {
      path = assetData.p;
    } else if (assetsPath) {
      var imagePath = assetData.p;
      if (imagePath.indexOf("images/") !== -1) {
        imagePath = imagePath.split("/")[1];
      }
      path = assetsPath + imagePath;
    } else {
      path = original_path;
      path += assetData.u ? assetData.u : "";
      path += assetData.p;
    }
    return path;
  }

  function createImageData(assetData) {
    var path = getAssetsPath(assetData, this.assetsPath, this.path);
    var img = createTag("img");
    console.log(img);
    img.onload(this._imageLoaded.bind(this));
    img.onerror(
      function () {
        ob.img = createOnlyFakeImg();
        this._imageLoaded();
      }.bind(this)
    );
    img.src = path;
    var ob = {
      img: img,
      assetData: assetData,
    };
    return ob;
  }

  function loadAssets(assets, cb) {
    this.imagesLoadedCb = cb;
    var i,
      len = assets.length;
    for (i = 0; i < len; i += 1) {
      if (!assets[i].layers) {
        this.totalImages += 1;
        this.images.push(this._createImageData(assets[i]));
      }
    }
  }

  function setPath(path) {
    this.path = path || "";
  }

  function setAssetsPath(path) {
    this.assetsPath = path || "";
  }

  function getImage(assetData) {
    var i = 0,
      len = this.images.length;
    while (i < len) {
      if (this.images[i].assetData === assetData) {
        return this.images[i].img;
      }
      i += 1;
    }
  }

  function destroy() {
    this.imagesLoadedCb = null;
    this.images.length = 0;
  }

  function loaded() {
    return this.totalImages === this.loadedAssets;
  }

  return function ImagePreloader() {
    this.loadAssets = loadAssets;
    this.setAssetsPath = setAssetsPath;
    this.setPath = setPath;
    this.loaded = loaded;
    this.destroy = destroy;
    this.getImage = getImage;
    this._createImageData = createImageData;
    this._imageLoaded = imageLoaded;
    this.assetsPath = "";
    this.path = "";
    this.totalImages = 0;
    this.loadedAssets = 0;
    this.imagesLoadedCb = null;
    this.images = [];
  };
})();
