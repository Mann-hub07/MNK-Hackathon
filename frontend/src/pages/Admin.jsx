import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Package, 
  Users, 
  Flag, 
  CheckCircle, 
  XCircle, 
  Eye,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { mockItems, mockUser, sustainabilityStats } from '../data/mockData';

const Admin = () => {
  const [pendingItems, setPendingItems] = useState(
    mockItems.map(item => ({ ...item, status: 'pending', reportCount: Math.floor(Math.random() * 5) }))
  );
  const [approvedItems, setApprovedItems] = useState([]);
  const [flaggedItems, setFlaggedItems] = useState([]);
  const [users] = useState([
    { ...mockUser, status: 'active', joinDate: '2024-01-15', reportCount: 0 },
    { id: 'user_2', name: 'Alex Kim', email: 'alex@example.com', status: 'active', joinDate: '2024-01-10', reportCount: 1 },
    { id: 'user_3', name: 'Emma Wilson', email: 'emma@example.com', status: 'suspended', joinDate: '2024-01-05', reportCount: 3 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { toast } = useToast();

  const handleApproveItem = (itemId) => {
    const item = pendingItems.find(item => item.id === itemId);
    if (item) {
      setPendingItems(prev => prev.filter(item => item.id !== itemId));
      setApprovedItems(prev => [...prev, { ...item, status: 'approved', approvedAt: new Date().toISOString() }]);
      toast({
        title: "Item approved",
        description: `${item.title} has been approved and is now live.`,
      });
    }
  };

  const handleRejectItem = (itemId) => {
    const item = pendingItems.find(item => item.id === itemId);
    if (item) {
      setPendingItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Item rejected",
        description: `${item.title} has been rejected and removed.`,
      });
    }
  };

  const handleFlagItem = (itemId) => {
    const item = approvedItems.find(item => item.id === itemId) || pendingItems.find(item => item.id === itemId);
    if (item) {
      setFlaggedItems(prev => [...prev, { ...item, status: 'flagged', flaggedAt: new Date().toISOString() }]);
      setApprovedItems(prev => prev.filter(item => item.id !== itemId));
      setPendingItems(prev => prev.filter(item => item.id !== itemId));
      toast({
        title: "Item flagged",
        description: `${item.title} has been flagged for review.`,
      });
    }
  };

  const adminStats = [
    {
      icon: Package,
      label: "Pending Items",
      value: pendingItems.length,
      change: "+5 today",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: CheckCircle,
      label: "Approved Items", 
      value: approvedItems.length,
      change: "+12 today",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Flag,
      label: "Flagged Items",
      value: flaggedItems.length,
      change: "+2 today",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Users,
      label: "Active Users",
      value: users.filter(user => user.status === 'active').length,
      change: "+8 this week",
      color: "from-blue-500 to-blue-600"
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

  const ItemCard = ({ item, onApprove, onReject, onFlag, showActions = true }) => (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">{item.category}</Badge>
              <Badge variant="outline" className="text-xs">Size {item.size}</Badge>
              <Badge className={`text-xs ${
                item.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                item.condition === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                item.condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {item.condition}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-gray-500">
                By {item.uploader.name} • {new Date(item.uploadedAt).toLocaleDateString()}
              </div>
              <div className="text-green-600 font-medium">
                {item.wearCoins} Coins
              </div>
            </div>
            {item.reportCount > 0 && (
              <div className="flex items-center space-x-1 mt-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600">{item.reportCount} reports</span>
              </div>
            )}
          </div>
        </div>
        
        {showActions && (
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-100">
            <Button size="sm" variant="ghost">
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            {item.status === 'pending' && (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Reject Item</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to reject "{item.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onReject(item.id)} className="bg-red-600 hover:bg-red-700">
                        Reject
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button size="sm" onClick={() => onApprove(item.id)} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve
                </Button>
              </>
            )}
            {item.status === 'approved' && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <Flag className="w-4 h-4 mr-1" />
                    Flag
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Flag Item</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to flag "{item.title}" for review?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onFlag(item.id)} className="bg-red-600 hover:bg-red-700">
                      Flag Item
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-gray-600">Manage items, users, and platform activity</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {adminStats.map((stat, index) => (
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

          {/* Platform Stats */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Platform Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{sustainabilityStats.totalWasteSaved}</div>
                    <div className="text-green-100 text-sm">kg Waste Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{sustainabilityStats.itemsSwapped}</div>
                    <div className="text-green-100 text-sm">Items Swapped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{sustainabilityStats.activeCommunityMembers}</div>
                    <div className="text-green-100 text-sm">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{sustainabilityStats.wearCoinsCirculated}</div>
                    <div className="text-green-100 text-sm">Coins Circulated</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Management Tabs */}
        <motion.div
          variants={containerVariants}
          className="space-y-6"
        >
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl shadow-lg p-1">
              <TabsTrigger value="pending" className="rounded-lg">
                Pending Items ({pendingItems.length})
              </TabsTrigger>
              <TabsTrigger value="approved" className="rounded-lg">
                Approved Items ({approvedItems.length})
              </TabsTrigger>
              <TabsTrigger value="flagged" className="rounded-lg">
                Flagged Items ({flaggedItems.length})
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-lg">
                Users ({users.length})
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter Bar */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search items, users, or descriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-48 rounded-lg">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="rounded-lg">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </motion.div>

            <TabsContent value="pending">
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Pending Items ({pendingItems.length})</span>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                        <Clock className="w-4 h-4 mr-1" />
                        Awaiting Review
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          onApprove={handleApproveItem}
                          onReject={handleRejectItem}
                        />
                      ))}
                      {pendingItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No pending items to review
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="approved">
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Approved Items ({approvedItems.length})</span>
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Live on Platform
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvedItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          onFlag={handleFlagItem}
                        />
                      ))}
                      {approvedItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No approved items yet
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="flagged">
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Flagged Items ({flaggedItems.length})</span>
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        <Flag className="w-4 h-4 mr-1" />
                        Requires Attention
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {flaggedItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          showActions={false}
                        />
                      ))}
                      {flaggedItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          No flagged items
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="users">
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle>User Management ({users.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <Card key={user.id} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-semibold text-gray-900">{user.name}</h4>
                                  <p className="text-sm text-gray-600">{user.email}</p>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge className={`text-xs ${
                                      user.status === 'active' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {user.status}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      Joined {new Date(user.joinDate).toLocaleDateString()}
                                    </span>
                                    {user.reportCount > 0 && (
                                      <Badge variant="outline" className="text-red-600 border-red-200 text-xs">
                                        {user.reportCount} reports
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="ghost">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Profile
                                </Button>
                                {user.status === 'active' && (
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                    Suspend
                                  </Button>
                                )}
                                {user.status === 'suspended' && (
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                    Reactivate
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
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
  );
};

export default Admin;