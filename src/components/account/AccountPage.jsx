import React from "react";
import DisplayUser from "./DisplayUser";
import UpdateUser from "../UpdateUser";
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
