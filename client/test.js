const schema = {
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  journal: {
    type: String,
  },
  publisher: {
    type: String,
  },
  year: {
    type: String,
  },
  month: {
    type: String,
  },
  volumes: {
    type: String,
  },
  pages: {
    type: String,
  },
  eprint: {
    type: String,
  },
  eprinttype: {
    type: String,
  },
  eprintclass: {
    type: String,
  },
  annote: {
    type: String,
  },
  sepractice: {
    type: String,
  },
  claim: {
    type: String,
  },
  strength: {
    type: String,
  },
};

const generateInput = (key) => {
  let firstLetterUppercase = key.slice(0, 1).toUpperCase() + key.slice(1);
  return `<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">${firstLetterUppercase}</span>
  <input type="text" onInput={(e) => setForm(key, )} className="form-control" placeholder="${firstLetterUppercase}" aria-label="${firstLetterUppercase}" aria-describedby="basic-addon1">
</div>`;
};
let html = ``;
for (let key in schema) {
}
