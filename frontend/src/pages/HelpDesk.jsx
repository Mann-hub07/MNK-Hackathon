import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  MessageSquare, 
  HelpCircle, 
  BookOpen, 
  Shield, 
  Users,
  Settings,
  Smartphone,
  Globe,
  Zap,
  Send,
  Bot,
  User,
  ChevronRight,
  ChevronDown,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Headphones,
  FileText,
  Video,
  Mail,
  X
} from 'lucide-react';

const HelpDesk = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);
  const messagesEndRef = useRef(null);
  const timeoutRef = useRef(null);

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Learn the basics of using ReWear',
      articles: [
        {
          title: 'How to create your first listing',
          description: 'Step-by-step guide to listing your first item',
          readTime: '3 min read',
          difficulty: 'Beginner'
        },
        {
          title: 'Understanding Wear Coins',
          description: 'Learn how the ReWear currency system works',
          readTime: '5 min read',
          difficulty: 'Beginner'
        },
        {
          title: 'Setting up your profile',
          description: 'Complete guide to profile customization',
          readTime: '4 min read',
          difficulty: 'Beginner'
        }
      ]
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: Shield,
      color: 'bg-green-500',
      description: 'Stay safe while swapping',
      articles: [
        {
          title: 'Meeting safety guidelines',
          description: 'Best practices for safe in-person exchanges',
          readTime: '4 min read',
          difficulty: 'Important'
        },
        {
          title: 'Reporting suspicious activity',
          description: 'How to report and handle concerns',
          readTime: '3 min read',
          difficulty: 'Important'
        },
        {
          title: 'Verifying user profiles',
          description: 'Tips for checking user credibility',
          readTime: '3 min read',
          difficulty: 'Important'
        }
      ]
    },
    {
      id: 'community',
      title: 'Community Guidelines',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Be a great community member',
      articles: [
        {
          title: 'Community rules and etiquette',
          description: 'Guidelines for respectful interactions',
          readTime: '5 min read',
          difficulty: 'All Users'
        },
        {
          title: 'Building trust in the community',
          description: 'How to establish credibility',
          readTime: '4 min read',
          difficulty: 'All Users'
        },
        {
          title: 'Resolving disputes',
          description: 'Steps to handle disagreements',
          readTime: '6 min read',
          difficulty: 'All Users'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Settings,
      color: 'bg-orange-500',
      description: 'App and website help',
      articles: [
        {
          title: 'Troubleshooting app issues',
          description: 'Common problems and solutions',
          readTime: '7 min read',
          difficulty: 'Technical'
        },
        {
          title: 'Photo upload guidelines',
          description: 'Best practices for item photos',
          readTime: '3 min read',
          difficulty: 'Beginner'
        },
        {
          title: 'Account recovery',
          description: 'How to recover your account',
          readTime: '4 min read',
          difficulty: 'Technical'
        }
      ]
    }
  ];

  const faqData = [
    {
      question: "How do I start swapping on ReWear?",
      answer: "Getting started is easy! Simply create an account, upload photos of items you want to swap, browse available items from other users, and start connecting. You can earn Wear Coins by listing items and use them to request swaps.",
      category: "getting-started",
      tags: ["beginner", "account", "listing"]
    },
    {
      question: "Is ReWear safe to use?",
      answer: "Yes! We prioritize safety with verified user profiles, secure messaging, and community guidelines. Always meet in public places, bring a friend, and trust your instincts. Report any suspicious activity immediately.",
      category: "safety",
      tags: ["safety", "security", "meeting"]
    },
    {
      question: "What are Wear Coins and how do they work?",
      answer: "Wear Coins are our platform currency. You earn them by listing items (10 coins per item) and can spend them to request swaps from other users (5 coins per request). They help maintain a fair exchange system.",
      category: "getting-started",
      tags: ["currency", "coins", "economy"]
    },
    {
      question: "How do I take good photos of my items?",
      answer: "Use good lighting, take photos from multiple angles, show any flaws honestly, and include size labels when possible. Clear, well-lit photos increase your chances of successful swaps.",
      category: "technical",
      tags: ["photos", "listing", "quality"]
    },
    {
      question: "What should I do if a swap goes wrong?",
      answer: "First, try to resolve the issue directly with the other user. If that doesn't work, use our reporting system. We have a dedicated team to help mediate disputes and ensure fair outcomes.",
      category: "community",
      tags: ["disputes", "resolution", "support"]
    },
    {
      question: "Can I delete my account?",
      answer: "Yes, you can delete your account at any time through your profile settings. This will permanently remove all your data, listings, and messages from our platform.",
      category: "technical",
      tags: ["account", "deletion", "privacy"]
    }
  ];

  const aiResponses = {
    greeting: [
      "Hello! I'm ReWear AI, your sustainable fashion assistant. How can I help you today?",
      "Hi there! I'm here to help you with all things ReWear. What would you like to know?",
      "Welcome to ReWear! I'm your AI helper. Feel free to ask me anything about swapping, safety, or using the platform."
    ],
    default: [
      "I understand you're asking about that. Let me help you find the right information.",
      "That's a great question! Here's what I can tell you about that topic.",
      "I'd be happy to help with that. Let me provide you with some useful information."
    ],
    fallback: [
      "I'm not sure I understood that completely. Could you rephrase your question?",
      "I want to make sure I help you correctly. Can you ask that in a different way?",
      "I'm still learning! Could you try asking your question differently?"
    ]
  };

  // AI Chatbot Logic
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
    }
    
    if (message.includes('swap') || message.includes('trade') || message.includes('exchange')) {
      return "To start swapping, first list an item by uploading photos and adding a description. Then browse other users' items and use Wear Coins to request swaps. You'll earn 10 coins for each item you list!";
    }
    
    if (message.includes('coin') || message.includes('wear coin')) {
      return "Wear Coins are our platform currency. You earn 10 coins for each item you list and spend 5 coins to request a swap. They help keep our community fair and active!";
    }
    
    if (message.includes('safe') || message.includes('security') || message.includes('meet')) {
      return "Safety is our top priority! Always meet in public places, bring a friend, and trust your instincts. Check user profiles and ratings before meeting. Report any suspicious activity immediately.";
    }
    
    if (message.includes('photo') || message.includes('picture') || message.includes('image')) {
      return "For great item photos, use good lighting, take multiple angles, show any flaws honestly, and include size labels. Clear photos increase your swap success rate!";
    }
    
    if (message.includes('account') || message.includes('profile') || message.includes('sign up')) {
      return "Creating an account is easy! Just provide your email, create a password, and add some basic info. You can then start listing items and browsing the community.";
    }
    
    if (message.includes('delete') || message.includes('remove') || message.includes('cancel')) {
      return "You can delete your account anytime through your profile settings. This will permanently remove all your data, listings, and messages from ReWear.";
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('problem')) {
      return "I'm here to help! You can also check our FAQ section, browse help categories, or contact our support team directly. What specific issue are you facing?";
    }
    
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    timeoutRef.current = setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      const newAIMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const filteredFAQ = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KPGcgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjAzIj4KPGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjEiLz4KPC9nPgo8L2c+Cjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
                AI-Powered Help
              </Badge>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              How Can We{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Help You?
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Get instant help with our AI assistant, search our knowledge base, or browse helpful articles. 
              We're here to make your ReWear experience smooth and enjoyable.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-96 h-96 mb-4 overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">ReWear AI Assistant</h3>
                    <p className="text-sm text-green-100">Online • Ready to help</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm">
                    <Bot className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>Ask me anything about ReWear!</p>
                  </div>
                )}
                
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 max-w-xs px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button type="submit" size="sm" disabled={isTyping || !chatInput.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Toggle Button */}
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </Button>
      </div>

      {/* Help Categories */}
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
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Browse Help Categories
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Find detailed guides and articles organized by topic
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {helpCategories.map((category, index) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Card 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {category.description}
                        </p>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          selectedCategory === category.id ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <AnimatePresence>
                      {selectedCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 pt-4 border-t border-gray-100"
                        >
                          {category.articles.map((article, articleIndex) => (
                            <div key={articleIndex} className="p-3 bg-gray-50 rounded-lg">
                              <h4 className="font-medium text-gray-900 mb-1">
                                {article.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {article.description}
                              </p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{article.readTime}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {article.difficulty}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      {searchQuery && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-4xl font-bold text-gray-900 mb-6"
              >
                Search Results
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600"
              >
                Found {filteredFAQ.length} results for "{searchQuery}"
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              {filteredFAQ.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HelpCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-3">
                            {faq.answer}
                          </p>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-xs">
                              {faq.category.replace('-', ' ')}
                            </Badge>
                            <div className="flex space-x-1">
                              {faq.tags.slice(0, 2).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Popular FAQ Section */}
      {!searchQuery && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={itemVariants}
                className="text-4xl font-bold text-gray-900 mb-6"
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Quick answers to the most common questions
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              {faqData.slice(0, 4).map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <HelpCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Additional Support Options */}
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
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Still Need Help?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              We're here to help you get the most out of ReWear
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Live Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Chat with our support team in real-time during business hours
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">
                      Start Live Chat
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Email Support
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Send us a detailed message and we'll respond within 24 hours
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/contact">
                      Send Email
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Video className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Video Tutorials
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Watch step-by-step guides and tutorials for common tasks
                  </p>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/tutorials">
                      Watch Videos
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-white mb-6"
            >
              Ready to Start Swapping?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-green-100 mb-8 max-w-2xl mx-auto"
            >
              Now that you have all the help you need, join our community and start your sustainable fashion journey
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                asChild
                className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full"
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
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 text-lg font-semibold rounded-full"
              >
                <Link to="/contact">
                  Contact Support
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HelpDesk; 