import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "../context";

const Contractor = () => {
  const { contractorId } = useParams();
  const { token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  let history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:3000/api/v1/contractors/${contractorId}`, {
      headers: {
        token: token,
      },
    })
      .then((response) => {
        setData(response.data.data);
        setEmail(response.data.data.attributes.email);
        setName(response.data.data.attributes.name);
        setSpecialty(response.data.data.attributes.specialty);
        setHourlyRate(response.data.data.attributes.hourly_rate);
      })
      .catch((e) => {
        setError(e.response);
      });
  }, []);

  const handleSubmit = () => {
    Axios.patch(`http://localhost:3000/api/v1/contractors/${contractorId}`, {
      email: email,
      name: name,
      hourly_rate: hourlyRate,
      specialty: specialty,
    })
      .then((response) => {
        history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (data) {
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
            defaultValue={data.attributes.email}
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
            defaultValue={data.attributes.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Hourly Rate:
          <input
            type="text"
            defaultValue={data.attributes.hourly_rate}
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
            defaultValue={data.attributes.specialty}
            onChange={(e) => {
              setSpecialty(e.target.value);
            }}
          />
        </label>
        <input type="Submit" value="Update" />
        <div>{error ? <p>{error}</p> : null}</div>
      </form>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Contractor;
