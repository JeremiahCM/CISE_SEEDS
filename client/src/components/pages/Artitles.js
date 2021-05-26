import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { httpRequest } from "../../auth/auth";
import { ArticleTable } from './ArticleTable';
export function Articles() {
  
  const filterColumns = ['title', 'author', 'year', 'sepractice', 'claim', 'strength'];
  const [articles, setArticles] = useState([]);
  const [column, setColumn] = useState('title');
  const [keyword, setKeyword] = useState('');
  const handleSearch = async () => {
    const res = await httpRequest.get(`/api/articles/search/${column}/${keyword}`);
    if (res && res.data && res.data.data) {
      setArticles(res.data.data);
    }
  };
  const handleClickCollectButton = async (item) => {
    const collected = item.collected;
    const articleID = item._id;
    const articleIndex = articles.findIndex(article => article._id === item._id);
    const tempArticles = [...articles];
    tempArticles[articleIndex].collected = !collected;
    if (collected) {
      await httpRequest.post(`/api/collection/un-collect/${articleID}`);
    } else {
      await httpRequest.post(`/api/collection/collect/${articleID}`);
    }
    setArticles(tempArticles);
  }

  let SelectOptions;
  SelectOptions = filterColumns.map((item) => <option key={item} value={item}>{item}</option>);
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await httpRequest.get("/api/articles");
      if (res && Array.isArray(res.data)) {
        setArticles(res.data);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="input-group mb-3" style={{ width: "800px" }}>
        <select
          className="form-select"
          style={{ marginRight: "20px" }}
          aria-label="Default select example"
          value={column}
          onInput={(e) => setColumn(e.target.value)}
        >
          {SelectOptions}
        </select>
        <input
          type="text"
          value={keyword}
          onInput={(e) => setKeyword(e.target.value)}
          style={{ marginRight: "20px" }}
          className="form-control"
          placeholder="keyword"
          aria-label="keyword"
          aria-describedby="basic-addon1"
        />
        <button type="button" style={{ marginRight: "20px" }} onClick={handleSearch} className="btn btn-primary">Search</button>
        <Link to="/add" style={{ marginRight: "20px" }}><button type="button" className="btn btn-success">Add</button></Link>
        <Link to="/collection"><button type="button" className="btn btn-info">Collection</button></Link>
      </div>
      <ArticleTable articles={articles} onClickCollectButton={handleClickCollectButton}/>
    </div>
  );
}
