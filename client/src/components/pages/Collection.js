import { httpRequest } from "../../auth/auth";
import { useEffect, useState } from "react";
import { ArticleTable } from "./ArticleTable";
export function Collection() {
  const [articles, setArticles] = useState([]);
  const handleClickCollectButton = async (item) => {
    const collected = item.collected;
    const articleID = item._id;
    const articleIndex = articles.findIndex(
      (article) => article._id === item._id
    );
    const tempArticles = [...articles];
    tempArticles[articleIndex].collected = !collected;
    if (collected) {
      await httpRequest.post(`/api/collection/un-collect/${articleID}`);
    } else {
      await httpRequest.post(`/api/collection/collect/${articleID}`);
    }
    setArticles(tempArticles);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await httpRequest.get(`/api/collection`);
        if (res && res.data && Array.isArray(res.data.data)) {
          setArticles(res.data.data);
        }
      } catch (err) {
        alert(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <ArticleTable
        articles={articles}
        onClickCollectButton={handleClickCollectButton}
      />
    </div>
  );
}
