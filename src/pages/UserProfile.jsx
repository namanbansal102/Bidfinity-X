'use client'

import { useState } from 'react'



export default function UserProfile() {
  const [selectedRecord, setSelectedRecord] = useState(null)

  // Mock data for the patient
  const patient = {
    name: "Jane Doe",
    age: 32,
    gender: "Female",
    bloodType: "A+",
    address: "123 Main St, Anytown, USA",
    phone: "+1 (555) 123-4567",
    email: "jane.doe@example.com"
  }

  // Mock data for medical records
  const medicalRecords = [
    { id: "1", title: "Annual Checkup", date: "2023-05-15", imageUrl: "/placeholder.svg?height=150&width=150" },
    { id: "2", title: "X-Ray Results", date: "2023-03-22", imageUrl: "/placeholder.svg?height=150&width=150" },
    { id: "3", title: "Blood Test", date: "2023-02-10", imageUrl: "/placeholder.svg?height=150&width=150" },
    { id: "4", title: "Vaccination", date: "2023-01-05", imageUrl: "/placeholder.svg?height=150&width=150" },
    { id: "5", title: "Dental Exam", date: "2022-11-30", imageUrl: "/placeholder.svg?height=150&width=150" },
    { id: "6", title: "Eye Test", date: "2022-10-18", imageUrl: "/placeholder.svg?height=150&width=150" },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Patient Profile Section */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/placeholder.svg?height=128&width=128"
                  alt={patient.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
              <p className="text-gray-600">{patient.age} years old, {patient.gender}</p>
            </div>
            <div className="space-y-3">
              <ProfileItem label="Blood Type" value={patient.bloodType} />
              <ProfileItem label="Address" value={patient.address} />
              <ProfileItem label="Phone" value={patient.phone} />
              <ProfileItem label="Email" value={patient.email} />
            </div>
          </div>
        </div>

        {/* Medical Records Section */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Medical Records</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <div className="relative h-40">
                  <img
                    src={record.imageUrl}
                    alt={record.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{record.title}</h4>
                  <p className="text-sm text-gray-600">{record.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for displaying selected record */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={() => setSelectedRecord(null)}>
          <div className="bg-white rounded-xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedRecord.title}</h3>
            <div className="relative h-64 mb-4">
              <img
                src={selectedRecord.imageUrl}
                alt={selectedRecord.title}
                
                className="object-contain rounded-lg"
              />
            </div>
            <p className="text-gray-600 mb-4">Date: {selectedRecord.date}</p>
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setSelectedRecord(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  )
}