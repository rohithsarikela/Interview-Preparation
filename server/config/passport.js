import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const setupPassport = () => {
  const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const FACEBOOK_ID = process.env.FACEBOOK_APP_ID;
  const FACEBOOK_SECRET = process.env.FACEBOOK_APP_SECRET;

  if (GOOGLE_ID && GOOGLE_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_ID,
          clientSecret: GOOGLE_SECRET,
          callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value || `google_${profile.id}@local`;
            let user = await User.findOne({ email });
            if (!user) {
              user = await User.create({ name: profile.displayName || 'Google User', email, password: Math.random().toString(36) });
            }
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  }

  if (FACEBOOK_ID && FACEBOOK_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: FACEBOOK_ID,
          clientSecret: FACEBOOK_SECRET,
          callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/api/auth/facebook/callback`,
          profileFields: ['id', 'displayName', 'emails']
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value || `facebook_${profile.id}@local`;
            let user = await User.findOne({ email });
            if (!user) {
              user = await User.create({ name: profile.displayName || 'Facebook User', email, password: Math.random().toString(36) });
            }
            return done(null, user);
          } catch (err) {
            return done(err);
          }
        }
      )
    );
  }
};

export default setupPassport;
