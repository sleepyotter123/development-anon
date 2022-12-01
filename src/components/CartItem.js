// should be similar to BakeryItem.js, but with the info in the cart
// create a component that displays a single cart item

export default function displayCartItem(prop) {
    return (
        <div className= "add_to_cart">
            <div className="cart_text">
                <h5>{prop.name}</h5>
                <h5>${prop.price}</h5>  
            </div>
            <div className="cart_text">
                <div className="cart_items">
                    <button className="cart_button item_count" onClick={() => prop.removeItem(prop.name)}>-</button>
                    <p className="item_count">{prop.count}</p>
                    <button className="cart_button item_count" onClick={() => prop.addItem(prop.name)}>+</button>
                </div>
            </div>
        </div>
        
    );
}
