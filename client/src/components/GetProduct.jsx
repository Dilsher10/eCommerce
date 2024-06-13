import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function GetProduct(){

    const navigate = useNavigate()

    const params = useParams()

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [seller, setSeller] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        const id = params.id
        axios.get(`http://localhost:3001/get-product/${id}`)
        .then(res=>{
            setImage(res.data.data.url)
            setName(res.data.data.name)
            setCategory(res.data.data.category)
            setSeller(res.data.data.seller)
            setPrice(res.data.data.price)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {id: params.id, url: image, name, category, seller, price}
        axios.post('http://localhost:3001/edit-product', data)
        .then((res) => {
            if(res.data.code == 200){
                navigate('/get/products')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                Image: <input type="text" onChange={(e) => setImage(e.target.value)} value={image} /> <br />
                Name: <input type="text" onChange={(e) => setName(e.target.value)} value={name} /> <br />
                Category: <input type="text" onChange={(e) => setCategory(e.target.value)} value={category}/> <br />
                Seller: <input type="text" onChange={(e) => setSeller(e.target.value)} value={seller}/> <br />
                Price: <input type="number" onChange={(e) => setPrice(e.target.value)} value={price}/> <br />
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default GetProduct;