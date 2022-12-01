import './App.css';
import React from "react";
import { useEffect, useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import CartItem from "./components/CartItem";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";



/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
  // TODO: use useState to create a state variable to hold the state of the cart
  /* add your cart state code here */

    // const [totalItems, setIndex] = useState(0);
    // initialize states
    // const [cart, setCart] = useState([]);
    // const [itemCount, setItemCount] = useState(0);

    // key value pair
    const [cart, setCart] = useState({itemCount: {}, itemPrice: {}}); 
    const [totalPrice, setTotalPrice] = useState(0);

    // ============ ORIGINAL PRICING UPDATE FOR CART ============
    // // initialize cart
    // const updatePrice = () => {
    //   let sum = 0;
    //   cart.forEach(i => sum += i.price);
    //   setPrice(sum);
    // }

    // // hepful for development assignment!!
    // useEffect(() => {
    //   updatePrice();
    // }, [cart]);
    // ============ ORIGINAL PRICING UPDATE FOR CART ============

// EXAMPLE OF CODE STRUCTURE
// const modifierFunction = (prev) => prev + 1
// setItemCount(modifierFunction);


      const updateCart = (prop) => {
        let bakeryItem = prop.name; 
        let updatedCount = cart.itemCount; 
        // console.log(bakeryData)
        // let itemPrice = prop.price
        
        if (updatedCount[bakeryItem]) {
          updatedCount[bakeryItem] += 1
        } 
        else {
          updatedCount[bakeryItem] = 1
          cart.itemPrice[bakeryItem] = prop.price
        }
        setCart({itemCount: updatedCount, itemPrice: cart.itemPrice})
        setTotalPrice(totalPrice + prop.price)
      }
    
      const addItem = (bakeryItem) => {
        cart.itemCount[bakeryItem] += 1
        let itemPrice = 0;
        for (const item of bakeryData) {
          if (item.name == bakeryItem) {
            itemPrice = item.price;
            break;
          }
        }
        setCart({itemCount: cart.itemCount, itemPrice: cart.itemPrice})
        setTotalPrice(totalPrice + itemPrice)
      }
    
      const removeItem = (bakeryItem) => {
        if (cart.itemCount[bakeryItem] > 0) {
          cart.itemCount[bakeryItem] -= 1
          let itemPrice = 0;
          for (const item of bakeryData) {
            if (item.name == bakeryItem) {
              itemPrice = item.price
              break;
            }
          }
          setCart({itemCount: cart.itemCount, itemPrice: cart.itemPrice})
          setTotalPrice(totalPrice - itemPrice)
        }
    
        if (cart.itemCount[bakeryItem] == 0){
            delete cart.itemCount[bakeryItem]
        }
      }

      const resetCart = () => {
        setCart({itemCount: {}, itemPrice: {}})
        setTotalPrice(0)
      }

    // example for how to remove something from cart
    // const removeItem = (item) => {
    //   let updatedCart = [...cart];
    //   updatedCart.filter((obj) => {return obj !== item})
    // }
    const [type, setType] = useState("All")

    const [type2, setType2] = useState("All")


    // ADD FILTER HERE
    const selectFilter1 = (eventKey) => {
      console.log(eventKey);
      setType(eventKey);
    };

    const matchesFilter1 = item => {
      // all items should be shown when no filter is selected
      if(type === "All") return true;
      return item[type.toLocaleLowerCase()]; // Warm or Cold -> item.warm or item.cold 
    }

    const selectFilter2 = (eventKey) => {
      console.log(eventKey);
      setType2(eventKey);
    };
    
    const matchesFilter2 = item => {
      // all items should be shown when no filter is selected
      if(type2 === "All") return true;
      // return item.type === filter2; // item.type === "beverage, desert"

      return item.type.includes(type2); 
      // return item.name.includes('s');
    }

    // const [MyArray, setMyArray] = useState(bakeryData);
    const [sortStatus, setSortStatus] = useState(false);

    // attempt to do descending
    const [sortType, setSortType] = useState(null);

    const sortFunctionAscending = (a, b) => {
        return a.price - b.price;
    }

    const sortFunctionDescending = (a, b) => {
      return b.price - a.price;
  }

    const handleSortAscending = () => {
      setSortStatus(true);
      setSortType("Ascending")
    }

    const handleSortDescending = () => {
      setSortStatus(true);
      setSortType("Descending")
    }

    const resetSort = () => {
      setSortStatus(false);
    }

    const computedArrayFilteredAndSorted = () => {
      const filtered = bakeryData.filter(matchesFilter1).filter(matchesFilter2)
      // const filtered = bakeryData.filter(matchesFilter1);
      if (sortStatus) {
        if (sortType == "Ascending") {
          return filtered.sort(sortFunctionAscending);
        } else if (sortType == "Descending") {
          return filtered.sort(sortFunctionDescending);
        }
        
      }
      return filtered;
    }

  return (
    <div className="App">
      <div center>
      <h1>🍭 Serendipity Sweets Shop 🍭</h1> 
      <h4>One stop shop for anything sweet</h4>

      {/* <div buttons>
      <button onClick={() => handleSortAscending()}>Price Low to High</button> 
      <button onClick={() => handleSortDescending()}>Price High to Low</button> 
      <button onClick={() => resetSort()}>Reset Price Sort</button> 
      </div> */}

      <Navbar className="justify-content-center">
        Sort by Price: 
          <Nav defaultActiveKey="0">
            <NavDropdown title="Dropdown">
              <NavDropdown.Item>
                <Nav.Link eventKey="Select a sort order" onClick={() => resetSort()}>
                  No Sort
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link eventKey="Lowest to Highest" onClick={() => handleSortAscending()}>
                  Lowest to Highest
                </Nav.Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Nav.Link eventKey="Highest to Lowest" onClick={() => handleSortDescending()}>
                  Highest to Lowest
                </Nav.Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar>

      
      <Navbar className="justify-content-center">
        Temperature: 
      <Nav defaultActiveKey="All" onSelect={selectFilter1 }>
        <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="Warm">Warm</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey="Cold">Cold</Nav.Link></Nav.Item>
      </Nav>
      </Navbar>

      <Navbar className="justify-content-center">
        Type: 
        <Nav defaultActiveKey="All" onSelect={selectFilter2}>
          <Nav.Item><Nav.Link eventKey="All">All</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="Beverage">Beverage</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="Dessert">Dessert</Nav.Link></Nav.Item>
        </Nav>
      </Navbar>
      </div>


      <div className = "items">
        <div class = "item"> 
        {computedArrayFilteredAndSorted().map((item, index) => ( // TODO: map bakeryData to BakeryItem components
          <BakeryItem key={item.name} item={item} cart={cart} updateCart={updateCart}/>
          //<p>Bakery Item {index}</p> // replace with BakeryItem component
        ))}
        </div>
      </div>

      <div className="cart">
        <h2> 🛒 Cart</h2>
        {/* cart.map((obj) => {
          return <CartItem key={obj.name} name={obj.name} price={obj.price} count={obj.itemCount}/>
        }) */}
        { Object.keys(cart.itemCount).map(bakeryItem => 
        <CartItem key={bakeryItem} name={bakeryItem} count={cart.itemCount[bakeryItem]} price={cart.itemPrice[bakeryItem]} addItem={addItem} removeItem={removeItem}> </CartItem>
        ) }
        <p> Total Price: {Math.round(totalPrice*100)/100}</p>
        <button ClassName="reset_button" onClick={() => resetCart()}>Reset Cart</button>
      </div>

    </div>

  );
}

export default App;
