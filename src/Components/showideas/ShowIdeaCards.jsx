import React, { useEffect, useState } from "react";
import ShowIdeaCard from "./ShowIdeaCard";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/fire";
import { collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { addIdeas } from "../../redux/actions/Actions";
import Loading from "../UI/Loading";
import Error from "../UI/Error";
import classes from "./ShowIdea.module.css";

const ShowIdeaCards = () => {
  const ideaCollectionRef = collection(db, "ideas");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [renderLike, setRenderLike] = useState(true);
  const [likedIdeas, setLikedIdeas] = useState([]);

  useEffect(() => {
    //getting ideas from data base
    const getIdeas = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getDocs(ideaCollectionRef);
        const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        if (data.length > 0) {
          dispatch(addIdeas(data));
          setIsLoading(false);
        } else {
          throw new Error(
            "there is no data in database or something went wrong!!!"
          );
        }
      } catch (error) {
        setError(error);

        setIsLoading(false);
      }
    };
    getIdeas();
  }, [renderLike]);

  let ideas = useSelector((state) => state.addIdeas.ideas);

  return (
    <div className={`container ${classes["card-container"]}`}>
      {!isLoading && ideas.length > 0 && (
        <ShowIdeaCard
          setRenderLike={setRenderLike}
          data={ideas}
          likedIdeas={likedIdeas}
          setLikedIdeas={setLikedIdeas}
        />
      )}
      {/* {!isLoading && ideas.length === 0 && <p>noerror</p>} */}
      {!isLoading && error && <Error msg={error.toString()} />}
      {isLoading && <Loading />}
    </div>
  );
};

export default ShowIdeaCards;
