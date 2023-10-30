import "./navbar.scss";
import { useToken } from "../../utils/states/context/token-context";
import Swal from "../../utils/swal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { token, changeToken } = useToken();

  async function handleLogout() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    changeToken();
    Swal.fire({
      title: "Success",
      text: "Logout Successfully",
      showCancelButton: false,
    });
  }

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>SimSini</span>
      </div>
      {token === "" ? (
        <Link to="/login" className=" text-xl font-semiboldtext-white">
          Login
        </Link>
      ) : (
        <>
          <p className="icon cursor-pointer  text-xl font-semibold text-white mr-4" onClick={() => handleLogout()}>
            Logout
          </p>
        </>
      )}
    </div>
  );
};

export default Navbar;
