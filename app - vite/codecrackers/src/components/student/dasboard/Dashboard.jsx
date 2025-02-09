"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Brain, Rocket, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Header from "../header/Header"

const codingData = [
  { time: "Mon", problems: 5, xp: 200 },
  { time: "Tue", problems: 8, xp: 350 },
  { time: "Wed", problems: 12, xp: 500 },
  { time: "Thu", problems: 15, xp: 600 },
  { time: "Fri", problems: 20, xp: 700 },
]


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const getStartingDay = (month, year) => {
  return new Date(year, month - 1, 1).getDay();
};

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("doubts")
  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthIndex = months.indexOf(selectedMonth) + 1;
  const daysInMonth = getDaysInMonth(monthIndex, selectedYear);
  const startDay = getStartingDay(monthIndex, selectedYear);


  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white text-black p-6">
      <Header />

      {/* Header */}
      <div className="flex justify-between items-center mt-[7rem] mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Hello, Coder!</h1>
          <p className="text-gray-400">Ready to crack some code today?</p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-[20rem] bg-white rounded-full">
            <Search height={20} width={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search doubts" className="pl-10 bg-white border-none text-black" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-6">
          {/* Coding Progress Card */}
          <Card className="bg-white border-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Coding Progress</CardTitle>
              <Button variant="ghost">This Week</Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-8">
                {/* Problems Solved */}
                <div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={codingData}>
                        <Line type="monotone" dataKey="problems" stroke="#10B981" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">145</h3>
                    <p className="text-sm text-gray-400">Doubts asked</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div>Goal: 1000</div>
                      <div>Weekly Avg: 25</div>
                    </div>
                  </div>
                </div>

                {/* Experience Points */}
                <div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={codingData}>
                        <Line type="monotone" dataKey="xp" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">2,450</h3>
                    <p className="text-sm text-gray-400">XP Earned</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div>Level: 15</div>
                      <div>Next: 550 XP</div>
                    </div>
                  </div>
                </div>

                {/* Study Time */}
                <div>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={codingData}>
                        <Line type="monotone" dataKey="problems" stroke="#3B82F6" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-3xl font-bold">4h 30min</h3>
                    <p className="text-sm text-gray-400">Study Time</p>
                    <div className="mt-2 text-xs text-gray-400">
                      <div>Goal: 5h</div>
                      <div>Daily Avg: 3h</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card className="bg-white border-none">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <CardTitle>Recent doubts</CardTitle>
              </div>
              <div className="flex gap-2 mt-4">
                {["Doubts", "Queries", "AI"].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter.toLowerCase() ? "default" : "secondary"}
                    onClick={() => setSelectedFilter(filter.toLowerCase())}
                    className={selectedFilter === filter.toLowerCase() ? "bg-purple-600 hover:bg-purple-700" : ""}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <SessionCard
                  participants="Array"
                  time="7:00 PM"
                  shadow="shadow-lg"
                  icon={Brain}
                  title="Getting issue while solving array"
                />
                <SessionCard
                  participants="DP"
                  time="8:30 PM"
                  shadow="shadow-lg"
                  icon={Rocket}
                  title="Getting issue while solving array"
                />
                <SessionCard
                  participants="Graph"
                  time="10:00 PM"
                  shadow="shadow-lg"
                  icon={Users}
                  title="Getting issue while solving array"
                />
                <Button
                  variant="outline"
                  className="h-[145px] border-dashed border-2 border-gray-600 hover:border-gray-400"
                >
                  Schedule {selectedFilter}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Learning Streak */}
          <Card className="bg-white border-none">
            <CardHeader className="relative">
              <div className="flex justify-between items-center">
                <CardTitle>Learning Streak</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm">{selectedMonth}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {months.map((month) => (
                      <DropdownMenuItem key={month} onClick={() => setSelectedMonth(month)}>
                        {month}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                  <div key={day} className="text-sm font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: startDay }, (_, i) => (
                  <div key={"empty-" + i} className="w-6 h-6"></div>
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const isGreen = i + 1 === 15;
                  return (
                    <motion.div
                      key={i + 1}
                      className={`aspect-square rounded-full flex flex-col items-center justify-center relative ${
                        isGreen ? "bg-green-400 text-black" : ""
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {i + 1}
                      <div
                        className={`${isGreen ? "" : "w-2 h-2 rounded-full absolute bottom-0 mt-1 bg-red-500"}`}
                      ></div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Learning Path Progress */}
          <Card className="bg-white border-none">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>DSA Mastery Path</CardTitle>
                <span className="text-sm text-gray-400">75% completed</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative pt-4">
                <div className="w-full h-2 bg-[#3A3A3C] rounded-full">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: "75%" }} />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Beginner</span>
                  <span>Advanced</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function SessionCard({
  title,
  time,
  shadow,
  icon: Icon,
  participants,
}) {
  return (
    <div className={`${shadow} border border-purple-600 rounded-lg p-4 space-y-4`}>
      <div className="flex justify-between items-start">
        <div className="flex -space-x-2">
          <span>{participants}</span>
        </div>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-lg">{time}</p>
      </div>
    </div>
  )
}

