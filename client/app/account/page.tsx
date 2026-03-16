'use client'

import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

type Profile = {
  _id: string,
  fullName: string,
  phoneNumber: string,
  email: string,
  address: string[],
}

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#06141b] font-poppins mb-2">
            My Account
          </h1>
          <p className="text-[#4a5c6a]">Manage your account information and orders</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="border border-[#e5e7eb]">
              <CardContent className="p-4 space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg bg-[#f3f4f6] text-[#06141b] font-medium hover:bg-[#e5e7eb] transition flex items-center justify-between">
                  Profile
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-[#06141b] hover:bg-[#f3f4f6] transition flex items-center justify-between">
                  Orders
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-[#06141b] hover:bg-[#f3f4f6] transition flex items-center justify-between">
                  <Settings className="w-4 h-4 mr-2 inline" />
                  Settings
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg text-destructive hover:bg-red-50 transition flex items-center justify-between mt-4 border-t border-[#e5e7eb] pt-4">
                  <LogOut className="w-4 h-4 mr-2 inline" />
                  Log Out
                  <ChevronRight className="w-4 h-4" />
                </button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="border border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb]">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-[#06141b] font-poppins">
                    Profile Information
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Full Name</p>
                  <p className="text-[#06141b] font-medium">Sarah Johnson</p>
                </div>
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Email Address</p>
                  <p className="text-[#06141b] font-medium">sarah.johnson@example.com</p>
                </div>
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Phone Number</p>
                  <p className="text-[#06141b] font-medium">+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="text-[#9ba8ab] text-sm mb-1">Date Joined</p>
                  <p className="text-[#06141b] font-medium">January 15, 2024</p>
                </div>
              </CardContent>
            </Card>

            {/* My Orders */}
            <Card className="border border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb]">
                <CardTitle className="text-xl text-[#06141b] font-poppins">
                  My Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Order Item */}
                  <div className="border border-[#e5e7eb] rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-[#06141b]">Order #12345</p>
                        <p className="text-sm text-[#9ba8ab]">March 10, 2024</p>
                        <p className="text-sm text-[#4a5c6a] mt-1">3 items • Total: $89.97</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium w-fit">
                          Delivered
                        </span>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Order Item */}
                  <div className="border border-[#e5e7eb] rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-[#06141b]">Order #12344</p>
                        <p className="text-sm text-[#9ba8ab]">March 5, 2024</p>
                        <p className="text-sm text-[#4a5c6a] mt-1">2 items • Total: $54.98</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium w-fit">
                          Shipped
                        </span>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Order Item */}
                  <div className="border border-[#e5e7eb] rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-[#06141b]">Order #12343</p>
                        <p className="text-sm text-[#9ba8ab]">February 28, 2024</p>
                        <p className="text-sm text-[#4a5c6a] mt-1">5 items • Total: $124.50</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium w-fit">
                          Delivered
                        </span>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address Book */}
            <Card className="border border-[#e5e7eb]">
              <CardHeader className="border-b border-[#e5e7eb]">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-[#06141b] font-poppins">
                    Saved Addresses
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    Add New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="border border-[#e5e7eb] rounded-lg p-4">
                  <p className="font-medium text-[#06141b] mb-2">Home</p>
                  <p className="text-sm text-[#4a5c6a]">
                    123 Main Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
