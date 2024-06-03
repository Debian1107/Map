import { useState } from "react";
// import "dotenv";
export const Navbar: React.FC<{
  getData: (e: any, searchOv: boolean) => void;
}> = ({ getData }) => {
  const [searchQuery, setSearchquery] = useState("");
  const [searchResult, setSearchresult] = useState([]);
  const [searchOver, setsearchOver] = useState(false);

  const Handelsearch = () => {
    // Define the data you want to send
    const postData = {
      username: "example_user",
      password: "example_password",
    };

    // Define the URL you want to send the POST request to
    const url: string = `${process.env.REACT_APP_BACKEND_URL}`;

    // Define the options for the fetch request
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(postData), // Convert the data to a JSON string
    };

    // Send the POST request
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the response data
        // console.log(data);
        const searchedData = data.filter((obj: any) => {
          // Split the tags string into an array
          obj.tags = obj.tags.toLowerCase();
          obj.name = obj.name.toLowerCase();
          obj.facility = obj.facility.toLowerCase();
          const tagsArray = obj.tags.split(",");
          // Check if the keyword exists in the tags array

          return (
            tagsArray.includes(searchQuery) ||
            obj.name.includes(searchQuery) ||
            obj.facility.includes(searchQuery)
          );
        });
        console.log("this is search result - ");
        console.log(searchedData);
        setSearchresult(searchedData);
        getData(searchedData, searchOver);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
    setSearchquery("");
  };
  return (
    <div className="w-full bg-red-100 p-3 flex gap-2 justify-center">
      <input
        className="w-[50vb] h-[5vh]"
        value={searchQuery}
        onChange={(e) => setSearchquery(e.target.value)}
        placeholder="Enter to Search Rewardswise Merchants"
      />
      <button
        onClick={Handelsearch}
        disabled={searchQuery.length > 2 ? false : true}
        className=" bg-green-100 focus:bg-green-300 focus:animate-bounce px-2 border-black border-[2px]"
      >
        {searchOver ? "Search Over" : "Search"}
      </button>
      <button
        onClick={() => {
          setsearchOver(!searchOver);
        }}
        disabled={
          searchQuery.length > 2 ? false : searchResult.length ? false : true
        }
        className=" bg-green-100 focus:bg-green-300 px-2 border-black border-[2px]"
      >
        ^
      </button>
    </div>
  );
};
