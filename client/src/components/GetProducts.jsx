import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function GetProducts() {

    const navigate = useNavigate()

    const [data, setData] = useState()
    const [deleteData, setDeleteData] = useState([])
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:3001/get-products')
            .then((res) => {
                setData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [refresh])

    const handleDelete = () => {
        const data = deleteData;
        axios.post('http://localhost:3001/delete-products', data)
            .then((res) => {
                if (res.data.code == 200) {
                    setRefresh(!refresh)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }


    const handleAddToCart = (productId) => {
        const _productId = productId
        const userId = localStorage.getItem('userId')

        const data = {productId: _productId, userId}
        axios.post('http://localhost:3001/add-to-cart', data).
        then((res) => {
            if (res.data.code == 200) {
                setRefresh(!refresh)
            }
        })
        .catch((err) => {
            console.log(err)
        })
        
    }

    return (
        <div>
            <h1>ALL PRODUCTS</h1>
            <Link to="/get/cart">GO TO CART</Link>
            {
                deleteData.length > 0 && <button onClick={handleDelete}>DELETE SELECTED</button>
            }

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    data &&
                    data.length > 0 &&
                    data.map((item, index) => {
                        return (
                            <div style={{
                                margin: '50px 30px',
                                background: '#eee',
                                width: '25%',
                                padding: '20px'
                            }}>
                                <img src={item.url} style={{ width: '100%', height: '300px' }} alt="" />
                                <p>{item.name} | {item.category}</p>
                                <p>By {item.seller}</p>
                                <p>PRICE: {item.price} Only/=</p>
                                <button onClick={(e) => {
                                    navigate(`/get/product/${item._id}`)
                                }}>EDIT</button>
                                <input type="checkbox" onChange={(e) => {
                                    if (e.target.checked === true) {
                                        setDeleteData([...deleteData, item._id])
                                    } else {
                                        setDeleteData(deleteData.filter(s => s !== item._id))
                                    }
                                }} />
                                <button onClick={() => {
                                    handleAddToCart(item._id)
                                }}>ADD TO CART</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GetProducts;