import jwt_decode from "jwt-decode";

export const cats = [
  "Coding",
  "Entertainment",
  "Education",
  "Music",
  "Movies",
  "Sports",
  "Finance",
  "Productivity",
  "Books",
  "Interview",
  "Self Help",
  "History",
  "Health",
  "Well Beign",
  "Fitness",
];

const img =
  "https://images.hdqwalls.com/download/flower-dark-background-4k-xx-1920x1080.jpg";
export default img;

export const isAcessTokenExpired = () => {
  let currentDate = new Date();
  const decodedToken = jwt_decode(sessionStorage.getItem("accessToken"));
  if (decodedToken.exp * 1000 < currentDate.getTime()) return true;
  else return false;
};

export async function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem("refreshToken");
  if (!refreshToken) {
    return false;
  }

  // Send a request to your server to refresh the access token
  try {
    const response = await fetch("http://localhost:8000/api/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.accessToken;

      sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);
      return true;
    } else {
      console.log("refresh Failed");
      return false;
    }
  } catch (error) {
    return false;
  }
}
