require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const morgan = require('morgan');
const redisClient = require('./config/redis.config');

const { PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	store: new RedisStore({ client: redisClient, ttl: 260 }),
	secret: SESSION_SECRET,
}));

require('./routes')(app);

app.listen(PORT, () => console.log(`shoutoutz is listening on port ${PORT}`));
