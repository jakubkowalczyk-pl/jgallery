/*!
* jgallery v1.5.2
* http://jgallery.jakubkowalczyk.pl/
*
* Released under the MIT license
*
* Date: 2015-02-24
*/
( function( angular ) {
    "use strict";
    angular.module( 'jgallery', [] );
var defaults = {
    autostart: true, // Boolean; If set as 'true' jGallery will be started automatically after loading the document(only for full-screen or standard mode).; [ true, false ]
    autostartAtImage: 1, // Number; Number of image which will be loaded by autostart(only when 'autostart' parameter set as 'true').; ; [ 1, 2, 3 ]
    autostartAtAlbum: 1, // Number; Number of album which will be loaded by autostart(only when 'autostart' parameter set as 'true').; ; [ 1, 2, 3 ]
    backgroundColor: '#fff', // String; Background color for jGallery container.; ; [ '#ffffff', 'silver' ]
    backgroundColorAlternative: '#ddd', // String; Background color for jGallery container.; ; [ '#ffffff', 'silver' ]
    browserHistory: true, // Boolean; If set as 'true', changes of active image will be saved in browser history.; [ true, false ]
    canChangeMode: true, // Boolean; If set as 'true' you can change display mode(only for full-screen or standard mode).; [ true, false ]
    canClose: false, // Boolean; If set as 'true' you can close jGallery(only for full-screen or standard mode).; [ true, false ]
    canMinimalizeThumbnails: true, // Boolean; If set as 'true', you can minimalize thumbnails(only when 'thumbnails' parameter set as 'true').; [ true, false ]
    canZoom: true, // Boolean; If set as 'true' you can zoom photos.; [ true, false ]
    disabledOnIE8AndOlder: true, // Boolean; If set as 'true', jGallery will be blocked for Internet Explorer 8 and older.; [ true, false ]
    draggableZoom: true, // Boolean; If set as 'true' you can drag active image.; [ true, false ]
    draggableZoomHideNavigationOnMobile: true, // Boolean; If set as 'true' navigation of draggable zoom will be hidden when width of window <= 'maxMobileWidth' parameter (default value - 767px); [ true, false ]
    height: '100vh', // String; Height of jGallery container(only for standard or slider mode).
    hideThumbnailsOnInit: false, // Boolean; If set as 'true', thumbnails will be minimized by default, when jGallery will be started(only when 'thumbnails' parameter set as 'true').; [ true, false ]
    maxMobileWidth: 767, // Number; Maximum width(px) for jGallery shows a view for mobile device.
    mode: 'standard', // String; Display mode.; [ 'full-screen', 'standard', 'slider' ]
    preloadAll: false, // Boolean; If set as 'true', all photos will be loaded before first shown photo.; [ true, false ]
    slideshow: true, // Boolean; If set as 'true', option slideshow is enabled.; [ true, false ]
    slideshowAutostart: false, // Boolean; If set as 'true', slideshow will be started immediately after initializing jGallery(only when 'slideshow' has been set as true).; [ true, false ]
    slideshowCanRandom: true, // Boolean; If set as 'true', you can enable random change photos for slideshow(only when 'slideshow' has been set as true).; [ true, false ]
    slideshowInterval: '8s', // String; Time between change of photos for slideshow(only when 'slideshow' has been set as true).; [ '3s', '6s', '10s' ] 
    slideshowRandom: false, // Boolean; If set as 'true', photos in slideshow will be changing random(only when 'slideshow' has been set as true and 'slideshowCanRandom' has been set as true).; [ true, false ]
    swipeEvents: true, // Boolean; If set as 'true', you can switch to next/prev photo and thumbnails using swipe events.; [ true, false ]
    textColor: '#000', // String; Color of text and icons.; ; [ '#000000', 'rgb(0,153,221)' ]
    thumbnails: true, // Boolean; If set as 'true', thumbnails will be displayed.; [ true, false ]
    thumbHeight: 75, // Number; Height(pixels) of thumbnails.; ; [ 50, 75, 125 ]
    thumbHeightOnFullScreen: 100, // Number; Height(pixels) of thumbnails for thumbnails displayed in full-screen.; ; [ 125, 160, 200 ]
    thumbnailsFullScreen: true, // Boolean; If set as 'true', thumbnails will be displayed in full-screen.; [ true, false ]
    thumbnailsHideOnMobile: true, // Boolean; If set as 'true', thumbnails will be hidden when width of window <= 'maxMobileWidth' parameter (default value - 767px).; [ true, false ]
    thumbnailsPosition: 'bottom', // String; Thumbnails position(only when 'thumbnails' parameter set as 'true').; [ 'top',  'bottom', 'left', 'right' ]
    thumbType: 'images', // String; Thumbnails type(only when 'thumbnails' parameter set as 'true').; [ 'images', 'square', 'number' ]
    thumbWidth: 75, // Number; Width(pixels) of thumbnails.; ; [ 50, 75, 125 ]
    thumbWidthOnFullScreen: 100, // Number; Width(pixels) of thumbnails for thumbnails displayed in full-screen.; ; [ 125, 160, 200 ]
    title: true, // Boolean; If set as 'true', near photo will be shown title from alt attribute of img.; [ true, false ]
    titleExpanded: false, // Boolean; If set as 'true', in bottom area of zoomed photo will be shown title from alt attribute of img(only when 'title' has been set as true).; [ true, false ]
    tooltipClose: 'Close', // String; Text of tooltip which will be displayed next to icon for close jgallery(if you set canClose parameter as true).; ; [ 'Close', 'Zamknij' ]
    tooltipFullScreen: 'Full screen', // String; Text of tooltip which will be displayed next to icon for change display mode.; ; [ 'Full screen', 'Tryb pełnoekranowy' ]
    tooltipRandom: 'Random', // String; Text of tooltip which will be displayed next to icon for random slideshow toggling.; ; [ 'Random', 'Kolejność losowa' ]
    tooltips: true, // Boolean; If set as 'true', tooltips will be displayed next to icons.; [ true, false ]
    tooltipSeeAllPhotos: 'See all photos', // String; Text of tooltip which will be displayed next to icon for change thumbnails view.; ; [ 'See all photos', 'Zobacz wszystkie zdjęcia' ]
    tooltipSeeOtherAlbums: 'See other albums', // String; Text of tooltip which will be displayed next to icon for change album(if your jGallery has more than one album).; ; [ 'See other albums', 'Zobacz pozostałe albumy' ]
    tooltipSlideshow: 'Slideshow', // String; Text of tooltip which will be displayed next to icon for play/pause slideshow.; ; [ 'Slideshow', 'Pokaz slajdów' ]
    tooltipToggleThumbnails: 'Toggle thumbnails', // String; Text of tooltip which will be displayed next to icon for toggle thumbnails.; ; [ 'Toggle thumbnails', 'Pokaż/ukryj miniatury' ]
    tooltipZoom: 'Zoom', // String; Text of tooltip which will be displayed next to icon for zoom photo.; ; [ 'Zoom', 'Powiększenie' ]
    transition: 'moveToLeft_moveFromRight', // String; Transition effect for change active image.; [ 'moveToLeft_moveFromRight', 'moveToRight_moveFromLeft', 'moveToTop_moveFromBottom', 'moveToBottom_moveFromTop', 'fade_moveFromRight', 'fade_moveFromLeft', 'fade_moveFromBottom', 'fade_moveFromTop', 'moveToLeftFade_moveFromRightFade', 'moveToRightFade_moveFromLeftFade', 'moveToTopFade_moveFromBottomFade', 'moveToBottomFade_moveFromTopFade', 'moveToLeftEasing_moveFromRight', 'moveToRightEasing_moveFromLeft', 'moveToTopEasing_moveFromBottom', 'moveToBottomEasing_moveFromTop', 'scaleDown_moveFromRight', 'scaleDown_moveFromLeft', 'scaleDown_moveFromBottom', 'scaleDown_moveFromTop', 'scaleDown_scaleUpDown', 'scaleDownUp_scaleUp', 'moveToLeft_scaleUp', 'moveToRight_scaleUp', 'moveToTop_scaleUp', 'moveToBottom_scaleUp', 'scaleDownCenter_scaleUpCenter', 'rotateRightSideFirst_moveFromRight', 'rotateLeftSideFirst_moveFromLeft', 'rotateTopSideFirst_moveFromTop', 'rotateBottomSideFirst_moveFromBottom', 'flipOutRight_flipInLeft', 'flipOutLeft_flipInRight', 'flipOutTop_flipInBottom', 'flipOutBottom_flipInTop', 'rotateFall_scaleUp', 'rotateOutNewspaper_rotateInNewspaper', 'rotatePushLeft_moveFromRight', 'rotatePushRight_moveFromLeft', 'rotatePushTop_moveFromBottom', 'rotatePushBottom_moveFromTop', 'rotatePushLeft_rotatePullRight', 'rotatePushRight_rotatePullLeft', 'rotatePushTop_rotatePullBottom', 'rotatePushBottom_page', 'rotateFoldLeft_moveFromRightFade', 'rotateFoldRight_moveFromLeftFade', 'rotateFoldTop_moveFromBottomFade', 'rotateFoldBottom_moveFromTopFade', 'moveToRightFade_rotateUnfoldLeft', 'moveToLeftFade_rotateUnfoldRight', 'moveToBottomFade_rotateUnfoldTop', 'moveToTopFade_rotateUnfoldBottom', 'rotateRoomLeftOut_rotateRoomLeftIn', 'rotateRoomRightOut_rotateRoomRightIn', 'rotateRoomTopOut_rotateRoomTopIn', 'rotateRoomBottomOut_rotateRoomBottomIn', 'rotateCubeLeftOut_rotateCubeLeftIn', 'rotateCubeRightOut_rotateCubeRightIn', 'rotateCubeTopOut_rotateCubeTopIn', 'rotateCubeBottomOut_rotateCubeBottomIn', 'rotateCarouselLeftOut_rotateCarouselLeftIn', 'rotateCarouselRightOut_rotateCarouselRightIn', 'rotateCarouselTopOut_rotateCarouselTopIn', 'rotateCarouselBottomOut_rotateCarouselBottomIn', 'rotateSidesOut_rotateSidesInDelay', 'rotateSlideOut_rotateSlideIn', 'random' ]
    transitionBackward: 'auto', // String; Transition effect for change active image(when user selected one of previous images).; [ 'auto', 'moveToLeft_moveFromRight', 'moveToRight_moveFromLeft', 'moveToTop_moveFromBottom', 'moveToBottom_moveFromTop', 'fade_moveFromRight', 'fade_moveFromLeft', 'fade_moveFromBottom', 'fade_moveFromTop', 'moveToLeftFade_moveFromRightFade', 'moveToRightFade_moveFromLeftFade', 'moveToTopFade_moveFromBottomFade', 'moveToBottomFade_moveFromTopFade', 'moveToLeftEasing_moveFromRight', 'moveToRightEasing_moveFromLeft', 'moveToTopEasing_moveFromBottom', 'moveToBottomEasing_moveFromTop', 'scaleDown_moveFromRight', 'scaleDown_moveFromLeft', 'scaleDown_moveFromBottom', 'scaleDown_moveFromTop', 'scaleDown_scaleUpDown', 'scaleDownUp_scaleUp', 'moveToLeft_scaleUp', 'moveToRight_scaleUp', 'moveToTop_scaleUp', 'moveToBottom_scaleUp', 'scaleDownCenter_scaleUpCenter', 'rotateRightSideFirst_moveFromRight', 'rotateLeftSideFirst_moveFromLeft', 'rotateTopSideFirst_moveFromTop', 'rotateBottomSideFirst_moveFromBottom', 'flipOutRight_flipInLeft', 'flipOutLeft_flipInRight', 'flipOutTop_flipInBottom', 'flipOutBottom_flipInTop', 'rotateFall_scaleUp', 'rotateOutNewspaper_rotateInNewspaper', 'rotatePushLeft_moveFromRight', 'rotatePushRight_moveFromLeft', 'rotatePushTop_moveFromBottom', 'rotatePushBottom_moveFromTop', 'rotatePushLeft_rotatePullRight', 'rotatePushRight_rotatePullLeft', 'rotatePushTop_rotatePullBottom', 'rotatePushBottom_page', 'rotateFoldLeft_moveFromRightFade', 'rotateFoldRight_moveFromLeftFade', 'rotateFoldTop_moveFromBottomFade', 'rotateFoldBottom_moveFromTopFade', 'moveToRightFade_rotateUnfoldLeft', 'moveToLeftFade_rotateUnfoldRight', 'moveToBottomFade_rotateUnfoldTop', 'moveToTopFade_rotateUnfoldBottom', 'rotateRoomLeftOut_rotateRoomLeftIn', 'rotateRoomRightOut_rotateRoomRightIn', 'rotateRoomTopOut_rotateRoomTopIn', 'rotateRoomBottomOut_rotateRoomBottomIn', 'rotateCubeLeftOut_rotateCubeLeftIn', 'rotateCubeRightOut_rotateCubeRightIn', 'rotateCubeTopOut_rotateCubeTopIn', 'rotateCubeBottomOut_rotateCubeBottomIn', 'rotateCarouselLeftOut_rotateCarouselLeftIn', 'rotateCarouselRightOut_rotateCarouselRightIn', 'rotateCarouselTopOut_rotateCarouselTopIn', 'rotateCarouselBottomOut_rotateCarouselBottomIn', 'rotateSidesOut_rotateSidesInDelay', 'rotateSlideOut_rotateSlideIn', 'random' ]
    transitionCols: 1, // Number; Number of columns in the image divided into columns.; ; [ 1, 2, 3, 4, 5, 6 ]
    transitionDuration: '0.7s', // String; Duration of transition between photos.; [ '0.2s', '0.5s', '1s' ] 
    transitionRows: 1, // Number; Number of columns in the image divided into rows.; ; [ 1, 2, 3, 4, 5, 6 ]
    transitionTimingFunction: 'cubic-bezier(0,1,1,1)', // String; Timig function for showing photo.; [ 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.5,-0.5,0.5,1.5)', 'cubic-bezier(0,1,1,1)' ]
    transitionWaveDirection: 'forward', // String; Direction of animation(only when 'transitionCols' > 1 or 'transitionRows' > 1).; [ 'forward', 'backward' ]
    width: '100%', // String; Width of jGallery container(only for standard or slider mode).
    zoomSize: 'fit', // String; Size of zoomed photo(only for full-screen or standard mode).; [ 'fit', 'original', 'fill' ]
    afterLoadPhoto: function() {}, // Function; Custom function that will be called after loading photo.; ; [ function() { alert( 'afterLoadPhoto' ) } ]
    beforeLoadPhoto: function() {}, // Function; Custom function that will be called before loading photo.; ; [ function() { alert( 'beforeLoadPhoto' ) } ]
    closeGallery: function() {}, // Function; Custom function that will be called after hiding jGallery.; ; [ function() { alert( 'closeGallery' ) } ]
    initGallery: function() {}, // Function; Custom function that will be called before initialization of jGallery.; ; [ function() { alert( 'initGallery' ) } ]
    showGallery: function() {}, // Function; Custom function that will be called after showing jGallery.; ; [ function() { alert( 'showGallery' ) } ]
    showPhoto: function() {} // Function; Custom function that will be called before showing photo.; ; [ function() { alert( 'showPhoto' ) } ]
};
var defaultsFullScreenMode = {};
var defaultsSliderMode = {
    width: '940px',
    height: '360px',
    canZoom: false,
    draggableZoom: false,
    browserHistory: false,
    thumbnailsFullScreen: false,
    thumbType: 'square',
    thumbWidth: 20, //px
    thumbHeight: 20, //px
    canMinimalizeThumbnails: false,
    transition: 'rotateCubeRightOut_rotateCubeRightIn',
    transitionBackward: 'rotateCubeRightOut_rotateCubeRightIn',
    transitionCols: 6,
    transitionRows: 1,
    slideshow: true,
    slideshowAutostart: true,
    zoomSize: 'fill'
};
var requiredFullScreenMode = {};
var requiredSliderMode = {
    autostart: true,
    canClose: false,
    zoomSize: 'fill',
    canChangeMode: false
};
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

( function( a ) {
    "use strict";
    var albumId = 1;
    
    a.module( 'jgallery' ).directive( 'jgalleryAlbum', ['$compile', function( $compile ) {        
        return {
            scope: {},
            require: '^jgallery',
            link: function( scope, element, attrs, jgalleryController ) {
                scope.album.title = attrs['jgalleryAlbum'];
                jgalleryController.addAlbum( scope.album );
            },
            controller: ['$scope', function( $scope ){
                $scope.album = {
                    id: albumId++
                };
                var photos = $scope.album.photos = [];
                    
                this.addPhoto = function( photo ) {
                    $scope.$parent.$apply( function() {
                        photos.push( photo );
                    } );
                };
            }]
        };
    }] );
} )( angular );
angular.module( 'jgallery' ).directive( 'jgalleryBtn', function() {        
     return {
         require: '^jgallery',
         link: function( scope, element, attrs ) {             
//             scope.$watch( 'options.backgroundColor + options.color', function() {
//                var options = scope.options;
//                var bg = options.backgroundColor;
//                var color = options.color;
//                
//                 element[0].style['text-shadow'] = '0 0 5px ' + bg  + ',1px 1px ' + bg;
//                 element[0].style.color = color;               
//             } );
         }
     };
 } );
( function( document, angular, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode ) {
    "use strict";
    var jGalleryId = 1;
    
    angular.module( 'jgallery' ).directive( 'jgallery', ['$timeout', '$filter', function( $timeout, $filter ) {        
        return {
            transclude: true,
            scope: true,
            link: function( scope, element, attrs ) {
                var id = scope.id = jGalleryId++;
                var options;
                window.scope = scope;
        
                var overrideOptions = function() {
                    scope.options = options = angular.copy( defaults );
                    try {
                        var userOptions = angular.fromJson( attrs['jgallery'] );

                        if ( userOptions.mode === 'full-screen' ) {
                            angular.extend( options, defaultsFullScreenMode, userOptions, requiredFullScreenMode );
                        }
                        else if ( userOptions.mode === 'slider' ) {
                            angular.extend( options, defaultsSliderMode, userOptions, requiredSliderMode );
                        }
                        else {
                            angular.extend( options, userOptions );
                        }                    
                    } catch( e ) {};
                };
                
                var issetActivePhoto = function() {
                    return scope.activePhoto && scope.activePhoto.id;
                };
                
                scope.setAlbumAsActive = function( albumId ) {
                    scope.activeAlbum = $filter( 'filter' )( scope.albums, { id: albumId } )[0];
                    scope.showPhoto( scope.activeAlbum.photos[0] );
                };
                
                scope.showPhoto = function( photo ) {
                    scope.activePhoto = angular.extend( {}, scope.activePhoto, photo );
                    scope.isVisible = true;
                };
                
                scope.goToPrevPhoto = function() {
                    var prevKey;
                    
                    angular.forEach( scope.activeAlbum.photos, function( photo, key ) {
                        if ( photo.id === scope.activePhoto.id && scope.activeAlbum.photos[key-1] ) {
                            prevKey = key - 1;
                        }
                    } );
                    if ( angular.isDefined( prevKey ) ) {
                        scope.showPhoto( scope.activeAlbum.photos[prevKey] );
                    }
                };
                
                scope.goToNextPhoto = function() {
                    var nextKey;
                    
                    angular.forEach( scope.activeAlbum.photos, function( photo, key ) {
                        if ( photo.id === scope.activePhoto.id && scope.activeAlbum.photos[key+1] ) {
                            nextKey = key + 1;
                        }
                    } );
                    if ( nextKey ) {
                        scope.showPhoto( scope.activeAlbum.photos[nextKey] );
                    }
                };
                
                angular.element( element ).attr( 'data-jgallery-id', id );
                overrideOptions();
                if ( options.autostart ) {
                    scope.isVisible = true;
                }
                scope.$watch( 'albums', function( albums ) {
                    scope.hasManyAlbums = albums.length > 1;
                } );
                scope.$watch( 'options.autostartAtAlbum + albums', function() {
                    if ( ! scope.activeAlbum ) {
                        scope.activeAlbum = scope.albums[options.autostartAtAlbum - 1];
                    }
                } );
                scope.$watch( 'options.autostartAtImage + activeAlbum.photos', function() {
                    if ( ! issetActivePhoto() && scope.activeAlbum.photos[options.autostartAtImage - 1] ) {
                        scope.showPhoto( scope.activeAlbum.photos[options.autostartAtImage - 1] );
                    }
                } );
                scope.$watch( 'options.mode', function( mode ) {
                    scope.isSlider = mode === 'slider';
                } );
//                attrs.$observe( 'jgallery', function() {
//                    overrideOptions();
//                } );
                angular.element( document.getElementsByTagName( 'head' ) ).append( '<style type="text/css" class="colours" data-jgallery-id="' + id + '"></style>' );
            },
            controller: ['$scope', function( $scope ) {
                var albums = $scope.albums = [];
                    
                this.addAlbum = function( album ) {
                    if ( ! album.title ) {
                        album.title = 'Album ' + album.id;
                    }
                    albums.push( album );
                };
                
                this.showPhoto = function( photo ) {
                    $scope.showPhoto( photo );
                    $timeout( function() {
                        $scope.$apply();
                    } );
                };
            }],
            templateUrl: '../../templates/jgallery.html'
        };
    }] );
} )( document, angular, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode );
( function( a ) {
    "use strict";
    var photoId = 1;
    
    a.module( 'jgallery' ).directive( 'jgalleryPhoto', function() {
        return {
            scope: {
            },
            require: ['^jgalleryAlbum', '^jgallery'],
            link: function( scope, element, attrs, controllers ) {    
                var img;
                var photo = {};
                var albumController = controllers[0];
                var galleryController = controllers[1];
                
                if ( element.attr( 'href' ) ) {
                    img = a.element( element ).find( 'img' );
                    photo.href = element.attr( 'href' );
                    photo.target = element.attr( 'target' );
                }
                else if ( element.attr( 'src' ) ) {
                    img = element;                  
                }
                photo.src = img.attr( 'src' );
                photo.title = img.attr( 'alt' );
                photo.bgColor = img.attr( 'data-jgallery-bg-color' );
                photo.textColor = img.attr( 'data-jgallery-text-color' );
                
                ( function() {
                    var thumb = new Image();
                    var img = new Image();
                                        
                    thumb.onload = function() {
                        photo.thumbWidth = thumb.width;
                        photo.thumbHeight = thumb.height;
                        photo.id = photoId++;
                        albumController.addPhoto( photo );
                        img.onload = function() {
                            photo.width = img.width;
                            photo.height = img.height;
                        };
                        img.src = photo.href;
                    };
                    thumb.src = photo.src;
//                    function preloadImages(srcs, callback) {
//                        var img, imgs = [];
//                        var remaining = srcs.length;
//                        for (var i = 0; i < srcs.length; i++) {
//                            img = new Image();
//                            img.onload = function() {
//                                --remaining;
//                                if (remaining <= 0) {
//                                    callback(imgs);
//                                }
//                            };
//                            img.src = srcs[i];
//                            imgs.push(img);
//                        }
//                    }
//                    
//                    preloadImages( [photo.src, photo.href], function( images ) {
//                        photo.thumbWidth = images[0].width;
//                        photo.thumbHeight = images[0].height;
//                        photo.width = images[1].width;
//                        photo.height = images[1].height;
//                        albumController.addPhoto( photo );
//                    } );
                } )();
                
                a.element( element ).bind( 'click', function( $event ) {
                    $event.preventDefault();
                    galleryController.showPhoto( photo );
                } );
            }
        };
    } );
} )( angular );
angular.module( 'jgallery' ).directive( 'jgalleryPreview', ['$window', '$timeout', function( $window, $timeout ) {        
     return {
         require: '^jgallery',
         link: function( scope, element, attrs ) {
             var options = scope.options;
             
             scope.preview = element[0].childNodes[0];
             
             scope.changeZoomSize = function() {
                if ( options.zoomSize === 'fit' ) {
                    options.zoomSize = 'fill';
                }
                else if ( options.zoomSize === 'fill' ) {
                    var photo = scope.activePhoto;
                    var preview = scope.preview;

                    console.log(preview.clientWidth,photo.width,preview.clientHeight,photo.height);
                    if ( preview.clientWidth === photo.width || preview.clientHeight === photo.height ) {
                        options.zoomSize = 'fit';
                    }
                    else {
                        options.zoomSize = 'original';
                    }
                }
                else {
                    options.zoomSize = 'fit';
//                        scope.canZoomIn = true;
//                        scope.canZoomOut = false;
                }
            };
            
            scope.$watch( 'options.zoomSize', function( zoomSize ) {
                try {
                    scope.activePhoto.style;
                } catch( e ) {
                    scope.activePhoto = {
                        style: {}
                    };
                }
                if ( zoomSize === 'fill' ) {
                    scope.activePhoto.style['min-width'] = '100%';
                    scope.activePhoto.style['min-height'] = '100%';
                    scope.activePhoto.style['max-width'] = 'none';
                    scope.activePhoto.style['max-height'] = 'none';
                }
                else if ( zoomSize === 'fit' ) {
                    scope.activePhoto.style['min-width'] = '0';
                    scope.activePhoto.style['min-height'] = '0';
                    scope.activePhoto.style['max-width'] = '100%';
                    scope.activePhoto.style['max-height'] = '100%';                       
                }
                else {
                    scope.activePhoto.style['min-width'] = '0';
                    scope.activePhoto.style['min-height'] = '0';
                    scope.activePhoto.style['max-width'] = 'none';
                    scope.activePhoto.style['max-height'] = 'none';
                }
            } );
            scope.$watchGroup( ['activePhoto', 'activePhoto + activeAlbum.photos'], function() {
                angular.forEach( scope.albums, function( album ) {
                    angular.forEach( album.photos, function( photo, key ) {
                        if ( photo.id === scope.activePhoto.id ) {
                            scope.hasPrevPhoto = key > 0;
                            scope.hasNextPhoto = key < album.photos.length - 1;
                        }
                    } );
                } );
            } );
            scope.$watch( 'thumbnailsIsHidden + thumbnailsIsFullScreen', function() {
                if ( ! scope.thumbnailsIsHidden || ! scope.thumbnailsIsFullScreen ) {
                    $timeout( function() {
                        scope.$apply();
                    } );
                }
            } );
         },
         templateUrl: '../../templates/preview.html'
     };
 }] );
angular.module( 'jgallery' ).directive( 'jgalleryScrollable', ['$interval', '$window', function( $interval, $window ) {  
    return {
        transclude: true,
        scope: true,
        link: function( scope, element, attrs ) {
            var container = $window.container = element[0].childNodes[0];

            var animateScrollTop = function( element, to, duration ) {
                animateScroll( element, to, duration, 'scrollTop' );
            };

            var animateScrollLeft = function( element, to, duration ) {
                animateScroll( element, to, duration, 'scrollLeft' );
            };

            var animateScroll = function( element, to, duration, scrollDirection ) {
                var interval = 40;
                var from = element[scrollDirection];
                var iteration = duration / interval;
                var diff = ( to - from ) / iteration;
                var i = 0;

                var promise = $interval( function() {
                    i++;
                    element[scrollDirection] += diff;
                    if ( i === iteration ) {
                        $interval.cancel( promise );
                    }
                }, interval );
            };

            scope.thumbnailsCanScrollTop = function() {
                return container.scrollTop > 0;
            };
            scope.thumbnailsScrollTop = function() {
                if ( scope.thumbnailsCanScrollTop() ) {
                    animateScrollTop( container, container.scrollTop - $window.innerHeight * 0.7, 200 );
                }
            };
            scope.thumbnailsCanScrollBottom = function() {
                return container.offsetHeight + container.scrollTop < container.scrollHeight;
            };
            scope.thumbnailsScrollBottom = function() {
                if ( scope.thumbnailsCanScrollBottom() ) {
                    animateScrollTop( container, container.scrollTop + $window.innerHeight * 0.7, 200 );
                }
            };               
            scope.thumbnailsCanScrollLeft = function() {
                return container.scrollLeft > 0;
            };
            scope.thumbnailsScrollLeft = function() {
                if ( scope.thumbnailsCanScrollLeft() ) {
                    animateScrollLeft( container, container.scrollLeft - $window.innerWidth * 0.7, 200 );
                }
            };
            scope.thumbnailsCanScrollRight = function() {
                return container.offsetWidth + container.scrollLeft < container.scrollWidth;
            };
            scope.thumbnailsScrollRight = function() {
                if ( scope.thumbnailsCanScrollRight() ) {
                    animateScrollLeft( container, container.scrollLeft + $window.innerWidth * 0.7, 200 );
                }
            };
        },
        templateUrl: '../../templates/scrollable.html'
    };
}] );
( function( window, angular, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode ) {
    "use strict";
    
    angular.module( 'jgallery' ).directive( 'jgalleryThumbnails', function() {        
        return {
            require: '^jgallery',
            link: function( scope, element, attrs ) {
                scope.$watch( 'options.thumbnailsPosition', function( position ) {
                    scope.thumbnailsIsVertical = position === 'left' || position === 'right';
                } );
                scope.$watch( 'options.thumbnailsFullScreen', function( fullScreen ) {
                    if ( fullScreen ) {
                        scope.thumbWidth = scope.options.thumbWidthOnFullScreen;
                        scope.thumbHeight = scope.options.thumbHeightOnFullScreen;
                    }
                    else {
                        scope.thumbWidth = scope.options.thumbWidth;
                        scope.thumbHeight = scope.options.thumbHeight;                        
                    }
                } );
                scope.thumbnails = element[0];
                scope.thumbnailsFullScreen = false;
            },
            templateUrl: '../../templates/thumbnails.html'
        };
    } );
} )( window, angular, defaults, defaultsFullScreenMode, requiredFullScreenMode, defaultsSliderMode, requiredSliderMode );
} )( angular );