import { RiShoppingBasket2Line } from "react-icons/ri";
import { RiChatCheckLine } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import MenuItem from "./MenuItem";

const CustomerMenu = () => {
  return (
    <>
      <MenuItem
        icon={RiShoppingBasket2Line}
        label="My Orders"
        address="/dashboard/my-orders"
      />
      <MenuItem
        icon={RiChatCheckLine}
        label="My Review"
        address="/dashboard/my-review"
      />
      <MenuItem
        icon={AiOutlineHeart}
        label="Favorite Meal"
        address="/dashboard/favorite-meal"
      />
    </>
  );
};

export default CustomerMenu;
