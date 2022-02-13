import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/fire";

export const getLikedIdeas = async (employeeID) => {
  const usersCollectionRef = collection(db, "users");
  const res = await getDocs(usersCollectionRef);
  const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  const currentUser = users.find((user) => user.employeeId === employeeID);
  return currentUser;
};

export const updateDocument = async (table, id, updateItem) => {
  const document = doc(db, table, id);
  await updateDoc(document, updateItem);
};
