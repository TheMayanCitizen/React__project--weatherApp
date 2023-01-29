import React from "react";
import "../styles/Form.css";

const Form = ({ setCity }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.cityName.value);
  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form__input">
        <input id="cityName" type="text" className="form__input--item" />
        <div className="underline"></div>
        <label>City name</label>
      </div>
      <button className="form__btn">Search</button>
    </form>
  );
};

export default Form;
