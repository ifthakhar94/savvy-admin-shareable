import React, { useState, useEffect } from "react";
import UserDetails from "../component/UserDetails";
import UserList from "../component/UserList";
import Layout from "../../Layout/Index";
import "../../assets/style/user/userDetails.css";
function Users() {
  const [selectedUser, setSelectedUser] = useState<any>();

  const [openUserDetails, setOpenUserDetails] = useState(false);
  const handleShowUserDetails = () => {
    setOpenUserDetails(true);
  };
  const handleCloseUserDetails = () => {
    setOpenUserDetails(false);
  };
  const userListProps = {
    handleShowUserDetails,
    setSelectedUser
  };
  const userDetailsProps = {
    handleCloseUserDetails,
    selectedUser
  };
  useEffect(() => {
    if (openUserDetails === true) setOpenUserDetails(false);
  }, []);
  return (
    <Layout>
      <React.Fragment>
        <UserList />
      </React.Fragment>
    </Layout>
  );
}

export default Users;
