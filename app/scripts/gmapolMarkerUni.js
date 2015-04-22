/**
 * Created by fmontoya on 11/04/2015.
 */

var MarkerMove = function (nombre,latini,lonini) {

  /**
   * variable que representa la capa de las markas
   *
   * @type OpenLayers.Layer.Markers
   */
  this.markers;

  this.marker;

  /**
   * crea e incluye la capa de markas en el mapa
   * @param {string} nombre
   * @param {Openlayer.map} map
   *
   */
  this.addLayerMarker = function (nombre,map) {

    this.markers = new OpenLayers.Layer.Markers(nombre,{attribution:"nombre"});
    map.addLayer(this.markers);
  };

  /**
   * retorna una icono correspondiente al path ingresado
   *
   * @param {string}
   *            pathicono
   * @returns {OpenLayers.Icon}
   * @deprecated hay que modificar el archivo para modificar las dimensiones del icono
   */
  this.getIcono= function (pathicono) {
    var size = new OpenLayers.Size(20, 34);
    var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);

    var icon = new OpenLayers.Icon(pathicono, size, offset);

    // alert("/icon/"+categ+".png");

    return icon;
  };

  /**
   * incluye una marka sencilla en el mapa
   *
   * @param {OpenLayers.LonLat}
   *            point
   *
   */
  this.addMarkerPoint = function (point) {
    if (this.markers) {
      this.marker = new OpenLayers.Marker(point);
      this.markers.addMarker(this.marker);

    }

  };

  this.addMarker = function (latitud,longitud) {
    this.addMarkerPoint(new OpenLayers.LonLat(longitud, latitud))
  };

  this.removeMark = function(){
    this.markers.removeMarker(this.marker);
  };

  this.moveMarker= function (latitud,longitud) {
    var newLonLat = new OpenLayers.LonLat(longitud, latitud);
    this.moveMarkerLatLon(newLonLat);
  };

  this.moveMarkerLatLon = function (newLonLat) {
    var newPx = map.getLayerPxFromLonLat(newLonLat);
    this.marker.moveTo(newPx);
  };

  this.addLayerMarker(nombre,map);

  if (latini && lonini) {
    this.addMarker(latini, lonini);
  }

};
