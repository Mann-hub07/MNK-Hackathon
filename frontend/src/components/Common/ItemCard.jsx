import React, { useState, useCallback, memo } from 'react';
import { Heart, Coins, User, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useNavigate } from 'react-router-dom';

const ItemCard = memo(({ item, variant = 'browse' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/item/${item.id}`);
  }, [navigate, item.id]);

  const handleLike = useCallback((e) => {
    e.stopPropagation();
    setIsLiked(prev => !prev);
  }, []);

  const handleSwapClick = useCallback((e) => {
    e.stopPropagation();
    // Handle swap logic
    console.log('Swap requested for:', item.title);
  }, [item.title]);

  const handleRedeemClick = useCallback((e) => {
    e.stopPropagation();
    // Handle redeem logic
    console.log('Redeem requested for:', item.title);
  }, [item.title]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  const handleEditClick = useCallback((e) => {
    e.stopPropagation();
    navigate(`/item/${item.id}/edit`);
  }, [navigate, item.id]);

  const handleRemoveClick = useCallback((e) => {
    e.stopPropagation();
    // Handle remove logic
    console.log('Remove requested for:', item.title);
  }, [item.title]);

  const formatDate = useCallback((dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.warn('Invalid date format:', dateString);
      return 'Unknown date';
    }
  }, []);

  const getConditionColor = useCallback((condition) => {
    switch (condition) {
      case 'Like New':
        return 'bg-green-100 text-green-800';
      case 'Excellent':
        return 'bg-blue-100 text-blue-800';
      case 'Good':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-orange-100 text-orange-800';
    }
  }, []);

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-green-200 transform hover:-translate-y-1"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.title}`}
    >
      <div className="relative">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM5Q0EzQUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPkltYWdlPC90ZXh0Pgo8L3N2Zz4=';
            }}
          />
        </div>

        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-sm"
          aria-label={isLiked ? `Remove ${item.title} from favorites` : `Add ${item.title} to favorites`}
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
          <Badge className={getConditionColor(item.condition)}>
            {item.condition}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
            {item.title}
          </h3>
          <div className="flex items-center space-x-1 text-green-600 font-medium ml-2">
            <Coins className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">{item.wearCoins}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>{item.category}</span>
            <span aria-hidden="true">•</span>
            <span>Size {item.size}</span>
          </div>
        </div>

        {/* Uploader Info */}
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-6 h-6">
            <AvatarImage src={item.uploader.avatar} alt={`${item.uploader.name}'s avatar`} />
            <AvatarFallback className="text-xs">{item.uploader.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-500">{item.uploader.name}</span>
          <span className="text-xs text-gray-400" aria-hidden="true">•</span>
          <span className="text-xs text-gray-400">
            {formatDate(item.uploadedAt)}
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
              aria-label={`Request swap for ${item.title}`}
            >
              Request Swap
            </Button>
            <Button
              onClick={handleRedeemClick}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700"
              aria-label={`Redeem ${item.title} for ${item.wearCoins} wear coins`}
            >
              Redeem
            </Button>
          </div>
        )}

        {variant === 'dashboard' && (
          <div className="flex space-x-2">
            <Button
              onClick={handleEditClick}
              variant="outline"
              size="sm"
              className="flex-1"
              aria-label={`Edit ${item.title}`}
            >
              Edit
            </Button>
            <Button
              onClick={handleRemoveClick}
              variant="ghost"
              size="sm"
              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
              aria-label={`Remove ${item.title} from your listings`}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
});

ItemCard.displayName = 'ItemCard';

export default ItemCard;