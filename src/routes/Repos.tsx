import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";
import { RepoProps } from "../types/repo";
import classes from './Repos.module.css';
import Repo from "../components/Repo";

const Repos = () => {
  const { username } = useParams();
  const [repos, setRepos] = useState<RepoProps[] | [] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   const loadRepos = async (username: string) => {
      setLoading(true);
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();
      setLoading(false);

      let orderedRepos = data.sort((a: RepoProps, b: RepoProps) => {
        return b.stargazers_count - a.stargazers_count;
      }
      );

      orderedRepos = orderedRepos.slice(0, 5);

      setRepos(orderedRepos);
    }
    if (username) {
      loadRepos(username);
    }
  }, []);

  if (!repos && loading) {
    return <Loader />;
  }

  return (
    <div className={classes.repos}>
      <BackBtn />
      <h2>Explore os repos do user: {username}</h2>
      {repos && repos.length === 0 && <p>There are no repositories.</p>}
      {repos && repos.length > 0 && (
        <div className={classes.repos_container}>
          {repos.map((repo: RepoProps) => (
            <Repo {...repo} key={repo.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Repos;