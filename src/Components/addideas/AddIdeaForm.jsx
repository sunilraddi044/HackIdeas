import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/fire";
import classes from "./AddIdeaForm.module.css";
import { useSelector } from "react-redux";

const AddIdeaFrom = () => {
  const ideaCollectionRef = collection(db, "ideas");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tag, setTag] = useState("");
  const user = useSelector((state) => state.addIdeas.user);

  const date = new Date();

  const creationDate = `${date.getFullYear()}-${
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate()
  }-${
    (date.getMonth() + 1).toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1
  }`;

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const descChangeHandler = (e) => {
    setDesc(e.target.value);
  };

  const tabChangeHandler = (e) => {
    setTag(e.target.value);
  };

  const addIdea = async (payload) => {
    await addDoc(ideaCollectionRef, payload);
  };

  const submitDataHandler = () => {
    if (title === "" || desc === "" || tag === "") {
      alert("Please Provide all the details");
      return;
    }

    const idea = {
      title,
      desc,
      likes: 0,
      tag,
      creationDate,
      user,
      liked: false,
    };

    addIdea(idea);
    setTitle("");
    setDesc("");
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className={`shadow ${classes["form-container"]}  p-5 `}>
        <p className="text-light">Add Ideas</p>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Title
          </span>
          <input
            value={title}
            onChange={titleChangeHandler}
            type="text"
            className="form-control"
            placeholder="Enter Title"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Description
          </span>
          <input
            value={desc}
            onChange={descChangeHandler}
            type="text"
            className="form-control"
            placeholder="Enter Description"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="dropdow d-flex justfy-content-center align-items-center">
          <label
            className={`input-group-text  d-inline" for="tags" ${classes.label}`}
          >
            Choose a Tag
          </label>

          <select
            onChange={tabChangeHandler}
            className="form-control d-inline w-25"
            style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
            name="tags"
            id="tags"
          >
            <option value="" selected disabled>
              Please Select
            </option>
            <option value="Tech">Tech</option>
            <option value="Feature">Feature</option>
          </select>
        </div>
        <div
          onClick={submitDataHandler}
          className={`${classes.submit} position-absolute`}
        >
          <button className="btn btn-secondary px-5 btn-lg">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddIdeaFrom;
