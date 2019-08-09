
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')



var con = keys.con;

con.connect(function(err) {
	if(err){ console.log(err); return};
})


passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(( id, done) => {
	con.query("SELECT * FROM users WHERE id = '"+id+"'", function (err, result) { 
    	done(null, result[0])
	})
})


passport.use(new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
	}, (accessToken, refreshToken, profile, done) => {
		console.log(profile)

		con.query("SELECT * FROM users WHERE googleid = '"+profile.id+"'", function (err, result) {
		    if(err){ console.log(err); return};
		    if(result.length > 0) {
		    	done(null, result[0])
		    	console.log("Existing Member");

		    } else {
		    	var sql = "INSERT INTO users (googleid, given_name, family_name, email) VALUES ('"+profile.id+"', '"+profile.name.givenName+"', '"+profile.name.familyName+"', '"+profile.emails+"')";

				console.log(sql)

				con.query(sql, function (err, result) {
				    if(err){ console.log(err); return}
				    con.query("SELECT * FROM users WHERE googleid = '"+profile.id+"'", function (err, result) { 
				    	done(null, result[0])
		    			console.log("Logging in Member");
				    })
			
				});
		    }
		    
		});		
		
	})
);