module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    less: {
      development: {
        options: {
          paths: 'src/less/includes'
        },
        files: [{
          expand: true,
          cwd: 'src/less/',
          src: ['**/*.less', '!**/includes/*.less'],
          dest: 'app/wp-content/themes/<%= themeName %>/',
          ext: '.css'
        }]
      }
    },

    // default watch configuration
    watch: {
      less: {
        files: 'src/less/**/*.less',
        tasks: 'less:development',
        options: {
          interrupt: true
        }
      },

      /*reload: {
        files: [
          'app/wp-content/themes/<%= themeName %>/*.php',
          'app/wp-content/themes/<%= themeName %>/*.css',
          'app/wp-content/themes/<%= themeName %>/js/*.js',
          'app/wp-content/themes/<%= themeName %>/images/*'
        ],
        tasks: 'reload'*/
      }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'Gruntfile.js',
        'app/wp-content/themes/<%= themeName %>/js/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    // Build configuration
    // -------------------

    // the staging directory used during the process
    staging: 'temp',
    // final build output
    output: 'dist',

    mkdirs: {
      staging: 'app/'
    },

    // Below, all paths are relative to the staging directory, which is a copy
    // of the app/ directory. Any .gitignore, .ignore and .buildignore file
    // that might appear in the app/ tree are used to ignore these values
    // during the copy process.

    // concat css/**/*.css files, inline @import, output a single minified css
    css: {
      'wp-content/themes/<%= themeName %>/style.css': ['wp-content/themes/<%= themeName %>/*.css']
    },

    //'styles/main.css': ['styles/**/*.css']

    // renames JS/CSS to prepend a hash of their contents for easier
    // versioning
    // disabled to make it work with wordpress
    rev: {
//      js: 'wp-content/themes/<%= themeName %>/js/*.js',
//      css: 'wp-content/themes/<%= themeName %>/*.css',
      img: 'wp-content/themes/<%= themeName %>/images/**'
    },

    // usemin handler should point to the file containing
    // the usemin blocks to be parsed
    'usemin-handler': {
      html: 'index.html'
    },

    // update references in HTML/CSS to revved files
    usemin: {
      html: ['**/*.html'],
      css: ['**/*.css']
    },

    // HTML minification
    html: {
      files: ['**/*.html']
    },

    // Optimizes JPGs and PNGs (with jpegtran & optipng)
    img: {
      dist: '<config:rev.img>'
    },

    /*
    // rjs configuration. You don't necessarily need to specify the typical
    // `path` configuration, the rjs task will parse these values from your
    // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
    //
    // name / out / mainConfig file should be used. You can let it blank if
    // you're using usemin-handler to parse rjs config from markup (default
    // setup)
    rjs: {
      // no minification, is done by the min task
      mainFile: './wp-content/themes/<%= themeName %>/footer.php',
      optimize: 'none',
      baseUrl: './wp-content/themes/<%= themeName %>/js',
      wrap: true,
      name: 'main',
      out: 'wp-content/themes/<%= themeName %>/js/script.js'
    },
    */
    
    // While Yeoman handles concat/min when using
    // usemin blocks, you can still use them manually
    concat: {
      dist: ''
    },

    min: {
      dist: ''
    },

    // server port to match livereload browser extensions
    // https://github.com/yeoman/yeoman/issues/250#issuecomment-8024212
    server: {
      port: 35729
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Alias the `test` task to run the `mocha` task instead
  // grunt.registerTask('test', 'mocha'); -- Commented by LD Apr 11

};
