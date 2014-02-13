output = function(cb) {

  var opts = input.options;

  opts.complete = function(data, pagination) {
    cb({ out: data, pagination: pagination });
    done();
  };

  opts.error = function(err) {
    cb({ error: err });
  };

  input.instagram.media.comment(opts);
};
