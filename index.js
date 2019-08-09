const exp = require('express');
const mysql = require('mysql');
const keys = require('./config/keys');
require('./services/passport')
const cookieSession = require('cookie-session')
const passport = require('passport');








const app = exp();


app.use(
		cookieSession({
			maxAge:30*24*60*60*1000,
			keys:[keys.cookiekey]
		})
	)

app.use(passport.initialize())
app.use(passport.session())


require('./routes/auth_routes')(app)

const PORT = process.env.PORT || 9999
app.listen(PORT);
console.log('App running on port 9999')



