import { updateDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/fire";
import { getLikedIdeas } from "../../utils/getLikedIdeas";
import classes from "./ShowIdea.module.css";

const ShowIdeaCard = ({ setRenderLike, data, setLikedIdeas, likedIdeas }) => {
  const [sort, setSort] = useState(false);
  const employeeID = useSelector((state) => state.addIdeas.user);

  useEffect(() => {
    async function getData() {
      const currentUser = await getLikedIdeas(employeeID);
      setLikedIdeas(currentUser.likedIdeas);
    }

    getData();
  }, []);

  const updateLikes = async (id, likes) => {
    const ideaDoc = doc(db, "ideas", id);
    const newLikes = { likes: likes + 1, liked: true };
    await updateDoc(ideaDoc, newLikes);

    let currentUser = await getLikedIdeas(employeeID);
    console.log(currentUser);

    const userDoc = doc(db, "users", currentUser.id);
    const newLikedList = { likedIdeas: [...currentUser.likedIdeas, id] };
    await updateDoc(userDoc, newLikedList);
    setRenderLike((prev) => !prev);
    currentUser = await getLikedIdeas(employeeID);
    setLikedIdeas(currentUser.likedIdeas);
  };

  const sortDataByLikes = (option) => {
    data.sort((a, b) =>
      a[option] > b[option] ? 1 : b[option] > a[option] ? -1 : 0
    );
    setSort((prev) => !prev);
  };

  return (
    <div className="row">
      <div className={`d-flex gap-3 text-light  py-2 ${classes.sort}`}>
        <small onClick={() => sortDataByLikes("likes")} className="shadow p-2">
          Sort by Likes
        </small>
        <small
          onClick={() => sortDataByLikes("creationDate")}
          className="shadow p-2"
        >
          Sort by Date
        </small>
      </div>
      {data.map((idea) => (
        <div className="col-lg-3 p-2" key={idea.id}>
          <div className="card position-relative overflow-hidden">
            <div className="card-body">
              <h5 className="card-title">{idea.title}</h5>
              <p
                className={`mb-2 text-muted position-absolute ${classes["creation-date"]} `}
              >
                created on: {idea.creationDate}
              </p>

              <p className={`card-text ${classes["card-desc"]}`}>{idea.desc}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  updateLikes(idea.id, idea.likes);
                }}
                className={`bg-transparent border-0 ${
                  likedIdeas.includes(idea.id) ? "" : classes.like
                }`}
                disabled={likedIdeas.includes(idea.id)}
              >
                <i className={`bi bi-hand-thumbs-up-fill`}></i>
              </button>
              <span className="ms-2">Likes: {idea.likes}</span>
            </div>
            <div className={`position-absolute text-center ${classes.tag}`}>
              {idea.tag}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowIdeaCard;
