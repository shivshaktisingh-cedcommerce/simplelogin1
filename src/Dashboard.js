import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from "./Navbar"
import { Card, DataTable } from '@shopify/polaris';

const Dashboard = () => {
    const[rows1 ,setRows1]=useState([]) 
    const mystate = useSelector((state)=>state.function1)
    var rows =[];
    useEffect(()=>{
        fetch(` https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${mystate.count}&count=${mystate.selected}`, {
            headers: {
                authorization: mystate.token 
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
        res.data.rows.map((d) => {
            rows.push([d.user_id, d.catalog, d.username, d.email, d.shopify_plan, d.updated_at, d.created_at, d.shop_url])
        })
       setRows1(rows)})
    },[])
    console.log(sessionStorage.getItem('token'))
  return (
    <div>
        <Navbar/>
        <Card>
            <DataTable
              columnContentTypes={['text','numeric','text','text','text','text','text','text']}
              headings={['UserId','Catalog','Shop Domain','Shop Email','Shop Plan name','Updated at','Created at','Shop myShopify Domain ' ]}
              rows={rows1}
            />
        </Card>
    </div>
  )
}

export default Dashboard