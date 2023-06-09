import { useState, useEffect } from "react";
import Loader from "./Loader";
const ChatCard = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const handleInput = (e) => {
    setSearchText(e.target.value);
  };
  const handleClick = async () => {
    // console.log("Here")
    try {
        setData("")
        setDataFetched(true)
      const data = await fetch("https://ens2-0-gpt3.onrender.com/getResponse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: searchText,
        }),
      });
      // console.log(data);
      console.log("Got response");
      const json = await data?.json();
      setData(json.answer);
      setDataFetched(false)
    } catch (e) {
      setData("Sorry Cannot assist in this scenario!!!");
    }
  };
  return (
    <div className="cartCard">
      <div>
        <input
          onChange={handleInput}
          value={searchText}
          type="text"
          placeholder="Should i suggest something"
        ></input>
        <button onClick={handleClick}>GET</button>
      </div>
      <div className="cartCard_answer">
        {data}
        {dataFetched && <Loader />}
      </div>
    </div>
  );
};
export default ChatCard;
