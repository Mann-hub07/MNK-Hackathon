# ReWear - Community Clothing Exchange Platform

A sustainable fashion platform that enables users to exchange pre-loved clothing items using a points-based system.

## 🚀 Features

- **User Authentication**: Secure login/signup with validation
- **Item Management**: Upload, edit, and manage clothing items
- **AI-Powered Analysis**: Automatic item categorization and pricing
- **Swap System**: Request and manage clothing swaps
- **Wear Coins**: Points-based currency system
- **Real-time Chat**: Customer support integration
- **Responsive Design**: Mobile-first approach

## 🐛 Recent Bug Fixes

### Backend Fixes
- ✅ Fixed environment variable handling with fallbacks
- ✅ Updated deprecated `datetime.utcnow()` to `datetime.now(timezone.utc)`
- ✅ Added comprehensive error handling for database operations
- ✅ Improved CORS security configuration
- ✅ Added proper connection validation

### Frontend Fixes
- ✅ Fixed hardcoded Tidio chat key with environment configuration
- ✅ Added comprehensive form validation with real-time feedback
- ✅ Implemented React Error Boundary for crash handling
- ✅ Added performance optimizations (React.memo, useCallback)
- ✅ Improved accessibility with ARIA labels and keyboard navigation
- ✅ Added input sanitization to prevent XSS attacks
- ✅ Fixed memory leaks in component cleanup
- ✅ Added proper error handling for file uploads
- ✅ Implemented proper state management patterns

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Create environment file**:
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=rewear_db
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   SECRET_KEY=your-secret-key-here
   JWT_SECRET=your-jwt-secret-here
   TIDIO_CHAT_KEY=your-tidio-key-here
   DEBUG=true
   LOG_LEVEL=INFO
   ```

5. **Start the backend server**:
   ```bash
   python server.py
   ```
   The server will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment file**:
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:8000/api
   REACT_APP_TIDIO_KEY=your-tidio-key-here
   REACT_APP_ENABLE_ANALYTICS=false
   REACT_APP_ENABLE_CHAT=true
   REACT_APP_DEBUG=true
   ```

5. **Start the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```
   The app will run on `http://localhost:3000`

## 🔧 Configuration

### MongoDB Setup
- Install MongoDB locally or use MongoDB Atlas
- Create a database named `rewear_db`
- Ensure the connection string is correct in your `.env` file

### Tidio Chat Setup
1. Sign up at [Tidio](https://www.tidio.com/)
2. Get your public key from the dashboard
3. Add it to both backend and frontend `.env` files

### Environment Variables

#### Backend (.env)
- `MONGO_URL`: MongoDB connection string
- `DB_NAME`: Database name
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `SECRET_KEY`: Secret key for encryption
- `JWT_SECRET`: JWT signing secret
- `TIDIO_CHAT_KEY`: Tidio chat widget key
- `DEBUG`: Enable debug mode
- `LOG_LEVEL`: Logging level

#### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_TIDIO_KEY`: Tidio chat widget key
- `REACT_APP_ENABLE_ANALYTICS`: Enable analytics
- `REACT_APP_ENABLE_CHAT`: Enable chat widget
- `REACT_APP_DEBUG`: Enable debug mode

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest
```

### Frontend Testing
```bash
cd frontend
npm test
# or
yarn test
```

## 📁 Project Structure

```
MNK-Hackathon-1/
├── backend/
│   ├── server.py          # FastAPI server
│   ├── requirements.txt   # Python dependencies
│   └── env.example       # Environment template
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── data/         # Mock data
│   │   └── App.js        # Main app component
│   ├── package.json      # Node.js dependencies
│   └── env.example      # Environment template
└── README.md            # This file
```

## 🔒 Security Features

- Input sanitization to prevent XSS attacks
- CORS configuration with specific origins
- Environment variable validation
- Error boundaries for crash handling
- Form validation with real-time feedback
- Secure file upload validation

## ♿ Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management

## 🚀 Performance Optimizations

- React.memo for component memoization
- useCallback for function optimization
- Lazy loading for images
- Code splitting
- Error boundaries for graceful error handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the environment configuration
2. Ensure all dependencies are installed
3. Verify MongoDB connection
4. Check the browser console for errors
5. Review the server logs

For additional support, please create an issue in the repository
Name:Naitik Goyani          
Email:naitikgoy18@gmail.com           
Name:Manthan Rogheliya           
Email:Manthan.rogheliya7@gmail.com                                      
Name:kenit maniar                                           
Email:kenitmaniar2@gmail.com                                   

Our video link-https://youtu.be/OAqkLni7h_U
