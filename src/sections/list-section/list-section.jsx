import { useEffect } from "react";
import { useState } from "react";
import { ListItem } from "../../ui/list-item/list-item";
import "./list-section.scss";
import axios from "axios";

export const ListSection = () => {
  const [text, setText] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if(fetching) {
      console.log("fetching")
      axios
        .get(`https://jsonplaceholder.typicode.com/comments?_limit=20&_page=${currentPage}`)
        .then(response => {
          setText([...text, ...response.data]);
          setCurrentPage(prevState => prevState + 1)
          setTotalCount(response.headers[100])
        })
        .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(()=> {
    document.addEventListener("scroll", scrollHandler)
    return function () {
      document.removeEventListener("scroll", scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
      (e.target.documentElement.scrollTop + window.innerHeight) < 100 && text.length === totalCount) {
        setFetching(true)
      }
    // console.log("scrollHeight", e.target.documentElement.scrollHeight)
    // console.log("scrollTop", e.target.documentElement.scrollTop);
    // console.log("innerHeight", window.innerHeight);
  }

  return (
    <>
      <section className="list-section">
        {text.map((text) => (
          <ListItem name={text.name} email={text.email} key={text.id}/>
        ))}
      </section>
    </>
  );
};

export default ListSection;
