import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";


export const allNav = [
    {
        id : 1,
        title : 'Dashboard',
        icon : <AiOutlineDashboard />,
        role : 'admin',
        path : '/admin/dashboard'
    },
    {
        id : 1,
        title : 'Orders',
        icon : <AiOutlineShoppingCart />,
        role : 'seller',
        path : '/admin/dashboard/orders'
    }
]