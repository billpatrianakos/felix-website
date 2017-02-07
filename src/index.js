var express = require('express'),
    app     = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on localhost:3000`);
});
