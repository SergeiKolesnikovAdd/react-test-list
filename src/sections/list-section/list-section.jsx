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
    if (fetching) {
      console.log("fetching")
      axios
        .get(`https://jsonplaceholder.typicode.com/comments?_limit=20_page=${currentPage}`)
        .then(response => {
          setText([...text, ...response.data])
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
      (e.target.documentElement.scrollTop + window.innerHeight) < 100 && text.length < totalCount) {
        setFetching(true)
      }
  }

    // useEffect(() => {
    //   if (fetching) {
    //     console.log("fetching");
    //     setFetching(false);
    //     axios
    //       .get(
    //         `https://jsonplaceholder.typicode.com/comments?_limit=20_page=${currentPage}`
    //       )
    //       .then((res) => {
    //         setData((data) => data.concat(res.data));
    //         setCurrentPage((prevState) => prevState + 1);
    //         setTotalCount(res.headers[100]);
    //       });
    //   }
    // }, [fetching]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://jsonplaceholder.typicode.com/comments?_limit=20_page=${currentPage}`
  //     )
  //     .then((res) => {
  //       // setData((data) => data.concat(res.data));
  //       setData([...data, ...res.data])
  //       setTotalCount(res.headers[100]);
  //     });
  // }, [currentPage, ]);
  // console.log(data)

  // useEffect(() => {
  //   const scrollHandler = (e) => {
  //     if (
  //       e.target.documentElement.scrollHeight -
  //         (e.target.documentElement.scrollTop + window.innerHeight) <
  //         100 &&
  //       data.length < totalCount
  //     ) {
  //       setCurrentPage((prevState) => prevState + 1);
  //       console.log("pizda")
  //       // setFetching(true);
  //     }
  //   };
  //   document.addEventListener("scroll", scrollHandler);
  //   return function () {
  //     document.removeEventListener("scroll", scrollHandler);
  //   };
  // }, []);

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
