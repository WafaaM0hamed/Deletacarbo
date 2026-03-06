# 🌿 EcoVision - Carbon Emissions Tracking Platform

A comprehensive carbon emissions tracking and management platform with AI-powered insights and ESG reporting capabilities. Built with Next.js 15, featuring full bilingual support (Arabic/English).

## ✨ Features

### 📊 Dashboard
- Real-time emissions tracking across Scopes 1, 2, and 3
- Interactive trend charts and visualizations
- AI-powered insights and recommendations
- Emissions sources breakdown
- Net-zero progress tracking

### 🧮 Emissions Calculator
- Multi-step calculator for all emission scopes
- **Scope 1**: Direct emissions (fuel combustion, refrigerants)
- **Scope 2**: Indirect energy emissions (electricity, heating)
- **Scope 3**: Value chain emissions (business travel, waste)
- Automated calculations with detailed results

### 🤖 AI Insights
- Smart reduction opportunities
- Priority action recommendations
- Risk and opportunity analysis
- Detailed action plans with timelines
- Monthly emission reduction projections

### 📑 ESG Reports
- Comprehensive sustainability reports
- Executive summaries and baseline data
- Goals and roadmaps
- Detailed action plans
- PDF export and sharing capabilities

### 📋 Reports Log
- Complete history of generated reports
- Status tracking (Complete, Draft, Approved)
- Search and filter functionality
- Version control

### 👥 Company Profile
- Company information management
- Team member management
- Role-based access control (Owner, Admin, Editor, Viewer)
- Active projects tracking

### ⚙️ Settings
- User profile management
- Language preferences (Arabic/English)
- Security settings
- API key management

## 🌍 Bilingual Support

Full support for Arabic and English with:
- Complete RTL (Right-to-Left) layout for Arabic
- Professional translations for all UI elements
- Easy language switching
- Persistent language preference

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript/JSX
- **Styling**: Tailwind CSS 3.4
- **Charts**: Recharts 2.12
- **State Management**: React Context API
- **Internationalization**: Custom i18n system

## 📦 Installation

1. **Extract the project**
   ```bash
   unzip ecovision-frontend.zip
   cd ecovision-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📁 Project Structure

```
ecovision-frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── dashboard/           # Main dashboard
│   │   ├── emissions-calculator/ # Emissions calculator
│   │   ├── ai-insights/         # AI insights page
│   │   ├── esg-reports/         # ESG reports
│   │   ├── reports-log/         # Reports history
│   │   ├── company-profile/     # Company management
│   │   ├── settings/            # User settings
│   │   ├── layout.js            # Root layout
│   │   ├── page.js              # Home (redirects to dashboard)
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable components
│   │   ├── Sidebar.js          # Navigation sidebar
│   │   ├── Header.js           # Top header bar
│   │   ├── AppLayout.js        # Main layout wrapper
│   │   └── ClientWrapper.js    # Client-side wrapper
│   ├── contexts/               # React contexts
│   │   └── LanguageContext.js  # i18n context
│   └── locales/                # Translation files
│       ├── ar.json             # Arabic translations
│       └── en.json             # English translations
├── public/                     # Static assets
├── package.json               # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── next.config.js            # Next.js configuration
└── README.md                 # This file
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with emerald green theme
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Accessible**: Semantic HTML and ARIA labels
- **Dark mode ready**: Color scheme variables for easy theming
- **Custom components**: Reusable cards, charts, and form elements

## 🔐 Mock Data

The application currently uses mock data for demonstration purposes. In production:
- Replace mock data with API calls
- Implement authentication
- Connect to backend services
- Add data persistence

## 🌱 Environmental Impact

This platform helps organizations:
- Track carbon emissions accurately
- Identify reduction opportunities
- Set and monitor net-zero goals
- Generate compliance reports
- Make data-driven sustainability decisions

## 📝 Next Steps

To integrate with a real backend:

1. Create API service layer in `/src/services/`
2. Replace mock data with API calls
3. Implement authentication
4. Add error handling
5. Set up environment variables
6. Deploy to production

## 🤝 Contributing

This is a frontend-only project. For backend integration:
- API endpoints should match the data structures used in mock data
- Authentication should be JWT-based
- All API calls should be made from service layer

## 📄 License

This project is proprietary. All rights reserved.

## 👨‍💻 Development

Built with ❤️ for sustainable business practices.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Platform**: EcoVision Carbon Emissions Tracking
