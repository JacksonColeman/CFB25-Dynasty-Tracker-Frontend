import DisplayUser from "./DisplayUser";
import DeleteUser from "./DeleteUser";
import LogoutButton from "./LogoutButton";

const AccountPage = () => {
  return (
    <div>
      <DisplayUser />
      {/* <UpdateUser /> */}
      <DeleteUser />
      <LogoutButton />
    </div>
  );
};

export default AccountPage;
