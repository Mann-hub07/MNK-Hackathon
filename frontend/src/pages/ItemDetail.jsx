import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Flag, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Coins,
  User,
  Calendar,
  Package,
  Shield,
  Star,
  RefreshCw,
  MessageCircle,
  Eye,
  Maximize2,
  RotateCcw,
  Zap,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';
import { mockItems, mockUser } from '../data/mockData';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [view3D, setView3D] = useState(false);
  const [sizeMatch, setSizeMatch] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    // Find item by ID
    const foundItem = mockItems.find(item => item.id === id);
    setItem(foundItem);

    // Mock size matching calculation
    if (foundItem) {
      setSizeMatch({
        percentage: Math.floor(Math.random() * 40) + 60, // 60-100%
        recommendation: 'Good Fit',
        details: {
          chest: '+2cm from your preferred fit',
          length: 'Perfect match',
          shoulders: '-1cm from your preferred fit'
        }
      });

      // Find related items
      const related = mockItems
        .filter(relatedItem => 
          relatedItem.id !== id && 
          relatedItem.category === foundItem.category
        )
        .slice(0, 4);
      setRelatedItems(related);
    }
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: isLiked ? "Item removed from your wishlist" : "Item added to your wishlist",
    });
  };

  const handleSwapRequest = () => {
    toast({
      title: "Swap request sent!",
      description: "The owner will be notified of your swap request.",
    });
  };

  const handleRedeem = () => {
    toast({
      title: "Item redeemed!",
      description: `You've redeemed ${item?.title} for ${item?.wearCoins} Wear Coins.`,
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={item.images[currentImageIndex]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {item.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={handleLike}
                      className="w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200"
                    >
                      <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                    </button>
                    <button className="w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-10 h-10 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200">
                          <Maximize2 className="w-5 h-5 text-gray-600" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <img
                          src={item.images[currentImageIndex]}
                          alt={item.title}
                          className="w-full h-auto rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* 3D View Toggle */}
                  <div className="absolute bottom-4 left-4">
                    <Button
                      onClick={() => setView3D(!view3D)}
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {view3D ? 'Photo View' : '3D Preview'}
                    </Button>
                  </div>

                  {/* Condition Badge */}
                  <div className="absolute bottom-4 right-4">
                    <Badge
                      className={`${
                        item.condition === 'Like New'
                          ? 'bg-green-100 text-green-800'
                          : item.condition === 'Excellent'
                          ? 'bg-blue-100 text-blue-800'
                          : item.condition === 'Good'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {item.condition}
                    </Badge>
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {item.images.length > 1 && (
                  <div className="p-4 bg-white">
                    <div className="flex space-x-2 overflow-x-auto">
                      {item.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex
                              ? 'border-green-500'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${item.title} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Item Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Main Info */}
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge variant="outline">{item.category}</Badge>
                      <Badge variant="outline">Size {item.size}</Badge>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye className="w-4 h-4" />
                        <span>247 views</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 text-green-600 text-2xl font-bold">
                      <Coins className="w-6 h-6" />
                      <span>{item.wearCoins}</span>
                    </div>
                    <p className="text-sm text-gray-500">Wear Coins</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Tags */}
                {item.tags.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleSwapRequest}
                    variant="outline"
                    size="lg"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Request Swap
                  </Button>
                  <Button
                    onClick={handleRedeem}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    Redeem Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Smart Size Matching */}
            {sizeMatch && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span>Smart Size Match</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      {sizeMatch.percentage}% Match
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Fit Prediction</span>
                      <span className="text-sm font-bold text-purple-600">{sizeMatch.recommendation}</span>
                    </div>
                    
                    <div className="space-y-2">
                      {Object.entries(sizeMatch.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <p className="text-sm text-purple-800">
                          Based on your measurements, this item should fit you well.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Seller Info */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-green-600" />
                  <span>Seller Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={item.uploader.avatar} alt={item.uploader.name} />
                    <AvatarFallback>{item.uploader.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{item.uploader.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>4.8 (24 reviews)</span>
                      </div>
                      <span>•</span>
                      <span>32 items sold</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Response Rate</div>
                    <div className="font-semibold text-gray-900">98%</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Ships In</div>
                    <div className="font-semibold text-gray-900">1-2 days</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Member Since</div>
                    <div className="font-semibold text-gray-900">Jan 2024</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Item Details */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-green-600" />
                  <span>Item Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category</span>
                    <span className="font-medium text-gray-900">{item.category}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium text-gray-900">{item.size}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Condition</span>
                    <span className="font-medium text-gray-900">{item.condition}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed</span>
                    <span className="font-medium text-gray-900">
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item ID</span>
                    <span className="font-medium text-gray-900 font-mono text-sm">{item.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              More from this category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <Card
                  key={relatedItem.id}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => navigate(`/item/${relatedItem.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={relatedItem.images[0]}
                        alt={relatedItem.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {relatedItem.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {relatedItem.condition}
                        </Badge>
                        <div className="flex items-center space-x-1 text-green-600 font-medium">
                          <Coins className="w-4 h-4" />
                          <span>{relatedItem.wearCoins}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;