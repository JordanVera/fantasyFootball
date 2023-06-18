import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <section className="heading">
        <h1>What do you need help with? {user?.name}</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to="/tickets" className="btn btn-reverse btn-block">
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  );
}
