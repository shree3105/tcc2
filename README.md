# The Cardiology Clinic

A modern, mobile-friendly website for Dr Sujata Khambekar's cardiology practice, built with Next.js and integrated with Neon DB and Web3Forms.

## Features

- **Modern Design**: Clean, professional medical practice website
- **Mobile-First**: Optimized for all devices and screen sizes
- **Self-Referral Form**: Easy-to-use form with dual submission (Neon DB + Web3Forms)
- **Patient Reviews**: Integrated Doctify reviews widget
- **Insurance Partners**: Footer with all major insurance provider logos
- **Responsive Layout**: Beautiful design that works on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 3
- **Database**: Neon DB (PostgreSQL)
- **Form Handling**: Web3Forms + Custom API
- **Deployment**: Vercel-ready

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   Create a `.env.local` file with the following variables:
   ```env
   # Database Configuration
   DATABASE_URL=your_neon_database_connection_string_here
   
   # Web3Forms Configuration
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
   
   # Doctify Widget Configuration
   NEXT_PUBLIC_DOCTIFY_WIDGET_ID=your_doctify_widget_id_here
   ```

3. **Set up the database**
   Connect to your Neon database and run the SQL commands from `database-schema.sql`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup

Run the following SQL commands in your Neon database:

```sql
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Configuration

### Web3Forms
- **Access Key**: Set in your environment variables
- **Endpoint**: `https://api.web3forms.com/submit`

### Doctify Reviews
- **Widget ID**: Configure in your environment
- **Script URL**: Set up in your Doctify dashboard

## API Endpoints

- `POST /api/self-refer` - Handle form submissions and store in Neon DB

## Deployment

The application is ready for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - `NEXT_PUBLIC_DOCTIFY_WIDGET_ID`
4. Deploy!

## File Structure

```
├── app/
│   ├── api/self-refer/route.ts  # Form submission API
│   ├── globals.css              # Global styles
│   └── page.tsx                 # Main page component
├── lib/
│   └── db.ts                    # Database connection
├── public/                      # Static assets (images, logos)
├── database-schema.sql          # Database schema
├── tailwind.config.js           # Tailwind configuration
├── vercel.json                  # Vercel configuration
└── package.json                 # Dependencies
```

## Contact Information

- **Email**: appointments@thecardiology.clinic
- **Phone**: 0776 151 3391
- **Response Time**: Same day or within 24 hours

## License

Private - The Cardiology Clinic
