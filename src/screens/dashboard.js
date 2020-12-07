import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const { setIsLoggedIn, setToken, token } = useContext(AuthContext);
  const [query, setQuery] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3000/api/v1/contractors", {
      headers: {
        token: token,
      },
    })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const search = (rows) => {
    let searchColumns = ["email", "name"];
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row.attributes[column]
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <>
      <button
        style={{ display: "inline-block", alignSelf: "end" }}
        onClick={() => {
          setIsLoggedIn(false);
          setToken(null);
          localStorage.setItem("token", "");
        }}
      >
        Logout
      </button>
      <input
        style={{ width: 400, display: "block" }}
        className="text-field"
        placeholder="Search Results"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr key={"header"}>
            <th>Name</th>
            <th>Email</th>
            <th>Hourly Rate</th>
            <th>Specialty</th>
            <th>Active?</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            search(data).map((d) => {
              return (
                <tr key={d.attributes.id}>
                  <td>
                    <Link to={(location) => `/contractors/${d.id}`}>
                      {d.attributes.name}
                    </Link>
                  </td>
                  <td>{d.attributes.email}</td>
                  <td>$ {d.attributes.hourly_rate}</td>
                  <td>{d.attributes.specialty}</td>
                  <td>{String(d.attributes.active)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
