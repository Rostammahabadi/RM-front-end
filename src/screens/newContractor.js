import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const NewContractor = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  let history = useHistory();

  const handleSubmit = () => {
    Axios.post("http://localhost:3000/api/v1/contractors/new", {
      email: email,
      name: name,
      hourly_rate: hourlyRate,
      specialty: specialty,
    })
      .then((response) => {
        history.push("/dashboard");
      })
      .catch((e) => {
        setError(e.response.data.data.errors.join(", "));
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label>
        Email:
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </label>
      <label>
        Hourly Rate:
        <input
          type="text"
          name="hourlyRate"
          onChange={(e) => {
            setHourlyRate(e.target.value);
          }}
        />
      </label>
      <label>
        Specialty:
        <input
          type="text"
          name="specialty"
          onChange={(e) => {
            setSpecialty(e.target.value);
          }}
        />
      </label>
      <input type="Submit" value="Create" />
      <div>{error ? <p>{error}</p> : null}</div>
    </form>
  );
};

export default NewContractor;
