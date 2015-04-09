

/**
 * Created by fmontoya on 09/04/2015.
 */


var layerLinea = null;
var layerDireccionArroy = null;
var layerReportes = null;
var popup = null;

/**
 *
 */
var style_triangle = {
  strokeColor: "#215E10",
  fillColor: "#00FF00",
  strokeWidth: 2,
  pointRadius: 15,
  pointerEvents: "visiblePainted",
  //label: "${label}",
  fontColor: "#FFFFFF",
  fontSize: "12px",
  fontFamily: "Courier New, monospace",
  fontWeight: "bold",
  fillOpacity: 0.3,
  strokeOpacity: 0.3,
  labelOutlineColor: "#000000",
  labelOutlineWidth: 3

};

/**
 * estilo de la linea
 */
var style_line =
{
  strokeColor: "#00FF00",
  strokeOpacity: 0.5,
  strokeWidth: 4,
  pointRadius: 6,
  pointerEvents: "visiblePainted"
};
/**
 * estilo de la capa con flechas
 */
var style_arrow =
{
  strokeColor: "#00FF00",
  //strokeColor: "#F26A2B",
  strokeOpacity: 0.5,
  strokeWidth: 4,
  pointRadius: 6,
  pointerEvents: "visiblePainted"
};
/**
 * objeto tipo stylemap para las flechas
 */
var styleMapArrow = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
  {graphicName: "arrow", rotation: "${angle}"}, this.style_arrow));

/**
 *  Estilo que define la forma de presentar los reportes
 */
var styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
  {graphicName: "direcciion", rotation: "${hdn}"}, style_triangle));

OpenLayers.Renderer.symbol.arrow = [0, 2, 1, 0, 2, 2, 1, 0, 0, 2];
OpenLayers.Renderer.symbol.direcciion = [0, 3, 1, 0, 2, 3, 0, 3];



/**
 * Funcion encargada de renderizar las lineas y las direcciones asociadas
 */
function renderDirection(){
  var listPoints = getPointLayer(layerReportes);
  createLayersDirecction(listPoints);
  //map.events.trigger("zoomend", map);
  map.zoomOut();
}




/**
 *
 */
function renderRouete(featurecollection){
  console.info("renderRouete",layerReportes);
  var count = featurecollection.length;
  for (var i = 0; i < count; i++) {
    var obj = featurecollection[i];

  }

  var geojson_format = new OpenLayers.Format.GeoJSON();
  layerReportes = new OpenLayers.Layer.Vector("Reportes", {styleMap: styleMap});
  map.addLayer(layerReportes);
  layerReportes.events.register("featuresadded", layerReportes, function (evento) {

    renderDirection();
    renderConsultNaviation(evento.features);
  });
  layerReportes.addFeatures(geojson_format.read(featurecollection));
  map.zoomToExtent(layerReportes.getDataExtent(), true);
  selectFeature = new OpenLayers.Control.SelectFeature(
    layerReportes,
    {
      onSelect: evento,
      autoActivate: true
    }
  );
  map.addControl(selectFeature);
  console.info("renderRouete",layerReportes);
}

/**
 *  Extrae de una capa los features y los coloca en una lista
 */

/**
 *  Evento que es lanzado cuando el zoom del mapa es cambiado
 *  Dicha solicitud muestra o esconde las capas con las direcciones
 *   o los reportes segun el zoom
 */
function eventoCambioZoom(uno){
  //console.info(uno);
  //console.info(ruta);
  var zoomactual = uno.object.zoom;
  //console.info(zoomactual);
  //console.info(zoomactual,vestorLayerArroy,vector_layer);
  if (layerDireccionArroy){
    if (zoomactual < 15){
      layerDireccionArroy.setVisibility(false);
    } else{
      layerDireccionArroy.setVisibility(true);
    }
  }
  if (layerReportes){
    if (zoomactual < 18){
      layerReportes.setVisibility(false);
    } else{
      layerReportes.setVisibility(true);
    }

  }

}

/**
 *  Crea el layer con las direcciones (sentidos) de la ruta consultada
 */
function createLayersDirecction(listPoints){
  console.info("createLayersDirecction",layerLinea);
  console.info("createLayersDirecction",layerDireccionArroy);
  OpenLayers.Renderer.symbol.arrow = [0, 2, 1, 0, 2, 2, 1, 0, 0, 2];
  layerLinea = new OpenLayers.Layer.Vector("Linea");
  layerDireccionArroy = new OpenLayers.Layer.Vector("Direccion", {styleMap: styleMapArrow});
  map.addLayer(layerLinea);
  map.addLayer(layerDireccionArroy);
  var lineString = new OpenLayers.Geometry.LineString(listPoints);
  var lineFeature = new OpenLayers.Feature.Vector(lineString, null, style_line);
  points = [];
  //console.info(route[0].geometry);

  var linePoints = createDirection(lineFeature.geometry, "middle", true);
  for (var j = 0; j < linePoints.length; j++) {

    linePoints[j].attributes.lineFid = lineFeature.fid;
  }

  points = points.concat(linePoints);
  //console.info(points);
  //console.info("bounds ",bounds);
  layerLinea.addFeatures([lineFeature]);
  layerDireccionArroy.addFeatures(points);
  console.info("createLayersDirecction",layerLinea);
  console.info("createLayersDirecction",layerDireccionArroy);
}



var MdlTrack = {



};
