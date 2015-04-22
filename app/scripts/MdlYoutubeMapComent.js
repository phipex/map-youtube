/**
 * Modulo que genera un mapa y un video de youtube, debe tener
 * en la pagina que es llamado un div con id 'mapa' y otro con id 'player'
 * @type {{interval: null, dataTrack: null, droneMarker: null, videodelay: null, compare_fn: Function, load: Function, registraInterval: Function, ini: Function, getReportByTime: Function, drawTrack: Function, goToTrackTime: Function, goToVideoTime: Function, goToVideoTimeByTrack: Function, getTrackLen: Function, getVideoLen: Function}}
 */
var MdlYoutubeMapComent = {
    interval:null,
    dataTrack:null,
    droneMarker:null,
    videodelay:null,
    listPhoto:[],
    listCommet:[],
    eventAddComment:null,
    current:0,
    compare_fn:function(value, item){

      var time = item.tim;

      return value - time;
    },
  /**
   * funcion que inicializa el video y el mapa
   * @param data track que debe ser mostrado
   * @param vidid id del video
   * @param delay tiempo en milisegundos que demora antes
   * de sincronizarse con el mapa
   * @param optvideo
   * @param icon
   */
    load:function(data,vidid,delay,optvideo,icon,listPhoto,listCommet){
      var ini = MdlYoutube.isIni();
      if(!ini)
      {

        MdlYoutube.onPlayerReady= function () {
          MdlYoutubeMapComent.registraInterval();
          MdlYoutube.playVideo();
        };

        this.ini(vidid,optvideo);


        MdlGmap.ini();
      }else {//TODO si ya tiene el player
        //TODO borra los datos del mapa

      }
      this.videodelay = (delay)?delay:null;

      //TODO agrega los datos del mapa
      this.drawTrack(data,icon);
      this.drawPhoto(listPhoto);
      this.drawCommet(listCommet);


    },

    registraInterval: function () {
      if(this.interval)
      {
          clearInterval(this.interval);
      }
      this.interval=setInterval(
              function(){

                var current = MdlYoutube.getCurrentTime();

                if (current != MdlYoutubeMapComent.current) {
                  MdlYoutubeMapComent.current = current;

                  var delay = (MdlYoutubeMapComent.videodelay)?MdlYoutubeMapComent.videodelay:0;

                  MdlYoutubeMapComent.goToTrackTime((current * 1000)-delay);

                };
                
              },
              800
      );
    },
    ini:function(divid,option){

      //console.info(divid);
      //TODO crea el player
      MdlYoutube.ini(divid,option);

    },
  /**
   * retorna el reporte segun el tiempo que se le solicite
   * @param current
   * @returns {*}
   */
    getReportByTime:function(current){
      //TODO reporta tiempo
      //console.info(current, converLabel(current));
      if (current) {
        var index = binarySearch(this.dataTrack, current, this.compare_fn);
        //console.info(index);
        //console.info("preguntar", current, index);
        current = Math.round(current);
        //$divt.html(current);
        //console.info("preguntar round",current);

        var item = this.dataTrack[index];

        return item;
      }
    },
    drawTrack:function(RECORDS,icon){
      //TODO pinta el track
      var layerrepo = new gmapLayerLine();

      var latlonIni;
      var hea;
      $(RECORDS).each(function(index,item){
        //console.info(item);
        var lat = convert(item.lat);
        var lon = convert(item.lon);
        var latlon = new google.maps.LatLng(lat,lon);
        //console.info(lat,lon,latlon);
        hea = (!hea)?item.hea:null;
        latlonIni = (!latlonIni)?latlon:null;
        layerrepo.pushPoint(lat,lon);
        item.latlon = latlon;
      });
      layerrepo.drawRute();
      layerrepo.toExtend(map);
      this.dataTrack = RECORDS;

      this.droneMarker = new MarkerMoveRotateUni(latlonIni.lat(),latlonIni.lng(),hea,icon);
      /*//borrar
markerInicio = new google.maps.Marker({
    position: latlonIni,
      map: map
  });*/

    },
  /**
   * llama el video al determinado tiempo
   * @param current
   */
    goToTrackTime:function(current){

      var item = this.getReportByTime(current);
      if (item) {
        //console.info("item", item.latlon);

        map.panTo(item.latlon);
        var lat = item.latlon.lat();
        var lon = item.latlon.lng();
        var angle = item.hea;
        //markerInicio.setPosition(item.latlon);
        this.droneMarker.moveMarker(lat,lon,angle);
      }
    },
  /**
   * Reproduce el video desde el tiempo indicado
   * @param current
   */
    goToVideoTime: function (current) {
      MdlYoutube.setTime(current);
    },
  /**
   * Envia a un determinado punto en el track
   * @param indexTrack indice del track
   **/
    goToVideoTimeByTrack: function (indexTrack) {
      var item = this.dataTrack[indexTrack];
      if (item) {
        //console.info("item", item);
        var current = item.tim;

        var delay = (MdlYoutubeMapComent.videodelay)?MdlYoutubeMapComent.videodelay:0;

        current = current + delay;

        //console.info("time",current,converLabel(current));

        current = current/1000;
        //console.info(current);
        this.goToVideoTime(current);

      }
    },
  /**
   * retorna el numero de hitos en el track
   * @returns {*}
   */
    getTrackLen: function () {
      if (this.dataTrack) {
        var len = this.dataTrack.length;
        return len;
      }

    },
  /**
   * retorna el tiempo completo del video
   * @returns {*}
   */
    getVideoLen: function () {
      return MdlYoutube.getVideoLen();
    },

    drawPhoto:function(listPhoto){
      console.log(listPhoto);
      if (listPhoto) {
        var len = listPhoto.length;
        for (var i = len - 1; i >= 0; i--) {
          var obj = listPhoto[i];
          console.log(obj);
          var lat = convert(obj.lat);
          var lon = convert(obj.lon);
          var latlon = new google.maps.LatLng(lat,lon);
          var marker = new google.maps.Marker({
              position: latlon,
                map: map,
                icon:"images/photo.png"
            });
          var addMsg = function(marker,contentString){
            
                   
            google.maps.event.addListener(marker, 'click', function() {
              console.info(contentString);
              
              var infowindow = new google.maps.InfoWindow({
                  content: contentString
              });
              infowindow.open(map,marker);
            });
          }
          var contentString = "<div>"+obj.title+
          "</br><a href='#' data-foto='"+obj.fot+"' data-title='"+obj.title+"' onClick='MdlYoutubeMapComent.eventFoto(event)'>Ver Foto</a></div>";
          
          addMsg(marker, contentString);
          this.listPhoto.push(marker);

        };

      };
    },
    drawCommet:function(listCommet){
      console.log(listCommet);
      if (listCommet) {
        var len = listCommet.length;
        for (var i = len - 1; i >= 0; i--) {
          var obj = listCommet[i];
          console.info(obj);
          var lat = convert(obj.lat);
          var lon = convert(obj.lon);
          var latlon = new google.maps.LatLng(lat,lon);
          var marker = new google.maps.Marker({
              position: latlon,
                map: map,
                icon:"images/comment-map-icon.png"
            });
          var contentString = obj.com;
          
          var addMsg = function(marker,contentString){
            
                   
            google.maps.event.addListener(marker, 'click', function() {
              
              
              var infowindow = new google.maps.InfoWindow({
                  content: contentString
              });
              infowindow.open(map,marker);
            });
          }
          addMsg(marker, contentString);
          this.listCommet.push(marker);

        };

      };
    },
    eventFoto:function(event){
        console.info(event.originalTarget);
        var $contenedor = $(event.originalTarget)
        var foto = $contenedor.data("foto");
        var titulo = $contenedor.data("title");;
        $("#imagen").empty();
                        //FotosVerticales.inLoad = true;
                        var imag = $("<img/>")
                            .load(function () {
                                console.log("image loaded correctly");
                                //FotosVerticales.inLoad = false;
                            })
                            .error(function () {
                                console.log("error loading image");
                                //FotosVerticales.eventoFailLoad();
                            })

                            .attr({"src": "images/" + foto,
                              "id": "fotoVisor",
                    "class":"todoAncho"});
                        $("#imagen").append(imag);
                        //FotosVerticales.timeout = setTimeout(FotosVerticales.eventoFailLoad, 5000);
$(document).bind('PgwModal::PushContent', function() {
                console.info("hola push",$(".pm-content #imagen").length);
                $(".pm-content #imagen").zoom({
          duration:250,
          callback: function(){
            alert("Pase el mause sobre la foto para verla a mejor zoom");
          }
          });
            });
                        var ancho = $(window).width();
                        var alto = $(window).height();
                        console.info("ancho", ancho);
                        if (ancho < 500) {
                            ancho = 500;
                        }
                        ancho = ancho * .9;
                        alto = alto * .9;
                        //$("#imagen").css("width",ancho);
                        $("#imagen").css("max-width", ancho);
                        $("#imagen").css("max-height", alto);
                        $.pgwModal({
                            target: '#modalContent',
                            title: titulo,
                            maxWidth: ancho,
                            maxheight: alto
                        });
    },
    activateAddComment:function(){
      this.eventAddComment = google.maps.event.addListener(map, 'click', function(event) {
        var pos = event.latLng;
        console.info("click");
        var contentString = "<div>Ingrese un Comentario <br/><textarea rows='4' cols='50'></textarea><br/><button>Agregar</button></div>";
        var $contenido = $(contentString);
        var marker = new google.maps.Marker({
              position: pos,
                map: map
                
            });
        var infowindow = new google.maps.InfoWindow({
          content: $contenido.html(),
          position: pos
        });
        infowindow.open(map);

      });

    },
    deactivateAddComment:function(){
      google.maps.event.removeListener(MdlYoutubeMapComent.eventAddComment);
    }
  };
