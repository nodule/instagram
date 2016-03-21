output = function(cb) {
  input.instagram.media.popular({
    complete: function(val, pagination) {
      cb({ out: val, pagination: pagination });
      done();
    },
    error: function(err) {
      cb({ error: err });
    }
  });
};
