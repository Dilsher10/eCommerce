

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={<Home />} />
    <Route path='/add/product' element={<AddProduct />} />
    <Route path='/get/products' element={<GetProducts />} />
    <Route path='/get/product/:id' element={<GetProduct />} />
    <Route path='/get/cart' element={<UserCart />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
