# Development

### Link to Deployed Website
https://sleepyotter123.github.io/develop/

### Goal and Value of the Application
The goal of this application is to allow users to sort through bakery products prior to adding the items to their cart. Users can browse through a different combination of filters warm or cold desserts or beverages. Users can sort the products by price to help streamline their decision process, before adding intended items for purchase into the cart. The value of this application is to provide an easy interface for users to filter and sort through bakery products. 

### Usability Principles Considered
Throughout the design of the app, I considered design principles that would best convey information from my website to the users. I implemented two filter options to allow users to sort through products in a way that makes most sense- by temperature (warm or cold) and type of product (dessert or beverage). Additionally, I implemented two sorting options that allow users to sort by either increasing or decreasing price. This is the most logical way to sort products associated with numbers. Finally, the cart on the righthand side allows users to easily interact with products they plan to purchase. Items can be added to cart directly from the item catalog, and can be removed from the cart directly from the cart. There is a reset button that allows users to directly reset the items in their cart. 

Users first read the title and description of the bakery, then are presented with filter and sort options. Users read the website from left to right, so they see the items first and then their options in the cart. 

### Organization of Components
My React app uses two components: BakeryItem and CartItem. BakeryItem represents each individual bakery product listed in the website catalog. The items are organized in a list, and each individual component contains information about the product name, image, temperature, type, and price. Finally, there is an option for users to add the item to the cart. CartItem represents the component for each individual item after it has been added to the cart. An item only is only displayed in the cart after the user clicks the "Add to Cart" button. Additionally, items only remain in the cart if there is at least one of the item. Each CartItem component contains the item's name, price, count describing number of products in the cart, and interactive buttons for incrementing and decrementing the count. 

### How Data is Passed Down Through Components
All the information for each bakery item is contained in a JSON file. The file contains a list, and each bakery item is represented as an object. This enables unique information for each item regarding its name, price, image, temperature, and type. This information is passed into a BakeryItem component, which displays each individual item in a grid on the webpage. The information from this BakeryItem component is passed through the filter and sort functions, which enables layering of various filters and sorting techniques. Finally, the data from the BakeryItem component is also passed into the CartItem component, is displayed as a vertial grid on the right hand side of the webpage. The CartItem component is able to access all product informatino from BakeryData. 

### How the User Triggers State Changes

#### Filtering:  
I have two states that deal with the two separate filters, named "type" and "type2". The "type" constant holds the filtered products based on temperature. The default state is "All", indicating that there is no temperature filter on the bakery items. The "type2" constant holds all the filtered products based on type (either dessert or beverage). Similarly, the default state is "All", indicating that there is no type filter on the bakery items. Both constants are updated by the computedArrayFilteredAndSorted function. 

#### Sorting:
I have two states that deal with sorting in the program. The "sortStatus" constant holds information on whether or not the bakeryData should be sorted by price. The default state is false, and changes to true when the user selects a sorting option. The "sortStatus" constant holds information on the type of sort that should be performed. When the user selects "Sort Price Low to High", the sort type is changed to "Ascending", which then passes through the "sortFunctionAscending" function. This function is called in "computedArrayFilteredandSorted" function, which sorts the item by price in ascending order. This same process occurs for when the sort type is set to "Descending", except the price would be sorted from high to low. 

#### Cart: 
I have one state that deals with adding items to the cart, named "cart". This constant holds the items in a list in the form of a tuple. The two pieces of information in this tuple are the count for how many of this item is in the cart, and the price of the item. When a user click "Add to Cart", that bakery item is added to this cart constant. There are mulitiple functions that modify the cart constant, including "updateCart", "addItem", "removeItem", and "resetCart".

#### Aggregator: 
I have one state that deals with the running total price of the cart, named "totalPrice". The initial state of this constant is 0, because the total price of the cart is zero when nothing has been added to it. When a user clicks the "Add to Cart" button, this constant is updated with the price of that item. Additionally, this constant is modified when a user decrements or increments the count of the number of an item in the cart. This constant is continuously updated and keeps track of the aggregated cost of the cart.  

