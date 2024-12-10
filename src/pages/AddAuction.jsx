'use client'
import { useState } from 'react'
import { ethers } from 'ethers'
import { PinataSDK } from "pinata";
import Web3 from 'web3';
const contractAdd="0xdfa986440dfa2357bA1a63eb8F088f2C1b72a766";
import ABI from "./ABI.json";
const web3=new Web3(window.ethereum )
const contract=new web3.eth.Contract(ABI,contractAdd)
console.log(contract);
const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhOGIyM2U0MS1kZTg3LTRhYWYtOTVmNC1mNDBmZWQ2NjJlNzQiLCJlbWFpbCI6Im5hbWFuYmFuc2FsMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1OGQ1ODM1NWMwYTE2ZTc4MmEwOSIsInNjb3BlZEtleVNlY3JldCI6ImIxMjVkNGNkZGYyZmUzMTc4MWY0OTcyOGRiOTBlMzFmMjNkNTNmM2YzYTI3M2NiZTViZjY0Mjc1YjljYjFiYjIiLCJleHAiOjE3NjQ3NDEzNTR9.6dTuYSdS2GBexhtowWUM8r5h7UM4VoqoHdWEBPAe27o",
  pinataGateway: "example-gateway.mypinata.cloud",
});
export default function AddAuction() {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageArrayBuffer, setImageBuffer] = useState(null)
  const [formData, setFormData] = useState({
    auctionName: 'fdf',
    desc: 'fdf',
    minPayableBid: 0,
    incrementalBid: 0,
    previousBids: 0,
    endDate: 'fdfd',
    endTime: 'dvv'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    setImageBuffer(file);
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormData(prevData => ({ ...prevData, [id]: value }))
  }
  const handleIPFSUpload=async()=>{
    try {
      const uploadImage = await pinata.upload.file(imageArrayBuffer);
      return uploadImage;
    } 
    catch (error) {
      console.log("Getting Error::::",error);
      return false;
    }

  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask or another Web3 provider to interact with the blockchain.')
      setIsLoading(false)
      return
    }

    try {
      // Connect to the Ethereum network
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress=accounts[0];
      console.log("My user Address is:::"+userAddress);
      // let p=await handleIPFSUpload();
      let p="";
      console.log("My Upload URL is:::::",p);
      console.log("I am getting formdata as:::",formData);
      const res=await contract.methods.addAuction(
        '',
        "",
        "",
        "",
        parseInt(formData.previousBids),
        web3.utils.toWei(formData.minPayableBid.toString(), 'ether'),
        web3.utils.toWei(formData.incrementalBid.toString(), 'ether')
      ).send({
        from:userAddress,
        gasPrice:await web3.eth.getGasPrice()
      })
      console.log("My Final Result Called is:::::"+res);
      
      
      // Call the addAuction function

      setSuccess(true)
    } catch (err) {
      console.error(err)
      if (err.code === 4001) {
        setError('Transaction rejected by user.')
      } else if (err.message.includes('user rejected transaction')) {
        setError('You rejected the transaction. Please try again and confirm the transaction in your wallet.')
      } else {
        setError(`Failed to add auction: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div style={{
          background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
        }} className="p-6">
          <h1 className="text-3xl font-bold text-center text-white">
            Add New Auction
          </h1>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="auctionImage" className="block text-lg font-semibold text-gray-700">Auction Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all duration-300 hover:bg-gray-50 hover:border-green-500 hover:scale-105 hover:shadow-lg">
                {imageUrl ? (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Auction preview"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-lg font-semibold">Upload an image</div>
                    <div className="text-sm">PNG, JPG up to 10MB</div>
                  </div>
                )}
                <input
                  id="auctionImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <button
                  type="button"
                  style={{
                    background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
                  }}
                  className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105"
                  onClick={() => document.getElementById('auctionImage').click()}
                >
                  Select Image
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="auctionName" className="block text-lg font-semibold text-gray-700">Auction Name</label>
              <input
                id="auctionName"
                type="text"
                placeholder="Enter auction name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                value={formData.auctionName}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-lg font-semibold text-gray-700">Description</label>
              <textarea
                id="desc"
                placeholder="Enter Short Description of Auction"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400 min-h-[100px]"
                value={formData.desc}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="registrationCode" className="block text-lg font-semibold text-gray-700">Min Payable Bid (ETH)</label>
                <input
                  id="minPayableBid"
                  type="text"
                  placeholder="Minimum Amount To Start Auction"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.minPayableBid}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="patientRecords" className="block text-lg font-semibold text-gray-700">Incremental Bid (ETH)</label>
                <input
                  id="incrementalBid"
                  type="text"
                  placeholder="Minimum Increment"
                  min="0"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.incrementalBid}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="managerName" className="block text-lg font-semibold text-gray-700">Previous Bids(eg,1,2,3)</label>
              <input
                id="previousBids"
                type="text"
                placeholder="Enter Previous Bids If Have"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                value={formData.previousBids}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="block text-lg font-semibold text-gray-700">End Date Of Auction</label>
                <input
                  id="endDate"
                  type="date"
                  placeholder="Enter contact email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactPhone" className="block text-lg font-semibold text-gray-700">End Time Of Auction</label>
                <input
                  id="endTime"
                  type="time"
                  placeholder="Enter contact number"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
      
              style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Starting...' : 'Start Auction'}
            </button>

            {error && (
              <div className="mt-4 text-red-600 text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 text-green-600 text-center">
                Auction successfully registered on the blockchain!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}