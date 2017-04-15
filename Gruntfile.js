module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          // Vendor scripts.
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/js/',
            src: ['**/*.js'],
            dest: 'dist/scripts/bootstrap/'
          },
          {
            expand: true,
            cwd: 'bower_components/jquery/dist/',
            src: ['**/*.js', '**/*.map'],
            dest: 'dist/scripts/jquery/'
          },

          // Fonts.
          {
            expand: true,
            filter: 'isFile',
            flatten: true,
            cwd: 'bower_components/',
            src: ['bootstrap/fonts/**', 'font-awesome/fonts/**'],
            dest: 'dist/fonts/'
          },
          // Stylesheets
          {
            expand: true,
            cwd: 'bower_components/bootstrap/dist/css/',
            src: ['**/*.css*'],
            dest: 'dist/styles/'
          },
          {
            expand: true,
            cwd: 'bower_components/font-awesome/css',
            src: ['**/*.css'],
            dest: 'dist/styles/'
          }
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy']);

  grunt.registerTask('build', function() {
    const exec = require('child_process').exec;
    grunt.file.expand("src/*.md").forEach(function(file) {
      const fn = file.split("/")[1].split(".")[0];
      console.log(file, fn);
      exec("pandoc --template=src/template.html --mathjax -f markdown -t html " + file + " -o dist/" + fn + ".html",
      (err, stdout, stderr) => {
        if (err) console.log(err);
      });
    });
  });
};
