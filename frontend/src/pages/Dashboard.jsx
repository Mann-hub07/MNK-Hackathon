import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Heart, 
  Package, 
  RefreshCw, 
  Coins,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
  Plus,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockUser, mockItems, mockSwaps } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user] = useState(mockUser);
  const [userItems] = useState(mockItems.filter(item => item.uploader.id === user.id));
  const [userSwaps] = useState(mockSwaps);

  const stats = [
    {
      icon: Package,
      label: "Items Listed",
      value: userItems.length,
      change: "+2 this month",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: RefreshCw,
      label: "Successful Swaps",
      value: user.totalSwaps,
      change: "+5 this month", 
      color: "from-green-500 to-green-600"
    },
    {
      icon: Coins,
      label: "Wear Coins",
      value: user.wearCoins,
      change: "+45 this week",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: TrendingUp,
      label: "Sustainability Score",
      value: `${user.sustainabilityScore} kg`,
      change: "Waste saved",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0">
        <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-bold text-xl text-gray-900">ReWear</span>
          </div>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {[
            { icon: User, label: "Dashboard", active: true },
            { icon: Package, label: "My Items" },
            { icon: RefreshCw, label: "Swaps" },
            { icon: Coins, label: "Wear Coins" },
            { icon: Heart, label: "Wishlist" },
            { icon: Settings, label: "Settings" }
          ].map((item, index) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                item.active 
                  ? 'bg-green-50 text-green-700 border-r-2 border-green-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="p-6">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-8"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {user.name}!</p>
              </div>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link to="/add-item">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Link>
              </Button>
            </motion.div>

            {/* User Profile Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 border-4 border-white/20">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-white/20 text-white text-xl">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-green-100 mb-2">{user.email}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>New York, NY</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Member since Jan 2024</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{user.wearCoins}</div>
                      <div className="text-green-100">Wear Coins</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs Content */}
          <motion.div variants={containerVariants}>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
                <TabsTrigger value="items" className="rounded-md">My Items</TabsTrigger>
                <TabsTrigger value="swaps" className="rounded-md">Swaps</TabsTrigger>
                <TabsTrigger value="activity" className="rounded-md">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                          <span>Recent Activity</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { action: "Listed new item", item: "Vintage Denim Jacket", time: "2 hours ago", type: "upload" },
                            { action: "Received swap request", item: "Nike Sneakers", time: "1 day ago", type: "swap" },
                            { action: "Earned 25 Wear Coins", item: "Silk Dress swap", time: "3 days ago", type: "coins" },
                            { action: "Item favorited", item: "Cashmere Sweater", time: "1 week ago", type: "heart" }
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === 'upload' ? 'bg-blue-100 text-blue-600' :
                                activity.type === 'swap' ? 'bg-green-100 text-green-600' :
                                activity.type === 'coins' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-red-100 text-red-600'
                              }`}>
                                {activity.type === 'upload' && <Package className="w-4 h-4" />}
                                {activity.type === 'swap' && <RefreshCw className="w-4 h-4" />}
                                {activity.type === 'coins' && <Coins className="w-4 h-4" />}
                                {activity.type === 'heart' && <Heart className="w-4 h-4" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                <p className="text-xs text-gray-500">{activity.item}</p>
                              </div>
                              <span className="text-xs text-gray-400">{activity.time}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Goals & Progress */}
                  <motion.div variants={itemVariants}>
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span>Monthly Goals</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">Items Listed</span>
                              <span className="text-sm text-gray-500">3/5</span>
                            </div>
                            <Progress value={60} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">Successful Swaps</span>
                              <span className="text-sm text-gray-500">2/3</span>
                            </div>
                            <Progress value={67} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">Wear Coins Earned</span>
                              <span className="text-sm text-gray-500">245/300</span>
                            </div>
                            <Progress value={82} className="h-2" />
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              🎉 You're 82% towards your monthly goal! Keep it up!
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>My Listed Items ({userItems.length})</span>
                        <Button size="sm" asChild>
                          <Link to="/add-item">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New
                          </Link>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userItems.map((item) => (
                          <ItemCard key={item.id} item={item} variant="dashboard" />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="swaps" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Swap History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userSwaps.map((swap) => (
                          <div key={swap.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <img
                              src={swap.requestedItem.images[0]}
                              alt={swap.requestedItem.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{swap.requestedItem.title}</h4>
                              <p className="text-sm text-gray-600">
                                Swapped with {swap.owner.name}
                              </p>
                              <Badge 
                                className={`mt-1 ${
                                  swap.status === 'completed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {swap.status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                {new Date(swap.requestedAt).toLocaleDateString()}
                              </div>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle>Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { date: "Today", activities: [
                            { time: "2:30 PM", action: "Listed new item: Vintage Denim Jacket", type: "upload" },
                            { time: "11:45 AM", action: "Received 5 new likes on your items", type: "heart" }
                          ]},
                          { date: "Yesterday", activities: [
                            { time: "4:20 PM", action: "Swap request received for Nike Sneakers", type: "swap" },
                            { time: "9:15 AM", action: "Earned 25 Wear Coins from successful swap", type: "coins" }
                          ]},
                          { date: "2 days ago", activities: [
                            { time: "6:30 PM", action: "Item sold: Silk Dress", type: "sold" },
                            { time: "2:45 PM", action: "Updated profile information", type: "profile" }
                          ]}
                        ].map((day, dayIndex) => (
                          <div key={dayIndex}>
                            <h4 className="font-semibold text-gray-900 mb-3">{day.date}</h4>
                            <div className="space-y-3 ml-4">
                              {day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-start space-x-3">
                                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-900">{activity.action}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;