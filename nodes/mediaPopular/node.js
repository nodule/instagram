output = function(cb) {
  $.instagram.media.popular({
    complete: function(val, pagination) {
      cb({ out: $.create(val), pagination: $.create(pagination) });
      done();
    },
    error: function(err) {
      cb({ error: $.create(err) });
    }
  });
};
