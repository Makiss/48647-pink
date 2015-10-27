'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      build: ['build']
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: 'source',
          src: [
            'img/**',
            'index.html',
            'form.html',
            'blog.html',
            'post.html'],
          dest: 'build'}]
      }
    },

    sass: {
      style: {
        files: {
          'build/css/style.css': 'source/sass/style.scss'
        }
      }
    },

    cmq: {
      style: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      style: {
        src: 'build/css/*.css'
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0,
        report: 'gzip'
      },
      style: {
        files: {
          'build/css/style.min.css': 'build/css/style.css'
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ['build/img/**/*.{png,jpg,gif,svg}']
        }]
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        caseSensitive: true,
        keepClosingSlash: false
      },
      html: {
        files: {
          'build/index.min.html': 'build/index.html',
          'build/form.min.html': 'build/form.html',
          'build/blog.min.html': 'build/blog.html',
          'build/post.min.html': 'build/post.html'
        }
      }
    },

    concat: {
      dist: {
        src: ['source/js/form.js',
              'source/js/hamburger.js',
              'source/js/inputNumChanger.js',
              'bower_components/mustache.js/mustache.min.js',
              'bower_components/tap/dist/tap.min.js'
            ],
        dest: 'build/js/script.js'
      },
    },

    uglify: {
      build: {
        files: {
          'build/js/script.min.js': 'build/js/script.js'
        }
      }
    },

    watch: {
      style: {
        files: ['source/sass/**/*.scss'],
        tasks: ['sass', 'cmq', 'postcss'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      js: {
        files: ['source/js/**/*.js',
                'bower_components/**/*.js'
              ],
        tasks: ['concat', 'uglify']
      }
    },

    csscomb: {
      style: {
      expand: true,
      src: ['source/sass/**/*.scss']
      }
    }
  };

  config = require('./.gosha')(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask('build', [
      'clean',
      'copy',
      'sass',
      'cmq',
      'postcss',
      'cssmin',
      'imagemin',
      'htmlmin',
      'concat',
      'uglify'
    ]);
};
