import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import List from "./List";
import sampleData from "./sampleData";

const api = url => ({
  get: () => fetch(url)
});

const wrapReq = promises => ({
  json: async () => {
    try {
      const res = await promises;
      console.log(res.url);
      if (res.status === 200 && "json" in res)
        return { data: await res.json(), error: null };
      return { data: null, error: new Error("unknown") };
    } catch (error) {
      return { error, data: null };
    }
  }
});

const getEndpoint = user =>
  `https://api.github.com/users/${user}/repos?sort=true`;

const fetchRepoByUser = debounce(async (user, handleErr, handleData) => {
  const { data, error } = await wrapReq(api(getEndpoint(user)).get()).json();
  console.log("Received Data:", data);
  console.log("Received Error:", error);
  !data && typeof handleErr === "function" && handleErr(error);
  !error && typeof handleData === "function" && handleData(data);
}, 3000);

export default function Search(props) {
  const [query, setQuery] = useState(props.search || "");
  const [repos, setRepos] = useState(sampleData);

  useEffect(() => {
    if (query !== "") {
      setRepos(
        [...Array(5).keys()].map(_ => ({
          loading: true,
          full_name: "",
          description: "",
          owner: { avatar_url: "" }
        }))
      );
      fetchRepoByUser(query, null, setRepos);
    }
  }, [query, setRepos]);

  const onChange = e => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <>
      <input
        style={{
          fontSize: "large",
          padding: "13px 21px",
          width: "100%",
          textAlign: "center"
        }}
        onChange={onChange}
        placeholder="Github: username..."
      />
      <List data={repos} />
    </>
  );
}
