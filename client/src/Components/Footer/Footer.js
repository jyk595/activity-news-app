import { useSelector } from 'react-redux';

function Footer() {
  const user = useSelector ((state) => state.user);
  
  return(
    <footer>
      <p>This is the footer {user.email}</p>
    </footer>
  )
}

export default Footer