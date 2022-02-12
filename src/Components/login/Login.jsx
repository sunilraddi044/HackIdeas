import React, { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase/fire";
import classes from "./Login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/Actions";
import Loading from "../UI/Loading";

const Login = ({ setLoginStatus }) => {
  const ideaCollectionRef = collection(db, "users");
  const [employeeId, setEmployeeId] = useState([]);
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [signUp, setSignUp] = useState(false);

  const loginTypeHandler = () => {
    setSignUp((prev) => !prev);
  };

  const employeeIdHandler = (e) => {
    setEmployeeId(e.target.value);
  };

  const addUserToDB = async (e) => {
    setLoading(true);
    e.preventDefault();
    await addDoc(ideaCollectionRef, { employeeId, likedIdeas: [] });

    setEmployeeId("");
    alert("EmployeeID is added successfully");
    setSignUp(false);
    setLoading(false);
  };

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await getDocs(ideaCollectionRef);
    const users = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const a = users.map((user) => user.employeeId);
    if (a.includes(employeeId)) {
      setLoginStatus(true);
      dispatch(setUser(employeeId));
      history.replace("/showideas");
      setLoading(false);
    } else {
      setLoading(false);
      alert("Sorry unrecognized EmployeeId please SignUp ");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`containe ${classes["card-container"]}`}>
      <div
        className=" d-flex justify-content-center align-items-center"
        style={{ height: "92vh" }}
      >
        <div className={`text-light ${classes.loginContainer}`}>
          <form>
            <div className="mb-3">
              <label className="form-label">EmployeeID</label>
              <input
                data-testid="employee-id"
                value={employeeId}
                onChange={employeeIdHandler}
                type="text"
                className="form-control text-light"
                id="employeeid"
                aria-describedby="emailHelp"
                style={{ background: "rgba(255, 255, 255, 0.1)" }}
              />
            </div>

            {!signUp && (
              <button className="btn btn-primary w-100" onClick={loginHandler}>
                Sign in
              </button>
            )}
            {signUp && (
              <button onClick={addUserToDB} className="btn btn-primary w-100">
                Sign up
              </button>
            )}
            {signUp ? (
              <p className="text-end mt-2">
                Have an account
                <small
                  className="text-warning ms-1"
                  onClick={loginTypeHandler}
                  style={{ cursor: "pointer" }}
                >
                  Sign in
                </small>
              </p>
            ) : (
              <p className="text-end mt-2">
                Create an account
                <small
                  className="text-warning ms-1"
                  onClick={loginTypeHandler}
                  style={{ cursor: "pointer" }}
                >
                  Sign up
                </small>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
