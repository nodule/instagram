output = function(cb) {
  input.instagram.tags.search({
    q: input.tag,
    complete: function(data, pagination) {
      cb({ out: data, pagination: pagination });
      done();
    },
    error: function(err) {
      cb({ error: err });
    }
  });
};
