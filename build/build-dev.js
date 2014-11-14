( {
    baseUrl: '../src/js',
    name: '../../build/almond',
    optimize: 'none',
    include: 'jgallery',
    out: '../dist/js/jgallery.js',
    wrap: {
        startFile: 'start.frag.js',
        endFile: 'end.frag.js'
    }
} )