import { useState } from "react";
import { httpRequest } from "../../auth/auth";
export function Add() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    journal: "",
    publisher: "",
    year: "",
    month: "",
    volumes: "",
    pages: "",
    eprint: "",
    eprinttype: "",
    eprintclass: "",
    annote: "",
    sepractice: "",
    claim: "",
    strength: "",
  });
  const handleSubmit = async () => {
    try {
      const res = await httpRequest.post("/api/articles", form);
      if (res && res.data && res.data.message) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const keys = Object.keys(form);
  const Inputs = keys.map((key) => {
    const firstLetterUppercase = key.slice(0, 1).toUpperCase() + key.slice(1);
    return (
      <div className="input-group mb-3" key={key}>
        <span className="input-group-text" id="basic-addon1">
          {firstLetterUppercase}
        </span>
        <input
          type="text"
          required
          onInput={(e) => {
            const tempForm = { ...form };
            tempForm[key] = e.target.value;
            setForm(tempForm);
          }}
          className="form-control"
          placeholder={firstLetterUppercase}
          aria-label={firstLetterUppercase}
          aria-describedby="basic-addon1"
        />
      </div>
    );
  });
  return (
    <div className="container">
      <h1>Add Article</h1>
      {Inputs}
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
