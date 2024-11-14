import Search from "../components/Search";
import User from "../components/User";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { UserProps } from "../types/user";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const loadUser = async (username: string) => {
    setLoading(true);
    setError(false);
    setUser(null);

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    setLoading(false);

    if (response.status !== 200) {
      setError(true);
      return;
    }

    const { avatar_url, login, location, followers, following } = data;
    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following
    }

    setUser(userData);
  }
  return (
    <div>
      <Search loadUser={loadUser} />
      {loading && <Loader />}
      {user && <User {...user} />}
      {error && <Error />}
    </div>
  );
}

export default Home;