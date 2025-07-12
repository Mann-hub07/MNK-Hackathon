import React, { useState } from 'react';
import { Heart, Coins, User, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item, variant = 'browse' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/item/${item.id}`);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleSwapClick = (e) => {
    e.stopPropagation();
    // Handle swap logic
    console.log('Swap requested for:', item.title);
  };

  const handleRedeemClick = (e) => {
    e.stopPropagation();
    // Handle redeem logic
    console.log('Redeem requested for:', item.title);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
      <div className="relative" onClick={handleCardClick}>
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-sm"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isLiked ? 'text-red-500 fill-current' : 'text-gray-600'
            }`}
          />
        </button>

        {/* Status Badge */}
        {!item.isAvailable && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-gray-900/80 text-white">
              Swapped
            </Badge>
          </div>
        )}

        {/* Condition Badge */}
        <div className="absolute bottom-3 left-3">
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

      {/* Content */}
      <div className="p-4" onClick={handleCardClick}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center space-x-1 text-green-600 font-medium ml-2">
            <Coins className="w-4 h-4" />
            <span className="text-sm">{item.wearCoins}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{item.category}</span>
            <span>•</span>
            <span>Size {item.size}</span>
          </div>
        </div>

        {/* Uploader Info */}
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-6 h-6">
            <AvatarImage src={item.uploader.avatar} alt={item.uploader.name} />
            <AvatarFallback className="text-xs">{item.uploader.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500">{item.uploader.name}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-400">
            {new Date(item.uploadedAt).toLocaleDateString()}
          </span>
        </div>

        {/* Action Buttons */}
        {variant === 'browse' && item.isAvailable && (
          <div className="flex space-x-2">
            <Button
              onClick={handleSwapClick}
              variant="outline"
              size="sm"
              className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
            >
              Request Swap
            </Button>
            <Button
              onClick={handleRedeemClick}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Redeem
            </Button>
          </div>
        )}

        {variant === 'dashboard' && (
          <div className="flex space-x-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/item/${item.id}/edit`);
              }}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                // Handle remove logic
              }}
              variant="ghost"
              size="sm"
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;