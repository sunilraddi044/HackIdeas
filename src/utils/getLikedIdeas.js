import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/fire";

export const getLikedIdeas = async (employeeID) => {
  const usersCollectionRef = collection(db, "users");
  const res = await getDocs(usersCollectionRef);
  const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const currentUser = users.find((user) => user.employeeId === employeeID);
  return currentUser;
};
