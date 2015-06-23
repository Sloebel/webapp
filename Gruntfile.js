module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            src: 'js',
            dest: 'js'
        },
        //jshint: {
        //    options: {
        //        // Search for a .jshintrc file as usual
        //        jshintrc: true
        //        // Or, setup a specific path to the file
        //        // jshintrc: 'src/.jshintrc'
        //        // Or, setup inline settings
        //        // eqeqeq: true,
        //        // curly: true,
        //        // undef: true
        //    },
        //    target: {
        //        src: '<%= dirs.src %>/main.js'
        //    }
        //},
        //uglify: {
        //    options: {
        //        banner: '/*! <%= pkg.main %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        //        compress: {
        //            drop_console: false
        //        },
        //        mangle: true
        //    },
        //    target: {
        //        src: '<%= dirs.src %>/<%= pkg.main %>.js',
        //        dest: '<%= dirs.dest %>/<%= pkg.main %>.min.js'
        //    }
        //}
        //concat: {
        //    options: {
        //        separator: ';',
        //        sourceMap: true
        //    },
        //    target: {
        //        src: ['<%= dirs.src %>/main.js','<%= dirs.src %>/plugins.js'],
        //        dest: '<%= dirs.dest %>/all.js'
        //    }
        //}
        watch: {
            //scripts: {
            //    files: ['<%= dirs.src %>/main.js'],
            //    tasks: ['default']
            //}
            css: {
                files: '**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            dist: {                            // Target
                options: {
                    sourcemap: 'file'
                },
                files: {                         // Dictionary of files
                    'css/main-sass.css': 'css/sass.scss'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    //grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', [ 'jshint']);
};
