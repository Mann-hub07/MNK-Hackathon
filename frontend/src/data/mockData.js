// Mock data for ReWear - Community Clothing Exchange

export const mockUser = {
  id: "user_1",
  name: "Sarah Chen",
  email: "sarah.chen@example.com",
  avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNBOUQ5QTUiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzEyMTIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD4KPC9zdmc+",
  wearCoins: 245,
  totalSwaps: 18,
  itemsListed: 12,
  sustainabilityScore: 1.2 // kg of waste saved
};

export const mockItems = [
  {
    id: "item_1",
    title: "Vintage Levi's Denim Jacket",
    description: "Classic 90s denim jacket in excellent condition. Perfect for layering and street style looks.",
    category: "Outerwear",
    type: "Jacket",
    size: "M",
    condition: "Excellent",
    wearCoins: 25,
    tags: ["vintage", "denim", "90s", "streetwear"],
    images: ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNEE5MEU2Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5EZW5pbSBKYWNrZXQ8L3RleHQ+Cjwvc3ZnPg=="],
    uploader: {
      id: "user_2",
      name: "Alex Kim",
      avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNFNTA5MTQiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkE8L3RleHQ+Cjwvc3ZnPg=="
    },
    isAvailable: true,
    uploadedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "item_2",
    title: "Silk Midi Dress",
    description: "Elegant silk dress perfect for special occasions. Barely worn, like new condition.",
    category: "Dresses",
    type: "Midi Dress",
    size: "S",
    condition: "Like New",
    wearCoins: 35,
    tags: ["silk", "elegant", "formal", "midi"],
    images: ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjQTlEOUE1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxMjEyMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPlNpbGsgRHJlc3M8L3RleHQ+Cjwvc3ZnPg=="],
    uploader: {
      id: "user_3",
      name: "Emma Wilson",
      avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2QjczRkYiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkU8L3RleHQ+Cjwvc3ZnPg=="
    },
    isAvailable: true,
    uploadedAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "item_3",
    title: "Sneakers Nike Air",
    description: "Limited edition Nike Air sneakers. Great for casual wear and workouts.",
    category: "Shoes",
    type: "Sneakers",
    size: "42",
    condition: "Good",
    wearCoins: 20,
    tags: ["nike", "sneakers", "sports", "limited"],
    images: ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTIxMjEyIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zNWVtIj5TbmVha2VyczwvdGV4dD4KPC9zdmc+"],
    uploader: mockUser,
    isAvailable: true,
    uploadedAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "item_4",
    title: "Cashmere Sweater",
    description: "Luxurious cashmere sweater in cream color. Super soft and warm.",
    category: "Tops",
    type: "Sweater",
    size: "L",
    condition: "Excellent",
    wearCoins: 30,
    tags: ["cashmere", "luxury", "warm", "winter"],
    images: ["data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxMjEyMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPkNhc2htZXJlPC90ZXh0Pgo8L3N2Zz4="],
    uploader: {
      id: "user_4",
      name: "Maria Garcia",
      avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkM2NTciLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzEyMTIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TTwvdGV4dD4KPC9zdmc+"
    },
    isAvailable: false,
    uploadedAt: "2024-01-12T16:45:00Z"
  }
];

export const mockSwaps = [
  {
    id: "swap_1",
    requestedItem: mockItems[0],
    offeredItem: mockItems[1],
    requester: mockUser,
    owner: mockItems[0].uploader,
    status: "pending",
    requestedAt: "2024-01-15T12:00:00Z"
  },
  {
    id: "swap_2",
    requestedItem: mockItems[2],
    offeredItem: mockItems[3],
    requester: {
      id: "user_5",
      name: "John Doe",
      avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM4QjVDRjYiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPko8L3RleHQ+Cjwvc3ZnPg=="
    },
    owner: mockUser,
    status: "completed",
    requestedAt: "2024-01-10T09:30:00Z",
    completedAt: "2024-01-11T14:20:00Z"
  }
];

export const mockTestimonials = [
  {
    id: "testimonial_1",
    name: "Jessica Liu",
    avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRjc4N0IiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPko8L3RleHQ+Cjwvc3ZnPg==",
    text: "ReWear has completely transformed my wardrobe! I've found amazing pieces and made great connections with the community.",
    rating: 5
  },
  {
    id: "testimonial_2",
    name: "Michael Chen",
    avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzQjgyRjYiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk08L3RleHQ+Cjwvc3ZnPg==",
    text: "The points system makes it so easy to get quality clothes. Love how sustainable and affordable this platform is!",
    rating: 5
  },
  {
    id: "testimonial_3",
    name: "Sophie Turner",
    avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGQTY4M0EiLz4KPGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtZmFtaWx5PSJJbnRlciIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlM8L3RleHQ+Cjwvc3ZnPg==",
    text: "Best decision ever! I've decluttered my closet and discovered so many unique vintage pieces.",
    rating: 5
  }
];

export const sustainabilityStats = {
  totalWasteSaved: 1234, // kg
  itemsSwapped: 5678,
  activeCommunityMembers: 2345,
  wearCoinsCirculated: 98765
};

export const categories = [
  "All",
  "Tops",
  "Bottoms", 
  "Dresses",
  "Outerwear",
  "Shoes",
  "Accessories",
  "Bags"
];

export const sizes = [
  "All",
  "XS", "S", "M", "L", "XL", "XXL",
  "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"
];

export const conditions = [
  "Like New",
  "Excellent", 
  "Good",
  "Fair"
];

export const genders = [
  "All",
  "Women",
  "Men", 
  "Unisex"
];