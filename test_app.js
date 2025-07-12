// Simple test to verify React app structure
const fs = require('fs');
const path = require('path');

// Check if key files exist
const requiredFiles = [
  'frontend/src/App.js',
  'frontend/src/index.js',
  'frontend/src/index.css',
  'frontend/package.json',
  'backend/server.py',
  'backend/requirements.txt'
];

console.log('🔍 Checking ReWear application structure...\n');

let allFilesExist = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

// Check for key components
const componentFiles = [
  'frontend/src/components/Layout/Navbar.jsx',
  'frontend/src/components/Layout/Footer.jsx',
  'frontend/src/components/Common/ErrorBoundary.jsx',
  'frontend/src/components/Common/ItemCard.jsx',
  'frontend/src/pages/Landing.jsx',
  'frontend/src/pages/Login.jsx',
  'frontend/src/pages/Browse.jsx',
  'frontend/src/pages/Dashboard.jsx',
  'frontend/src/pages/AddItem.jsx',
  'frontend/src/pages/ItemDetail.jsx',
  'frontend/src/pages/Admin.jsx',
  'frontend/src/pages/AboutUs.jsx',
  'frontend/src/pages/Contact.jsx',
  'frontend/src/pages/HelpDesk.jsx'
];

console.log('\n🔍 Checking React components...\n');

componentFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

// Check for data files
const dataFiles = [
  'frontend/src/data/mockData.js',
  'frontend/src/hooks/use-toast.js'
];

console.log('\n🔍 Checking data and hooks...\n');

dataFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

// Check package.json for required dependencies
if (fs.existsSync('frontend/package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'];
  
  console.log('\n🔍 Checking key dependencies...\n');
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies[dep]) {
      console.log(`✅ ${dep} - ${packageJson.dependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - Missing`);
      allFilesExist = false;
    }
  });
}

console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 All files and dependencies are present!');
  console.log('✅ ReWear application structure is correct');
  console.log('✅ No obvious bugs detected in file structure');
  console.log('✅ Ready to run the application');
} else {
  console.log('⚠️  Some files or dependencies are missing');
  console.log('❌ Please check the missing items above');
}

console.log('='.repeat(50)); 