/**
 * Created by fmontoya on 11/04/2015.
 */
var map;

var mercator = new OpenLayers.Projection('EPSG:900913');

var wgs84 = new OpenLayers.Projection('EPSG:4326');

function creaMapaBase() {


   var mapOptions = {
    //resolutions: resolutions,
    projection: mercator,
    //maxExtent: maxExtent,
    units: "meters",
    controls: [],
    displayProjection: wgs84,
    numZoomLevels: 24
    //,      restrictedExtent: restricted
  };
  map = new OpenLayers.Map('map', mapOptions);

}

function agregaMapasGoogle() {
  var gsat = new OpenLayers.Layer.Google(
    "Google Satellite",
    { type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 19, visibility: false, sphericalMercator: true }
  );
  var gphy = new OpenLayers.Layer.Google(
    "Google Physical",
    { type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 15, visibility: false, sphericalMercator: true }
  );
  var gmap2 = new OpenLayers.Layer.Google(
    "Google Streets", // the default
    { numZoomLevels: 22, visibility: false, sphericalMercator: true }
  );
  var ghyb = new OpenLayers.Layer.Google(
    "Google Hybrid",
    { type: google.maps.MapTypeId.HYBRID, numZoomLevels: 19, visibility: false, sphericalMercator: true }
  );

  map.addLayers([gsat, gphy, gmap2, ghyb]);

  map.setBaseLayer(gmap2);
}

function agregaOSM() {
  var osm = new OpenLayers.Layer.OSM("Open Street Map", null, {

    transitionEffect: 'resize'

  });
  map.addLayers([osm]);
}

function agregaContronlesDesk() {
  map.addControl(new OpenLayers.Control.PanZoomBar({
    position: new OpenLayers.Pixel(2, 15)
  }));
  map.addControl(new OpenLayers.Control.Navigation());
  map.addControl(new OpenLayers.Control.Scale());
  map.addControl(new OpenLayers.Control.MousePosition());
  map.addControl(new OpenLayers.Control.LayerSwitcher());
  map.addControl(new OpenLayers.Control.Attribution());
  map.addControl(new OpenLayers.Control.OverviewMap());
  $(".olControlMousePosition").css("margin-bottom", "15px");
}

var MdlMap = {
  ini: function () {
    creaMapaBase();
    agregaMapasGoogle();
    agregaContronlesDesk();
    agregaOSM();
    map.setCenter(new OpenLayers.LonLat(-75.56889, 6.232323).transform(wgs84, mercator), 8);
  }

};
