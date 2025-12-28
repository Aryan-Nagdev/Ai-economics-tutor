# 🎓 AI Economics Study Assistant - Enhanced Version

A NotebookLM-inspired interactive study tool for learning about **Oligopoly** in AQA Economics. Features AI-powered chat, video integration, and exam preparation tools.

## ✨ Features

### 🤖 AI-Powered Chat
- Natural, conversational AI tutor powered by Google Gemini
- Context-aware responses based on textbook content
- Intelligent response length adjustment (short/detailed answers)
- Real-world examples and exam-focused explanations

### 📚 Study Resources
- Quick question suggestions
- Key concept tags
- Integrated video lectures
- Exam tips and techniques

### 🎨 Modern UI/UX
- Clean, professional design with glassmorphism effects
- Responsive layout (desktop, tablet, mobile)
- Smooth animations and transitions
- Dark mode friendly color scheme

### 💡 Smart Features
- Message history with smooth scrolling
- Auto-resizing text input
- Typing indicators
- Suggested questions for quick learning
- Collapsible sidebar with resources

## 📁 Project Structure

```
ai-study-tool-enhanced/
├── backend/
│   ├── server.js              # Express server with Gemini AI
│   ├── knowledge_base.txt     # Course content (already provided)
│   ├── package.json
│   └── .env                   # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Enhanced styling
│   │   └── index.js          # React entry point
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key ([Get it here](https://makersuite.google.com/app/apikey))

### Step 1: Clone or Create Project Structure

Create the folder structure as shown above and copy all the provided code files into their respective locations.

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "PORT=5000" >> .env

# Make sure knowledge_base.txt is in the backend folder
# (The file is already provided in your documents)

# Start the backend server
npm start
```

The backend should now be running on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend should automatically open in your browser at `http://localhost:3000`

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the generated API key
5. Paste it in your `backend/.env` file:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=5000
   ```

## 📝 Configuration

### Backend Environment Variables (.env)

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### Frontend API Configuration

If you need to change the backend URL, edit the `API_URL` constant in `frontend/src/App.js`:

```javascript
const API_URL = 'http://localhost:5000';
```

## 🎯 Usage Guide

### For Students

1. **Ask Questions**: Type any question about oligopoly in the chat box
2. **Use Suggestions**: Click on suggested questions for quick learning
3. **Explore Sidebar**: Browse key concepts and video resources
4. **Get Exam Tips**: Click the "Exam Tips" button for preparation strategies
5. **Watch Videos**: Access integrated YouTube lectures from the sidebar

### Example Questions to Try

- "What is oligopoly?"
- "Explain the kinked demand curve with examples"
- "What are concentration ratios and why do they matter?"
- "Compare collusive and non-collusive oligopoly"
- "Give me exam tips for oligopoly questions"
- "What are the advantages and disadvantages of oligopoly?"

## 🎨 UI Features

### Enhanced Design Elements

- **Glassmorphism**: Modern frosted glass effect on cards
- **Smooth Animations**: Fade-in messages, hover effects, and transitions
- **Responsive Layout**: Adapts seamlessly to all screen sizes
- **Color Coding**: 
  - Purple gradient: Teacher messages
  - Blue gradient: Student messages
  - Yellow: Exam tips panel
  - Green: Action buttons

### Keyboard Shortcuts

- `Enter`: Send message
- `Shift + Enter`: New line in message

## 🔧 Customization

### Changing AI Response Style

Edit the prompts in `backend/server.js` to customize:
- Response length
- Tone and formality
- Focus areas (exam vs. conceptual)
- Example types

### Styling

All styles are in `frontend/src/App.css` using CSS variables for easy customization:

```css
:root {
  --primary: #6366f1;       /* Main brand color */
  --secondary: #8b5cf6;     /* Secondary accent */
  --success: #10b981;       /* Success/student color */
  /* ... more variables */
}
```

### Adding New Video Resources

Edit the video links in `frontend/src/App.js`:

```javascript
<a 
  href="https://youtu.be/YOUR_VIDEO_ID" 
  target="_blank" 
  rel="noopener noreferrer"
  className="video-link"
>
  📺 Your Video Title
</a>
```

## 🐛 Troubleshooting

### Backend Issues

**Problem**: "AI teacher unavailable"
- **Solution**: Check if `.env` file exists with valid `GEMINI_API_KEY`
- Verify backend server is running on port 5000

**Problem**: API quota exceeded
- **Solution**: Check your Gemini API usage limits
- Consider implementing rate limiting or caching

### Frontend Issues

**Problem**: "Cannot connect to server"
- **Solution**: Ensure backend is running on `http://localhost:5000`
- Check CORS settings in `backend/server.js`

**Problem**: Blank page
- **Solution**: Check browser console for errors
- Verify all dependencies are installed (`npm install`)

### Common Issues

1. **Port already in use**: Change `PORT` in `.env` file
2. **Missing dependencies**: Run `npm install` in both folders
3. **API key invalid**: Generate a new key from Google AI Studio

## 📊 API Endpoints

### POST `/ask`
Ask a question to the AI tutor

**Request Body:**
```json
{
  "question": "What is oligopoly?"
}
```

**Response:**
```json
{
  "answer": "Oligopoly is a market structure..."
}
```

### GET `/summary`
Get a complete summary of the oligopoly chapter

**Response:**
```json
{
  "summary": "Complete chapter summary..."
}
```

### GET `/exam-tips`
Get exam preparation tips

**Response:**
```json
{
  "tips": ["tip 1", "tip 2", ...]
}
```

## 🎓 Educational Content

The knowledge base includes:
- **Core Concepts**: Oligopoly definition, characteristics, and types
- **Key Theories**: Kinked demand curve, game theory, collusion
- **Market Analysis**: Concentration ratios, interdependence
- **Real Examples**: UK supermarkets, airlines, tech firms
- **Exam Techniques**: Essay structure, evaluation points, common mistakes

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables (GEMINI_API_KEY)
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Build the production version: `npm run build`
2. Deploy the `build` folder
3. Update `API_URL` to point to your deployed backend

## 📈 Future Enhancements

Potential improvements:
- [ ] Add PDF upload functionality
- [ ] Implement practice quiz generation
- [ ] Add flashcard mode
- [ ] Include diagram drawing tool
- [ ] Multi-language support
- [ ] Voice interaction mode
- [ ] Progress tracking
- [ ] Personalized study plans

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for educational purposes. The economics content is based on AQA Economics curriculum.

## 🙏 Credits

- **AI Model**: Google Gemini 1.5 Flash
- **Icons**: Lucide React
- **Framework**: React, Express.js
- **Content**: AQA Economics Oligopoly Chapter
- **Videos**: Educational YouTube resources

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Ensure all dependencies are updated
4. Verify environment variables are set correctly

## 🎉 Enjoy Learning!

This tool is designed to make economics learning engaging and effective. Happy studying! 📚✨

---

**Note**: Remember to never commit your `.env` file or share your API keys publicly.