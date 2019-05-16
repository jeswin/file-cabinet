module.exports = {
  root: "/some/dir/with/files",
  defaultDocs: ["index.htm", "index.html"],
  public: {
    dirs: {
      free: {
        directoryListing: {
          allow: false
        }
      }
    }
  },
  permissions: {
    full: {
      dirs: {
        courses: {
          pattern: {
            type: "exclude",
            value: ["prices/", "teachers/"]
          }
        },
        exams: {}
      },
      root: {
        pattern: {
          type: "include",
          value: ["images/"]
        },
        directoryListing: {
          allow: true,
          excludeDisallowed: true
        }
      }
    },
    guest: {
      dirs: {
        courses: {
          pattern: {
            type: "exclude",
            value: ["prices/", "teachers/", "timings/"]
          }
        }
      }
    }
  }
};
