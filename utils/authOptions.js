import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // 1. Connect to DB
      await connectDB();
      // 2. Check if user exsits
      const userExists = await User.findOne({
        email: profile.email,
      });
      // 3. If not, then add user to DB
      if (!userExists) {
        const username = profile.name.slice(0, 20);
        User.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },

    // modify the session
    async session({ session }) {
      // 1. Get user from DB
      const user = User.findOne({
        email: session.user.email,
      });
      // 2. Assign userId to the session.
      session.user.id = user._id;
      // 3. return session
      return session;
    },
  },
};
