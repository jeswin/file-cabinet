const publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAI9Jm7T8/yzNyyq2Tl1VwAehKiWcMeOJ
cvOMkcnWQSyYic4X5e3MU7B5nHMrdFO+L35dlHc0CgqyF72H/tMs4D0CAwEAAQ==
-----END PUBLIC KEY-----`;

const i = "jeswin.dev"; // Issuer
const s = "jeswinpk@agilehead.com"; // Subject
const a = "http://agilehead.com"; // Audience

// SIGNING OPTIONS
const signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: "12h",
  algorithm: "RS256"
};

module.exports = {
  publicKey,
  signOptions
};
