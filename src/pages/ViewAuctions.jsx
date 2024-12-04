import React, { useEffect, useState } from 'react'
import AuctionCard from '../components/AuctionCArd'
import Web3 from 'web3';
const contractAdd="0xA3d0730fF9fECC402757A86F7a7046FeAb228e75";
import ABI from "./ABI.json";
const web3=new Web3(window.ethereum )
const contract=new web3.eth.Contract(ABI,contractAdd)
console.log(contract);

const ViewAuctions = () => {
  console.log("View");
  const [auctions, setauctions] = useState([])
  const loadauctions=async()=>{
    try {
        
    
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const userAddress=accounts[0];
    console.log("My user Address is:::"+userAddress);
    
    const notes=await contract.methods.listAuctions().call({from:userAddress});
    console.log("my Notes are:::",notes);
    
    setauctions(notes);
    console.log("My auctions are::::::::::",auctions);
} catch (error) {
        console.log(error); 
}
}


  useEffect(() => {
    console.log("use effect Running");
    
  loadauctions();
  }, [])


  return (
    <div>
      <center className='text-[50px] mt-5 font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent'>
      Active Auctions are
      </center>
      <div className="grid-cards grid grid-cols-3 gap-x-2">
        {auctions.map((auctionData)=>{
          return  <AuctionCard props={auctionData}></AuctionCard>
        })}
 
      </div>
      </div>
  )
}

export default ViewAuctions