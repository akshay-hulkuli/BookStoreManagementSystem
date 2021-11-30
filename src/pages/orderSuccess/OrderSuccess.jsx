import React from 'react'
import './orderSuccess.scss'
import image from '../../assets/order.png';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { height } from '@mui/system';
import { Button,Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
    const navigate  = useNavigate();

    const gotohome = () => {
        navigate('/dashboard');
    }
    return (
        <div class="success-page">
            <Header />
            <div className="order-main">
                <img src={image} className="image"/>
                <div className="info"> 
                    <div>hurray!!! your order is confirmed</div> 
                    <div>the order id is #123456 save the order id for</div> 
                    <div>further communication..</div>
                </div>
                <div className="table">
                    <div className="table-content">
                        <div className="content-header">
                            Email us
                        </div>
                        <div className="data">
                            admin@bookstore.com
                        </div>
                    </div>
                    <div className="table-content">
                        <div className="content-header">
                            Contact us
                        </div>
                        <div className="data">
                            +91 8163475881
                        </div>
                    </div>
                    <div className="table-content">
                        <div className="content-header">
                            Address
                        </div>
                        <div className="data">
                            42,14th main, 15th cross, Sector 4, opp to BDA complex, near kumarakom restaurant, HSR Layout, Bangalore 560034.
                        </div>
                    </div>
                </div>
                <Box sx={{height:'20px'}} />   
                <Button sx={{padding:'5px 20px', margin:'auto'}} variant="contained" onClick={gotohome}>continue shopping</Button>
            </div>
                <Footer />
        </div>
    )
}
