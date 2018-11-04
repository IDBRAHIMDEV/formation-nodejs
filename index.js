const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home')
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json())
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
//configuration
//console.log('App name: ' + config.get('name'));
//console.log('mail host: ' + config.get('mail.host'));
//console.log('mail password: ' + config.get('mail.password'))

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//db code
dbDebugger('connected to the database...');


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening to port ${ port }`))