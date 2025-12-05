import { FaUsersCog } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={FaUsersCog}
        label="Manage Users"
        address="/dashboard/manage-users"
      />
      <MenuItem
        icon={MdPendingActions}
        label="Manage Request"
        address="/dashboard/manage-request"
      />
      <MenuItem
        icon={MdAnalytics}
        label="Platform Statistics"
        address="/dashboard/statistics"
      />
    </>
  );
};

export default AdminMenu;
