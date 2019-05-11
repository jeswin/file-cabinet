module.exports = function(requestedPath, token) {
  
}

{
  resources: [
    {
      name: "full",
      permissions: ["r", "rw"],
      paths: [
        'books',
        'music',
        '!music'
      ]
    }
  ]
};
