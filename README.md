# Digital Fayda Wallet 🪪

A secure mobile wallet application for storing and verifying Ethiopian Fayda ID digitally. Built with React Native Expo for cross-platform compatibility.

## 🔍 Project Overview

The Digital Fayda Wallet addresses the problem of physical ID card dependency by providing a secure, biometric-protected digital alternative. Citizens can store their Fayda ID on their mobile device and generate secure QR codes for real-time verification by institutions.

## ✨ Core Features

- **Secure ID Storage**: Biometric/PIN protected digital ID storage
- **QR Code Generation**: Time-limited, encrypted QR codes for verification
- **Digital Consent System**: User-controlled access permissions
- **Multi-ID Support**: Store Fayda ID, driver's license, passport, and more
- **Blockchain-style Logging**: Tamper-proof verification audit trail
- **Real-time Verification**: Instant ID verification for institutions
- **Cross-platform**: Works on iOS, Android, and Web

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | React Native Expo |
| Authentication | Expo Local Authentication, VeriFayda OIDC |
| Security | AES encryption simulation, SHA256 hashing |
| State Management | React Context & Hooks |
| UI Components | Custom components with Lucide icons |
| Platform Support | iOS, Android, Web |

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Main wallet with ID cards
│   ├── verify.tsx         # QR generation and scanning
│   ├── consent.tsx        # Digital consent management
│   ├── logs.tsx           # Verification audit logs
│   └── settings.tsx       # App settings and security
components/
├── IDCard.tsx             # Digital ID card component
├── AddIDModal.tsx         # Add new ID modal
├── QRGenerator.tsx        # Secure QR code generator
└── QRScanner.tsx          # QR code scanner
services/
└── AuthService.ts         # Authentication and security
```

## 🚀 Installation and Deployment

### Prerequisites

- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g @expo/cli`
- For mobile testing: Expo Go app on your device

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd digital-fayda-wallet
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - **Web**: Open `http://localhost:19006` in your browser
   - **Mobile**: Scan QR code with Expo Go app
   - **iOS Simulator**: Press `i` in terminal
   - **Android Emulator**: Press `a` in terminal

### Production Deployment

#### Docker Deployment (Web)

1. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

2. **Access the application**:
   - Open `http://localhost:3000` in your browser

#### Manual Web Deployment

1. **Build for production**:
   ```bash
   npm run build:web
   ```

2. **Deploy the `dist` folder** to any static hosting service (Netlify, Vercel, etc.)

#### Mobile App Deployment

For mobile app stores, you'll need to create a production build:

1. **Create development build**:
   ```bash
   expo install --fix
   expo build:android  # or expo build:ios
   ```

2. **Follow Expo's deployment guide** for app store submission

## 🔐 Security Features

- **Biometric Authentication**: Fingerprint/Face ID protection
- **Data Encryption**: All sensitive data encrypted at rest
- **Secure QR Codes**: Time-limited, hash-verified QR codes
- **Audit Logging**: Complete tamper-proof activity logs
- **Digital Consent**: User-controlled access permissions
- **Hash Verification**: Blockchain-style integrity checks

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=https://your-api-endpoint.com
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

### VeriFayda OIDC Integration

The app supports VeriFayda OIDC authentication. Configure the OIDC settings in your environment variables or contact the development team for integration assistance.

## 🧪 Testing

Run the application locally and test the following workflows:

1. **Authentication Flow**: Biometric login simulation
2. **ID Management**: Add, view, and manage digital IDs
3. **QR Generation**: Create and refresh secure QR codes
4. **Consent Management**: Approve/deny access requests
5. **Audit Logging**: View verification activity logs

## 📚 API Integration

The app is designed to integrate with:

- **VeriFayda OIDC**: For government authentication
- **Ethiopian National ID Database**: For ID verification
- **Institutional APIs**: For real-time verification requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 👥 Team

- **Marsilas Wondimagegnehu** - Lead Developer
- **Melat Mekonnen** - Co-Developer

## 📄 License

This project is part of the Ethiopian Digital Transformation initiative and follows government software licensing guidelines.

## 🆘 Support

For technical support or questions:

- Create an issue in the repository
- Contact the development team
- Refer to the Expo documentation for platform-specific issues

---

**Built for Ethiopian Digital Transformation 🇪🇹**

*Secure • Accessible • Trustworthy*