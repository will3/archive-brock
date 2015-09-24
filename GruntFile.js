module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      avatar: {
        files: {
          'avatar/bundle.js': ['avatar/app.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['**/*.js'],
      tasks: ['browserify', 'jshint']
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify', 'jshint']);

};