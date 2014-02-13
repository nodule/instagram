output = function(cb) {
  input.instagram.media.popular({
    complete: function(data, pagination) {
      cb({ out: data, pagination: pagination });
      done();
    },
    error: function(err) {
      cb({ error: err });
    }
  });
};
