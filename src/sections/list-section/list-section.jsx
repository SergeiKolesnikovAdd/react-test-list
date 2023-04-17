import { useEffect } from "react";
import { useState } from "react";
import { ListItem } from "../../ui/list-item/list-item";
import "./list-section.scss";
import axios from "axios";

export const ListSection = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (fetching) {
      console.log("fetching");
      console.log()
      setFetching(false);
      axios
        .get(
          `https://jsonplaceholder.typicode.com/comments?_limit=20_page=${currentPage}`
        )
        .then((res) => {
          setData((data) => data.concat(res.data));
          setCurrentPage((prevState) => prevState + 1);
          setTotalCount(res.headers[100]);
        })
    }
  }, [fetching, currentPage]);
  console.log(data)

  useEffect(() => {
    const scrollHandler = (e) => {
      if (
        e.target.documentElement.scrollHeight -
          (e.target.documentElement.scrollTop + window.innerHeight) <
          100 &&
        data.length < totalCount
      ) {
        setFetching(true);
      }
    };
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <section className="list-section">
        {data.map((item) => (
          <ListItem name={item.name} email={item.email} key={item.id}/>
        ))}
      </section>
    </>
  );
};

export default ListSection;
