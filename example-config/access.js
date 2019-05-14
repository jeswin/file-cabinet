module.exports = {
  root: "/some/dir/with/files",
  public: {
    dirs: ["free"]
  },
  resources: {        
    full: {
      dirs: ["courses", "exams"],
      ignore: ["courses/prices", "courses/teachers"],
      canAccessRoot: true
    },
    guest: {
      dirs: ["courses"],
      ignore: ["courses/prices", "courses/teachers", "courses/timings"]
    }
  }
};
