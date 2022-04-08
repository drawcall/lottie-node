function IImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.initElement(data, globalData, comp);
  this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h };
}

extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement);

IImageElement.prototype.createContent = function () {
  var assetPath = this.globalData.getAssetsPath(this.assetData);

  this.innerElem = createTag('image');
  this.innerElem.width = this.assetData.w;
  this.innerElem.height = this.assetData.h;
  this.layerElement.appendChild(this.innerElem);
};

IImageElement.prototype.sourceRectAtTime = function () {
  return this.sourceRect;
};
