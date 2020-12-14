const express = require('express');

const app = express();

app.use(express.static('./dist/mask-net'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/mask-net' }
  );
});

app.listen(process.env.PORT || 8080);

console.log(`Running on port ${process.env.PORT || 8080}`)