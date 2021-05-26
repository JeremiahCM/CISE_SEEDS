export function ArticleTable(props) {
  const headers = [
    "#",
    "Title",
    "Author",
    "Journal",
    "Year",
    "Month",
    "Volumes",
    "Pages",
    "SE Practice",
    "Claim",
    "Strength",
    "Operation",
  ];
  const articles = props.articles || [];
  const onClickCollectButton = props.onClickCollectButton || function() {};
  let Header;
  let Body;

  Header = headers.map((item) => <th key={item}>{item}</th>);
  Body = articles.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.journal}</td>
        <td>{item.year}</td>
        <td>{item.month}</td>
        <td>{item.volumes}</td>
        <td>{item.pages}</td>
        <td>{item.sepractice}</td>
        <td>{item.claim}</td>
        <td>{item.strength}</td>
        <td>
          <button
            onClick={() => onClickCollectButton(item)}
            type="button"
            className="btn btn-light"
          >
            {item.collected ? "Un-Collect" : "Collect"}
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-striped" style={{ width: "100%" }}>
      <thead>
        <tr>{Header}</tr>
      </thead>
      <tbody>{Body}</tbody>
    </table>
  );
}
