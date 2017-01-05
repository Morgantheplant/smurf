const OverlayMethods = {};

OverlayMethods.initOverlay = function initalSetUp(bounds){
  this._imageHash = {};
  this._bounds = bounds;
  this._map = null;
  this._div = null;
  this._img = null;
}

OverlayMethods.onAdd = function onAdd() {
  this._div = document.createElement('div');
  var div = this._div;
  div.className="forecast-image-container"
  this.updateImage(this._src);
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};

OverlayMethods.draw = function draw() {
  var overlayProjection = this.getProjection();
  var sw = overlayProjection.fromLatLngToDivPixel(this._bounds.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this._bounds.getNorthEast());
  var div = this._div;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
};

OverlayMethods.onRemove = function onRemove() {
  this._div.parentNode.removeChild(this._div);
  this._div = null;
  this._img = null;
};

OverlayMethods.updateImage = function updateImage(src){
  if(this._div){
    if(!this._imageHash[src]){
      this.createImage(src);
    }
    if(this._img){
      this._div.replaceChild(this._imageHash[src], this._img);
    } else {
      this._div.appendChild(this._imageHash[src])
    }
    
    this._img = this._imageHash[src]
  }
}

OverlayMethods.createImage = function createImage(src){
  const img = document.createElement('img')
  img.className = "forecast-image";
  img.src = src
  this._imageHash[src] = img;
}


export default OverlayMethods;