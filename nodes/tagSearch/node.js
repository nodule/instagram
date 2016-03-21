output = function(cb) {
  input.instagram.tags.search({
    q: input.tag,
    complete: function(val, pagination) {
      cb({ out: val, pagination: pagination });
      done();
    },
    error: function(err) {
      cb({ error: err });
    }
  });
};
