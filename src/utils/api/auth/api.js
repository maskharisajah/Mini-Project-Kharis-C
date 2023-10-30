export const login = async (data) => {
  try {
    const dummyUsers = [
      { username: "admin", password: "password123" },
      { username: "user1", password: "pass1" },
      { username: "user2", password: "pass2" },
    ];

    const matchedUser = dummyUsers.find((user) => user.username === data.username);
    if (!matchedUser) {
      throw new Error("Invalid username");
    }
    if (matchedUser.password === data.password) {
      return matchedUser;
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
