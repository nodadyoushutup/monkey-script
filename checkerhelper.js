// ==UserScript==
// @name        PTP Torrent Checking Helper
// @author      lerk08
// @namespace   PTPTorrentCheckingHelper
// @description A helper script for checking torrent image resolution on PTP.
// @include     https://passthepopcorn.me/torrents.php?id=*
// @version     1.0.5
// @grant       none
// ==/UserScript==
jQuery(document).ready(function() {
  function getImageResolution(image) {
    imageWidth = image.naturalWidth;
    imageHeight = image.naturalHeight;
    aspectRatio = imageWidth / imageHeight;
    aspectRatio = aspectRatio.toFixed(3);
    return [imageWidth,imageHeight,aspectRatio];
  }

  function parseImageAddress(url) {
    if (url.indexOf('image.php?') != -1) {
      url = decodeURIComponent(url.substring(url.indexOf('i=')+2));
    }
    urlDomain = url.substring(url.indexOf('//')+2);
    urlDomain = urlDomain.substring(0, urlDomain.indexOf('/'));
    urlCheck = urlDomain.toLowerCase();
    if (urlCheck.indexOf('imageshack') != -1) {
      domainColor = "red";
    } else if (urlCheck.indexOf('tinypic') != -1) {
      domainColor = "red";
    } else if (urlCheck.indexOf('imgur') != -1) {
      domainColor = "red";
    } else if (urlCheck.indexOf('imagebam') != -1) {
      domainColor = "yellow";
    } else if (urlCheck.indexOf('imagebox') != -1) {
      domainColor = "yellow";
    } else {
      domainColor = "white";
    }
    urlFileName = url.substring(url.lastIndexOf('/')+1);
    fileExtension = urlFileName.substring(urlFileName.lastIndexOf('.')+1).toLowerCase();
    if (fileExtension != "png") {
      allowedExtension = false;
    } else {
      allowedExtension = true;
    }
    return [urlDomain, domainColor, urlFileName, allowedExtension];
  }

  jQuery('.movie-page__torrent__panel').on({
    mouseenter: function() {
      resolution = getImageResolution(this);
      domain = parseImageAddress(this.getAttribute('src'));
      jQuery(document.body).append('<div id="helperImageDiv"><p>' + resolution[0] + ' x ' + resolution[1] + '</p> | <p>AR: ' + resolution[2] + ' : 1</p> | <p class="domainColor">' + domain[0] + '</p> | <p class="fileNameColor">' + domain[2] + '</p></div>');
      jQuery('#helperImageDiv').css({"position":"fixed", "bottom":"50px", "left":"0", "min-width":"400px", "z-index":"5000", "padding":"10px", "background-color":"#333", "border":"solid thin black", "border-radius":"0 5px 5px 0", "text-align":"right", "font-size":"2em", "color":"white"});
      jQuery('#helperImageDiv p').css({"display":"inline", "margin":"0 10px"});
      if (domain[3] === false) {
        jQuery('.fileNameColor').css({"color":"red"});
      }
      jQuery('.domainColor').css({"color": domain[1]});
    }, mouseleave: function() {
      jQuery('#helperImageDiv').remove();
    }
  }, '.bbcode__image');
});
