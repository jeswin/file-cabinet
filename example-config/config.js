module.exports = {
  root: "/home/xuai/repos/jeswin/univai-tufts-static-content/public",
  /* Default docs when the directory is requested. */
  defaultDocs: ["index.html", "index.htm"],
  /* Super user for the app */
  superuser: "ops=admin",
  /* The auth servers public key */
  authServer: {
    publicKey: "blahblahblah"
  },
  urlRewrites: [["/public", "/"]],
  /* Application configuration */
  app: {
    /* 
      Access conditions for the root directory. r for '*' means that any user can read.
    */
    access: { r: ["*"] },
    /*
      Allow directory listing
    */
    autoIndex: true,
    /*
      The premium directory is readable by users with these two tokens.
    */
    children: {
      premium: {
        access: {
          r: ["tier=tufts", "ops=devops", "paid-members"]
        },
        /* Directory listing is allowed. */
        autoIndex: true,

        /* Alias this as premium-content while serving */
        alias: "premium-content"
      }
    }
  }
};
