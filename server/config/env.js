let env = process.env.NODE_ENV || "development";
let envConfig = {
  development: {
    siteUrl: "http://localhost:3300",
    port: 3300,
    frontEnd: "http://localhost:3000",
    googleAuth: {
      clientID:
        "1007995560664-p1u3icnpn86qdbbrjj136hi7o48311n1.apps.googleusercontent.com",
      clientSecret: "7WYwJR0AaMhvW2iQHFWmOr73",
      callbackUrl: "/api/auth/google/callback"
    },
    mongoURI:
      "mongodb://accolite:accolite123@ds159845.mlab.com:59845/office-meals",
    sessionSecret: "mih2U7uaRE",
    allowedDomains: ["accoliteindia.com", "accolitelabs.com", "accolite.com"]
  },
  staging: {
    //hope for the best
  },
  production: {
    siteUrl: "https://meals.accolite.com",
    port: 3300,
    frontEnd: "https://meals.accolite.com",
    googleAuth: {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackUrl: "/api/auth/google/callback"
    },
    mongoURI: process.env.MONGO_URI,
    sessionSecret: process.env.SESSION_SECRET,
    allowedDomains: ["accoliteindia.com", "accolitelabs.com", "accolite.com"]
  }
};
module.exports = envConfig[env];
