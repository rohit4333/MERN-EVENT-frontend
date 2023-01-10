export const API_NOTIFICATION_MSGS = {
  loader: {
    title: " loading..",
    msg: "data is being loaded..",
  },
  success: {
    title: "Success",
    msg: "data Successfully loaded.",
  },
  responseFailure: {
    title: "ResponseError",
    msg: "An error occured while fetching data from server..",
  },
  requestFailure: {
    title: "RequestError",
    msg: "An error occured while pardiong request data..",
  },
  networkError: {
    title: "NetworkError",
    msg: "Unab;le to connect with the server..",
  },
};

//API_SERVICE_CALLS..

export const API_SERVICE_URLS = {
  userSignUp: { url: "/signup", method: "POST" },
  userLogin: { url: "/login", method: "POST" },

  createPost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },

  getPostByid: { url: "post", method: "GET", query: true },
  updatePost: { url: "update", method: "PUT", query: true },
  deletePost: { url: "delete", method: "DELETE", query: true },

  addComment: { url: "/comment/new", method: "POST" },
  getAllComments: { url: "/comments", method: "GET", query: true },
  deleteComment: { url: "comment/delete", method: "DELETE", query: true },
};
