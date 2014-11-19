var fs = require('fs'), process = require('child_process');

module.exports = function (grunt) {

  grunt.registerMultiTask('jetstreamreport', 'Generate reports on uris', function () {

    var done = this.async();

    var options = this.options({
      googlePagespeed : false,
      outputDir : '/tmp',
      outputFormat : 'html'
    });

    if (!this.data.basepath || !this.data.uris || !this.data.uris.length) {
      console.log("Please ensure you've defined a task basepath and uris.");

      return false;
    }

    var rp = __dirname + '/../scripts/stream-runner.js';
    var runnerpath = fs.realpathSync(rp);

    var outputDir = options.outputDir + '/' + this.data.basepath.replace(/https?:\/\/(:?www\.)?/, '');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    var procCount = 0;

    for (var i = 0, len = this.data.uris.length; i < len; i++) {
      var path = this.data.basepath + this.data.uris[i];
      var fileloc = outputDir + this.data.uris[i] + '.' + options.outputFormat;

      var cmd = 'phantomjs ' + runnerpath + ' ' + path + ' ' + fileloc;

      console.log("Adding " + path + " to the queue.");

      var proc = process.exec(cmd, function (error, stdout, stderr) {
        if (error) {
          console.log(error);
        }
      });

      procCount++;

      proc.on('exit', function (code) {
        procCount--;

        if (procCount <= 0) {
          console.log("All done!");
          done();
        }
      });
    }
  });
};
