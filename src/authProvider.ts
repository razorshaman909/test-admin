// import { AuthProvider } from "react-admin";

// export const authProvider = {
//     // called when the user attempts to log in
//     login: ({ username }) => {
//         localStorage.setItem("username", username);
//         // accept all username/password combinations
//         return Promise.resolve();
//     },
//     // called when the user clicks on the logout button
//     logout: () => {
//         localStorage.removeItem("username");
//         return Promise.resolve();
//     },
//     // called when the API returns an error
//     checkError: ({ status }) => {
//         if (status === 401 || status === 403) {
//             localStorage.removeItem("username");
//             return Promise.reject();
//         }
//         return Promise.resolve();
//     },
//     // called when the user navigates to a new location, to check for authentication
//     checkAuth: () => {
//         return localStorage.getItem("username") ? Promise.resolve() : Promise.reject();
//     },
//     // called when the user navigates to a new location, to check for permissions / roles
//     getPermissions: () => Promise.resolve(),
// };

import { AuthProvider, HttpError } from "react-admin";
import data from "./users.json";

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const user = data.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // eslint-disable-next-line no-unused-vars
      let { password, ...userToPersist } = user;
      localStorage.setItem("user", JSON.stringify(userToPersist));
      return Promise.resolve();
    }

    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid username or password",
      })
    );
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
