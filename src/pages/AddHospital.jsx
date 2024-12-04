'use client'

import { useState } from 'react'
import { ethers } from 'ethers'
import Web3 from 'web3';
const contractAdd="0xdfa986440dfa2357bA1a63eb8F088f2C1b72a766";
import ABI from "./ABI.json";
const web3=new Web3(window.ethereum )
const contract=new web3.eth.Contract(ABI,contractAdd)
console.log(contract);

export default function AddHospital() {
  const [imageUrl, setImageUrl] = useState(null)
  const [formData, setFormData] = useState({
    hospitalName: '',
    address: '',
    registrationCode: '',
    patientRecords: '',
    managerName: '',
    contactEmail: '',
    contactPhone: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormData(prevData => ({ ...prevData, [id]: value }))
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
      const res=await contract.methods.addHospital(
        formData.hospitalName,
        imageUrl || '',
        formData.managerName,
        formData.contactPhone,
        formData.contactEmail
      ).send({
        from:userAddress,
        gasPrice:await web3.eth.getGasPrice()

      })
      console.log("My Final Result Called is:::::"+res);
      
      
      // Call the addHospital function

      setSuccess(true)
    } catch (err) {
      console.error(err)
      if (err.code === 4001) {
        setError('Transaction rejected by user.')
      } else if (err.message.includes('user rejected transaction')) {
        setError('You rejected the transaction. Please try again and confirm the transaction in your wallet.')
      } else {
        setError(`Failed to add hospital: ${err.message}`)
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
            Add New Hospital
          </h1>
        </div>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="hospitalImage" className="block text-lg font-semibold text-gray-700">Hospital Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-all duration-300 hover:bg-gray-50 hover:border-green-500 hover:scale-105 hover:shadow-lg">
                {imageUrl ? (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Hospital preview"
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
                  id="hospitalImage"
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
                  onClick={() => document.getElementById('hospitalImage').click()}
                >
                  Select Image
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="hospitalName" className="block text-lg font-semibold text-gray-700">Hospital Name</label>
              <input
                id="hospitalName"
                type="text"
                placeholder="Enter hospital name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                value={formData.hospitalName}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="block text-lg font-semibold text-gray-700">Address</label>
              <textarea
                id="address"
                placeholder="Enter complete hospital address"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400 min-h-[100px]"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="registrationCode" className="block text-lg font-semibold text-gray-700">Registration Code</label>
                <input
                  id="registrationCode"
                  type="text"
                  placeholder="Enter registration code"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.registrationCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="patientRecords" className="block text-lg font-semibold text-gray-700">Number of Patient Records</label>
                <input
                  id="patientRecords"
                  type="number"
                  placeholder="Enter number of records"
                  min="0"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.patientRecords}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="managerName" className="block text-lg font-semibold text-gray-700">Hospital Manager Name</label>
              <input
                id="managerName"
                type="text"
                placeholder="Enter manager's full name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                value={formData.managerName}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="block text-lg font-semibold text-gray-700">Contact Email</label>
                <input
                  id="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactPhone" className="block text-lg font-semibold text-gray-700">Contact Phone</label>
                <input
                  id="contactPhone"
                  type="tel"
                  placeholder="Enter contact number"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 transition-all duration-300 hover:border-green-400"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, rgb(45, 206, 137) 0%, rgb(0, 147, 233) 100%)",
              }}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register Hospital'}
            </button>

            {error && (
              <div className="mt-4 text-red-600 text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 text-green-600 text-center">
                Hospital successfully registered on the blockchain!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}