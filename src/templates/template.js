angular.module('jgallery').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('../../templates/jgallery.html',
    "<div ng-transclude ng-hide=\"options.mode !== 'full-screen' && isVisible\"></div><div class=\"jgallery jgallery-{{ options.mode }}\" data-jgallery-id=\"{{ id }}\" ng-show=isVisible ng-style=\"{\r" +
    "\n" +
    "        background: options.backgroundColor,\r" +
    "\n" +
    "        color: options.textColor,\r" +
    "\n" +
    "        'text-shadow': '0 0 1px ' + options.backgroundColor,\r" +
    "\n" +
    "        width: options.mode != 'full-screen' ? options.width : 'inherit',\r" +
    "\n" +
    "        height: options.mode != 'full-screen' ? options.height : 'inherit'\r" +
    "\n" +
    "     }\"><div jgallery-thumbnails ng-hide=\"thumbnailsIsHidden && ! thumbnailsIsFullScreen\" class=\"jgallery-thumbnails jgallery-thumbnails-{{ options.thumbnailsPosition }} {{ options.thumbType }}\" style=\"{{ thumbnailsIsVertical ? 'width: ' + thumbWidth : 'height: ' + thumbHeight }}px; background: {{ options.backgroundColor }}\" ng-class=\"{'full-screen': thumbnailsIsFullScreen}\"></div><div data-jgallery-preview></div></div>"
  );


  $templateCache.put('../../templates/preview.html',
    "<div class=zoom-container ng-style=\"{\r" +
    "\n" +
    "        'left': ! isSlider && ! thumbnailsIsHidden && options.thumbnailsPosition === 'left' ? thumbnails.clientWidth + 'px' : 0,\r" +
    "\n" +
    "        'right': ! isSlider && ! thumbnailsIsHidden && options.thumbnailsPosition == 'right' ? thumbnails.clientWidth + 'px' : 0,\r" +
    "\n" +
    "        'top': ! isSlider && ! thumbnailsIsHidden && options.thumbnailsPosition == 'top' ? thumbnails.clientHeight + 'px' : 0,\r" +
    "\n" +
    "        'bottom': ! isSlider && ! thumbnailsIsHidden && options.thumbnailsPosition == 'bottom' ? 40 + thumbnails.clientHeight + 'px' : '40px',\r" +
    "\n" +
    "        'background': options.backgroundColorAlternative\r" +
    "\n" +
    "    }\"><div class=\"zoom before pt-perspective\"><img ng-src=\"{{ activePhoto.href }}\" ng-style=activePhoto.style></div><div class=\"drag-nav hide\"></div><span class=\"fa fa-chevron-left prev jgallery-btn jgallery-btn-large\" ng-class=\"{hidden: ! hasPrevPhoto}\" ng-click=goToPrevPhoto()></span> <span class=\"fa fa-chevron-right next jgallery-btn jgallery-btn-large\" ng-class=\"{hidden: ! hasNextPhoto}\" ng-click=goToNextPhoto()></span> <span class=progress></span><div class=nav><span jgallery-btn class=\"fa resize fa-search jgallery-btn jgallery-btn-small\" data-tooltip-position=\"bottom right\" data-tooltip=\"{{ options.tooltipZoom }}\" ng-class=\"{\r" +
    "\n" +
    "                'fa-search-plus': options.zoomSize == 'fit' \r" +
    "\n" +
    "              }\" ng-click=changeZoomSize()></span> <span jgallery-btn class=\"fa change-mode jgallery-btn jgallery-btn-small\" data-tooltip-position=\"bottom right\" data-tooltip=\"{{ options.tooltipFullScreen }}\" ng-show=options.canChangeMode ng-click=\"options.mode = options.mode == 'standard' ? 'full-screen' : 'standard'\" ng-class=\"{'fa-expand': options.mode == 'standard', 'fa-compress': options.mode != 'standard'}\"></span> <span jgallery-btn class=\"fa fa-times jgallery-close jgallery-btn jgallery-btn-small\" data-tooltip-position=\"bottom right\" data-tooltip=\"{{ options.tooltipClose }}\" ng-show=options.canClose ng-click=\"isVisible = false\"></span></div><div class=nav-bottom style=\"background: {{ options.backgroundColor }}; box-shadow: 0 0 5px rgba( 0, 0, 0, .3 )\" ng-hide=thumbnailsIsFullScreen><div class=icons><span jgallery-btn class=\"fa fa-th full-screen jgallery-btn jgallery-btn-small\" data-tooltip=\"{{ options.tooltipSeeAllPhotos }}\" ng-click=\"thumbnailsIsFullScreen = ! thumbnailsIsFullScreen\"></span> <span jgallery-btn class=\"fa minimalize-thumbnails jgallery-btn jgallery-btn-small\" data-tooltip=\"{{ options.tooltipToggleThumbnails }}\" ng-class=\"{'fa-ellipsis-h': !thumbnailsIsVertical, 'fa-ellipsis-v': thumbnailsIsVertical, inactive: thumbnailsIsHidden}\" ng-click=\"thumbnailsIsHidden = ! thumbnailsIsHidden;\"></span> <span jgallery-btn class=\"fa fa-list-ul change-album jgallery-btn jgallery-btn-small\" ng-class=\"{inactive: ! hasManyAlbums, active: albumsDropdownIsVisible}\" ng-click=\"albumsDropdownIsVisible = ! albumsDropdownIsVisible\" tooltip=\"{{ options.tooltipSeeOtherAlbums }}\"><span class=\"menu jgallery-btn\" style=\"background: {{ options.backgroundColor }}; box-shadow: 0 0 20px {{ options.color }}\"><span class=item ng-repeat=\"album in albums\" ng-click=\"setAlbumAsActive( album.id )\">{{ album.title }}</span></span> <span class=title>{{ activeAlbum.title }}</span></span></div><div class=\"title before\"></div></div></div>"
  );


  $templateCache.put('../../templates/scrollable.html',
    "<div ng-transclude></div><span class=\"jgallery-scroll-top jgallery-btn\" ng-class=\"{'visible': thumbnailsCanScrollTop()}\" ng-click=thumbnailsScrollTop();><span class=\"fa fa-chevron-up ico\"></span></span> <span class=\"jgallery-scroll-bottom jgallery-btn\" ng-class=\"{'visible': thumbnailsCanScrollBottom()}\" ng-click=thumbnailsScrollBottom();><span class=\"fa fa-chevron-down ico\"></span></span> <span class=\"jgallery-scroll-left jgallery-btn\" ng-class=\"{'visible': thumbnailsCanScrollLeft()}\" ng-click=thumbnailsScrollLeft();><span class=\"fa fa-chevron-left ico\"></span></span> <span class=\"jgallery-scroll-right jgallery-btn\" ng-class=\"{'visible': thumbnailsCanScrollRight()}\" ng-click=thumbnailsScrollRight();><span class=\"fa fa-chevron-right ico\"></span></span>"
  );


  $templateCache.put('../../templates/thumbnails.html',
    "<div jgallery-scrollable><div ng-repeat=\"album in albums\" class=album ng-class=\"{'active': album.id == activeAlbum.id}\" style=\"{{ thumbnailsIsVertical ? '' : 'width: ' + album.photos.length * thumbWidth + 'px' }}\"><a ng-repeat=\"photo in album.photos\" ng-click=\"$event.preventDefault(); $parent.$parent.$parent.$parent.showPhoto( photo ); $parent.$parent.$parent.$parent.thumbnailsIsFullScreen = false;\" ng-href=\"{{ isSlider ? photo.src : photo.href }}\" ng-attr-link=\"{{ isSlider ? photo.href : undefined }}\" ng-attr-target=\"{{ isSlider ? photo.target : undefined }}\" style=\"width: {{ thumbWidth }}px; height: {{ thumbHeight }}px; font-size: {{ thumbHeight }}px\"><img ng-src=\"{{ photo.src }}\" ng-attr-alt=\"{{ photo.title }}\" ng-attr-data-jgallery-bg-color=\"{{ photo.bgColor }}\" ng-attr-data-jgallery-text-color=\"{{ photo.textColor }}\" ng-class=\"{\r" +
    "\n" +
    "                     'thumb-vertical': photo.thumbWidth / photo.thumbHeight < options.thumbWidth / options.thumbHeight,\r" +
    "\n" +
    "                     'thumb-horizontal': photo.thumbWidth / photo.thumbHeight >= options.thumbWidth / options.thumbHeight,\r" +
    "\n" +
    "                     'thumb-on-full-screen-vertical': photo.thumbWidth / photo.thumbHeight < options.thumbWidthOnFullScreen / options.thumbHeightOnFullScreen,\r" +
    "\n" +
    "                     'thumb-on-full-screen-horizontal': photo.thumbWidth / photo.thumbHeight >= options.thumbWidthOnFullScreen / options.thumbHeightOnFullScreen\r" +
    "\n" +
    "                 }\"></a></div></div>"
  );

}]);
