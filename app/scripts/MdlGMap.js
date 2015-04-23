/**
 * Created by fmontoya(phipex) on 13/04/2015.
 */
/**
 * Crea el mapa de google
  * @type {{ini: Function}}
 */
var MdlGmap = {
  ini:function(){
    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(6.2323,-75.56889)
    };
    map = new google.maps.Map(document.getElementById('map'),
      mapOptions);
  }
};
