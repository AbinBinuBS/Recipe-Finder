import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "http://localhost:3001/auth/callback",
			passReqToCallback: true,
		},
		function (request, accessToken, refreshToken, profile, done) {
			return done(null, profile);
		}
	)
);

export default passport;
