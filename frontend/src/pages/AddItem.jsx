import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  Camera, 
  X, 
  Plus, 
  Sparkles,
  Eye,
  RotateCcw,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { categories, sizes, conditions } from '../data/mockData';

const AddItem = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: [],
    images: [],
    estimatedValue: 0,
    wearCoins: 0
  });
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validation functions
  const validateTitle = useCallback((title) => {
    if (!title.trim()) return 'Title is required';
    if (title.length < 3) return 'Title must be at least 3 characters';
    if (title.length > 100) return 'Title must be less than 100 characters';
    return null;
  }, []);

  const validateDescription = useCallback((description) => {
    if (!description.trim()) return 'Description is required';
    if (description.length < 10) return 'Description must be at least 10 characters';
    if (description.length > 500) return 'Description must be less than 500 characters';
    return null;
  }, []);

  const validateCategory = useCallback((category) => {
    if (!category) return 'Category is required';
    if (!categories.includes(category)) return 'Please select a valid category';
    return null;
  }, []);

  const validateSize = useCallback((size) => {
    if (!size) return 'Size is required';
    if (!sizes.includes(size)) return 'Please select a valid size';
    return null;
  }, []);

  const validateCondition = useCallback((condition) => {
    if (!condition) return 'Condition is required';
    if (!conditions.includes(condition)) return 'Please select a valid condition';
    return null;
  }, []);

  const validateImages = useCallback((images) => {
    if (images.length === 0) return 'At least one image is required';
    if (images.length > 5) return 'Maximum 5 images allowed';
    return null;
  }, []);

  const validateForm = useCallback((stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      const imageError = validateImages(formData.images);
      if (imageError) newErrors.images = imageError;
    }

    if (stepNumber === 2) {
      const titleError = validateTitle(formData.title);
      if (titleError) newErrors.title = titleError;

      const descriptionError = validateDescription(formData.description);
      if (descriptionError) newErrors.description = descriptionError;

      const categoryError = validateCategory(formData.category);
      if (categoryError) newErrors.category = categoryError;

      const sizeError = validateSize(formData.size);
      if (sizeError) newErrors.size = sizeError;

      const conditionError = validateCondition(formData.condition);
      if (conditionError) newErrors.condition = conditionError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateTitle, validateDescription, validateCategory, validateSize, validateCondition, validateImages]);

  // Input sanitization
  const sanitizeInput = useCallback((input) => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }, []);

  const handleInputChange = useCallback((field, value) => {
    const sanitizedValue = typeof value === 'string' ? sanitizeInput(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  }, [errors, sanitizeInput]);

  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and sizes
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const validFiles = files.filter(file => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported image format. Please use JPEG, PNG, or WebP.`,
          variant: "destructive"
        });
        return false;
      }
      
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} is too large. Maximum size is 5MB.`,
          variant: "destructive"
        });
        return false;
      }
      
      return true;
    });

    if (formData.images.length + validFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "Maximum 5 images allowed. Please remove some images first.",
        variant: "destructive"
      });
      return;
    }
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, e.target.result]
        }));
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: `Failed to read ${file.name}. Please try again.`,
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    });

    // Mock AI Analysis
    if (validFiles.length > 0) {
      setIsProcessing(true);
      setTimeout(() => {
        setAiAnalysis({
          detectedCategory: 'Outerwear',
          detectedType: 'Jacket',
          suggestedTitle: 'Vintage Denim Jacket',
          condition: 'Excellent',
          estimatedValue: 45,
          suggestedTags: ['vintage', 'denim', 'casual', 'streetwear'],
          sizeDetection: 'M',
          fabricDetection: 'Cotton Denim'
        });
        setIsProcessing(false);
      }, 2000);
    }
  }, [formData.images.length, toast]);

  const removeImage = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }, []);

  const addTag = useCallback(() => {
    const sanitizedTag = sanitizeInput(newTag).toLowerCase();
    
    if (!sanitizedTag) {
      toast({
        title: "Empty tag",
        description: "Please enter a tag name.",
        variant: "destructive"
      });
      return;
    }
    
    if (sanitizedTag.length < 2) {
      toast({
        title: "Tag too short",
        description: "Tag must be at least 2 characters long.",
        variant: "destructive"
      });
      return;
    }
    
    if (sanitizedTag.length > 20) {
      toast({
        title: "Tag too long",
        description: "Tag must be less than 20 characters.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.tags.includes(sanitizedTag)) {
      toast({
        title: "Duplicate tag",
        description: "This tag already exists.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.tags.length >= 10) {
      toast({
        title: "Too many tags",
        description: "Maximum 10 tags allowed.",
        variant: "destructive"
      });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, sanitizedTag]
    }));
    setNewTag('');
  }, [newTag, formData.tags, sanitizeInput, toast]);

  const removeTag = useCallback((tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  const applyAiSuggestions = useCallback(() => {
    if (aiAnalysis) {
      setFormData(prev => ({
        ...prev,
        category: aiAnalysis.detectedCategory,
        type: aiAnalysis.detectedType,
        title: aiAnalysis.suggestedTitle,
        condition: aiAnalysis.condition,
        size: aiAnalysis.sizeDetection,
        tags: [...prev.tags, ...aiAnalysis.suggestedTags.filter(tag => !prev.tags.includes(tag))],
        estimatedValue: aiAnalysis.estimatedValue,
        wearCoins: Math.floor(aiAnalysis.estimatedValue * 0.6)
      }));
      toast({
        title: "AI suggestions applied!",
        description: "Your item details have been auto-filled.",
      });
    }
  }, [aiAnalysis, toast]);

  const handleNextStep = useCallback(() => {
    if (validateForm(step)) {
      setStep(step + 1);
      setErrors({});
    } else {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
    }
  }, [step, validateForm, toast]);

  const handlePreviousStep = useCallback(() => {
    setStep(step - 1);
    setErrors({});
  }, [step]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm(3)) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Mock submission - replace with real API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate API call
          if (formData.title && formData.images.length > 0) {
            resolve({ success: true });
          } else {
            reject(new Error('Missing required fields'));
          }
        }, 2000);
      });

      toast({
        title: "Item listed successfully!",
        description: `${formData.title} has been added to the marketplace.`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to list item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [formData, validateForm, toast, navigate]);

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

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            List Your Item
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Share your pre-loved fashion with our community and earn Wear Coins
          </motion.p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between mt-4 text-sm">
              <span className={step >= 1 ? 'text-green-600 font-medium' : 'text-gray-400'}>
                Upload Photos
              </span>
              <span className={step >= 2 ? 'text-green-600 font-medium' : 'text-gray-400'}>
                Item Details
              </span>
              <span className={step >= 3 ? 'text-green-600 font-medium' : 'text-gray-400'}>
                Review & Publish
              </span>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Photo Upload */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-6 h-6 text-green-600" />
                  <span>Upload Photos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Upload Area */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-green-500 transition-colors duration-200 cursor-pointer group"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-200">
                    <Upload className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop photos here or click to upload
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add up to 5 high-quality photos of your item
                  </p>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    AI-Powered Analysis Included
                  </Badge>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  max="5"
                />

                {/* Error Display */}
                {errors.images && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.images}
                  </div>
                )}

                {/* Image Preview Grid */}
                {formData.images.length > 0 && (
                  <div className="mt-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Uploaded Photos ({formData.images.length}/5)
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {formData.images.map((image, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="relative group"
                        >
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl shadow-md"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {index === 0 && (
                            <Badge className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs">
                              Main Photo
                            </Badge>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Processing */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">AI Analysis in Progress</h4>
                        <p className="text-gray-600">Analyzing your item for automatic categorization and pricing...</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={75} className="h-2" />
                    </div>
                  </motion.div>
                )}

                {/* AI Analysis Results */}
                {aiAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">AI Analysis Complete</h4>
                          <p className="text-sm text-gray-600">Smart suggestions for your item</p>
                        </div>
                      </div>
                      <Button onClick={applyAiSuggestions} size="sm">
                        Apply Suggestions
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Category</p>
                        <p className="font-medium">{aiAnalysis.detectedCategory}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Condition</p>
                        <p className="font-medium">{aiAnalysis.condition}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Est. Value</p>
                        <p className="font-medium">${aiAnalysis.estimatedValue}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Wear Coins</p>
                        <p className="font-medium">{Math.floor(aiAnalysis.estimatedValue * 0.6)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleNextStep}
                    disabled={formData.images.length === 0}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700"
                  >
                    Continue to Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Item Details */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="w-6 h-6 text-green-600" />
                  <span>Item Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-2 block">
                      Item Title *
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Vintage Levi's Denim Jacket"
                      className={`rounded-lg ${errors.title ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                      aria-describedby={errors.title ? "title-error" : undefined}
                    />
                    {errors.title && (
                      <div id="title-error" className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700 mb-2 block">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className={`rounded-lg ${errors.category ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== 'All').map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.category}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700 mb-2 block">
                      Item Type
                    </Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      placeholder="e.g., Jacket, Dress, Sneakers"
                      className="rounded-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="size" className="text-sm font-medium text-gray-700 mb-2 block">
                      Size *
                    </Label>
                    <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                      <SelectTrigger className={`rounded-lg ${errors.size ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes.filter(size => size !== 'All').map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.size && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.size}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="condition" className="text-sm font-medium text-gray-700 mb-2 block">
                      Condition *
                    </Label>
                    <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                      <SelectTrigger className={`rounded-lg ${errors.condition ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((condition) => (
                          <SelectItem key={condition} value={condition}>
                            {condition}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.condition && (
                      <div className="flex items-center mt-1 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.condition}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2 block">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your item in detail..."
                    className={`rounded-lg min-h-[120px] ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    aria-describedby={errors.description ? "description-error" : undefined}
                  />
                  {errors.description && (
                    <div id="description-error" className="flex items-center mt-1 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.description}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tags (optional)
                  </Label>
                  <div className="flex space-x-2 mb-3">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag..."
                      className="flex-1 rounded-lg"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button onClick={addTag} size="sm" className="px-4">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{tag}</span>
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-600"
                            aria-label={`Remove tag ${tag}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.tags.length}/10 tags
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePreviousStep}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700"
                  >
                    Review & Publish
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Review & Publish */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span>Review & Publish</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Item Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Preview</h3>
                    <div className="bg-white border rounded-lg p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        {formData.images[0] && (
                          <img
                            src={formData.images[0]}
                            alt={formData.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">{formData.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{formData.description}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formData.category} • Size {formData.size}</span>
                        <span className="font-medium text-green-600">{formData.wearCoins} Wear Coins</span>
                      </div>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Title:</span>
                        <span className="font-medium">{formData.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{formData.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{formData.type || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{formData.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition:</span>
                        <span className="font-medium">{formData.condition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wear Coins:</span>
                        <span className="font-medium text-green-600">{formData.wearCoins}</span>
                      </div>
                      {formData.tags.length > 0 && (
                        <div>
                          <span className="text-gray-600">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {formData.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePreviousStep}
                    variant="outline"
                    className="px-8 py-3"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Publishing...
                      </div>
                    ) : (
                      'Publish Item'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddItem;