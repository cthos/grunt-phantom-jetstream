
## Description

grunt-phantom-jetstream provides grunt tasks related to running phantom-jetstream against lists of urls
or sites.

![Screenshot](/screenshots/cli.png?raw=true "Screenshot")

## Tasks

### jetstreamreport

This task generates report files for a given site and set of paths. You can define multiple sites to run against.

Example Gruntfile:

```js
module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jetstreamreport : {
      options : {
        googlePagespeed : false,
        outputDir : '/tmp',
        outputFormat : 'html'
      },
      alexwardcom : {
        basepath : 'https://alextheward.com/',
        uris : [
          'portfolio',
          'talks',
          'blog',
        ]
      }
    }
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-phantom-jetstream');

  // Default task.
  grunt.registerTask('default', ['jetstreamreport']);
};
```
