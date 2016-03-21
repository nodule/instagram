output = function(cb) {
  var opts = $.options;

  opts.complete = function(val, pagination) {
    cb({ out: $.create(val), pagination: $.create(pagination) });
    done();
  };

  opts.error = function(err) {
    cb({ error: $.create(err) });
  };

  $.instagram.media.likes(opts);
};
