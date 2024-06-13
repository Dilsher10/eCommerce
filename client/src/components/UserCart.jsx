import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserCart() {

    const navigate = useNavigate();

    const [data, setData] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }

        const data = {userId: localStorage.getItem('userId')};

        axios.post('http://localhost:3001/get-user-cart', data)
        .then((res)=>{
            console.log(res.data);
            setData(res.data.data.cart)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    return (
        <div>
            home
            <button onClick={() => {
                localStorage.clear();
                navigate('/login');
            }}>LOGOUT</button>

            <h1>PRODUCT LIST</h1>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {data.map((item, index) => {
                    return <div style={{
                        margin: '50px 30px',
                        background: '#eee',
                        width: '25%',
                        padding: '20px'
                    }}>
                        <img src={item.url} style={{ width: '100%', height: '300px' }} alt="" />
                        <p>{item.name} | {item.category}</p>
                        <p>By {item.seller}</p>
                        <p>PRICE: {item.price} Only/=</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default UserCart;