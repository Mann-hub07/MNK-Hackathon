import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  ArrowRight, 
  Upload, 
  Coins, 
  RefreshCw, 
  Leaf, 
  Users, 
  Recycle,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { mockItems, mockTestimonials, sustainabilityStats } from '../data/mockData';
import ItemCard from '../components/Common/ItemCard';

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Auto-rotate featured items
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % mockTestimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz4KPC9nPgo8L2c+Cjwvc3ZnPg==')] opacity-20"
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-gray-900 bg-clip-text text-transparent leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Give Clothes a{" "}
              <motion.span
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-r from-green-600 via-green-400 to-green-600 bg-clip-text text-transparent bg-300%"
              >
                Second Life
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Swap or redeem unused clothing. Save fashion. Save the planet.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
            >
              <Link 
                to="/about" 
                className="text-green-600 hover:text-green-700 font-medium underline underline-offset-4 transition-colors duration-200"
              >
                Learn more about our mission →
              </Link>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Link to="/browse">
                  Start Swapping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 text-lg font-semibold rounded-full"
              >
                <Link to="/browse">
                  Browse Items
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost" 
                asChild
                className="text-gray-700 hover:text-green-700 px-8 py-6 text-lg font-semibold"
              >
                <Link to="/add-item">
                  List an Item
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 bg-green-200/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Featured Items Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Latest Arrivals
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Discover amazing pre-loved fashion waiting for a new home
            </motion.p>
          </motion.div>

          <div className="relative">
            <motion.div 
              className="overflow-hidden rounded-3xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {mockItems.map((item, index) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      <div className="relative">
                        <motion.img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                        <div className="absolute bottom-6 left-6 text-white">
                          <Badge className="bg-white/20 text-white mb-2">
                            {item.condition}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            {item.title}
                          </h3>
                          <p className="text-lg text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Coins className="w-5 h-5 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">
                              {item.wearCoins} Wear Coins
                            </span>
                          </div>
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="outline">Size {item.size}</Badge>
                        </div>
                        
                        <div className="flex space-x-4">
                          <Button 
                            size="lg" 
                            className="bg-green-600 hover:bg-green-700 flex-1"
                          >
                            View Details
                          </Button>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-green-600 text-green-700 hover:bg-green-50"
                          >
                            Add to Wishlist
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + mockItems.length) % mockItems.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % mockItems.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {mockItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? 'bg-green-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              How It Works
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Three simple steps to transform your wardrobe sustainably
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                title: "Upload Your Items",
                description: "Take photos and describe clothes you no longer wear. Our smart system categorizes them automatically.",
                color: "from-blue-500 to-blue-600",
                step: "01"
              },
              {
                icon: Coins,
                title: "Earn Wear Coins",
                description: "Get points for every item you list. Higher quality items earn more coins in our community marketplace.",
                color: "from-green-500 to-green-600",
                step: "02"
              },
              {
                icon: RefreshCw,
                title: "Swap & Redeem",
                description: "Use your coins to get items you love, or swap directly with other community members.",
                color: "from-purple-500 to-purple-600",
                step: "03"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.color}`} />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute top-4 left-4">
                      <span className="text-6xl font-bold text-gray-100">{step.step}</span>
                    </div>
                    
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              What Our Community Says
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Join thousands of happy swappers making fashion sustainable
            </motion.p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12">
                  <div className="flex justify-center mb-6">
                    {[...Array(mockTestimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-2xl text-gray-700 leading-relaxed mb-8 italic">
                    "{mockTestimonials[currentTestimonial].text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage 
                        src={mockTestimonials[currentTestimonial].avatar} 
                        alt={mockTestimonials[currentTestimonial].name} 
                      />
                      <AvatarFallback>
                        {mockTestimonials[currentTestimonial].name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">
                        {mockTestimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-500">ReWear Community Member</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Testimonial Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {mockTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-green-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Impact Counter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our Impact Together
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Every swap makes a difference. See how we're changing fashion together.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                value: sustainabilityStats.totalWasteSaved,
                label: "kg of Waste Saved",
                suffix: "kg",
                color: "from-green-400 to-green-600"
              },
              {
                icon: RefreshCw,
                value: sustainabilityStats.itemsSwapped,
                label: "Items Swapped",
                suffix: "",
                color: "from-blue-400 to-blue-600"
              },
              {
                icon: Users,
                value: sustainabilityStats.activeCommunityMembers,
                label: "Community Members",
                suffix: "",
                color: "from-purple-400 to-purple-600"
              },
              {
                icon: Coins,
                value: sustainabilityStats.wearCoinsCirculated,
                label: "Wear Coins Circulated",
                suffix: "",
                color: "from-yellow-400 to-yellow-600"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value.toLocaleString()}{stat.suffix}
                </motion.div>
                <p className="text-gray-300 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to Transform Your Wardrobe?
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Join our community today and start your sustainable fashion journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                asChild
                className="bg-white text-green-700 hover:bg-gray-50 px-8 py-6 text-lg font-semibold rounded-full shadow-lg"
              >
                <Link to="/login">
                  Join ReWear Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-6 text-lg font-semibold rounded-full"
              >
                <Link to="/browse">
                  Explore Items
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                asChild
                className="text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="ghost" 
                asChild
                className="text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-full"
              >
                <Link to="/help">
                  Help Desk
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;