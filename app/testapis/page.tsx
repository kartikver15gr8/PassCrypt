"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function TestingApis() {
  const [passwords, setPasswords] = useState([]);

  const fetchPasswords = async () => {
    try {
      const response = await axios.get("/api/user/password/getpassword");
      console.log(response.data);

      setPasswords(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);
  return (
    <div className="text-black">
      <p>Testing APIs</p>
      {passwords.map((elem, key) => {
        return <p key={key}>{JSON.stringify(elem)}</p>;
      })}
    </div>
  );
}
