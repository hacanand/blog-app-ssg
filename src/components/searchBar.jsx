'use client'
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import styles from "./search.module.css";
import {searchData} from '../lib/searchData'
export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => {
    // console.log(query)
    return searchData(query)
  }
  // console.log(query)
  // console.log(results)
//  console.log(searchEndpoint('dynamic-routing'))
  const onChange = useCallback((event) => {
    const querySearch = event.target.value;
    //  console.log(querySearch)
    setQuery(querySearch);
    if (querySearch.length) {
      setResults(searchEndpoint(querySearch));
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback(() => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onClick);
    }
  }, []);

  return (
    <div className={styles.container} ref={searchRef}>
      <input
        className= {`${styles.search} rounded-md`}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Search posts"
        type="text"
        value={query}
      />
      {active && results?.length > 0 && (
        <ul className={styles.results}>
          {results.map(({ id, title }) => (
            <li className={styles.result} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <>{title}</>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
