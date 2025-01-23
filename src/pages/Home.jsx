import { useEffect, useState } from "react";

export default function Home() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues");
      const data = await response.json();
      console.log("data", data);
      setVenues(data.data);
    }
    getData();
  }, []);

  return <></>;
}
