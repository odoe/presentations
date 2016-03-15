module.exports = function (grunt) {
  // Build customizations would be left up to developer to implement.
  grunt.loadNpmTasks('grunt-dojo');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ts');
  grunt.initConfig({
    clean: {
      build: {
        src: ['dist/']
      },
      uncompressed: {
        src: [
          'dist/**/*.uncompressed.js'
        ]
      }
    },
    ts: {
      options: {
        "module": "amd",
        "noImplicitAny": true,
        "outDir": "./src/app",
        "removeComments": false,
        "sourceMap": true,
        "target": "es5",
        "failOnTypeErrors": true,
        "fast": 'never'
      },
      dev: {
        src: [
          "./src/app/*.ts",
          "./src/app/**/*.ts",
          "./src/app/**/**/*.ts",
          "./typings/browser.d.ts"
        ]
      },
      dist: {
        options: {
          inlineSourceMap: true,
          inlineSources: true
        },
        outDir: './src/app',
        src: [
          "./src/app/*.ts",
          "./src/app/**/*.ts",
          "./src/app/**/**/*.ts",
          "./typings/browser.d.ts"
        ]
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['built.html'],
          dest: './dist/',
          rename: function(dest, src) {
            return dest + 'index.html';
          }
        }]
      }
    },
    dojo: {
      dist: {
        options: {
          releaseDir: '../dist',
        }
      },
      options: {
        profile: 'build.profile.js',
        dojo: 'src/dojo/dojo.js',
        load: 'build',
        cwd: './',
        basePath: './src'
      }
    }
  });

  //grunt.registerTask('build', ['clean:build', 'dojo', 'copy', 'clean:uncompressed']);
  grunt.registerTask('build', ['ts:dev'])

};
