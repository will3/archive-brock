module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            app: {
                files: {
                    'app/bundle.js': ['app/app.js']
                }
            },
            options: {
                browserifyOptions: {
                    debug: true
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        mochaTest: {
            test: {
                src: ['src/test/**/*.js']
            }
        },
        watch: {
            files: ['**/*.js'],
            tasks: ['jshint', 'mochaTest']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint', 'mochaTest']);

};