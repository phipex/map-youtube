/**
 * Created by fmontoya on 11/04/2015.
 */

/**
 * Crea un icono que puede ser rotado
 * @param options
 * @constructor
 */
var RotateIcon = function (options) {
      options = options || {};
      var isComplete = (options.url !== undefined);

      isComplete = isComplete && (options.width !== undefined);

      isComplete = isComplete && (options.height !== undefined);

      if(!isComplete)
      {
        throw new Error("No se han ingresado los paramtros necesarios");
        return;
      }
      this.options = {};
      this.options.width = options.width;
      this.options.height = options.height;
      this.rImg = new Image();

      this.rImg.src = options.url;
      var hidenContent = document.createElement("div");
      hidenContent.style.display = "none";
      document.body.appendChild(hidenContent);
      hidenContent.appendChild(this.rImg);
      var canvas = document.createElement("canvas");
      canvas.width = this.options.width;
      canvas.height = this.options.height;
      this.context = canvas.getContext("2d");
      this.canvas = canvas;
  /**
   * Retorna un string que representa la imagen en base64
   * @returns {string}
   */
      this.getUrl= function () {
        this.context.save();
        this.context.restore();
        return this.canvas.toDataURL('image/png');

      };

  /**
   * rota el icono
   * @param options
   */
      this.setRotation= function (options) {
        //console.info("setrotation",options);
        options = options || {};
        //console.info((options.deg === undefined) && (options.rad  === undefined));
        if((options.deg === undefined) && (options.rad  === undefined))
        {
          throw new Error("No se han ingresado los paramtros necesarios");
          return;
        }

        var canvas = this.canvas,
          degrees = (options.deg != null)? options.deg :
          options.rad* 180 / Math.PI ,
          image = this.rImg,
          ctx = this.context;
        //console.info("degrees",degrees);
        //console.info(canvas);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.rotate(degrees*Math.PI/180);
        //console.info("degrees%180==0",degrees%180==0);
        /*if(degrees%180==0){
          console.info("true");
          ctx.drawImage(image, -image.width/2,-image.height/2);
        }else{
          console.info("false");
          ctx.drawImage(image, -image.width/2,-canvas.width/2,image.width, canvas.width);
        }*/
        ctx.drawImage(image, -image.width/2,-canvas.width/2,image.width, canvas.width);

        ctx.restore();
        //console.info("despues de rotar");
      };
  /**
   * Retorna un string que representa la imagen en base,
   * despues de ser rotada
    * @param options
   * @returns {string}
   */
  this.getUrlRotation= function (options) {
        this.setRotation(options);
        return this.getUrl();
      };

      //console.info("antes de la primera rotacion");
      this.setRotation({deg:0});
    };


/**
 * Crea una marca que se posiciona en el centro y puede rotada
 * @param latini *latitud inicial
 * @param lonini *longitud inicial
 * @param angini angulo inicial
 * @param icon valores del icono a ser rotado
 * @constructor
 */
var MarkerMoveRotateUni = function(latini,lonini,angini,icon){


  this.marker=null;

  this.icon = null;

  /**
   * Retorna el objeto para ser agregado a la marca
   * @param angle
   * @returns {{url, size: (sld.Size|sld."Size"|*), origin: google.maps.Point, anchor: google.maps.Point}}
   */
  this.getMarkerIcon=function(angle){
    if (this.icon) {
      //console.info("this.icon",this.icon);
      var height = this.icon.options.height;
      var width = this.icon.options.width;
      var url = (angle)?this.icon.getUrlRotation({deg: angle}):this.icon.getUrl()
      var size = new google.maps.Size(height, width);
      var origin = new google.maps.Point(0,0);
      var anchor = new google.maps.Point(height/2, width/2);
      return {
          url: url,
          // This marker is 20 pixels wide by 32 pixels tall.
          size: size,
          // The origin for this image is 0,0.
          origin: origin,
          // The anchor for this image is the base of the flagpole at 0,32.
          anchor: anchor
          //,scaledSize: new google.maps.Size(40, 40)
      }
    };
  };

  /**
   * Crea la marca
   * @param latini
   * @param logini
   * @param angini
   * @param iconOptions
   */
  this.createMarker= function (latini,logini,angini,iconOptions) {
    //console.info("this",this);
    var myLatLng = new google.maps.LatLng(latini, logini);
    //console.info("marker position",myLatLng);
    var markerOptions = {
      position: myLatLng,
      map: map
      };
      if(iconOptions)
      {
        this.icon = new RotateIcon(iconOptions);
        //console.info("iconOptions",iconOptions);
        markerOptions.icon = this.getMarkerIcon(angini);
      }

      this.marker = new google.maps.Marker(markerOptions);

  };

  this.createMarker(latini,lonini,angini,icon);

  /**
   * Mueve y rota la marga a la posicion indicada y segun el angulo
   * @param lat
   * @param lon
   * @param angle
   */
  this.moveMarker= function (lat,lon, angle) {
      if (angle) {
        if (this.icon) {
                //console.info("cambio icono");
                this.marker.setIcon(this.getMarkerIcon(angle));
              }
      }
      //console.info("lat lon",lat,lon);
     this.marker.setPosition(new google.maps.LatLng(lat, lon));
    };

  //console.info(this);
}
