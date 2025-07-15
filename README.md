# Digital Menu Platform 🍽️

A comprehensive Arabic digital menu platform for restaurants with QR code generation, user authentication, dashboard management, and WhatsApp ordering integration.

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login system
- 📱 **QR Code Generation** - Dynamic QR codes for easy menu sharing
- 🎛️ **Restaurant Dashboard** - Complete menu management interface
- 🌐 **Public Menu Display** - Beautiful customer-facing menu pages
- 💬 **WhatsApp Integration** - Direct ordering through WhatsApp
- 🌍 **Arabic RTL Support** - Full Arabic language support with RTL layout
- 📊 **Subscription Management** - Built-in subscription system
- 🎨 **Modern UI** - Responsive design with Tailwind CSS and Radix UI

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Prisma ORM with SQLite
- **Authentication**: JWT with HTTP-only cookies
- **UI Components**: Radix UI with Tailwind CSS
- **Language**: TypeScript
- **QR Generation**: qrcode library
- **Password Hashing**: bcryptjs

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd digital-menu-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Seed sample data:
```bash
node scripts/seed.js
```

5. Start the development server:
```bash
npm run dev
```

## 🔑 Demo Account

- **Email**: demo@menupro.com
- **Password**: 123456
- **Menu URL**: /menu/demo-restaurant

## 📁 Project Structure

```
app/
├── api/              # API routes
├── dashboard/        # Restaurant management
├── login/           # Authentication
├── menu/[slug]/     # Public menu display
└── register/        # User registration

components/
├── ui/              # Reusable UI components
└── theme-provider.tsx

prisma/
├── schema.prisma    # Database schema
└── dev.db          # SQLite database

scripts/
└── seed.js         # Database seeding
```

## 🌟 Key Components

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcryptjs
- HTTP-only cookie storage
- Middleware protection for routes

### Restaurant Dashboard
- Category and product management
- Real-time statistics
- QR code generation and display
- Image upload support

### Public Menu Display
- Dynamic menu loading from database
- Category filtering
- WhatsApp ordering integration
- Mobile-responsive design

### API Routes
- `/api/auth/*` - Authentication endpoints
- `/api/restaurant` - Restaurant management
- `/api/categories` - Category CRUD operations
- `/api/products` - Product management
- `/api/menu/[slug]` - Public menu data
- `/api/qr` - QR code generation

## 🔧 Configuration

### Environment Variables
Create a `.env` file with:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

### Database Schema
The platform uses a comprehensive schema with:
- Restaurant management
- Category organization
- Product catalog
- Subscription tracking

## 🚀 Deployment

### Netlify Deployment
1. Build the project: `npm run build`
2. Connect your GitHub repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Environment Setup
Ensure all environment variables are configured in your deployment platform.

## 📱 Usage

1. **Register** a new restaurant account
2. **Login** to access the dashboard
3. **Create categories** and add products
4. **Generate QR code** for your menu
5. **Share** the QR code with customers
6. **Receive orders** through WhatsApp integration

## 🎯 Features in Detail

### Arabic RTL Support
- Complete Arabic language interface
- Right-to-left text alignment
- Arabic typography and fonts
- Cultural design considerations

### WhatsApp Integration
- Direct ordering links
- Customizable message templates
- Mobile-optimized experience
- Instant communication

### QR Code System
- Dynamic QR generation
- Restaurant-specific URLs
- Easy sharing and printing
- Mobile scanning optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please create an issue in the GitHub repository.

---

**Built with ❤️ for the Arabic restaurant community**
