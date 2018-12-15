var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();



	

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

app.use('/', (req, res) => {
	res.json({
		msg:"hello world"
	})
})



var port = 3000;
app.listen(port, () => console.log(`App is running on port ${port}`));
