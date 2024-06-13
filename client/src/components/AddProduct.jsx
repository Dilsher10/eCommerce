import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate()

    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [seller, setSeller] = useState()
    const [price, setPrice] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {url: image, name, category, seller, price}
        axios.post('http://localhost:3001/add-product', data)
        .then((res) => {
            if(res.data){
                navigate('/get/products')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Image: <input type="text" onChange={(e) => setImage(e.target.value)} /> <br />
                Name: <input type="text" onChange={(e) => setName(e.target.value)} /> <br />
                Category: <input type="text" onChange={(e) => setCategory(e.target.value)} /> <br />
                Seller: <input type="text" onChange={(e) => setSeller(e.target.value)} /> <br />
                Price: <input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default AddProduct;