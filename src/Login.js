import React from 'react'
import {TextField} from '@shopify/polaris';
import {useState} from 'react';
import {Button} from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import {savedata} from './Reduceraction'
import {savetoken} from './Reduceraction'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate= useNavigate()
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA"
    const mystate = useSelector((state)=>state.function1)
    const dispatch = useDispatch()
      const [value,setValue]=useState({
        customer:"",
        username:"",
        password:""
      })
    const fetchfun=()=>{
      console.log("fetchfun")
      try{
        console.log(mystate.user.username , mystate.user.password)
        fetch(`https://fbapi.sellernext.com/user/login?username=${mystate.user.username}&password=${mystate.user.password}` , {headers:{authorization:token}})
        .then((res)=>res.json())
        .then((res)=>{
          console.log(res)
            if(res.success===true){
              console.log("if=>" +res)
                dispatch(savetoken(res.data.token))
                sessionStorage.setItem('token' , res.data.token)
                navigate("/dashboard")
            }
        })
      }
      catch(err){
        console.log(err)
      } 
    }
    
    const handlechange=(e , x)=>{       
     let t = {...value}
     if(x==="username"){
        t.username = e
     }
     if(x==="customer"){
        t.customer = e

     }
     if(x==="password"){
       t.password = e        
    }  
        setValue({...t})
        dispatch(savedata(t))
    }
 
  return (
    <div className="login_page_main_div_class">
        <TextField  value={value.customer} onChange={(e)=>handlechange(e , "customer")} autoComplete="off" label='Customer Name'/>
        <TextField  value={value.username} onChange={(e)=>handlechange(e , "username")} autoComplete="off" label='User Name'/>
        <TextField  value={value.password} onChange={(e)=>handlechange(e , "password")} autoComplete="off" label='Password'/>
        <Button primary onClick={fetchfun}>Login</Button>
    </div>
  )
}

export default Login