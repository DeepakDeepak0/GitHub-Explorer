import React, { useState } from "react";
import { ReactTyped, Typed } from "react-typed";

const App = () => {
  const [name, setName] = useState("");

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setName(searchValue);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (name.length > 0) {
      const getUser = await getGitHubProfile(name);
      setName("");

      if (getUser.login) {
        renderProfile(getUser);
        document.querySelector(".main-container").style.display = "none";
        document.querySelector(".main-container2").style.display = "block";
      }
    }
  }

  const msgDisplayError = (status) => {
    const msgBox = document.querySelector(".msg-box");
    if (status === 404) {
      msgBox.innerHTML = "Profile doesn't exist";
    }
    setTimeout(() => {
      msgBox.innerHTML = "";
    }, 5000);
  };

  const apiURL = `https://api.github.com/users`;
  const getGitHubProfile = async (username) => {
    const response = await fetch(`${apiURL}/${username}`);
    if (response.status === 404) {
      msgDisplayError(response.status);
    }
    if (response.status != 200) {
      new Error(`Something went wrong ! Status Code${response.status}`);
    }
    const data = await response.json();

    // console.log(data);

    return data;
  };

  // Render GitHub Profile
  const renderProfile = (usersData) => {
    const date = new Date(usersData.created_at);
    const formattedDate = date.toLocaleString();

    let profilesnippet = ``;
    profilesnippet += `<div class='flex flex-col md:flex-row md:justify-center items-center justify-center  w-[100%] h-[100%] px-12  md:gap-40 gap-6 '>
        <div data-aos="flip-left" class='left flex flex-col justify-center items-center  gap-4 md:w-[500px] w-[300px] p-7 '>
          <h2 class='text-white text-4xl md:text-5xl '>${usersData.login}</h2>
          <img src="${usersData.avatar_url}" class='hover:scale-105 hover:shadow-customShadow3 transition-all duration-300 border-[1px] shadow-customShadow2 rounded-full md:w-[300px] md:h-[300px] w-[200px] h-[200px]' />
          <a href="${usersData.html_url}" target="_blank" ><button class="md:text-xl w-full md:w-[200px] px-9 py-3 rounded-lg bg-[#14213d] text-[#E5E5E5] hover:bg-[#aaa3a3] hover:text-[#14213d]  transition-all duration-300 ease-in  ">
            Visit Profile
          </button></a>
        </div>
        <div data-aos="fade-in" class="right w-[400px] min-h-450px]  border-[1px] p-7 shadow-customShadow2 bg-[#2b2b2b] ">
          <div class="flex gap-9 py-5 justify-center items-center ">
            <button class='md:text-lg  md:w-[200px] px-9 py-3 rounded-lg bg-[#000000] text-[#E5E5E5]'>Following: ${usersData.following}</button>
            <button class='md:text-lg  md:w-[200px] px-9 py-3 rounded-lg bg-[#000000] text-[#E5E5E5]'>Followers: ${usersData.followers} </button>
          </div>
          <div class='flex justify-center items-center '>
            <button class='md:text-lg  md:w-[250px] px-9 py-3 rounded-lg bg-[#000000] text-[#E5E5E5]'>Public Repositories: ${usersData.public_repos} </button>
          </div>
          <div class='flex flex-col gap-4 mt-2'>`;

    if (usersData.bio !== null) {
      profilesnippet += `<p class='text-white text-xl '>${usersData.bio}</p>`;
    }

    if (usersData.location !== null) {
      profilesnippet += `<h2 class='text-white text-2xl'>Location: ${usersData.location} </h2>`;
    }

    profilesnippet += `<h2 class='text-white text-2xl'>Member Since: ${formattedDate} </h2>
          </div>
        </div>

      </div>`;

    document.querySelector(".main-container2").innerHTML = profilesnippet;
  };

  return (
    <div className="bg-[url('./image1.jpg')] bg-no-repeat bg-cover w-[100vw] h-[100vh] bg-fixed font-custom ">
      <div className=" main-container flex flex-col justify-center items-center w-full h-full p-4 overflow-y-auto gap-8">
        <h1 className="animate-pulse text-red-600 text-5xl md:text-7xl font-bold">
          GitHub Explorer
        </h1>
        <div className="flex flex-col w-[70%] min-h-72 gap-[2rem]">
          <p className="text-center">
            <ReactTyped
              className="text-red-100 text-2xl md:text-3xl"
              strings={[
                "Discover GitHub users and explore their repositories and activities.",
              ]}
              typeSpeed={50}
            />
          </p>
          <p className="text-center">
            <ReactTyped
              className="text-red-100 text-2xl md:text-3xl"
              strings={["Connect with developers and explore their works."]}
              startDelay={6000}
              typeSpeed={50}
            />
          </p>
        </div>
        <div className="search-box max-w-[600px]   text-xl">
          <form id="Search-form" className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={handleSearch}
              className=" outline-none text-[#181717] bg-[#E5E5E5] px-6 py-3 rounded-md rounded-tr-none rounded-br-none w-full "
              placeholder="Discover Username !!"
            />
            <button className="px-5 py-3 bg-[#14213d] text-[#E5E5E5] hover:bg-[#aaa3a3] hover:text-[#14213d] rounded-md rounded-tl-none rounded-bl-none transition-all duration-300 ease-in  ">
              Explore
            </button>
          </form>
        </div>

        <div className="msg-box text-4xl text-red-600 h-8 md:text-5xl "></div>
      </div>

      {/* For GitHub Profile when user successfully logins */}
      <div className=" main-container2  hidden w-full h-full p-4 overflow-y-auto"></div>
    </div>
  );
};

export default App;
