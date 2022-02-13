import { mockFirebase } from "firestore-jest-mock";

// Create a fake Firestore with a `users` and `posts` collection
mockFirebase({
  database: {
    users: [
      { id: "abc123", employeeId: "322605", likedIdeas: [] },
      { id: "abc124", employeeId: "322606", likedIdeas: [] },
    ],
    ideas: [
      {
        id: "123abc",
        creationDate: "2022-10-02",
        desc: "testtest",
        title: "test1",
        liked: false,
        likes: 0,
        tag: "tech",
        user: "322605",
      },
    ],
  },
});
