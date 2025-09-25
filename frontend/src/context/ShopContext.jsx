import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();
{
  /*This is a Context API*/
}

const ShopContextProvider = (props) => {
  const currency = "Rs.";
  const delivery_fee = 300;
  const backendUrl = "http://localhost:3000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    {
      /*Display an error message if we didn't select a product size as s,m,l,xl*/
    }
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
        {
          /*items with same itemId and same size(S,M,L,XL) are added together inside the cart*/
        }
      } else {
        cartData[itemId][size] = 1;
        {
          /*items with same itemId and different sizes are added as a new entry to the cart*/
        }
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
      {
        /*items with different itemId's that means different items are added as a seperate new entry to the cart*/
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        
          await axios.post("http://localhost:3000/api/cart/add", {itemId,size}, {headers:{token}})

      } catch (error) {
        console.log(error)
        toast.error(error.message)
        
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData)

    if (token) {
      try {
        await axios.post("http://localhost:3000/api/cart/update", {itemId, size, quantity}, {headers:{token}})
      
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/product/list"
      );
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async ( token ) => {
    try {
      
      const response = await axios.post("http://localhost:3000/api/cart/get",{},{headers:{token}})
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  },[])

  {
    /*when we add variable,state variable or a function inside this value object then we can access it in any component using the context API */
  }
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
