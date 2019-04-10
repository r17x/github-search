import React from "react";
import ReactDOM from "react-dom";
import Search from "./search";

function App() {
  return <Search />;
}

class XGithubRepo extends HTMLElement {
  connectedCallback() {
    console.log(this);
    console.log(XGithubRepo);
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);
    ReactDOM.render(<Search search="ri7nz" />, mountPoint);
  }
}

try {
  const xElement = "x-repos-search";
  !(xElement in document) && customElements.define(xElement, XGithubRepo);
} catch (e) {
  console.log(e);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
