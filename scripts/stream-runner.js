var args = require('system').args;
var JetStream = require('phantom-jetstream');

if (args.length <= 1) {
  console.log("You must at minimum pass the URL to test.");
  phantom.exit(1);
}

var page = require('webpage').create();
var JetStream = require('phantom-jetstream');

var ps = new JetStream.PageSpeed(page, args[1])
                               .logResourceSpeed(false)
                               .logPageSpeed(false)
                               .logCache(false)
                               .exitOnFinish(false)
                               .writeReportOnFinish(true);

var output = new JetStream.Output.HtmlOutput();
var rp = new JetStream.Reports.Report(args[2], output);
var ev = JetStream.Event.EventDispatcher.getInstance();

ps.reportGenerator(rp);

var pagedone = function (event) {
  page.close();
  phantom.exit();
};

if (args[3]) {
  ps.writeReportOnFinish(false);

  console.log(args[3]);
  pagedone = function (event) {
    page.close();

    ev.bind('googlePsDone', function (event) {
      rp.write();
      phantom.exit();
    });

    var ps = new JetStream.GooglePagespeed.GooglePageSpeed(args[2]);
    ps.setReport(rp);
    ps.getPage();
  };
}

ev.bind('pageDone', pagedone);
ps.open();
