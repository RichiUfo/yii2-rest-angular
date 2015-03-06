module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'web/js_dist/main.min.js': ['web/js_dist/main.js']
                }
            }
        },

        ngAnnotate: {
            demo: {
                files: {
                    'web/js_dist/main.js': ['web/js/**/*.js', 'web/js/*.js']
                }
            }
        },

        // configure watch to auto update ------------------------------------------
        watch: {
            stylesheets: {
            },
            scripts: {
                files: 'web/js/app.js',
                tasks: ['uglify']
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'web/libs/angular.min.js',
                    'web/libs/angular-ui-router.min.js',
                    'web/libs/ui-bootstrap-0.12.1.min.js',
                    'web/libs/ui-bootstrap-tpls-0.12.1.min.js',
                    'web/libs/angular-filter.min.js',
                    'web/libs/clean-blog/jquery.min.js',
                    'web/libs/clean-blog/clean-blog.min.js',
                    'web/js_dist/main.min.js'
                ],
                dest: 'web/dist/js/all.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'web/css/style.css': 'web/scss/style.scss'
                }
            }
        },

        concat_css: {
            options: {
                style: 'expanded'
            },
            all: {
                src: ["web/css/bootstrap.min.css", "web/css/clean-blog/clean-blog.min.css", "web/css/style.css"],
                dest: "web/css/main.css"
            }
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concat-css');

    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', [ 'sass',  'concat_css']);

};