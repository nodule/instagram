output = function(cb) {

  var opts = input.options;

  opts.complete = function(val, pagination) {
    cb({ out: val, pagination: pagination });
    done();
  };

  opts.error = function(err) {
    cb({ error: err });
  };

  input.instagram.media.unlike(opts);
};
