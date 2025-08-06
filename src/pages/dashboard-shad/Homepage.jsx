import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import hero from "../../assets/images/dashboard.png";
import { ArrowRightCircle } from "lucide-react";

const Homepage = ({ user }) => {
  return (
    <div className="max-w-full">
      <div className="text-3xl font-bold text-sky-900 mb-6">Dashboard</div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Kartu utama, ambil lebih banyak lebar */}
        <Card className="w-full md:w-2/3">
          <div className="flex flex-col sm:flex-row justify-between z-10">
            <div className="w-full md:w-2/3">
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
              <img
                src={hero}
                alt=""
                className="h-48"
              />
          </div>

          {/* Gambar keluar dari batas card */}
        </Card>

        {/* Kartu samping, ambil lebih sedikit lebar */}
        <Card className="w-full md:w-1/3">
          <CardHeader>
            <CardTitle className="font-bold text-2xl text-sky-900">
              Hi, {user.name}!
            </CardTitle>
            <CardDescription>What are we doing today?</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Homepage;
