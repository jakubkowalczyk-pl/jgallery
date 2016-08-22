/*!
* jgallery v1.5.6
* http://jgallery.jakubkowalczyk.pl/
*
* Released under the MIT license
*
* Date: 2016-08-22
*/
( function() {
    "use strict";
var defaults = {
    autostart: true, // Boolean; If set as 'true' jGallery will be started automatically after loading the document(only for full-screen or standard mode).; [ true, false ]
    autostartAtImage: 1, // Number; Number of image which will be loaded by autostart(only when 'autostart' parameter set as 'true').; ; [ 1, 2, 3 ]
    autostartAtAlbum: 1, // Number; Number of album which will be loaded by autostart(only when 'autostart' parameter set as 'true').; ; [ 1, 2, 3 ]
    backgroundColor: '#fff', // String; Background color for jGallery container.; ; [ '#ffffff', 'silver' ]
    browserHistory: true, // Boolean; If set as 'true', changes of active image will be saved in browser history.; [ true, false ]
    canChangeMode: true, // Boolean; If set as 'true' you can change display mode(only for full-screen or standard mode).; [ true, false ]
    canClose: false, // Boolean; If set as 'true' you can close jGallery(only for full-screen or standard mode).; [ true, false ]
    canMinimalizeThumbnails: true, // Boolean; If set as 'true', you can minimalize thumbnails(only when 'thumbnails' parameter set as 'true').; [ true, false ]
    canZoom: true, // Boolean; If set as 'true' you can zoom photos.; [ true, false ]
    disabledOnIE8AndOlder: true, // Boolean; If set as 'true', jGallery will be blocked for Internet Explorer 8 and older.; [ true, false ]
    draggableZoom: true, // Boolean; If set as 'true' you can drag active image.; [ true, false ]
    draggableZoomHideNavigationOnMobile: true, // Boolean; If set as 'true' navigation of draggable zoom will be hidden when width of window <= 'maxMobileWidth' parameter (default value - 767px); [ true, false ]
    height: '600px', // String; Height of jGallery container(only for standard or slider mode).
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
    thumbType: 'image', // String; Thumbnails type(only when 'thumbnails' parameter set as 'true').; [ 'image', 'square', 'number' ]
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
    afterLoadPhoto: function() {}, // Function; Custom function that will be called after loading photo.; ; [ function(link,thumbnail) { console.log( link,thumbnail ) } ]
    beforeLoadPhoto: function() {}, // Function; Custom function that will be called before loading photo.; ; [ function(link,thumbnail) { console.log( link,thumbnail ) } ]
    closeGallery: function() {}, // Function; Custom function that will be called after hiding jGallery.; ; [ function() { alert( 'closeGallery' ) } ]
    initGallery: function() {}, // Function; Custom function that will be called before initialization of jGallery.; ; [ function() { alert( 'initGallery' ) } ]
    showGallery: function() {}, // Function; Custom function that will be called after showing jGallery.; ; [ function() { alert( 'showGallery' ) } ]
    showPhoto: function() {} // Function; Custom function that will be called before showing photo.; ; [ function(link,thumbnail) { console.log( link,thumbnail ) } ]
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
var jGalleryTransitions = {
    moveToLeft_moveFromRight: ["pt-page-moveToLeft","pt-page-moveFromRight"],
    moveToRight_moveFromLeft: ["pt-page-moveToRight","pt-page-moveFromLeft"],
    moveToTop_moveFromBottom: ["pt-page-moveToTop","pt-page-moveFromBottom"],
    moveToBottom_moveFromTop: ["pt-page-moveToBottom","pt-page-moveFromTop"],
    fade_moveFromRight: ["pt-page-fade","pt-page-moveFromRight pt-page-ontop"],
    fade_moveFromLeft: ["pt-page-fade","pt-page-moveFromLeft pt-page-ontop"],
    fade_moveFromBottom: ["pt-page-fade","pt-page-moveFromBottom pt-page-ontop"],
    fade_moveFromTop: ["pt-page-fade","pt-page-moveFromTop pt-page-ontop"],
    moveToLeftFade_moveFromRightFade: ["pt-page-moveToLeftFade","pt-page-moveFromRightFade"],
    moveToRightFade_moveFromLeftFade: ["pt-page-moveToRightFade","pt-page-moveFromLeftFade"],
    moveToTopFade_moveFromBottomFade: ["pt-page-moveToTopFade","pt-page-moveFromBottomFade"],
    moveToBottomFade_moveFromTopFade: ["pt-page-moveToBottomFade","pt-page-moveFromTopFade"],
    moveToLeftEasing_moveFromRight: ["pt-page-moveToLeftEasing pt-page-ontop","pt-page-moveFromRight"],
    moveToRightEasing_moveFromLeft: ["pt-page-moveToRightEasing pt-page-ontop","pt-page-moveFromLeft"],
    moveToTopEasing_moveFromBottom: ["pt-page-moveToTopEasing pt-page-ontop","pt-page-moveFromBottom"],
    moveToBottomEasing_moveFromTop: ["pt-page-moveToBottomEasing pt-page-ontop","pt-page-moveFromTop"],
    scaleDown_moveFromRight: ["pt-page-scaleDown","pt-page-moveFromRight pt-page-ontop"],
    scaleDown_moveFromLeft: ["pt-page-scaleDown","pt-page-moveFromLeft pt-page-ontop"],
    scaleDown_moveFromBottom: ["pt-page-scaleDown","pt-page-moveFromBottom pt-page-ontop"],
    scaleDown_moveFromTop: ["pt-page-scaleDown","pt-page-moveFromTop pt-page-ontop"],
    scaleDown_scaleUpDown: ["pt-page-scaleDown","pt-page-scaleUpDown pt-page-delay300"],
    scaleDownUp_scaleUp: ["pt-page-scaleDownUp","pt-page-scaleUp pt-page-delay300"],
    moveToLeft_scaleUp: ["pt-page-moveToLeft pt-page-ontop","pt-page-scaleUp"],
    moveToRight_scaleUp: ["pt-page-moveToRight pt-page-ontop","pt-page-scaleUp"],
    moveToTop_scaleUp: ["pt-page-moveToTop pt-page-ontop","pt-page-scaleUp"],
    moveToBottom_scaleUp: ["pt-page-moveToBottom pt-page-ontop","pt-page-scaleUp"],
    scaleDownCenter_scaleUpCenter: ["pt-page-scaleDownCenter","pt-page-scaleUpCenter pt-page-delay400"],
    rotateRightSideFirst_moveFromRight: ["pt-page-rotateRightSideFirst","pt-page-moveFromRight pt-page-delay200 pt-page-ontop"],
    rotateLeftSideFirst_moveFromLeft: ["pt-page-rotateLeftSideFirst","pt-page-moveFromLeft pt-page-delay200 pt-page-ontop"],
    rotateTopSideFirst_moveFromTop: ["pt-page-rotateTopSideFirst","pt-page-moveFromTop pt-page-delay200 pt-page-ontop"],
    rotateBottomSideFirst_moveFromBottom: ["pt-page-rotateBottomSideFirst","pt-page-moveFromBottom pt-page-delay200 pt-page-ontop"],
    flipOutRight_flipInLeft: ["pt-page-flipOutRight","pt-page-flipInLeft pt-page-delay500"],
    flipOutLeft_flipInRight: ["pt-page-flipOutLeft","pt-page-flipInRight pt-page-delay500"],
    flipOutTop_flipInBottom: ["pt-page-flipOutTop","pt-page-flipInBottom pt-page-delay500"],
    flipOutBottom_flipInTop: ["pt-page-flipOutBottom","pt-page-flipInTop pt-page-delay500"],
    rotateFall_scaleUp: ["pt-page-rotateFall pt-page-ontop","pt-page-scaleUp"],
    rotateOutNewspaper_rotateInNewspaper: ["pt-page-rotateOutNewspaper","pt-page-rotateInNewspaper pt-page-delay500"],
    rotatePushLeft_moveFromRight: ["pt-page-rotatePushLeft","pt-page-moveFromRight"],
    rotatePushRight_moveFromLeft: ["pt-page-rotatePushRight","pt-page-moveFromLeft"],
    rotatePushTop_moveFromBottom: ["pt-page-rotatePushTop","pt-page-moveFromBottom"],
    rotatePushBottom_moveFromTop: ["pt-page-rotatePushBottom","pt-page-moveFromTop"],
    rotatePushLeft_rotatePullRight: ["pt-page-rotatePushLeft","pt-page-rotatePullRight pt-page-delay180"],
    rotatePushRight_rotatePullLeft: ["pt-page-rotatePushRight","pt-page-rotatePullLeft pt-page-delay180"],
    rotatePushTop_rotatePullBottom: ["pt-page-rotatePushTop","pt-page-rotatePullBottom pt-page-delay180"],
    rotatePushBottom_page: ["pt-page-rotatePushBottom","pt-page-rotatePullTop pt-page-delay180"],
    rotateFoldLeft_moveFromRightFade: ["pt-page-rotateFoldLeft","pt-page-moveFromRightFade"],
    rotateFoldRight_moveFromLeftFade: ["pt-page-rotateFoldRight","pt-page-moveFromLeftFade"],
    rotateFoldTop_moveFromBottomFade: ["pt-page-rotateFoldTop","pt-page-moveFromBottomFade"],
    rotateFoldBottom_moveFromTopFade: ["pt-page-rotateFoldBottom","pt-page-moveFromTopFade"],
    moveToRightFade_rotateUnfoldLeft: ["pt-page-moveToRightFade","pt-page-rotateUnfoldLeft"],
    moveToLeftFade_rotateUnfoldRight: ["pt-page-moveToLeftFade","pt-page-rotateUnfoldRight"],
    moveToBottomFade_rotateUnfoldTop: ["pt-page-moveToBottomFade","pt-page-rotateUnfoldTop"],
    moveToTopFade_rotateUnfoldBottom: ["pt-page-moveToTopFade","pt-page-rotateUnfoldBottom"],
    rotateRoomLeftOut_rotateRoomLeftIn: ["pt-page-rotateRoomLeftOut pt-page-ontop","pt-page-rotateRoomLeftIn"],
    rotateRoomRightOut_rotateRoomRightIn: ["pt-page-rotateRoomRightOut pt-page-ontop","pt-page-rotateRoomRightIn"],
    rotateRoomTopOut_rotateRoomTopIn: ["pt-page-rotateRoomTopOut pt-page-ontop","pt-page-rotateRoomTopIn"],
    rotateRoomBottomOut_rotateRoomBottomIn: ["pt-page-rotateRoomBottomOut pt-page-ontop","pt-page-rotateRoomBottomIn"],
    rotateCubeLeftOut_rotateCubeLeftIn: ["pt-page-rotateCubeLeftOut pt-page-ontop","pt-page-rotateCubeLeftIn"],
    rotateCubeRightOut_rotateCubeRightIn: ["pt-page-rotateCubeRightOut pt-page-ontop","pt-page-rotateCubeRightIn"],
    rotateCubeTopOut_rotateCubeTopIn: ["pt-page-rotateCubeTopOut pt-page-ontop","pt-page-rotateCubeTopIn"],
    rotateCubeBottomOut_rotateCubeBottomIn: ["pt-page-rotateCubeBottomOut pt-page-ontop","pt-page-rotateCubeBottomIn"],
    rotateCarouselLeftOut_rotateCarouselLeftIn: ["pt-page-rotateCarouselLeftOut pt-page-ontop","pt-page-rotateCarouselLeftIn"],
    rotateCarouselRightOut_rotateCarouselRightIn: ["pt-page-rotateCarouselRightOut pt-page-ontop","pt-page-rotateCarouselRightIn"],
    rotateCarouselTopOut_rotateCarouselTopIn: ["pt-page-rotateCarouselTopOut pt-page-ontop","pt-page-rotateCarouselTopIn"],
    rotateCarouselBottomOut_rotateCarouselBottomIn: ["pt-page-rotateCarouselBottomOut pt-page-ontop","pt-page-rotateCarouselBottomIn"],
    rotateSidesOut_rotateSidesInDelay: ["pt-page-rotateSidesOut","pt-page-rotateSidesIn pt-page-delay200"],
    rotateSlideOut_rotateSlideIn: ["pt-page-rotateSlideOut","pt-page-rotateSlideIn"]
};
var jGalleryArrayTransitions = ( function( jGalleryTransitions ) {
    var $ = jQuery;
    var jGalleryArrayTransitions = [];
    
    $.each( jGalleryTransitions, function( index, value ) {
        jGalleryArrayTransitions.push( value );
    } );
    
    return jGalleryArrayTransitions;
} )( jGalleryTransitions );
var jGalleryBackwardTransitions = {
    moveToLeft_moveFromRight: 'moveToRight_moveFromLeft',
    moveToRight_moveFromLeft: 'moveToLeft_moveFromRight',
    moveToTop_moveFromBottom: 'moveToBottom_moveFromTop',
    moveToBottom_moveFromTop: 'moveToTop_moveFromBottom',
    fade_moveFromRight: 'fade_moveFromLeft',
    fade_moveFromLeft: 'fade_moveFromRight',
    fade_moveFromBottom: 'fade_moveFromTop',
    fade_moveFromTop: 'fade_moveFromBottom',
    moveToLeftFade_moveFromRightFade: 'moveToRightFade_moveFromLeftFade',
    moveToRightFade_moveFromLeftFade: 'moveToLeftFade_moveFromRightFade',
    moveToTopFade_moveFromBottomFade: 'moveToBottomFade_moveFromTopFade',
    moveToBottomFade_moveFromTopFade: 'moveToTopFade_moveFromBottomFade',
    moveToLeftEasing_moveFromRight: 'moveToRightEasing_moveFromLeft',
    moveToRightEasing_moveFromLeft: 'moveToLeftEasing_moveFromRight',
    moveToTopEasing_moveFromBottom: 'moveToBottomEasing_moveFromTop',
    moveToBottomEasing_moveFromTop: 'moveToTopEasing_moveFromBottom',
    scaleDown_moveFromRight: 'scaleDown_moveFromLeft',
    scaleDown_moveFromLeft: 'scaleDown_moveFromRight',
    scaleDown_moveFromBottom: 'scaleDown_moveFromTop',
    scaleDown_moveFromTop: 'scaleDown_moveFromBottom',
    scaleDown_scaleUpDown: 'scaleDownUp_scaleUp',
    scaleDownUp_scaleUp: 'scaleDown_scaleUpDown',
    moveToLeft_scaleUp: 'moveToRight_scaleUp',
    moveToRight_scaleUp: 'moveToLeft_scaleUp',
    moveToTop_scaleUp: 'moveToBottom_scaleUp',
    moveToBottom_scaleUp: 'moveToTop_scaleUp',
    scaleDownCenter_scaleUpCenter: 'scaleDownCenter_scaleUpCenter',
    rotateRightSideFirst_moveFromRight: 'rotateLeftSideFirst_moveFromLeft',
    rotateLeftSideFirst_moveFromLeft: 'rotateRightSideFirst_moveFromRight',
    rotateTopSideFirst_moveFromTop: 'rotateBottomSideFirst_moveFromBottom',
    rotateBottomSideFirst_moveFromBottom: 'rotateTopSideFirst_moveFromTop',
    flipOutRight_flipInLeft: 'flipOutLeft_flipInRight',
    flipOutLeft_flipInRight: 'flipOutRight_flipInLeft',
    flipOutTop_flipInBottom: 'flipOutBottom_flipInTop',
    flipOutBottom_flipInTop: 'flipOutTop_flipInBottom',
    rotateFall_scaleUp: 'rotateFall_scaleUp',
    rotateOutNewspaper_rotateInNewspaper: 'rotateOutNewspaper_rotateInNewspaper',
    rotatePushLeft_moveFromRight: 'rotatePushRight_moveFromLeft',
    rotatePushRight_moveFromLeft: 'rotatePushLeft_moveFromRight',
    rotatePushTop_moveFromBottom: 'rotatePushBottom_moveFromTop',
    rotatePushBottom_moveFromTop: 'rotatePushTop_moveFromBottom',
    rotatePushLeft_rotatePullRight: 'rotatePushRight_rotatePullLeft',
    rotatePushRight_rotatePullLeft: 'rotatePushLeft_rotatePullRight',
    rotatePushTop_rotatePullBottom: 'rotatePushTop_rotatePullBottom',
    rotatePushBottom_page: 'rotatePushBottom_page',
    rotateFoldLeft_moveFromRightFade: 'rotateFoldRight_moveFromLeftFade',
    rotateFoldRight_moveFromLeftFade: 'rotateFoldLeft_moveFromRightFade',
    rotateFoldTop_moveFromBottomFade: 'rotateFoldBottom_moveFromTopFade',
    rotateFoldBottom_moveFromTopFade: 'rotateFoldTop_moveFromBottomFade',
    moveToRightFade_rotateUnfoldLeft: 'moveToLeftFade_rotateUnfoldRight',
    moveToLeftFade_rotateUnfoldRight: 'moveToRightFade_rotateUnfoldLeft',
    moveToBottomFade_rotateUnfoldTop: 'moveToTopFade_rotateUnfoldBottom',
    moveToTopFade_rotateUnfoldBottom: 'moveToBottomFade_rotateUnfoldTop',
    rotateRoomLeftOut_rotateRoomLeftIn: 'rotateRoomRightOut_rotateRoomRightIn',
    rotateRoomRightOut_rotateRoomRightIn: 'rotateRoomLeftOut_rotateRoomLeftIn',
    rotateRoomTopOut_rotateRoomTopIn: 'rotateRoomBottomOut_rotateRoomBottomIn',
    rotateRoomBottomOut_rotateRoomBottomIn: 'rotateRoomTopOut_rotateRoomTopIn',
    rotateCubeLeftOut_rotateCubeLeftIn: 'rotateCubeRightOut_rotateCubeRightIn',
    rotateCubeRightOut_rotateCubeRightIn: 'rotateCubeLeftOut_rotateCubeLeftIn',
    rotateCubeTopOut_rotateCubeTopIn: 'rotateCubeBottomOut_rotateCubeBottomIn',
    rotateCubeBottomOut_rotateCubeBottomIn: 'rotateCubeTopOut_rotateCubeTopIn',
    rotateCarouselLeftOut_rotateCarouselLeftIn: 'rotateCarouselRightOut_rotateCarouselRightIn',
    rotateCarouselRightOut_rotateCarouselRightIn: 'rotateCarouselLeftOut_rotateCarouselLeftIn',
    rotateCarouselTopOut_rotateCarouselTopIn: 'rotateCarouselBottomOut_rotateCarouselBottomIn',
    rotateCarouselBottomOut_rotateCarouselBottomIn: 'rotateCarouselTopOut_rotateCarouselTopIn',
    rotateSidesOut_rotateSidesInDelay: 'rotateSidesOut_rotateSidesInDelay',
    rotateSlideOut_rotateSlideIn: 'rotateSlideOut_rotateSlideIn'
};
var outerHtml = function(){
    return (!this.length) ? this : (this[0].outerHTML || (
      function(el){
          var div = document.createElement('div');
          div.appendChild(el.cloneNode(true));
          var contents = div.innerHTML;
          div = null;
          return contents;
    })(this[0]));
};
var overlay = ( function() {
    var $ = jQuery;
    
    return function( options ) {
        var defaults = {
            'show': false,
            'hide': false,
            'showLoader': false,
            'hideLoader': false,
            'showProgress': false,
            'hideProgress': false,
            'resetProgress': false,
            'fadeIn': true,
            'fadeOut': true,
            'fadeInLoader': true,
            'fadeOutLoader': true,
            'afterInit': function() {}
        };
        options = $.extend( {}, defaults, options );
        this.each( function() {
            var
                $this = $( this ),
                $overlay,
                $imageLoader,
                $progress,
                $spinner,
                boolInitialized = $this.is( '.overlayContainer:has(.overlay)' ),
                showOverlay = function() {
                    options.fadeIn ? $overlay.fadeIn( 500 ) : $overlay.show();
                },
                hideOverlay = function() {
                    options.fadeOut ? $overlay.fadeOut( 500 ) : $overlay.hide();
                },
                showLoader = function() {
                    options.fadeInLoader ? $imageLoader.not( ':visible' ).fadeIn( 500 ) : $imageLoader.not( ':visible' ).show();
                },
                hideLoader = function() {
                    options.fadeOutLoader ? $imageLoader.filter( ':visible' ).fadeOut( 500 ) : $imageLoader.filter( ':visible' ).hide();
                };

            //init
            if ( ! boolInitialized ) {
                $this.addClass( 'overlayContainer' );
                $this.append( '<span class="overlay" style="display: none;"><span class="imageLoaderPositionAbsolute" style="display: none;"><span class="fa fa-spin fa-spinner"></span><span class="progress-value" style="display: none;">0</span></span></span>' );
                options.afterInit();
            }

            $overlay = $this.children( '.overlay' );
            $imageLoader = $this.find( '.imageLoaderPositionAbsolute' );
            
            $progress = $imageLoader.find( '.progress-value' );
            $spinner = $imageLoader.find( '.fa-spinner' );
            if ( options.resetProgress ) {
                $progress.html( '0' );
            }
            if ( options.showProgress ) {
                $imageLoader.addClass( 'preloadAll' );
                $progress.show();
                $spinner.hide();
            }
            else if ( options.hideProgress ) {
                $imageLoader.removeClass( 'preloadAll' );
                $progress.hide(); 
                $spinner.show();               
            }

            $overlay.stop( false, true );
            $imageLoader.stop( false, true );
            if ( options.show ) {
                showOverlay();
            }
            else if ( options.hide ) {
                hideOverlay();
            }
            if ( options.showLoader ) {
                showLoader();
            }
            else if ( options.hideLoader ) {
                hideLoader();
            }
            //endinit
        } );
    };
} )();
var jLoader = ( function( overlay ) {
    var $ = jQuery;
    
    $.fn.overlay = overlay;
    
    return function( options ) {
        options = $.extend( {
             interval: 1000,
             skip: ':not(*)',
             start: function() {
                 $( 'body' ).overlay( {
                     'fadeIn': false,
                     'fadeOut': false,
                     'show': true,
                     'showLoader': true
                 } );
                 $( 'body' ).show();
             },
             success: function() {
                 $( 'body' ).overlay( {
                     'hide': true
                 } );
             },
             progress: function() {

             }
        }, options );

        this.each( function() {
            var $this = $( this );
            var $tmp = $();
            var $images = $();
            var timeout;
            var intCount = 0;

            function check() {
                var boolComplete = true;
                var intComplete = 0;
                var intPercent;

                $images.each( function() {
                     if ( $( this )[0].complete && $( this )[0].naturalWidth > 0 ) {
                         intComplete++;
                     }
                     else {
                         boolComplete = false;
                     }
                } );
                intPercent = parseInt( intComplete * 100 / intCount );
                options.progress( {
                    percent: intPercent
                } );
                if ( boolComplete ) {
                    clearTimeout( timeout );
                    $tmp.remove();
                    options.success();
                }
                else {
                    timeout = setTimeout( check, options.interval );
                }
            }

            $this.append( '<div class="jLoaderTmp" style="position: absolute; width: 0; height: 0; line-height: 0; font-size: 0; visibility: hidden; overflow: hidden; z-index: -1;"></div>' );
            $tmp = $this.children( '.jLoaderTmp:last-child' );

            $( $this ).add( $this.find( '*' ) ).not( options.skip ).each( function() {
                var strBackgroundUrl;

                if ( $( this ).css( 'background-image' ) !== 'none' ) {
                     strBackgroundUrl = $( this ).css( 'background-image' );
                     if ( /url/.exec( strBackgroundUrl ) ) {
                          strBackgroundUrl = strBackgroundUrl.replace( '"', '' ).replace( "'", '' ).replace( ' ', '' ).replace( 'url(', '' ).replace( ')', '' );
                          $tmp.append( '<img src="' + strBackgroundUrl + '">' );
                     }
                }
            } );
            $images = $this.find( 'img:not( ' + options.skip + ')' );
            if ( $this.is( 'img' ) ) {
                if ( ! $this.is( options.skip ) ) {
                    $images = $images.add( $this );
                }
            }
            intCount = parseInt( $images.length );
            options.start();
            check();
        } );
     };
} )( overlay );
var historyPushState = ( function() {
    var $ = jQuery;
    var $title = $( 'title' );
    
    return function( options ) {
        options = $.extend( {}, {
            stateObj: {},
            title: $title.html(),
            path: ''
        }, options );
        window.history.pushState( options.stateObj, options.title, document.location.href.split('#')[0] + '#' + options.path );
    };
} )();
var isInternetExplorer = function() {
    var rv = false;

    if ( navigator.appName === 'Microsoft Internet Explorer' ) {
        var ua = navigator.userAgent;
        var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
        if ( re.exec(ua) !== null ) {
            rv = true;
        }
    }
    return rv;
};
var isInternetExplorer8AndOlder = function() {
    var rv = false;

    if ( navigator.appName === 'Microsoft Internet Explorer' ) {
        var ua = navigator.userAgent;
        var re  = new RegExp( "MSIE ([0-9]{1,}[\.0-9]{0,})" );
        if ( re.exec(ua) !== null ) {
            rv = parseFloat( RegExp.$1 );
            rv = rv < 9;
        }
    }
    return rv;
};
var refreshHTMLClasses = function() {
    var $ = jQuery;
    var $html = $( 'html' );
    
    return function() {
        $html.find( '.jgallery' ).length === 0 ? $html.removeClass( 'has-jgallery' ) : $html.addClass( 'has-jgallery' );
        $html.find( '.jgallery.hidden' ).length === 0 ? $html.removeClass( 'has-hidden-jgallery' ) : $html.addClass( 'has-hidden-jgallery' );
        $html.find( '.jgallery:not(.hidden)' ).length === 0 ? $html.removeClass( 'has-visible-jgallery' ) : $html.addClass( 'has-visible-jgallery' );
    };
};
var AdvancedAnimation = ( function( isInternetExplorer8AndOlder ) {
    var $ = jQuery;
    var $head = $( 'head' );
    var intAdvancedAnimationLastId = 0;

    var AdvancedAnimation = function( $this ) {
        if ( $this.is( '[data-advanced-animation-id]') ) {
            return;
        }
        this.cols = 1;
        this.rows = 1;
        this.direction = 'forward';
        this.animation = true;
        this.$element = $this;
        this.$element.filter( ':not( [data-advanced-animation-id] )' ).attr( 'data-advanced-animation-id', ++intAdvancedAnimationLastId );
        this.$element.find( '.pt-item' ).wrap( '<div class="pt-page" />' );
        this.$element.wrapInner( '<div class="pt-part" />' );
        this.generateHtml();
        this._showParts( this.$element.find( '.pt-part' ), 1 );
    };

    AdvancedAnimation.prototype = {
        next: function() {
            var $next = this.$element.find( '.pt-part' ).eq( this.direction === 'backward' ? -1 : 0 ).find( '.pt-page-current:not(.pt-page-prev)' ).next();

            if ( $next.length ) {
                this.show( $next );
            }
            else {
                this.show( this.$element.find( '.pt-part' ).eq( this.direction === 'backward' ? -1 : 0 ).find( '.pt-page' ).eq( 0 ) );
            }
        },

        show: function( $new, options ) {
            var intPtPageNumber = $new.prevAll().length + 1;

            if ( $new.is( '.pt-page-current:not(.pt-page-prev)' ) ) {
                return;
            }
            options = $.extend( {}, {
                animation: true
            }, options );
            this.animation = options.animation;
            this._waveJumpToEnd();
            if ( this.animation ) {
                this._runWave( intPtPageNumber );
            } else {
                this._showParts( this.$element.find( '.pt-part' ), intPtPageNumber );
            }
            this.intPrevPtPageNumber = intPtPageNumber;
        },

        setQuantityParts: function( intCols, intRows ) {
            this.cols = intCols;
            this.rows = intRows;
            this.generateHtml();
        },

        setAnimationProperties: function( options ) {
            var intId = this.$element.attr( 'data-advanced-animation-id' );
            var $stylesheet = $head.find( 'style[data-advanced-animation-id="' + intId + '"]' );

            this.duration = options.duration;
            if ( isInternetExplorer8AndOlder() ) {
                return;
            }
            if ( $stylesheet.length === 0 ) {
                $stylesheet = $head.append( '<style type="text/css" data-advanced-animation-id="' + intId + '" />' ).children( ':last-child' );
            }
            $stylesheet.html('\
                [data-advanced-animation-id="' + intId + '"] .pt-page {\
                    -webkit-animation-duration: ' + options.duration + ';\
                    -moz-animation-duration: ' + options.duration + ';\
                    animation-duration: ' + options.duration + ';\
                    -webkit-animation-timing-function: ' + options.transitionTimingFunction + ';\
                    -moz-animation-timing-function: ' + options.transitionTimingFunction + ';\
                    animation-timing-function: ' + options.transitionTimingFunction + ';\
                }\
            ');
        },

        setHideEffect: function( hideEffect ) {
            this.prevHideEffect = this.hideEffect;
            this.hideEffect = hideEffect;
            if ( /moveTo|rotateRoom|rotateCarousel|rotateSlideOut/.test( hideEffect ) ) {
                this.$element.find( '.pt-part' ).addClass( 'hide-overflow' );
            }
            else {
                this.$element.find( '.pt-part' ).removeClass( 'hide-overflow' );                
            }
        },

        setShowEffect: function( showEffect ) {
            this.prevShowEffect = this.showEffect;
            this.showEffect = showEffect;
        },

        setDirection: function( direction ) {
            this.direction = direction;
        },

        _runWave: function( intPtPageNumber ) {
            this.$element.find( '.pt-part' ).addClass( 'in-queue' );
            this._showNextPart( intPtPageNumber );
        },

        _waveJumpToEnd: function() {
            clearTimeout( this.showPartsTimeout );
            if ( typeof this.intPrevPtPageNumber !== 'undefined' ) {
                this._showParts( this.$element.find( '.pt-part.in-queue' ).removeClass( 'in-queue' ), this.intPrevPtPageNumber );
            }
        },

        _showNextPart: function( intPtPageNumber ) {
            var self = this;
            var $part = this.$element.find( '.pt-part.in-queue' ).eq( this.direction === 'backward' ? -1 : 0 );

            if ( $part.length === 0 ) {
                return;
            }
            this._showParts( $part.removeClass( 'in-queue' ), intPtPageNumber );
            if ( $part.length === 0 ) {
                return;
            }
            clearTimeout( this.showPartsTimeout );
            this.showPartsTimeout = setTimeout( function() {
                self._showNextPart( intPtPageNumber );
            }, parseFloat( this.duration ) * 1000 * 0.25 / Math.max( 1, this.$element.find( '.pt-part' ).length - 1 ) );
        },

        _showParts: function( $this, intPtPageNumber ) {
            $this.find( '.pt-page-current.pt-page-prev' ).removeClass( 'pt-page-prev' ).removeClass( 'pt-page-current' );
            $this.find( '.pt-page-current' ).addClass( 'pt-page-prev' );
            $this.find( '.pt-page:nth-child(' + intPtPageNumber + ')' ).addClass( 'pt-page-current' );
            $this.find( '.pt-page' ).removeClass( this.hideEffect ).removeClass( this.showEffect );
            if ( typeof this.prevHideEffect !== 'undefined' ) {
                $this.find( '.pt-page' ).removeClass( this.prevHideEffect );
            }
            if ( typeof this.prevShowEffect !== 'undefined' ) {
                $this.find( '.pt-page' ).removeClass( this.prevShowEffect );
            }
            if ( this.animation ) {
                $this.find( '.pt-page-prev' ).addClass( this.hideEffect );
                $this.find( '.pt-page-current:not(.pt-page-prev)' ).addClass( this.showEffect );
            }
        },

        hideActive: function() {
            this.$element.find( '.pt-page-current' ).addClass( 'pt-page-prev' ).addClass( this.hideEffect );
        },

        generateHtml: function() {
            var intI;
            var intJ;
            var $content;

            this.$element.html( this.$element.find( '.pt-part' ).eq( 0 ).html() );
            $content = this.$element.html();
            this.$element.children( '.pt-part' ).remove();
            for ( intJ = 0; intJ < this.rows; intJ++ ) {
                for ( intI = 0; intI < this.cols; intI++ ) {
                    this.$element
                        .append( '<div class="pt-part pt-perspective" data-col-no="' + intI + '" data-row-no="' + intJ + '" style="position: absolute;"></div>' )
                        .children( ':last-child' )
                        .html( $content )
                        .find( '.pt-item' );
                }
            }
            this.setPositionParts();
            this.$element.children( ':not(.pt-part)' ).remove();
        },

        setPositionParts: function() {
            var self = this;
            var intWidth = this.$element.outerWidth();
            var intHeight = this.$element.outerHeight();
            var intPartWidth = intWidth / this.cols;
            var intPartHeight = intHeight / this.rows;

            this.$element.find( '.pt-part' ).each( function() {
                var $this = $( this );
                var intI = $this.attr( 'data-col-no' );
                var intJ = $this.attr( 'data-row-no' );

                $this
                .css( {
                    left: self.$element.outerWidth() * ( 100 / self.cols * intI ) / 100 + 'px',
                    top: self.$element.outerHeight() * ( 100 / self.rows * intJ ) / 100 + 'px',
                    width: self.$element.outerWidth() * ( 100 / self.cols ) / 100 + 1 + 'px',
                    height: self.$element.outerHeight() * ( 100 / self.rows ) / 100 + 1 + 'px'                   
                } )
                .find( '.pt-item' )
                .css( {
                    width: intWidth,
                    height: intHeight,
                    left: - intPartWidth * intI,
                    top: - intPartHeight * intJ
                } );
            } );          
        }
    };
    
    return AdvancedAnimation;
} )( isInternetExplorer8AndOlder );
var IconChangeAlbum = ( function() {
    var $ = jQuery;
    var $html = $( 'html' );
    
    var IconChangeAlbum = function( $this, jGallery ) {        
        this.$element = $this;
        this.jGallery = jGallery;
        this.$title = this.$element.find( '.title' );
    };

    IconChangeAlbum.prototype = {
        bindEvents: function( jGallery ) {
            var self = this;

            this.getElement().on( {
                click: function( event ) {
                    self.menuToggle();
                    event.stopPropagation();
                }
            } );
            this.getItemsOfMenu().on( {
                click: function() {
                    var $this = $( this );

                    if ( $this.is( '.active' ) ) {
                        return;
                    }
                    jGallery.thumbnails.setActiveAlbum( jGallery.thumbnails.$albums.filter( '[data-jgallery-album-title="' + $this.attr( 'data-jgallery-album-title' ) + '"]' ) );
                }
            } );
            $html.on( 'click', function(){ self.menuHide(); } );  
        },

        setTitle: function( strTitle ) {
            this.$title.html( strTitle );
        },

        getTitle: function() {
            return this.$title.html();
        },

        getListOfAlbums: function() {
            return this.getElement().find( '.menu' );
        },

        getElement: function() {
            return this.$element;
        },

        getItemsOfMenu: function() {
            return this.getListOfAlbums().find( '.item' );
        },

        appendToMenu: function( strHtml ) {
            this.getListOfAlbums().append( strHtml );
        },

        menuToggle: function() {
            this.getElement().toggleClass( 'active' );
        },

        menuHide: function() {
            this.getElement().removeClass( 'active' );
        },

        clearMenu: function() {
            this.getListOfAlbums().html( '' );
        },

        refreshMenuHeight: function() {
            this.getListOfAlbums().css( 'max-height', this.jGallery.zoom.$container.outerHeight() - 8 );
        }
    };
    
    return IconChangeAlbum;
} )();
var Progress = ( function() {
    var Progress = function( $this, jGallery ) {
        this.jGallery = jGallery;
        this.$element = $this;
    };

    Progress.prototype = {
        clear: function() {            
            this.$element.stop( false, true ).css( {width: 0} );
            return this;         
        },

        start: function( intWidth, success ) {            
            var interval = parseInt( this.jGallery.options.slideshowInterval ) * 1000;
            var $element = this.$element;

            $element.animate( {
                width: intWidth
            }, interval - interval * ( $element.width() / $element.parent().width() ), 'linear', success );
            return this;    
        },

        pause: function() {
            this.$element.stop();
            return this;
        }        
    };
    
    return Progress;
} )();
var Thumbnails = ( function( jLoader ) {
    var $ = jQuery;
    var $head = $( 'head' );
    var $window = $( window );
    
    $.fn.jLoader = jLoader;
    
    var Thumbnails = function( jGallery ) {
        this.$element = jGallery.$element.find( '.jgallery-thumbnails' );
        this.$a = this.getElement().find( 'a' );
        this.$img = this.getElement().find( 'img' );
        this.$container = this.getElement().find( '.jgallery-container' );
        this.$albums = this.getElement().find( '.album' ).length ? this.getElement().find( '.album' ) : this.getElement().find( '.jgallery-container-inner' ).addClass( 'active' );
        this.$btnNext = this.getElement().children( '.next' );
        this.$btnPrev = this.getElement().children( '.prev' );
        this.intJgalleryId = jGallery.$element.attr( 'data-jgallery-id' );
        this.isJgalleryInitialized = jGallery.$element.is( '[data-jgallery-id]' );
        this.zoom = jGallery.zoom;
        this.$iconToggleThumbsVisibility = this.zoom.$container.find( '.minimalize-thumbnails' );
        this.jGallery = jGallery;
        if ( this.jGallery.options.swipeEvents ) {
            this.initSwipeEvents();
        }
    };

    Thumbnails.prototype = {
        getElement: function() {
            return this.$element;
        },

        init: function() {
            this.getElement().removeClass( 'square number images jgallery-thumbnails-left jgallery-thumbnails-right jgallery-thumbnails-top jgallery-thumbnails-bottom jgallery-thumbnails-horizontal jgallery-thumbnails-vertical' );
            this.getElement().addClass( 'jgallery-thumbnails-' + this.jGallery.options.thumbnailsPosition );
            if ( this.isVertical() ) {
                this.getElement().addClass( 'jgallery-thumbnails-vertical' );                    
            }
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-horizontal' );                    
            }   
            if ( this.jGallery.options.thumbType === 'image' ) {
                this._initImages();
            }
            if ( this.jGallery.options.thumbType === 'square' ) {
                this._initSquare();
            }
            if ( this.jGallery.options.thumbType === 'number' ) {
                this._initNumber();
            }
        },
        
        initSwipeEvents: function() {
            if ( ! $.fn.swipe ) {
                return;
            }
            
            var $container = this.$container;
            var self = this;
            var canScrollToPrev;
            var canScrollToNext;
            var translate = function( distance ) {
                if ( self.isVertical() || self.isFullScreen() ) {
                    $container.css( {
                        "-webkit-transform": 'translateY(' + distance +  'px)',
                        "transform": 'translateY(' + distance +  'px)'
                    } );  
                }
                else {    
                    $container.css( {
                        "-webkit-transform": 'translateX(' + distance +  'px)',
                        "transform": 'translateX(' + distance +  'px)'
                    } );              
                }
            };
            
            $container.swipe( {
                swipeStatus: function ( event, phase, direction, distance ) {
                    if ( phase === "start" ) {
                        canScrollToPrev = self.canScrollToPrev();
                        canScrollToNext = self.canScrollToNext();
                    } 
                    else if ( phase === "move" ) {
                        if ( canScrollToNext && ( direction === "left" || direction === "down" ) ) {
                            translate( - distance );
                        } else if ( canScrollToPrev ) {
                            translate( distance );
                        }
                    } else if ( phase === "end" ) {
                        if ( canScrollToNext && ( direction === "left" || direction === "down" ) ) {
                            self._scrollToNext();
                            translate( 0 );
                        } else if ( canScrollToPrev ) {
                            self._scrollToPrev();
                            translate( 0 );
                        }
                    } else {
                        translate( 0 );
                    }
                }
            } );
        },

        show: function() {
            var self = this;

            if ( ! this.getElement().is( '.hidden' ) ) {
                return;
            }
            if ( ! ( this.jGallery.isMobile() && this.jGallery.options.thumbnailsHideOnMobile ) ) {
                this.getElement().removeClass( 'hidden' );
            }
            if ( ! this.getElement().is( '.loaded' ) ) {
                this.getElement().jLoader( {
                    start: function() {},
                    success: function(){
                        self._showNextThumb();
                        self.$a.parent( '.album:not(.active)' ).children( '.hidden' ).removeClass( 'hidden' );
                        self.getElement().addClass( 'loaded' );
                    }
                } );
            }
            else {
                this._showNextThumb();
                this.$a.parent( '.album:not(.active)' ).children( '.hidden' ).removeClass( 'hidden' );
            }
            this.$iconToggleThumbsVisibility.removeClass( 'inactive' );
        },

        showThumbsForActiveAlbum: function() {
            this.$a.addClass( 'hidden' );
            this._showNextThumb();
        },

        hide: function( options ) {
            options = $.extend( { hideEachThumb: true }, options );
            this.getElement().addClass( 'hidden' );
            if ( options.hideEachThumb ) {
                this.$a.addClass( 'hidden' );
            }
            this.$iconToggleThumbsVisibility.addClass( 'inactive' );
        },

        toggle: function() {                    
            this.getElement().is( '.hidden' ) ? this.show() : this.hide( { hideEachThumb: false } );
        },

        setActiveThumb: function( $a ) {
            var $img = $a.find( 'img' );
            var $album = this.$albums.filter( '.active' );
            var $a = $album.find( 'img[src="' + $img.attr( 'src' ) + '"]' ).parent( 'a' ).eq( 0 );

            this.getElement().find( 'a' ).removeClass( 'active' );
            $a.addClass( 'active' );
            if ( $album.find( 'a.active' ).length === 0 ) {
                $album.find( 'a:first-child' ).eq( 0 ).addClass( 'active' );
            }
            this.center( $a );
        },

        isHorizontal: function() {
            return this.jGallery.options.thumbnailsPosition === 'top' || this.jGallery.options.thumbnailsPosition === 'bottom';
        },

        isVertical: function() {
            return this.jGallery.options.thumbnailsPosition === 'left' || this.jGallery.options.thumbnailsPosition === 'right';
        },

        isFullScreen: function() {
            return this.getElement().is( '.full-screen' );
        },

        refreshNavigation: function() {
            this.canScrollToPrev() ? this.$btnPrev.addClass( 'visible' ) : this.$btnPrev.removeClass( 'visible' );
            this.canScrollToNext() ? this.$btnNext.addClass( 'visible' ) : this.$btnNext.removeClass( 'visible' );
        },

        center: function( $a ) {
            if ( this.isHorizontal() ) {
                this._horizontalCenter( $a );
            }
            if ( this.isVertical() ) {
                this._verticalCenter( $a );
            }
        },

        reload: function() {
            this.$a = this.getElement().find( 'a' );
            this.$img = this.getElement().find( 'img' );
            this.$albums = this.getElement().find( '.album' ).length ? this.getElement().find( '.album' ) : this.getElement().find( '.jgallery-container-inner' );
            this.zoom.showPhoto( this.$albums.find( 'a' ).eq( 0 ) );
        },

        bindEvents: function() {
            var self = this;

            this.$btnNext.on( 'click', function() { self._scrollToNext(); } );
            this.$btnPrev.on( 'click', function() { self._scrollToPrev(); } );
            this.zoom.$container.find( '.full-screen' ).on( {
                click: function() {
                    self.zoom.slideshowPause();
                    self.changeViewToFullScreen();
                }
            } );
            this.getElement().find( '.jgallery-close' ).on( {
                click: function() {
                    self.changeViewToBar();
                    self.zoom.refreshSize();
                }
            } );
        },

        changeViewToBar: function() {
            this.getElement().removeClass( 'full-screen' );
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-horizontal' ).removeClass( 'jgallery-thumbnails-vertical' );                    
            }
            this.refreshNavigation();
        },

        changeViewToFullScreen: function() {
            this.getElement().addClass( 'full-screen' );
            if ( this.isHorizontal() ) {
                this.getElement().addClass( 'jgallery-thumbnails-vertical' ).removeClass( 'jgallery-thumbnails-horizontal' );                    
            }
            this.refreshNavigation();
        },

        setActiveAlbum: function( $album ) {
            if ( ! this.jGallery.booIsAlbums || $album.is( '.active' ) ) {
                return;
            }
            this.$albums.not( $album.get( 0 ) ).removeClass( 'active' );
            $album.addClass( 'active' );
            this.jGallery.iconChangeAlbum.getListOfAlbums().find( '.item' ).removeClass( 'active' ).filter( '[data-jgallery-album-title="' + $album.attr( 'data-jgallery-album-title' ) + '"]' ).addClass( 'active' );
            this.jGallery.iconChangeAlbum.setTitle( $album.attr( 'data-jgallery-album-title' ) );
            this.refreshNavigation();
            if ( ! this.getElement().is( '.full-screen' ) && this.jGallery.$element.is( ':visible' ) ) {
                this.zoom.showPhoto( $album.find( 'a' ).eq( 0 ) );
            }
            this.showThumbsForActiveAlbum();
        },

        _initSquare: function() {
            this.getElement().addClass( 'square' );
        },

        _initNumber: function() {
            this.getElement().addClass( 'number' );
            this._initSquare();
        },

        _initImages: function() {
            var $css = $head.find( 'style.jgallery-thumbnails[data-jgallery-id="' + this.intJgalleryId + '"]' );
            var strCss = '\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails a {\n\
                        width: ' + this.jGallery.options.thumbWidth + 'px;\n\
                        height: ' + this.jGallery.options.thumbHeight + 'px;\n\
                        font-size: ' + this.jGallery.options.thumbHeight + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails.full-screen a {\n\
                        width: ' + this.jGallery.options.thumbWidthOnFullScreen + 'px;\n\
                        height: ' + this.jGallery.options.thumbHeightOnFullScreen + 'px;\n\
                        font-size: ' + this.jGallery.options.thumbHeightOnFullScreen + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails-horizontal {\n\
                        height: ' + parseInt( this.jGallery.options.thumbHeight + 2 ) + 'px;\n\
                    }\n\
                    .jgallery[data-jgallery-id="' + this.intJgalleryId + '"] .jgallery-thumbnails-vertical {\n\
                        width: ' + parseInt( this.jGallery.options.thumbWidth + 2 ) + 'px;\n\
                    }\n\
            ';

            this.getElement().addClass( 'images' );
            $css.length ? $css.html( strCss ) : $head.append( '\
                <style type="text/css" class="jgallery-thumbnails" data-jgallery-id="' + this.intJgalleryId + '">\
                    ' + strCss + '\
                </style>\
            ');
            if ( this.isHorizontal() ) {
                this.jGallery.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'fa-ellipsis-h' ).removeClass( 'fa-ellipsis-v' );
            }
            else {
                this.jGallery.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'fa-ellipsis-v' ).removeClass( 'fa-ellipsis-h' );                
            }
            if ( this.isJgalleryInitialized ) {
                return;
            }
            this.hide();
        }, 

        _showNextThumb: function() {
            var self = this;
            var $nextThumb = this.$a.parent( '.active' ).children( '.hidden' ).eq( 0 );

            setTimeout( function() {
                $nextThumb.removeClass( 'hidden' );
                if ( $nextThumb.length ) {
                    self._showNextThumb();
                }
            }, 70 );
        },

        _horizontalCenter: function( $a ) {
            var self = this;

            if ( $a.length !== 1 ) {
                return;
            }            
            this.$container.stop( false, true ).animate( {
                'scrollLeft': $a.position().left - this.$container.scrollLeft() * -1 - $a.outerWidth() / -2 - this.$container.outerWidth() / 2
            }, function() {
                self.refreshNavigation();
            } );
        },

        _verticalCenter: function( $a ) {
            var self = this;

            if ( $a.length !== 1 ) {
                return;
            }
            this.$container.stop( false, true ).animate( {
                'scrollTop': $a.position().top - this.$container.scrollTop() * -1 - $a.outerHeight() / -2 - this.$container.outerHeight() / 2
            }, function() {
                self.refreshNavigation();
            } );
        },
        
        canScrollToPrev: function() {
            if ( this.isVertical() || this.isFullScreen() ) {
                return this.$container.scrollTop() > 0;
            }
            else {
                return this.$container.scrollLeft() > 0;
            }
        },
        
        canScrollToNext: function() {
            if ( this.isVertical() || this.isFullScreen() ) {
                return this.$container.find( '.jgallery-container-inner' ).height() > this.$container.height() + this.$container.scrollTop();
            }
            else {
                var $album = this.getElement().find( 'div.active' );
                var intThumbsWidth = this.jGallery.options.thumbType === 'image' ? this.$a.outerWidth( true ) * $album.find( 'img' ).length : this.$a.outerWidth( true ) * $album.find( 'a' ).length;
                
                return intThumbsWidth > this.$container.width() + this.$container.scrollLeft();
            }
        },

        _scrollToPrev: function() {
            var self = this;

            if ( this.isVertical() || this.isFullScreen() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollTop': "-=" + $window.height() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );
            } 
            else if ( this.isHorizontal() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollLeft': "-=" + $window.width() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );
            }
        },

        _scrollToNext: function() {
            var self = this;

            if ( this.isVertical() || this.isFullScreen() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollTop': "+=" + $window.height() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );                
            }
            else if ( this.isHorizontal() ) {
                this.$container.stop( false, true ).animate( {
                    'scrollLeft': "+=" + $window.width() * 0.7
                }, function() {
                    self.refreshNavigation();
                } );
            }
        }
    };
    
    return Thumbnails;
} )( jLoader );
var ThumbnailsGenerator = ( function( outerHtml, jLoader ) {
    var $ = jQuery;
    
    $.fn.outerHtml = outerHtml;
    $.fn.jLoader = jLoader;
    
    var ThumbnailsGenerator = function( jGallery, options ) {
        this.options = $.extend( {}, {
            thumbsHidden: true
        }, options );
        this.jGallery = jGallery;
        this.isSlider = jGallery.isSlider();
        this.$element = jGallery.$this;
        this.booIsAlbums = jGallery.booIsAlbums;
        this.$tmp;
        this.intI = 1;
        this.intJ = 1;
        this.intNo;
        this.$thumbnailsContainerInner = this.jGallery.$jgallery.find( '.jgallery-thumbnails .jgallery-container-inner' );
        this.start();
    };

    ThumbnailsGenerator.prototype = {
        start: function() {
            var self = this;
            var selector = this.jGallery.isSlider() ? '.album:has(img)' : '.album:has(a:has(img))';

            $( 'body' ).append( '<div id="jGalleryTmp" style="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: -1; overflow: hidden;">' + this.$element.html() + '</div>' );
            this.$tmp = $( '#jGalleryTmp' );
            this.$thumbnailsContainerInner.html( '' );
            if ( this.booIsAlbums ) {
                this.$tmp.find( selector ).each( function() {
                    self.insertAlbum( $( this ) );
                } );
            }
            else {
                this.insertImages( this.$tmp, this.$thumbnailsContainerInner );                    
            }
            this.$tmp.remove();
            this.refreshThumbsSize();
        },

        insertAlbum: function( $this ) {
            var strTitle = $this.is( '[data-jgallery-album-title]' ) ? $this.attr( 'data-jgallery-album-title' ) : 'Album ' + this.intJ;
            var $album = this.$thumbnailsContainerInner.append( '<div class="album" data-jgallery-album-title="' + strTitle + '"></div>' ).children( ':last-child' );

            if ( this.intJ === 1 ) {
                $album.addClass( 'active' );
            }
            this.insertImages( $this, $album );
            this.intJ++;
        },

        insertImages: function( $images, $container ) {
            var self = this;
            var selector = this.jGallery.isSlider() ? 'img' : 'a:has(img)';

            this.intNo = 1;
            $images.find( selector ).each( function() {
                self.insertImage( $( this ), $container );
            } );            
        },

        insertImage: function( $this, $container ) {
            var $a = $();
            var $parent;
            
            if ( $this.is( 'a' ) ) {
                $a = $container.append( '<a href="' + $this.attr( 'href' ) + '">' + this.generateImgTag( $this.find( 'img' ).eq( 0 ) ).outerHtml() + '</a>' ).children( ':last-child' );
            }
            else if ( $this.is( 'img' ) ) {
                $a = $container.append( $( '<a href="' + $this.attr( 'src' ) + '">' + this.generateImgTag( $this ).outerHtml() + '</a>' ) ).children( ':last-child' );
                $parent = $this.parent();
                if ( this.isSlider && $parent.is( 'a' ) ) {
                    $a.attr( 'link', $parent.attr( 'href' ) );
                    if ( $parent.is( '[target]' ) ) {
                        $a.attr( 'target', $parent.attr( 'target' ) );
                    }
                }
            }
            $a.jLoader( {
                start: function() {
                    $a.overlay( {
                        fadeIn: false,
                        fadeOut: false,
                        show: true,
                        showLoader: true
                    } );
                },
                success: function() {
                    $a.overlay( {
                        hide: true
                    } );
                }
            } );
            $container.children( ':last-child' ).attr( 'data-jgallery-photo-id', this.intI++ ).attr( 'data-jgallery-number', this.intNo++ );
        },

        generateImgTag: function( $img ) {
            var $newImg = $( '<img src="' + $img.attr( 'src' ) + '" />' );

            if ( $img.is( '[alt]' ) ) {
                $newImg.attr( 'alt', $img.attr( 'alt' ) );
            }
            if ( $img.is( '[data-jgallery-bg-color]' ) ) {
                $newImg.attr( 'data-jgallery-bg-color', $img.attr( 'data-jgallery-bg-color' ) );
            }
            if ( $img.is( '[data-jgallery-text-color]' ) ) {
                $newImg.attr( 'data-jgallery-text-color', $img.attr( 'data-jgallery-text-color' ) );
            }

            return $newImg;
        },

        refreshThumbsSize: function() {
            var options = this.jGallery.options;

            this.$thumbnailsContainerInner.find( 'img' ).each( function() {
                var $image = $( this );
                var image = new Image();

                image.src = $image.attr( 'src' );          
                if ( ( image.width / image.height ) < ( options.thumbWidth / options.thumbHeight ) ) {
                    $image.addClass( 'thumb-vertical' ).removeClass( 'thumb-horizontal' );
                }
                else {
                    $image.addClass( 'thumb-horizontal' ).removeClass( 'thumb-vertical' );                
                }
                if ( ( image.width / image.height ) < ( options.thumbWidthOnFullScreen / options.thumbHeightOnFullScreen ) ) {
                    $image.addClass( 'thumb-on-full-screen-vertical' ).removeClass( 'thumb-on-full-screen-horizontal' );
                }
                else {
                    $image.addClass( 'thumb-on-full-screen-horizontal' ).removeClass( 'thumb-on-full-screen-vertical' );                
                }
            } );
        }
    };
    
    return ThumbnailsGenerator;
} )( outerHtml, jLoader );
var Zoom = ( function( jLoader, overlay, historyPushState, jGalleryTransitions, jGalleryArrayTransitions, jGalleryBackwardTransitions, AdvancedAnimation, IconChangeAlbum ) {
    var $ = jQuery;
    var $body = $( 'body' );
    
    $.fn.jLoader = jLoader;
    $.fn.overlay = overlay;
    
    var Zoom = function( jGallery ) {
        this.$container = jGallery.$element.children( '.zoom-container' );
        this.$element = this.$container.children( '.zoom' );
        this.$title = this.$container.find( '.nav-bottom > .title' );
        this.$btnPrev = this.$container.children( '.prev' );
        this.$btnNext = this.$container.children( '.next' );
        this.thumbnails = jGallery.thumbnails;
        this.$jGallery = jGallery.$element;
        this.jGallery = jGallery;
        this.$resize = this.$container.find( '.resize' );
        this.$dragNav = this.$container.find( '.drag-nav' );
        this.$dragNavCrop = $();
        this.$dragNavCropImg = $();
        this.$changeMode = this.$container.find( '.fa.change-mode' );
        this.$random = this.$container.find( '.random' );
        this.$slideshow = this.$container.find( '.slideshow' );
        this.intJGalleryId = this.$jGallery.attr( 'data-jgallery-id' );
        this.booSlideshowPlayed = false;
        this.booLoadingInProgress = false;
        this.booLoadedAll = false;
        this.$title.on( 'click', function() {
            $( this ).toggleClass( 'expanded' );
        } );
        this.update();
        this.enableDrag();
    };

    Zoom.prototype = {
        update: function() {
            var transition = jGalleryTransitions[ this.jGallery.options.transition ];

            this.$container.attr( 'data-size', this.jGallery.options.zoomSize );
            this.$element.find( '.pt-page' )
                .removeClass( this.jGallery.options.hideEffect )
                .removeClass( this.jGallery.options.showEffect );
            if ( typeof transition !== 'undefined' ) {
                this.jGallery.options.hideEffect = transition[ 0 ];
                this.jGallery.options.showEffect = transition[ 1 ];
            }
            this.initAdvancedAnimation();  
        },

        initAdvancedAnimation: function() {
            if ( typeof this.advancedAnimation === 'undefined' ) {
                this.advancedAnimation = new AdvancedAnimation( this.$element );
            }
            this.advancedAnimation.setAnimationProperties( { 
                duration: this.jGallery.options.transitionDuration,
                transitionTimingFunction: this.jGallery.options.transitionTimingFunction
            } );
            this.advancedAnimation.setDirection( this.jGallery.options.transitionWaveDirection );
            this.advancedAnimation.setQuantityParts( this.jGallery.options.transitionCols, this.jGallery.options.transitionRows );
            this.advancedAnimation.setHideEffect( this.jGallery.options.hideEffect );
            this.advancedAnimation.setShowEffect( this.jGallery.options.showEffect );
        },

        setThumbnails: function( thumbnails ) {
            this.thumbnails = thumbnails;
        },
        
        showDragNav: function() {
            this.$dragNav.removeClass( 'hide' ).addClass( 'show' );  
        },
        
        hideDragNav: function() {
            this.$dragNav.removeClass( 'show' ).addClass( 'hide' );  
        },
        
        refreshDragNavVisibility: function() {
            var $img = this.$element.find( 'img.active' );
            
            if ( $img.width() <= this.$element.outerWidth() || $img.height() <= this.$element.outerHeight() ) {
                this.hideDragNav();
            }
            else {
                this.showDragNav();
            }
        },

        enableDrag: function() {
            var self = this;
            var startMarginLeft;
            var startMarginTop;
            var startX;
            var startY;
            var point;
            var $img;
            
            var calcDraggedX = function() {
                return parseInt( startMarginLeft ) - parseInt( $img.css( 'margin-left' ) );
            };

            var startDrag = function( event ) {
                startX = event.pageX;
                startY = event.pageY;
                point = event;
                $img = self.$element.find( 'img.active' );
                startMarginLeft = $img.css( 'margin-left' );
                startMarginTop = $img.css( 'margin-top' );
                self.$element.on( {
                    mousemove: move,
                    touchmove: move,
                    mouseleave: stopDrag,
                    touchend: stopDrag
                } );
                if ( self.jGallery.options.zoomSize === 'fill' ) {
                    self.$dragNav.removeClass( 'hide' ).addClass( 'show' );
                }
                drag( 0, 0 );
            };

            var stopDrag = function() {
                var draggedX = calcDraggedX();
                var moveX = startX - point.pageX;
                
                self.$element.off( 'mousemove touchmove mouseleave touchend' );
                if ( self.jGallery.options.zoomSize === 'fill' ) {
                    self.$dragNav.removeClass( 'show' ).addClass( 'hide' );
                }
                if ( self.jGallery.options.swipeEvents && draggedX === 0 ) {
                    if ( moveX > 0 ) {
                        self.showNextPhoto();
                    }
                    else if ( moveX < 0 ) {
                        self.showPrevPhoto();
                    }
                }
            };
            
            var move = function( event ) {
                point = event.type === 'touchmove' ? event.originalEvent.touches[0] : event;
                var distance = {
                    x: point.pageX - startX,
                    y: point.pageY - startY
                };
                var dragged = {};

                if ( self.jGallery.options.draggableZoom ) {
                    dragged = drag( distance.x, distance.y );
                }
                if ( (Math.abs(distance.y) > Math.abs(distance.x)) && dragged.y ) {
                    event.preventDefault();
                }
                else if ( (Math.abs(distance.x) >= Math.abs(distance.y)) && dragged.x ) {
                    event.preventDefault();
                }
            };

            /**
             * 
             * @param {number} x
             * @param {number} y
             * @returns {{ x: boolean, y: boolean }}
             */
            var drag = function( x, y ) {
                var marginLeft = parseFloat( parseFloat( startMarginLeft ) + x );
                var marginTop = parseFloat( parseFloat( startMarginTop ) + y );
                var $img = self.$element.find( 'img.active' );
                var $first = $img.eq( 0 );
                var firstPosition = $first.position();
                var firstPositionLeft = firstPosition.left;
                var firstPositionTop = firstPosition.top;
                var $last = $img.eq( -1 );
                var lastPosition = $last.position();
                var $lastParent = $last.parent();
                var $dragNavCrop = self.$dragNavCrop;
                var dragNavCropPosition = $dragNavCrop.position();
                var canDrag = {
                    x: firstPositionLeft + marginLeft < 0 && lastPosition.left + $last.width() + marginLeft > $lastParent.outerWidth(),
                    y: firstPositionTop + marginTop < 0 && lastPosition.top + $last.height() + marginTop > $lastParent.outerHeight()
                };

                if ( canDrag.x ) {
                    $img.css( {
                        'margin-left': marginLeft
                    } );
                    $dragNavCrop.css( {
                        left: - ( firstPositionLeft + marginLeft ) / $img.width() * 100 + '%'
                    } );
                }
                if ( canDrag.y ) {
                    $img.css( {
                        'margin-top': marginTop
                    } );
                    $dragNavCrop.css( {
                        top: - ( firstPositionTop + marginTop ) / $img.height() * 100 + '%'
                    } );
                }
                if ( dragNavCropPosition ) {
                    self.$dragNavCropImg.css( {
                        'margin-left': - dragNavCropPosition.left,
                        'margin-top': - dragNavCropPosition.top
                    } );
                }
                
                return canDrag;
            };

            this.refreshDragNavCropSize();
            this.$element.css( 'cursor', 'move' ).on( {
                mousedown: function( event ) {
                    startDrag( event );
                    self.slideshowPause();
                },
                touchstart: function( event ) {
                    startDrag( event.originalEvent.touches[0] );
                    self.slideshowPause();
                },
                mouseup: function() {
                    stopDrag();
                },
                touchend: function() {
                    stopDrag();
                }
            } );
        },

        refreshContainerSize: function () {
            var intNavBottomHeight = this.jGallery.isSlider() ? 0 : this.$container.find( '.nav-bottom' ).outerHeight();
            var isThumbnailsVisible = ! this.jGallery.isSlider() && ! this.thumbnails.getElement().is( '.hidden' );
            var strThumbnailsPosition = isThumbnailsVisible ? this.jGallery.options.thumbnailsPosition : '';

            this.$container.css( {
                'width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : 'auto',
                'height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight,
                'margin-top': strThumbnailsPosition === 'top' ? this.thumbnails.getElement().outerHeight( true ) : 0,
                'margin-left': strThumbnailsPosition === 'left' ? this.thumbnails.getElement().outerWidth( true ) : 0,
                'margin-right': strThumbnailsPosition === 'right' ? this.thumbnails.getElement().outerWidth( true ) : 0
            } );
            if ( this.jGallery.options.draggableZoom ) {
                this.refreshDragNavCropSize();
            }
        },

        refreshSize: function() {
            if ( this.thumbnails.isFullScreen() ) {
                return;
            }
            this.refreshContainerSize();
            if ( this.jGallery.options.zoomSize === 'original' ) {
                this.original();
            }
            else if ( this.jGallery.options.zoomSize === 'fill' ) {
                this.fill();
            }
            else {
                this.fit();
            }
            if ( this.jGallery.options.draggableZoom ) {
                this.refreshDragNavCropSize();
                this.refreshDragNavVisibility();
            }
            this.$element.addClass( 'visible' );
        },

        refreshDragNavCropSize: function() { 
            var $img = this.$element.find( 'img.active' );
            var cropPositionLeft;
            var cropPositionTop;

            this.$dragNavCrop.css( {
                width: this.$element.width() / $img.width() * 100 + '%',
                height: this.$element.height() / $img.height() * 100 + '%'
            } );
            if ( $img.attr( 'data-width' ) < this.$container.outerWidth() ) {
                cropPositionLeft = 0;
            }
            else {
                cropPositionLeft = ( this.$dragNav.width() - this.$dragNavCrop.width() ) / 2;                
            }
            if ( $img.attr( 'data-height' ) < this.$container.outerHeight() ) {
                cropPositionTop = 0;
            }
            else {
                cropPositionTop = ( this.$dragNav.height() - this.$dragNavCrop.height() ) / 2;              
            }
            this.$dragNavCrop.css( {
                left: cropPositionLeft,
                top: cropPositionTop
            } );
            if ( this.$dragNavCropImg.length ) {
                this.$dragNavCropImg.css( {
                    'margin-left': - cropPositionLeft,
                    'margin-top':  - cropPositionTop
                } );
            }
        },

        changeSize: function() {
            if ( this.jGallery.options.zoomSize === 'fit' ) {
                this.jGallery.options.zoomSize = 'fill';
            }
            else if ( this.jGallery.options.zoomSize === 'fill' ) {
                var $img = this.$element.find( 'img.active' ).eq( 0 );

                if ( this.$element.outerWidth().toString() === $img.attr( 'data-width' ) ) {
                    this.jGallery.options.zoomSize = 'fit';
                }
                else {        
                    this.jGallery.options.zoomSize = 'original';        
                }
            }
            else if ( this.jGallery.options.zoomSize === 'original' ) {
                this.jGallery.options.zoomSize = 'fit';
            }
            this.refreshSize();
            this.$container.attr( 'data-size', this.jGallery.options.zoomSize );
        },

        original: function() {
            var $img = this.$element.find( 'img.active' );

            this.advancedAnimation.setPositionParts();
            this.setImgSizeForOriginal( $img );
            this.setImgSizeForOriginal( this.$element.find( '.pt-page.init img' ) );
            if ( $img.attr( 'data-width' ) <= this.$element.outerWidth() && $img.attr( 'data-height' ) <= this.$element.outerHeight() ) {
                this.$resize.addClass( 'fa-search-plus' ).removeClass( 'fa-search-minus' );  
            }
            else {
                this.$resize.addClass( 'fa-search-minus' ).removeClass( 'fa-search-plus' );
            }
        },

        fit: function() {
            var $img = this.$element.find( 'img.active' ).add( this.$element.find( '.pt-page.init img' ) );

            this.advancedAnimation.setPositionParts();
            this.setImgSizeForFit( $img.filter( '.active' ) );
            this.setImgSizeForFit( $img.filter( ':not( .active )' ) );
            this.$resize.addClass( 'fa-search-plus' ).removeClass( 'fa-search-minus' );
        },

        fill: function() {
            var $img = this.$element.find( 'img.active' );

            this.setImgSizeForFill( $img );
            this.setImgSizeForFill( this.$element.find( '.pt-page.init img' ) );
            this.advancedAnimation.setPositionParts();
            if ( $img.attr( 'data-width' ) > $img.width() && $img.attr( 'data-height' ) > $img.height() ) {
                this.$resize.addClass( 'fa-search-plus' ).removeClass( 'fa-search-minus' );                
            }
            else {
                this.$resize.addClass( 'fa-search-minus' ).removeClass( 'fa-search-plus' );
            }
        },

        setImgSizeForOriginal: function( $img ) {
            $img.css( {
                'width': $img.attr( 'data-width' ),
                'height': $img.attr( 'data-height' ),
                'min-width': 0,
                'min-height': 0,
                'max-width': 'none',
                'max-height': 'none'
            } );       
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );            
        },

        setImgSizeForFit: function( $img ) {
            var intNavBottomHeight = this.jGallery.isSlider() ? 0 : this.$container.find( '.nav-bottom' ).outerHeight();
            var isThumbnailsVisible = ! this.jGallery.isSlider() && ! this.thumbnails.getElement().is( '.hidden' );

            $img.css( {
                'width': 'auto',
                'height': 'auto',
                'min-width': 0,
                'min-height': 0,
                'max-width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                'max-height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
            } );   
            if ( $img.width() / $img.height() / this.jGallery.getCanvasRatioWidthToHeight() < 1 ) {
                $img.css( {
                    'width': 'auto',
                    'height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
                } );                        
            }
            else {
                $img.css( {
                    'width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                    'height': 'auto'
                } );
            }             
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );
        },

        setImgSizeForFill: function( $img ) {
            var intNavBottomHeight = this.jGallery.isSlider() ? 0 : this.$container.find( '.nav-bottom' ).outerHeight();
            var isThumbnailsVisible = ! this.jGallery.isSlider() && ! this.thumbnails.getElement().is( '.hidden' );

            $img.css( {
                'width': 'auto',
                'height': 'auto',
                'max-width': 'none',
                'max-height': 'none',                    
                'min-width': 0,
                'min-height': 0
            } );
            if ( $img.width() / $img.height() / this.jGallery.getCanvasRatioWidthToHeight() > 1 ) {
                $img.css( {
                    'width': 'auto',
                    'height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
                } );                        
            }
            else {
                $img.css( {
                    'width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                    'height': 'auto'
                } );
            }
            $img.css( {                   
                'min-width': isThumbnailsVisible && this.thumbnails.isVertical() ? this.$jGallery.width() - this.thumbnails.getElement().outerWidth( true ) : this.$jGallery.width(),
                'min-height': isThumbnailsVisible && this.thumbnails.isHorizontal() ? this.$jGallery.height() - this.thumbnails.getElement().outerHeight( true ) - intNavBottomHeight : this.$jGallery.height() - intNavBottomHeight
            } );
            $img.css( {
                'margin-top': - $img.height() / 2,
                'margin-left': - $img.width() / 2
            } );
        },

        isAddedToLoad: function( $a ) {
            return this.$element.find( 'img' ).filter( '[src="' + $a.attr( 'href' ) + '"]' ).length > 0;
        },

        isLoaded: function( $a ) {
            var img = this.$element.find( 'img' ).filter( '[src="' + $a.attr( 'href' ) + '"]' ).get( 0 );
            
            if ( img ) {
                return this.imgIsLoaded( img );               
            }
        },

        imgIsLoaded: function( img ) {
            return img.complete && img.naturalWidth > 0;         
        },

        refreshNav: function() {
            var $thumbActive = this.thumbnails.getElement().find( 'div.active a.active' );

            $thumbActive.prev( 'a' ).length === 1 ? this.$btnPrev.removeClass( 'hidden' ) : this.$btnPrev.addClass( 'hidden' );
            $thumbActive.next( 'a' ).length === 1 ? this.$btnNext.removeClass( 'hidden' ) : this.$btnNext.addClass( 'hidden' );
        },

        slideshowStop: function () {
            this.slideshowPause();
            this.jGallery.progress.clear();
        },

        slideshowPause: function () {
            this.jGallery.progress.pause();
            this.$slideshow.removeClass( 'fa-pause' ).addClass( 'fa-play' );
            this.booSlideshowPlayed = false;
            if ( this.jGallery.options.slideshowCanRandom ) {
                this.$random.hide();
            }
        },

        slideshowPlay: function() {
            if ( this.booLoadingInProgress || this.booSlideshowPlayed ) {
                return;
            }
            this.booSlideshowPlayed = true;
            this.$slideshow.removeClass( 'fa-play' ).addClass( 'fa-pause' );
            this.slideshowSetTimeout();
            if ( this.jGallery.options.slideshowCanRandom ) {
                this.$random.show();
            }
        },

        slideshowPlayPause: function() {
            this.$slideshow.is( '.fa-play' ) ? this.slideshowPlay() : this.slideshowPause();
        },

        slideshowSetTimeout: function() {
            var self = this;

            this.jGallery.progress.start( this.$container.width(), function() {
                self.jGallery.progress.clear();
                self.jGallery.options.slideshowRandom ? self.showRandomPhoto() : self.showNextPhotoLoop();
            } );
        },

        slideshowRandomToggle: function() {
            if ( this.jGallery.options.slideshowRandom ) {
                this.$random.removeClass( 'active' );
                this.jGallery.options.slideshowRandom = false;
            }
            else {
                this.$random.addClass( 'active' );
                this.jGallery.options.slideshowRandom = true;                    
            }
        },

        showNextPhotoLoop: function() {
            var $next = this.thumbnails.$a.filter( '.active' ).next( 'a' );

            if ( $next.length === 0 ) {
                $next = this.thumbnails.$albums.filter( '.active' ).find( 'a' ).eq( 0 );
            }
            this.showPhoto( $next );
        },

        showRandomPhoto: function() {
            var $thumbnailsANotActive = this.thumbnails.$albums.filter( '.active' ).find( 'a:not(.active)' );

            this.showPhoto( $thumbnailsANotActive.eq( Math.floor( Math.random() * $thumbnailsANotActive.length ) ) );
        },

        showPrevPhoto: function() {
            var $prev = this.thumbnails.$a.filter( '.active' ).prev( 'a' );
            if ( $prev.length === 1 ) {
                this.showPhoto( $prev );
            } 
        },

        showNextPhoto: function() {
            var $next = this.thumbnails.$a.filter( '.active' ).next( 'a' );
            if ( $next.length === 1 ) {
                this.showPhoto( $next );
            }
        },

        showPhotoInit: function() {
            this.jGallery.init();
        },


        showPhoto: function( $a, options ) {
            var self = this;
            var $imgThumb = $a.children( 'img' );
            var booIsLoaded;
            var albumTitle;
            var transition;
            var transitionName;
            
            //preload images next prev
            var $nexta=$a.next();
            if ($nexta.length>0){
                if ( ! self.isAddedToLoad( $nexta ) ) {
                    this.appendPhoto( $nexta );
                }
            }
            var $preva=$a.prev();
            if ($preva.length>0){
                if ( ! self.isAddedToLoad( $preva ) ) {
                    this.appendPhoto( $preva );
                }
            }
            //preload images next prev

            if ( ! this.jGallery.initialized() ) {
                this.showPhotoInit();
            }
            if ( this.booLoadingInProgress ) {
                return;
            }
            this.booLoadingInProgress = true;
            transitionName = this.jGallery.options[ $a.nextAll( '.active' ).length > 0 ? 'transitionBackward' : 'transition' ];
            if ( transitionName === 'random' ) {
                this.setRandomTransition();
            }
            else if ( transitionName === 'auto' ) {
                transition = jGalleryTransitions[ jGalleryBackwardTransitions[ this.jGallery.options[ 'transition' ] ] ];
                this.advancedAnimation.setHideEffect( transition[0] );
                this.advancedAnimation.setShowEffect( transition[1] );
            }
            else {
                transition = jGalleryTransitions[ transitionName ];
                this.advancedAnimation.setHideEffect( transition[0] );
                this.advancedAnimation.setShowEffect( transition[1] );
            }
            this.$element.find( '.pt-page.init' ).remove();
            this.jGallery.options.showPhoto( $a, $imgThumb );
            if ( this.jGallery.$element.is( ':not(:visible)' ) ) {
                this.jGallery.show();
            }
            this.thumbnails.changeViewToBar();
            if ( this.jGallery.booIsAlbums ) {
                if ( this.jGallery.iconChangeAlbum.getTitle() === '' ) {
                    albumTitle = $a.parents( '.album' ).eq( 0 ).attr( 'data-jgallery-album-title' );
                    this.jGallery.iconChangeAlbum.setTitle( albumTitle );
                    this.jGallery.iconChangeAlbum.$element.find( '[data-jgallery-album-title="' + albumTitle + '"]' ).addClass( 'active' );
                    $a.parents( '.album' ).addClass( 'active' ).siblings( '.album' ).removeClass( 'active' );
                }
            }
            this.thumbnails.setActiveAlbum( this.thumbnails.$albums.filter( '[data-jgallery-album-title="' + $a.parents( '[data-jgallery-album-title]' ).attr( 'data-jgallery-album-title' ) + '"]' ) );
            this.thumbnails.setActiveThumb( $a );
            if ( this.$element.find( 'img.active' ).attr( 'src' ) === $a.attr( 'href' ) ) {
                this.booLoadingInProgress = false;
                this.setJGalleryColoursForActiveThumb();
                return;
            }
            if ( $a.is( '[link]' ) ) {
                this.$element.addClass( 'is-link' );
                if ( $a.is( '[target="_blank"]') ) {
                    this.$element.attr( 'onclick', 'window.open("' + $a.attr( 'link' ) + '")' );
                }
                else {
                    this.$element.attr( 'onclick', 'window.location="' + $a.attr( 'link' ) + '"' );                    
                }
            }
            else {
                this.$element.removeClass( 'is-link' );
                this.$element.removeAttr( 'onclick' );                
            }
            this.refreshNav();
            if ( this.jGallery.options.title ) {
                this.$title.addClass( 'after fade' );
            }
            booIsLoaded = self.isLoaded( $a );
            if ( ! booIsLoaded ) {
                if ( self.jGallery.options.preloadAll && ! self.booLoadedAll ) {
                    this.appendAllPhotos();
                }
                else if ( ! this.isAddedToLoad( $a ) ) {
                    this.appendPhoto( $a );
                }
            }
            this.$element.find( 'img.active' ).addClass( 'prev-img' );
            self.$container.find( 'img.active' ).removeClass( 'active' );
            self.$container.find( '[src="' + $a.attr( 'href' ) + '"]' ).addClass( 'active' );
            if ( self.jGallery.options.title && $imgThumb.is( '[alt]' ) ) {
                self.$title.removeClass( 'after' ).addClass( 'before' );
            }
            if ( ! booIsLoaded || ( self.jGallery.options.preloadAll && ! self.booLoadedAll ) ) {
                self.booLoadedAll = true;
                self.$container.overlay( {'show': true, 'showLoader': true, 'showProgress': self.jGallery.options.preloadAll, 'resetProgress': self.jGallery.options.preloadAll } );
                self.jGallery.options.beforeLoadPhoto( $a, $imgThumb );
                self.loadPhoto( self.$element, $a, options );
            }
            else {
                self.showPhotoSuccess( $a, $imgThumb, options );
            }
        },

        appendPhoto: function ( $a ) {
            this.$element.find( '.pt-part' ).append( '\
                <div class="jgallery-container pt-page">\
                    <div class="pt-item"><img src="' + $a.attr( 'href' ) + '" /></div>\
                </div>' );
        },

        appendAllPhotos: function() {       
            var self = this;

            if ( ! this.jGallery.options.preloadAll ) {
                return;
            }                
            this.thumbnails.$a.each( function() {
                var $a = $( this );
                if ( ! self.isAddedToLoad( $a ) ) {
                    self.$element.find( '.pt-part' ).append( '<div class="jgallery-container pt-page"><div class="pt-item"><img src="' + $a.attr( 'href' ) + '" /></div></div>' );
                }
            } );
            this.appendInitPhoto( this.thumbnails.$a.eq( -1 ) );
        },

        appendInitPhoto: function( $a ) {
            if ( $a.length !== 1 ) {
                return;
            }
            this.$element.find( '.pt-part' ).append( '\
                <div class="jgallery-container pt-page pt-page-current pt-page-ontop init" style="visibility: hidden;">\
                    <div class="pt-item"><img src="' + $a.attr( 'href' ) + '" class="active loaded" /></div>\
                </div>' );
        },

        loadPhoto: function( $zoom, $a, options ) {
            var self = this;
            var $imgThumb = $a.children( 'img' );
            var intPercent = 0;
            var $ptPart = $zoom.find( '.pt-part' ).eq( 0 );
            var $toLoading = this.jGallery.options.preloadAll ? $ptPart : $ptPart.find( 'img.active' );

            $toLoading.jLoader( {
                interval: 500,
                skip: '.loaded',
                start: function() {
                },
                success: function() {
                    $zoom.find( 'img' ).each( function() {
                        var $this = $( this );
                        
                        if ( self.imgIsLoaded( $this.get( 0 ) ) ) {
                            $this.addClass( 'loaded' );
                        }
                    } );
                    self.$container.overlay( {'hide': true, 'hideLoader': true} );
                    self.showPhotoSuccess( $a, $imgThumb, options );
                },
                progress: function( data ) {
                    if ( ! self.jGallery.options.preloadAll ) {
                        return;
                    }
                    intPercent = data.percent;
                    self.$container.find( '.overlay .imageLoaderPositionAbsolute' ).find( '.progress-value' ).html( intPercent );
                }
            } );
        },

        showPhotoSuccess: function( $a, $imgThumb, options ) {
            var image;
            var $active = this.$element.find( 'img.active' );

            options = $.extend( {}, {
                historyPushState: true
            }, options );            
            if ( $active.is( ':not([data-width])' ) ) {
                image = new Image();
                image.src = $active.attr( 'src' );
                $active.attr( 'data-width', image.width );
                $active.attr( 'data-height', image.height );
            }
            if ( this.jGallery.options.title && $imgThumb.attr( 'alt' ) ) {
                this.$title.html( $imgThumb.attr( 'alt' ) ).removeClass( 'before' ).removeClass( 'after' );
                this.jGallery.$element.addClass( 'has-title' );
            }
            else {
                this.jGallery.$element.removeClass( 'has-title' );
            }
            this.setJGalleryColoursForActiveThumb();
            this.$element.find( '.pt-page.init' ).css( {
                visibility: 'visible'
            } );
            this.$element.find( 'img.prev-img' ).removeClass( 'prev-img' );
            this.advancedAnimation.show( $active.eq( 0 ).parent().parent(), {
                animation: this.$element.find( '.pt-part' ).eq( 0 ).find( '.pt-page-current:not(.pt-page-prev)' ).length === 1
            } );
            this.refreshSize();
            this.thumbnails.refreshNavigation();
            if ( this.booSlideshowPlayed ) {
                this.slideshowSetTimeout();
            }
            this.jGallery.options.afterLoadPhoto( $a, $imgThumb );
            this.booLoadingInProgress = false;
            if ( this.jGallery.options.autostart && this.jGallery.options.slideshowAutostart && this.jGallery.options.slideshow ) {
                this.jGallery.options.slideshowAutostart = false;
                this.slideshowPlay();
            }
            if ( this.jGallery.options.draggableZoom ) {
                this.$dragNav.html( '<img src="' + $active.attr( 'src' ) + '" class="bg">\
                    <div class="crop"><img src="' + $active.attr( 'src' ) + '"></div>' );
                this.$dragNavCrop = this.$dragNav.find( '.crop' );
                this.$dragNavCropImg = this.$dragNavCrop.find( 'img' );   
                this.refreshDragNavCropSize();
            }
            if ( options.historyPushState && this.jGallery.options.browserHistory ) {
                historyPushState( {
                    path: $active.attr( 'src' )
                } );
            }
        },

        showPhotoByPath: function( path ) {
            var $a = this.thumbnails.$albums.filter( '.active' ).find( 'a[href="' + path + '"]' );

            if ( $a.length === 0 ) {
                $a = this.thumbnails.$a.filter( 'a[href="' + path + '"]' ).eq( 0 );
            }
            if ( $a.length === 0 ) {
                return;
            }
            this.showPhoto( $a, {
                historyPushState: false
            } );
        },

        setJGalleryColoursForActiveThumb: function() {
            var $imgThumb = this.thumbnails.$a.filter( '.active' ).find( 'img' );

            this.jGallery.setColours( {
                strBg: $imgThumb.is( '[data-jgallery-bg-color]' ) ? $imgThumb.attr( 'data-jgallery-bg-color' ) : this.jGallery.options.backgroundColor,
                strText: $imgThumb.is( '[data-jgallery-bg-color]' ) ? $imgThumb.attr( 'data-jgallery-text-color' ) : this.jGallery.options.textColor
            } );
        },

        setTransition: function( transition ) {
            this.jGallery.options.hideEffect = jGalleryTransitions[ transition ][ 0 ];
            this.jGallery.options.showEffect = jGalleryTransitions[ transition ][ 1 ];
            this.advancedAnimation.setHideEffect( this.jGallery.options.hideEffect );
            this.advancedAnimation.setShowEffect( this.jGallery.options.showEffect );    
        },

        setRandomTransition: function() {
            var rand;

            this.$element.find( '.pt-page' )
                .removeClass( this.jGallery.options.hideEffect )
                .removeClass( this.jGallery.options.showEffect );
            rand = Math.floor( ( Math.random() * jGalleryArrayTransitions.length ) );
            this.jGallery.options.hideEffect = jGalleryArrayTransitions[ rand ][ 0 ];
            this.jGallery.options.showEffect = jGalleryArrayTransitions[ rand ][ 1 ];
            this.advancedAnimation.setHideEffect( this.jGallery.options.hideEffect );
            this.advancedAnimation.setShowEffect( this.jGallery.options.showEffect ); 
        },

        unmarkActive: function() {
            this.$element.find( 'img.active' ).removeClass( 'active' );
        },

        changeMode: function() {
            var currentMode = this.jGallery.options.mode;

            if ( currentMode === 'slider' ) {
                return;
            }
            if ( currentMode === 'standard' ) {
                this.goToFullScreenMode();
            }
            else if ( currentMode === 'full-screen' ) {
                this.goToStandardMode();
            }
            if ( this.jGallery.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.jGallery.iconChangeAlbum.refreshMenuHeight();
            }
        },

        goToFullScreenMode: function() {
            $body.css( {
                overflow: 'hidden'
            } );
            this.jGallery.$this.show();
            this.jGallery.$element.removeClass( 'jgallery-standard' ).addClass( 'jgallery-full-screen' ).css( {
                width: 'auto',
                height: 'auto'
            } );
            this.$changeMode.removeClass( 'fa-expand' ).addClass( 'fa-compress' );
            this.jGallery.options.mode = 'full-screen';
            this.jGallery.refreshDimensions();
        },

        goToStandardMode: function() {
            $body.css( {
                overflow: 'visible'
            } );
            this.jGallery.$this.hide();
            this.jGallery.$element.removeClass( 'jgallery-full-screen' ).addClass( 'jgallery-standard' ).css( {
                width: this.jGallery.options.width,
                height: this.jGallery.options.height
            } );
            this.$changeMode.removeClass( 'fa-compress' ).addClass( 'fa-expand' );
            this.jGallery.options.mode = 'standard';
            this.jGallery.refreshDimensions();
        }
    };
    
    return Zoom;
} )( jLoader, overlay, historyPushState, jGalleryTransitions, jGalleryArrayTransitions, jGalleryBackwardTransitions, AdvancedAnimation, IconChangeAlbum );
var JGallery = ( function( outerHtml, historyPushState, isInternetExplorer, isInternetExplorer8AndOlder, refreshHTMLClasses, defaults, defaultsFullScreenMode, defaultsSliderMode, requiredFullScreenMode, requiredSliderMode, IconChangeAlbum, Progress, Thumbnails, ThumbnailsGenerator, Zoom ) {
    var $ = jQuery;
    var $html = $( 'html' );
    var $head = $( 'head' );
    var $body = $( 'body' );
    var $window = $( window );
    
    $.fn.outerHtml = outerHtml;
    
    var JGallery = function( $this, jGalleryId, options ) {
        var self = this;
        
        if ( ! jGalleryId || $this.is( '[data-jgallery-id]' ) ) {
            return;
        }     
        this.$this = $this;   
        this.intId = jGalleryId;
        this.$this.attr( 'data-jgallery-id', this.intId );
        this.overrideOptions( options ); 
        this.booIsAlbums = $this.find( '.album:has(a:has(img))' ).length > 1;
        if ( this.options.disabledOnIE8AndOlder && isInternetExplorer8AndOlder() ) {
            return;
        }
        this.init( {
            success: function() {
                if ( self.options.browserHistory ) {
                    self.browserHistory();
                }
                if ( self.options.autostart ) {
                    self.autostart();
                }
                refreshHTMLClasses();
                $html.on( {
                    keydown: function( event ) {
                        if ( self.$element.is( ':visible' ) ) {
                            if ( event.which === 27 ) {
                                event.preventDefault();
                                if ( self.thumbnails.getElement().is( '.full-screen' ) ) {
                                    self.thumbnails.changeViewToBar();
                                    self.zoom.refreshSize();
                                    return;
                                }
                                self.hide();
                            }
                            if ( event.which === 37 ) {
                                event.preventDefault();
                                self.zoom.showPrevPhoto();
                            }
                            if ( event.which === 39 ) {
                                event.preventDefault();
                                self.zoom.showNextPhoto();
                            }
                        }
                    }
                } );
            }
        } );
    };

    JGallery.prototype = {
        template: {
            html: '<div class="jgallery" style="display: none;">\
                        <div class="jgallery-thumbnails hidden">\
                            <div class="jgallery-container"><div class="jgallery-container-inner"></div></div>\
                            <span class="prev jgallery-btn"><span class="fa fa-chevron-left ico"></span></span>\
                            <span class="next jgallery-btn"><span class="fa fa-chevron-right ico"></span></span>\
                        </div>\
                        <div class="zoom-container">\
                            <div class="zoom before pt-perspective"></div>\
                            <div class="drag-nav hide"></div>\
                            <div class="left"></div>\
                            <div class="right"></div>\
                            <span class="fa fa-chevron-left prev jgallery-btn jgallery-btn-large"></span>\
                            <span class="fa fa-chevron-right next jgallery-btn jgallery-btn-large"></span>\
                            <span class="progress"></span>\
                            <div class="nav">\
                                <span class="fa resize jgallery-btn jgallery-btn-small" tooltip-position="bottom right"></span>\
                                <span class="fa change-mode jgallery-btn jgallery-btn-small" tooltip-position="bottom right"></span>\
                                <span class="fa fa-times jgallery-close jgallery-btn jgallery-btn-small" tooltip-position="bottom right"></span>\
                            </div>\
                            <div class="nav-bottom">\
                                <div class="icons">\
                                    <span class="fa fa-play slideshow jgallery-btn jgallery-btn-small"></span>\
                                    <span class="fa fa-random random jgallery-btn jgallery-btn-small inactive"></span>\
                                    <span class="fa fa-th full-screen jgallery-btn jgallery-btn-small"></span>\
                                    <span class="fa fa-ellipsis-h minimalize-thumbnails jgallery-btn jgallery-btn-small"></span>\
                                </div>\
                                <div class="title before"></div>\
                            </div>\
                        </div>\
                    </div>',
            
            done: function( fn ) {
                fn( this.html );
            }
        },
        
        initialized: function() {
            return this.$this.is( '[data-jgallery-id]' );
        },

        update: function( options ) {
            var self = this;
            
            this.template.done( function() {
                self.overrideOptions( options ); 
                if ( self.options.disabledOnIE8AndOlder && isInternetExplorer8AndOlder() ) {
                    return;
                }
                self.booIsAlbums = self.$this.find( '.album:has(a:has(img))' ).length > 1;
                self.zoom.update();
                self.thumbnails.init();
                self.setUserOptions();
                self.reloadThumbnails();
                self.refreshDimensions();
            } );
        },
        
        overrideOptions: function( options ) {
            var modeIsDefined = typeof options !== 'undefined' && typeof options.mode !== 'undefined';
        
            this.options = $.extend( {}, defaults, this.options );
            if ( modeIsDefined && options.mode === 'full-screen' ) {
                this.options = $.extend( {}, this.options, defaultsFullScreenMode, options, requiredFullScreenMode );
            }
            else if ( modeIsDefined && options.mode === 'slider' ) {
                this.options = $.extend( {}, this.options, defaultsSliderMode, options, requiredSliderMode );
            }
            else {
                this.options = $.extend( {}, this.options, options );
            }
        },

        reloadThumbnails: function() {
            new ThumbnailsGenerator( this, {
                thumbsHidden: false
            } );
            this.generateAlbumsDropdown();
            this.thumbnails.reload();
        },

        setVariables: function() {
            this.$element = $( '.jgallery' ).filter( '[data-jgallery-id="' + this.intId + '"]' );
            this.progress = new Progress( this.$element.find( '.zoom-container' ).children( '.progress' ), this );
            this.zoom = new Zoom( this );
            this.thumbnails = new Thumbnails( this );
            this.zoom.setThumbnails( this.thumbnails );
        },

        show: function() {
            this.$this.hide();
            $window.on( 'resize', { jGallery: this }, this.windowOnResize );
            if ( this.options.mode === 'full-screen' ) {
                this.bodyOverflowBeforeShow = $body.css( 'overflow' );
                $body.css( {
                    'overflow': 'hidden'
                } );
            }
            this.$element.not( ':visible' ).removeClass( 'hidden' ).stop( false, true ).fadeIn( 500 );
            this.zoom.refreshContainerSize();
            this.zoom.$title.removeClass( 'hidden' );  
            this.options.showGallery();
            if ( this.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.iconChangeAlbum.refreshMenuHeight();
            }
            refreshHTMLClasses();
        },

        hide: function( options ) {
            var self = this;

            if ( ! this.options.canClose ) {
                return;
            }
            options = $.extend( {}, {
                historyPushState: true
            }, options );  
            this.$element.filter( ':visible' ).stop( false, true ).addClass( 'hidden' ).fadeOut( 500, function() {
                if ( self.options.mode === 'full-screen' ) {   
                    $body.css( {
                        'overflow': self.bodyOverflowBeforeShow
                    } );
                }
                refreshHTMLClasses();
            } );
            this.zoom.booLoadingInProgress = false;
            clearTimeout( this.zoom.showPhotoTimeout );
            this.zoom.$title.addClass( 'hidden' );
            this.zoom.$btnPrev.addClass( 'hidden' );
            this.zoom.$btnNext.addClass( 'hidden' );
            this.zoom.slideshowPause();
            this.zoom.advancedAnimation.hideActive();
            this.zoom.unmarkActive();
            $window.off( 'resize', this.windowOnResize );
            this.$this.show();
            if ( options.historyPushState && this.options.browserHistory ) {
                historyPushState();
            }
            this.options.closeGallery();
        },

        autostart: function() {
            var $album;
            var $thumb;

            if ( this.$element.is( ':visible' ) ) {
                return;
            }
            if ( this.booIsAlbums ) {
                $album = this.thumbnails.getElement().find( '.album' ).eq( this.options.autostartAtAlbum - 1 );
                if ( $album.length === 0 ) {
                    $album = this.thumbnails.getElement().find( '.album' ).eq( 0 );
                }
            }
            else {
                $album = this.thumbnails.getElement();
            }
            $thumb = $album.find( 'a' ).eq( this.options.autostartAtImage - 1 );
            if ( $thumb.length === 0 ) {
                $thumb = $album.find( 'a' ).eq( 0 );
            }
            $thumb.trigger( 'click' );
        },

        browserHistory: function() {
            var self = this;
            var windowOnPopState = window.onpopstate;

            function callActionByUrl() {
                var hash;

                if ( ! document.location.hash ) { 
                    return;
                }
                hash = document.location.hash.replace( '#', '' );
                switch ( hash ) {
                    case '':
                        self.hide( {
                            historyPushState: false
                        } );
                        break;
                    default:
                        self.zoom.showPhotoByPath( hash );
                }
            }

            window.onpopstate = function() {
                if ( typeof windowOnPopState === 'function' ) {
                    windowOnPopState();
                }
                callActionByUrl();
            };
            if ( this.options.autostart ) {
                callActionByUrl();
            }
        },

        generateAlbumsDropdown: function() {
            var self = this;

            this.$element.find( '.change-album' ).remove();
            if ( ! this.booIsAlbums ) {
                return;
            }
            this.zoom.$container.find( '.nav-bottom > .icons' ).append( '\
                <span class="fa fa-list-ul change-album jgallery-btn jgallery-btn-small" tooltip="' + self.options.tooltipSeeOtherAlbums + '">\
                    <span class="menu jgallery-btn"></span>\
                    <span class="title"></span>\
                </span>\
            ' );
            this.iconChangeAlbum = new IconChangeAlbum( self.zoom.$container.find( '.change-album' ), this );
            this.iconChangeAlbum.clearMenu();
            this.thumbnails.$albums.each( function() {
                var strTitle = $( this ).attr( 'data-jgallery-album-title' );

                self.iconChangeAlbum.appendToMenu( '<span class="item" data-jgallery-album-title="' + strTitle + '">' + strTitle + '</span>' );
            } );
            this.thumbnails.getElement().append( this.iconChangeAlbum.getElement().outerHtml() );
            this.iconChangeAlbum = new IconChangeAlbum( this.iconChangeAlbum.getElement().add( this.thumbnails.getElement().children( ':last-child' ) ), this );
            this.iconChangeAlbum.bindEvents( this );
        },

        init: function( options ) {
            var self = this;
            
            options = $.extend( {
                success: function(){}
            }, options );
            $head.append( '<style type="text/css" class="colours" data-jgallery-id="' + this.intId + '"></style>' );
            this.options.initGallery();
            this.generateHtml( {
                success: function() { 
                    new ThumbnailsGenerator( self );
                    self.setVariables();
                    self.thumbnails.init();
                    self.thumbnails.getElement().append( '<span class="fa fa-times jgallery-btn jgallery-close jgallery-btn-small"></span>' );
                    self.generateAlbumsDropdown();
                    self.setUserOptions();
                    if ( self.options.zoomSize === 'fit' || self.options.zoomSize === 'original' ) {
                        self.zoom.$resize.addClass( 'fa-search-plus' );
                    }
                    if ( self.options.zoomSize === 'fill' ) {
                        self.zoom.$resize.addClass( 'fa-search-minus' );
                    }
                    if ( ! isInternetExplorer() ) {
                        self.$element.addClass( 'text-shadow' );
                    }
                    self.thumbnails.refreshNavigation();
                    self.zoom.refreshNav();
                    self.zoom.refreshSize();
                    self.$this.on( 'click', 'a:has(img)', function( event ) {
                        var $this = $( this );

                        event.preventDefault();
                        self.zoom.showPhoto( $this );
                    } );

                    self.thumbnails.$element.on( 'click', 'a', function( event ) {
                        var $this = $( this );

                        event.preventDefault();
                        if ( $this.is( ':not(.active)' ) ) {
                            self.zoom.slideshowStop();
                            self.zoom.showPhoto( $this );
                        }
                        else if ( self.thumbnails.isFullScreen() ) {
                            self.thumbnails.changeViewToBar();
                            self.zoom.refreshSize();
                        }
                    } ); 

                    self.zoom.$btnPrev.add( self.zoom.$container.find( '.left' ) ).on( {
                        click: function() {
                            self.zoom.slideshowStop();
                            self.zoom.showPrevPhoto();
                        }
                    } );

                    self.zoom.$btnNext.add( self.zoom.$container.find( '.right' ) ).on( {
                        click: function() {
                            self.zoom.slideshowStop();
                            self.zoom.showNextPhoto();
                        }
                    } );

                    self.zoom.$container.find( '.jgallery-close' ).on( {
                        click: function() {
                            self.hide();
                        }
                    } );

                    self.zoom.$random.on( {
                        click: function() {
                            self.zoom.slideshowRandomToggle();
                        }
                    } );

                    self.zoom.$resize.on( {
                        click: function() {
                            self.zoom.changeSize();
                            self.zoom.slideshowPause();
                        }
                    } ); 

                    self.zoom.$changeMode.on( {
                        click: function() {
                            self.zoom.changeMode();
                        }
                    } ); 

                    self.zoom.$slideshow.on( {
                        click: function() {
                            self.zoom.slideshowPlayPause();
                        }
                    } );   

                    self.zoom.$container.find( '.minimalize-thumbnails' ).on( {
                        click: function() {
                            self.thumbnails.toggle();
                            self.zoom.refreshSize();
                        }
                    } );  

                    self.thumbnails.bindEvents();      
                    options.success();
                    if ( self.options.hideThumbnailsOnInit ) {
                        self.zoom.$container.find( '.minimalize-thumbnails' ).addClass( 'inactive' );
                    }
                }
            } );
            this.refreshCssClassJGalleryMobile();
        },

        isSlider: function() {
            return this.options.mode === 'slider';
        },

        windowOnResize: function( event ) {
            var jGallery = event.data.jGallery;
            
            jGallery.refreshThumbnailsVisibility();
            jGallery.refreshCssClassJGalleryMobile();
        },
        
        refreshCssClassJGalleryMobile: function() {
            this.isMobile() ? this.$jgallery.addClass( 'jgallery-mobile' ) : this.$jgallery.removeClass( 'jgallery-mobile' );
        },

        refreshDimensions: function() {
            this.zoom.refreshSize();
            if ( this.iconChangeAlbum instanceof IconChangeAlbum ) {
                this.iconChangeAlbum.refreshMenuHeight();
            }
            this.thumbnails.refreshNavigation();
        },

        getCanvasRatioWidthToHeight: function() {
            var intCanvasWidth;
            var intCanvasHeight;

            if ( this.thumbnails.isHorizontal() ) {
                intCanvasWidth = this.$element.width();
                intCanvasHeight = this.$element.height() - this.thumbnails.getElement().outerHeight( true );
            }
            else if ( this.thumbnails.isVertical() ) {
                intCanvasWidth = this.$element.width() - this.thumbnails.getElement().outerWidth( true );
                intCanvasHeight = this.$element.height();
            }
            else {
                intCanvasWidth = this.$element.width();
                intCanvasHeight = this.$element.height();                    
            }
            return intCanvasWidth / intCanvasHeight;
        },
        
        hideThumbnailsBar: function() {
            this.thumbnails.getElement().addClass( 'hidden' );
            this.zoom.$container.find( '.minimalize-thumbnails' ).hide();
        },
        
        showThumbnailsBar: function() {
            this.thumbnails.getElement().removeClass( 'hidden' );
            this.options.canMinimalizeThumbnails && this.options.thumbnails ? this.zoom.$container.find( '.minimalize-thumbnails' ).show() : this.zoom.$container.find( '.minimalize-thumbnails' ).hide();
        },
        
        refreshThumbnailsVisibility: function() {
            if ( ! this.isMobile() ) {
                if ( ! this.options.thumbnails ) {
                    this.hideThumbnailsBar();
                }
                else {
                    this.showThumbnailsBar();
                } 
            }
            else {
                if( this.options.thumbnailsHideOnMobile ) {
                    this.hideThumbnailsBar();
                }
            } 
            this.refreshDimensions();
        },
        
        isMobile: function() {
            return $window.width() <= this.options.maxMobileWidth;
        },

        setUserOptions: function() {
            var options = this.options;
            var mode = options.mode;
            var width = mode === 'full-screen' ? 'auto' : options.width;
            var height = mode === 'full-screen' ? 'auto' : options.height;

            this.refreshAttrClasses();
            this.options.canZoom ? this.zoom.$resize.show() : this.zoom.$resize.hide();
            this.options.canChangeMode ? this.zoom.$changeMode.show() : this.zoom.$changeMode.hide();
            this.options.mode === 'standard' ? this.zoom.$changeMode.removeClass( 'fa-compress' ).addClass( 'fa-expand' ) : this.zoom.$changeMode.removeClass( 'fa-expand' ).addClass( 'fa-compress' );
            this.options.canClose ? this.zoom.$container.find( '.jgallery-close' ).show() : this.zoom.$container.find( '.jgallery-close' ).hide();
            this.refreshThumbnailsVisibility();
            this.zoom.refreshSize();
            this.options.slideshow ? this.zoom.$slideshow.show() : this.zoom.$slideshow.hide();
            this.options.slideshow && this.options.slideshowCanRandom && this.options.slideshowAutostart ? this.zoom.$random.show(): this.zoom.$random.hide();
            this.options.slideshow && this.options.slideshowCanRandom && this.options.slideshowRandom ? this.zoom.$random.addClass( 'active' ) : this.zoom.$random.removeClass( 'active' );

            this.options.thumbnailsFullScreen && this.options.thumbnails ? this.zoom.$container.find( '.full-screen' ).show() : this.zoom.$container.find( '.full-screen' ).hide();
            this.options.hideThumbnailsOnInit && this.options.thumbnails ? this.thumbnails.hide() : this.thumbnails.show();
            this.options.titleExpanded ? this.zoom.$title.addClass( 'expanded' ) : this.zoom.$title.removeClass( 'expanded' );
            this.setColours( {
                strBg: this.options.backgroundColor,
                strText: this.options.textColor
            } );
            this.options.tooltips ? this.$jgallery.addClass( 'jgallery-tooltips' ) : this.$jgallery.removeClass( 'jgallery-tooltips' );
            this.$jgallery.css( {
                width: width,
                height: height
            } );
            this.options.draggableZoomHideNavigationOnMobile ? this.$jgallery.addClass( 'jgallery-hide-draggable-navigation-on-mobile' ) : this.$jgallery.removeClass( 'jgallery-hide-draggable-navigation-on-mobile' );
        },

        refreshAttrClasses: function() {
            var self = this;
            var modes = [ 'standard', 'full-screen', 'slider' ];

            $.each( modes, function( key, value ) {
                self.$jgallery.removeClass( 'jgallery-' + value );
            } );
            this.$jgallery.addClass( 'jgallery-' + this.options.mode );
        },

        setColours: function( options ) {
            $head.find( 'style[data-jgallery-id="' + this.intId + '"].colours' ).html( this.getCssForColours( options ) );
        },

        generateHtml: function( options ) {
            var self = this;
            
            options = $.extend( {}, {
                success: function(){}
            }, options );
            this.template.done( function( html ) {   
                ( function() {
                    var options = self.options; 
                    var mode = options.mode;     

                    if ( mode === 'full-screen' ) {
                        self.$jgallery = self.$this.after( html ).next();
                    }
                    else {
                        if ( options.autostart ) {
                            self.$this.hide();
                        }
                        self.$jgallery = self.$this.after( html ).next();
                    }
                    self.$jgallery.addClass( 'jgallery-' + mode ).attr( 'data-jgallery-id', self.intId );
                    self.$jgallery.find( '.fa.slideshow' ).attr( 'tooltip', options.tooltipSlideshow );
                    self.$jgallery.find( '.fa.resize' ).attr( 'tooltip', options.tooltipZoom );
                    self.$jgallery.find( '.fa.change-mode' ).attr( 'tooltip', options.tooltipFullScreen );
                    self.$jgallery.find( '.fa.jgallery-close' ).attr( 'tooltip', options.tooltipClose );
                    self.$jgallery.find( '.fa.random' ).attr( 'tooltip', options.tooltipRandom );
                    self.$jgallery.find( '.fa.full-screen' ).attr( 'tooltip', options.tooltipSeeAllPhotos );
                    self.$jgallery.find( '.fa.minimalize-thumbnails' ).attr( 'tooltip', options.tooltipToggleThumbnails );
                } )();
                options.success();
            } );
        },

        getCssForColours: function( objOptions ) {
            objOptions = $.extend( {
                strBg: 'rgb( 0, 0, 0 )',
                strText: 'rgb( 255, 255, 255 )'
            }, objOptions );

            var arrText;
            var arrBg;
            var arrBgAlt;

            if ( typeof tinycolor === 'function' ) {
                arrText = tinycolor( objOptions.strText ).toRgb();
                arrBg = tinycolor( objOptions.strBg ).toRgb();
                if ( arrBg.r + arrBg.g + arrBg.b > 375 ) {
                    arrBg = tinycolor.darken( objOptions.strBg ).toRgb();
                    arrBgAlt = tinycolor( objOptions.strBg ).toRgb();
                }
                else {
                    arrBg = tinycolor( objOptions.strBg ).toRgb();
                    arrBgAlt = tinycolor.lighten( objOptions.strBg ).toRgb();                
                }
            }
            else {
                arrBg = {
                    r: 230,
                    g: 230,
                    b: 230
                };
                arrBgAlt = {
                    r: 255,
                    g: 255,
                    b: 255
                };
                arrText = {
                    r: 0,
                    g: 0,
                    b: 0
                };
            }

            return '\
                .jgallery[data-jgallery-id="' + this.intId + '"] {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] [tooltip]:after {\
                  background: rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .9);\
                  color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-btn {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  text-shadow: 0 0 1px rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-btn.active {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-btn:hover {\
                  text-shadow: none;\
                  text-shadow: 0 0 .15em rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ',.75), 0 0 .45em rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ',.5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .change-album > .title {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  box-shadow: 4px 0 4px rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ')\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .full-screen .change-album .menu {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu .item {\
                  border-color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .full-screen .change-album .menu .item {\
                  border-color: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu .item.active,\
                .jgallery[data-jgallery-id="' + this.intId + '"] .change-album .menu .item:hover {\
                  background: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container:not([data-size="fill"]) .jgallery-container {\
                  background: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  -webkit-box-shadow: 0 -3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 -3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .icons,\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .icons .fa {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title.expanded {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.7);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .drag-nav {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                  -webkit-box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .zoom-container .drag-nav .crop {\
                  -webkit-box-shadow: 0 0 0 3px rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5);\
                  box-shadow: 0 0 0 3px rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails .ico {\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails .jgallery-container {\
                  -webkit-box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                  box-shadow: 0 0 0 3px rgba(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', .5);\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .prev:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0)));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .next:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0)),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1)));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.images a:after {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .prev,\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.full-screen .next {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails.square:not(.full-screen) a {\
                  background: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                  color: rgb(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .overlayContainer .overlay {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.8);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .overlayContainer .imageLoaderPositionAbsolute:after {\
                  border-color: rgba(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ', .5 );\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails .overlayContainer .overlay {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .prev {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .prev:before {\
                  background-image: -webkit-gradient(linear,0% top,100% top,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )));\
                  background-image: -webkit-linear-gradient(left,color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%),color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%));\
                  background-image: -moz-linear-gradient(left,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-image: linear-gradient(to right,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .next {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-horizontal .next:before {\
                  background-image: -webkit-gradient(linear,0% top,100% top,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )));\
                  background-image: -webkit-linear-gradient(left,color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%),color-stop(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%));\
                  background-image: -moz-linear-gradient(left,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-image: linear-gradient(to right,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .prev {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .prev:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .next {\
                  background: rgb(' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ');\
                }\
                .jgallery[data-jgallery-id="' + this.intId + '"] .jgallery-thumbnails-vertical .next:before {\
                  background-image: -webkit-gradient(linear,left 0%,left 100%,from(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 )),to(rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 )));\
                  background-image: -webkit-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ),0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ),100%);\
                  background-image: -moz-linear-gradient(top,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-image: linear-gradient(to bottom,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 0 ) 0%,rgba( ' + arrBgAlt.r + ',' + arrBgAlt.g + ', ' + arrBgAlt.b + ', 1 ) 100%);\
                  background-repeat: repeat-x;\
                }\
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom,\
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title.expanded {\
                  background: none;\
                }\
                .jgallery.has-title.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom,\
                .jgallery.has-title.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom > .title.expanded {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.7);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
                .jgallery.jgallery-slider[data-jgallery-id="' + this.intId + '"] .zoom-container .nav-bottom .jgallery-btn {\
                  background: rgba(' + arrBg.r + ',' + arrBg.g + ', ' + arrBg.b + ',.8);\
                  color: rgb(' + arrText.r + ',' + arrText.g + ', ' + arrText.b + ');\
                }\
            ';
        }
    };
    
    return JGallery;
} )( outerHtml, historyPushState, isInternetExplorer, isInternetExplorer8AndOlder, refreshHTMLClasses, defaults, defaultsFullScreenMode, defaultsSliderMode, requiredFullScreenMode, requiredSliderMode, IconChangeAlbum, Progress, Thumbnails, ThumbnailsGenerator, Zoom );
( function( refreshHTMLClasses, defaults, jGalleryTransitions, JGallery ) {
    var jGalleryCollection = [ '' ];
    var $ = jQuery;
    var $html = $( 'html' );
    var jGalleryId = 0;

    $.fn.jGallery = function( userOptions ) {
        var self = this;

        this.each( function() {
            var $this = $( this );

            if ( ! $this.is( '[data-jgallery-id]' ) ) {
                jGalleryCollection[ ++jGalleryId ] = new JGallery( $this, jGalleryId, userOptions );
            }
            else if( $.isPlainObject( userOptions ) ) {
                jGalleryCollection[ $this.attr( 'data-jgallery-id' ) ].update( userOptions );
            }
        } );   
        $.extend( self, {
            getDefaults: function() {
                return defaults;
            },

            getTransitions: function() {
                return jGalleryTransitions;
            },

            restoreDefaults: function() {
                return self.each( function() {
                    $( this ).jGallery( defaults );
                } );
            },

            getOptions: function() {
                return jGalleryCollection[$( self ).eq( 0 ).attr( 'data-jgallery-id' )].options;
            },

            destroy: function() {
                return self.each( function() {
                    var $this = $( this );
                    var id = $this.attr( 'data-jgallery-id' );

                    jGalleryCollection[ id ] = '';
                    $this.removeAttr( 'data-jgallery-id' ).show();
                    $html.find( '.jgallery[data-jgallery-id="' + id + '"]' ).remove();
                    refreshHTMLClasses();
                } );                    
            }
        } );

        return this;
    };
} )( refreshHTMLClasses, defaults, jGalleryTransitions, JGallery );
} )();