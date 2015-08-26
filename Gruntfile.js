module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-config')(grunt, {
    jitGrunt: true
  });
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      src: ['css/colum.sass', 'css/button.sass', 'animation.sass'],
      dest: 'css/main.sass'
    },
    sass: {
      dist: {
        src: ['css/main.css'],
        dest: 'css/main.scss'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['main.css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.css'
        }]
      }
    },
    livereload: {
      options: {
        livereload: true
      },
      files: ['../**/*']
    },
    connect: {
      server: {
        options: {
          port: 8000,
          keepalive: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.registerTask('default', ['concat', 'cssmin', 'autoprefixer', 'connect']);
};
