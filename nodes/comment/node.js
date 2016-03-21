output = function(cb) {

  var opts = $.options;

  opts.complete = function(val, pagination) {
    cb({ out: val, pagination: pagination });
    done();
  };

  opts.error = function(err) {
    cb({ error: err });
  };

  $.instagram.media.comment(opts);
};
