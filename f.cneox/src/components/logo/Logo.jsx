import { Link } from "react-router-dom";
import logoDark from "/assets/img/logoname.png";
import logoLight from "../../assets/img/logo-light.png";

// eslint-disable-next-line react/prop-types
const LogoDark = ({ light }) => {
  return (
    <Link to="/">
      <img src={light ? logoDark : logoDark} alt="AIMass" />
    </Link>
  );
};

export default LogoDark;
