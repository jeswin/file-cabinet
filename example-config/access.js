module.exports = {
  root: "/some/dir/with/files",
  roles: {
    full: {
      eval: ({ permissions }) => permissions["pro-courses"] === "yes",
      dirs: ["courses", "exams"],
      ignore: ["courses/prices", "courses/teachers"]
    },
    guest: {
      eval: ({ permissions }) => permissions["guest-courses"] === "yes",
      dirs: ["courses"],
      ignore: ["courses/prices", "courses/teachers", "courses/timings"]
    }
  }
};
