import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector ((state) => state.user);

  return(
    <div className="home-container">
    </div>
  )
}

export default Home;