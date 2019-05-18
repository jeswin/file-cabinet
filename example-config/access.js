module.exports = {
  root: "/some/dir/with/files",
  defaultDocs: ["index.htm", "index.html"],
  superuser: ["ops=admin"], 
  acl: {
    settings: {
      directoryListing: true,
      hideInaccessible: true,
      applyRecursively: false,
      read: ["*"]
    },
    children: {
      courses: {
        settings: {
          read: ["tufts-team", "reliance-team"]
        },
        children: {
          exercises: {
            settings: {}
          }
        }
      },
      advanced: {
        settings: {
          read: ["reliance-team", "ops=admin"]
        }
      }
    }
  }
};
