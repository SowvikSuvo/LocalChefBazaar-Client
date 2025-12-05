import { MdFoodBank } from "react-icons/md";
import { TbToolsKitchen2 } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";
import MenuItem from "./MenuItem";

const ChefMenu = () => {
  return (
    <>
      <MenuItem icon={MdFoodBank} label="Create Meal" address="create-meal" />
      <MenuItem icon={TbToolsKitchen2} label="My Meals" address="my-meals" />
      <MenuItem
        icon={RiFileList3Line}
        label="Order Requests"
        address="order-requests"
      />
    </>
  );
};

export default ChefMenu;
