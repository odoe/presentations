module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-sass");

  grunt.initConfig({
    sass: {
      options: {
        outputStyle: "compressed"
      },
      dist: {
        files: [
          {
            expand: true,
            src: ["**/*.scss", "!node_modules/**"],
            ext: ".css"
          }
        ]
      }
    }
  });

  grunt.registerTask("default", ["sass"]);
};
