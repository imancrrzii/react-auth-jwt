import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import hero from "../../assets/images/dashboard.png";
import { ArrowRightCircle, Calendar, CalendarDays, DockIcon, HandCoins, Wallet, Wallet2, Wallet2Icon } from "lucide-react";

const Homepage = ({ user }) => {
  return (
    <div className="max-w-full">
      <div className="text-3xl font-bold text-sky-900 mb-6">Dashboard</div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Kartu utama, ambil lebih banyak lebar */}
        <Card className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center z-10 gap-4 lg:gap-0">
            <div className="w-full md:w-2/3 p-4">
              <CardHeader>
                <CardTitle className="font-bold text-3xl text-sky-900">
                  Hi, {user.name}!
                </CardTitle>
                <CardDescription className="mt-4">
                  What are we doing today?
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-8 py-0">
                <div className="grid grid-cols-2 gap-4">
                  {/* Item 1 */}
                  <div className="flex items-center gap-2">
                    <ArrowRightCircle className="text-red-600 w-5 h-5" />
                    <span className="text-sm text-gray-700 font-medium">
                      Pending Tasks
                    </span>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-2">
                    <ArrowRightCircle className="text-blue-600 w-5 h-5" />
                    <span className="text-sm text-gray-700 font-medium">
                      Completed
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-2">
                    <ArrowRightCircle className="text-green-600 w-5 h-5" />
                    <span className="text-sm text-gray-700 font-medium">
                      In Progress
                    </span>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-center gap-2">
                    <ArrowRightCircle className="text-yellow-600 w-5 h-5" />
                    <span className="text-sm text-gray-700 font-medium">
                      Upcoming
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
            <div className="flex justify-center items-center me-2 lg:me-8">
              <img src={hero} alt="" className="h-full w-28" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <Card className="w-full hover:shadow-sm transition-shadow duration-200 cursor-pointer">
          <CardHeader>
            <Wallet2Icon className="text-red-600 w-8 h-8 mb-2" />
            <CardTitle className="text-sm font-normal text-gray-400">
              Potential <br /> Monthly Profit
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ArrowRightCircle className="text-red-600 w-5 h-5" />
            <span className="text-md text-gray-700 font-medium">Rp. 1.500.000</span>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="w-full hover:shadow-sm transition-shadow duration-200 cursor-pointer">
          <CardHeader>
            <DockIcon className="text-blue-700 w-8 h-8 mb-2" />
            <CardTitle className="text-sm font-normal text-gray-400">
              Potential <br /> Monthly Profit
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ArrowRightCircle className="text-blue-700 w-5 h-5" />
            <span className="text-md text-gray-700 font-medium">Rp. 1.500.000</span>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="w-full hover:shadow-sm transition-shadow duration-200 cursor-pointer">
          <CardHeader>
            <CalendarDays className="text-yellow-600 w-8 h-8 mb-2" />
            <CardTitle className="text-sm font-normal text-gray-400">
              Potential <br /> Monthly Profit
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ArrowRightCircle className="text-yellow-600 w-5 h-5" />
            <span className="text-md text-gray-700 font-medium">Rp. 1.500.000</span>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="w-full hover:shadow-sm transition-shadow duration-200 cursor-pointer">
          <CardHeader>
            <HandCoins className="text-green-600 w-8 h-8 mb-2" />
            <CardTitle className="text-sm font-normal text-gray-400">
              Potential <br /> Monthly Profit
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <ArrowRightCircle className="text-green-600 w-5 h-5" />
            <span className="text-md text-gray-700 font-medium">Rp. 1.500.000</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
