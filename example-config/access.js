module.exports = {
  root: "/some/dir/with/files",
  defaultDocs: ["index.htm", "index.html"],
  superuser: ["ops=admin"],
  acl: {
    "@": {
      owner: "ops=devops",
      permissions: ["rw", "", "r"],
      childPermissions: []
    },
    courses: {
      "@": {
        group: ["tufts-team", "reliance-team"],
        permissions: "---r-----"
      },
      exercises: {}
    }
  }
};
