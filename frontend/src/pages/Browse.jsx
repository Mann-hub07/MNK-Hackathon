import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List,
  Heart,
  Sparkles,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockItems, categories, sizes, conditions, genders } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';

const Browse = () => {
  const [items, setItems] = useState(mockItems);
  const [filteredItems, setFilteredItems] = useState(mockItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Smart Size Matching Mock Data
  const [userMeasurements] = useState({
    chest: 96, // cm
    waist: 81,
    hips: 101,
    height: 175,
    preferredFit: 'regular' // slim, regular, loose
  });

  // Filter and search logic
  useEffect(() => {
    let filtered = items;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Size filter
    if (selectedSize !== 'All') {
      filtered = filtered.filter(item => item.size === selectedSize);
    }

    // Gender filter (mock implementation)
    if (selectedGender !== 'All') {
      // In real app, items would have gender property
      filtered = filtered.filter(item => true); // Mock: show all for now
    }

    // Condition filter
    if (selectedCondition !== 'All') {
      filtered = filtered.filter(item => item.condition === selectedCondition);
    }

    // Price range filter (using wearCoins)
    filtered = filtered.filter(item => 
      item.wearCoins >= priceRange[0] && item.wearCoins <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.wearCoins - b.wearCoins);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.wearCoins - a.wearCoins);
        break;
      case 'popular':
        // Mock popularity sort
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        break;
    }

    setFilteredItems(filtered);
  }, [items, searchTerm, selectedCategory, selectedSize, selectedGender, selectedCondition, priceRange, sortBy]);

  // Smart size matching function (mock AI)
  const getSmartSizeMatch = (item) => {
    // Mock AI size matching algorithm
    const sizeMap = { 'XS': 80, 'S': 85, 'M': 90, 'L': 95, 'XL': 100, 'XXL': 105 };
    const itemChestSize = sizeMap[item.size] || 90;
    const matchPercentage = Math.max(0, 100 - Math.abs(userMeasurements.chest - itemChestSize) * 2);
    
    return {
      percentage: Math.round(matchPercentage),
      recommendation: matchPercentage > 80 ? 'Perfect Fit' : 
                     matchPercentage > 60 ? 'Good Fit' : 
                     matchPercentage > 40 ? 'Might Fit' : 'Poor Fit'
    };
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse Items
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing pre-loved fashion with AI-powered size matching
            </p>
          </motion.div>

          {/* Search and Filters Bar */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search items, brands, styles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-6 text-lg border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 py-6 rounded-xl">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 py-6 rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  variant="outline"
                  className="py-6 px-6 rounded-xl border-gray-200"
                >
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setViewMode('grid')}
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    className="p-2 rounded-lg"
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={() => setViewMode('list')}
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    className="p-2 rounded-lg"
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {isFiltersOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Size
                      </Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Condition
                      </Label>
                      <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          {['All', ...conditions].map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Gender
                      </Label>
                      <Select value={selectedGender} onValueChange={setSelectedGender}>
                        <SelectTrigger className="rounded-lg">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genders.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Wear Coins Range: {priceRange[0]} - {priceRange[1]}
                      </Label>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={100}
                        min={0}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Smart Size Matching Banner */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">AI Size Matching Active</h3>
                <p className="text-purple-100">
                  Items are ranked by fit compatibility based on your measurements
                </p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              Update Measurements
            </Button>
          </div>
        </motion.div>

        {/* Results and Tabs */}
        <motion.div variants={containerVariants}>
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="bg-white rounded-xl shadow-sm p-1">
                <TabsTrigger value="all" className="rounded-lg px-6">
                  All Items ({filteredItems.length})
                </TabsTrigger>
                <TabsTrigger value="perfect-fit" className="rounded-lg px-6">
                  <Star className="w-4 h-4 mr-2" />
                  Perfect Fit
                </TabsTrigger>
                <TabsTrigger value="trending" className="rounded-lg px-6">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="recent" className="rounded-lg px-6">
                  <Clock className="w-4 h-4 mr-2" />
                  Just Added
                </TabsTrigger>
              </TabsList>

              <div className="text-sm text-gray-600">
                Showing {filteredItems.length} results
              </div>
            </div>

            <TabsContent value="all">
              <motion.div
                variants={containerVariants}
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Smart Size Matching Badge */}
                    {(() => {
                      const sizeMatch = getSmartSizeMatch(item);
                      return sizeMatch.percentage > 60 && (
                        <div className="absolute top-2 left-2 z-10">
                          <Badge
                            className={`${
                              sizeMatch.percentage > 80 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            } font-medium`}
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            {sizeMatch.percentage}% Match
                          </Badge>
                        </div>
                      );
                    })()}
                    
                    <ItemCard item={item} variant="browse" />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="perfect-fit">
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems
                  .filter(item => getSmartSizeMatch(item).percentage > 80)
                  .map((item, index) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <ItemCard item={item} variant="browse" />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="trending">
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems
                  .slice(0, 8)
                  .map((item, index) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <ItemCard item={item} variant="browse" />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="recent">
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems
                  .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
                  .slice(0, 8)
                  .map((item, index) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <ItemCard item={item} variant="browse" />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Load More */}
          {filteredItems.length > 12 && (
            <motion.div
              variants={itemVariants}
              className="text-center mt-12"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg rounded-xl border-gray-200 hover:border-green-500 hover:text-green-600"
              >
                Load More Items
              </Button>
            </motion.div>
          )}

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search criteria or browse our featured collections
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedSize('All');
                  setSelectedCondition('All');
                }}
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;