var express = require('express'),
    app     = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

var server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on localhost:${server.address().port}`);
});
