import React, { useEffect, useState } from 'react'
import AuctionCard from '../components/AuctionCArd'
import Web3 from 'web3';
const contractAdd="0xdfa986440dfa2357bA1a63eb8F088f2C1b72a766";
import ABI from "./ABI.json";
const web3=new Web3(window.ethereum )
const contract=new web3.eth.Contract(ABI,contractAdd)
console.log(contract);

const ViewHospital = () => {
  console.log("View");
  
  
  const [hospitals, sethospitals] = useState([])
  const loadHospitals=async()=>{
    try {
        
    
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress=accounts[0];
    console.log("My user Address is:::"+userAddress);
    
    const notes=await contract.methods.viewhospitals().call({from:userAddress});
    console.log("my Notes are:::",notes);
    
    sethospitals(notes);
    console.log("My Hospitals are::::::::::",hospitals);
} catch (error) {
        console.log(error); 
}
}


  useEffect(() => {
    console.log("use effect Running");
    
  loadHospitals();
  }, [])


  return (
    <div>
      <center className='text-4xl font-bold mt-2'>
      Registered hospitals are
      </center>
      <div className="grid-cards grid grid-cols-3 gap-x-2">
        {hospitals.map(()=>{
          return  <AuctionCard></AuctionCard>
        })}
 
      </div>
      </div>
  )
}

export default ViewHospital