import { useState, useEffect } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [enternameIsvalid, setEnteredNameIsvalid] = useState(false);
  const [formIsvalid, setFormIsvalid] = useState(false);
  

  const enteredEmailIsValid = enteredEmail.includes("@");
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  const nameInputIsInvalid = !enternameIsvalid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control ";

  const emailInputClasses = enteredEmailIsInvalid
    ? "form-control invalid"
    : "form-control ";


  useEffect(() => {
    if (enternameIsvalid && enteredEmailIsValid ) {
      setFormIsvalid(true);
    } else {
      setFormIsvalid(false);
    }
  }, [enternameIsvalid ,enteredEmailIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== "") {
      setEnteredNameIsvalid(true);
      return;
    }
  };
  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsvalid(false);
      return;
    }
  };
  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameIsvalid(false);
      return;
    }

    setEnteredName("");
    setEnteredEmail("");
    setEnteredEmailTouched(false);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Must Enter Name first</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          value={enteredEmail}
          onBlur={emailInputBlurHandler}
        />
        {enteredEmailIsInvalid && (
          <p className="error-text">Must Enter valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsvalid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
