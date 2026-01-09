# 📦 Product Service

Microservice untuk menangani manajemen produk (CRUD operations) dengan stock management.

## 📋 Daftar Isi

- [Deskripsi](#deskripsi)
- [Fitur](#fitur)
- [Teknologi](#teknologi)
- [Struktur Folder](#struktur-folder)
- [Setup dan Instalasi](#setup-dan-instalasi)
- [Konfigurasi](#konfigurasi)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 📖 Deskripsi

Product Service adalah microservice yang bertanggung jawab untuk:
- CRUD operations untuk produk
- Stock management
- Product information management

Service ini menggunakan Prisma ORM dengan MySQL database untuk menyimpan data produk.

## ✨ Fitur

- ✅ Create, Read, Update, Delete produk
- ✅ Stock management
- ✅ Product search dan filtering
- ✅ Health check endpoint
- ✅ Graceful shutdown
- ✅ CORS support
- ✅ Error handling yang comprehensive

## 🛠️ Teknologi

### Core Dependencies
- **Express 4.18.2** - Web framework
- **Prisma 6.0.0** - ORM untuk database
- **MySQL** - Database (via Prisma)
- **CORS 2.8.5** - Cross-Origin Resource Sharing
- **dotenv 16.3.1** - Environment variables

### Development Dependencies
- **nodemon 3.0.1** - Auto-restart pada development
- **Prisma CLI** - Database migration dan management

## 📁 Struktur Folder

```
.
├── config/
│   └── database.js          # Prisma client & database initialization
├── routes/
│   └── productRoutes.js    # Product routes
├── prisma/
│   └── schema.prisma        # Prisma schema definition
├── .env                     # Environment variables (gitignored)
├── env-example              # Environment variables template
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & scripts
├── package-lock.json        # Lock file
├── index.js                 # Entry point
└── README.md                # This file
```

## 🚀 Setup dan Instalasi

### Prerequisites

- Node.js >= 18.x
- npm atau yarn
- MySQL database server
- Akses ke database MySQL

### Langkah Instalasi Lokal

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp env-example .env
   ```
   
   Edit file `.env` dengan konfigurasi database Anda:
   ```env
   PORT=3001
   DATABASE_URL="mysql://user:password@host:port/database_name"
   ```

4. **Generate Prisma Client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```
   
   Atau jika database sudah ada, sync schema:
   ```bash
   npx prisma db push
   ```

6. **Jalankan service**
   ```bash
   # Development mode (dengan auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

Service akan berjalan di `http://localhost:3001` (atau port yang di-set di `.env`)

## ⚙️ Konfigurasi

### Environment Variables

File `.env` harus berisi:

```env
# Server Port
PORT=3001

# Database Connection String (Prisma format)
DATABASE_URL="mysql://username:password@host:port/database_name"
```

### Database Connection String Format

```
mysql://[username]:[password]@[host]:[port]/[database_name]
```

Contoh:
```
DATABASE_URL="mysql://root:password123@localhost:3306/product_db"
```

## 🔌 API Endpoints

Base URL: `http://localhost:3001` (atau sesuai konfigurasi)

### Product Endpoints

#### GET `/api/products`
Get semua produk.

**Response Success (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Product Name",
      "description": "Product description",
      "price": "100000.00",
      "stock": 50,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### GET `/api/products/:id`
Get produk berdasarkan ID.

**Parameters:**
- `id` (path parameter) - Product ID

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": "100000.00",
    "stock": 50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

#### POST `/api/products`
Create produk baru.

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 100000,
  "stock": 50
}
```

**Required Fields:**
- `name` (string) - Nama produk
- `price` (number) - Harga produk

**Optional Fields:**
- `description` (string) - Deskripsi produk
- `stock` (number) - Stok produk (default: 0)

**Response Success (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": "100000.00",
    "stock": 50,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Name and price are required"
}
```

#### PUT `/api/products/:id`
Update produk.

**Parameters:**
- `id` (path parameter) - Product ID

**Request Body:**
```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 150000,
  "stock": 75
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Product Name",
    "description": "Updated description",
    "price": "150000.00",
    "stock": 75,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

#### DELETE `/api/products/:id`
Delete produk.

**Parameters:**
- `id` (path parameter) - Product ID

**Response Success (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Response Error (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

#### PATCH `/api/products/:id/stock`
Update stock produk (untuk order service atau stock adjustment).

**Parameters:**
- `id` (path parameter) - Product ID

**Request Body:**
```json
{
  "quantity": -10
}
```

**Note:** 
- Positive quantity untuk menambah stock
- Negative quantity untuk mengurangi stock

**Response Success (200):**
```json
{
  "success": true,
  "message": "Stock updated successfully",
  "data": {
    "id": 1,
    "name": "Product Name",
    "stock": 40,
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "message": "Insufficient stock"
}
```

### Health Check

#### GET `/health`
Check service health status.

**Response (200):**
```json
{
  "status": "OK",
  "service": "product-service"
}
```

## 🗄️ Database Schema

### Product Model

```prisma
model Product {
  id          Int      @id @default(autoincrement())
  name        String   @db.VarChar(255)
  description String?  @db.Text
  price       Decimal  @db.Decimal(10, 2)
  stock       Int      @default(0)
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@map("products")
}
```

### Field Descriptions

- `id`: Primary key, auto increment
- `name`: Nama produk (required, max 255 characters)
- `description`: Deskripsi produk (optional, text)
- `price`: Harga produk (required, decimal dengan 2 decimal places)
- `stock`: Stok produk (default: 0)
- `createdAt`: Timestamp saat produk dibuat
- `updatedAt`: Timestamp saat produk terakhir diupdate

## 🚢 Deployment

### Prerequisites untuk Production

1. **Database**: Setup MySQL database di production
2. **Environment Variables**: Set semua environment variables
3. **CORS**: Konfigurasi CORS untuk mengizinkan origin frontend

### Environment Variables untuk Production

```env
PORT=3001
DATABASE_URL="mysql://user:password@production-host:3306/product_db"
```

### Build dan Run

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start service
npm start
```

## 🔒 Security

### Implemented Security Features

- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection protection (Prisma ORM)
- ✅ Error handling yang aman
- ✅ Environment variables untuk sensitive data

### Security Best Practices

1. **HTTPS**: Selalu gunakan HTTPS di production
2. **CORS**: Konfigurasi CORS untuk mengizinkan hanya origin yang diperlukan
3. **Input Validation**: Validasi semua input dari client
4. **Rate Limiting**: Pertimbangkan rate limiting untuk API endpoints
5. **Authentication**: Integrate dengan Auth Service untuk protected endpoints

## 🐛 Troubleshooting

### Issue: Cannot connect to database

**Solution:**
- Check database connection string di `.env`
- Verify database server berjalan
- Check network connectivity
- Verify username, password, dan database name benar

### Issue: Prisma Client not generated

**Solution:**
```bash
npm run prisma:generate
```

### Issue: Migration fails

**Solution:**
- Check database connection
- Verify schema.prisma syntax
- Jika database sudah ada, gunakan `npx prisma db push` instead

### Issue: CORS error

**Solution:**
- Check CORS configuration di `index.js`
- Verify frontend origin diizinkan
- Check preflight requests

### Issue: Port already in use

**Solution:**
- Change PORT di `.env`
- Atau stop service yang menggunakan port tersebut
- Check: `lsof -i :3001` (Linux/Mac) atau `netstat -ano | findstr :3001` (Windows)

### Issue: Product not found

**Solution:**
- Verify product ID exists
- Check database connection
- Verify data di database

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server dengan nodemon |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:studio` | Open Prisma Studio (database GUI) |

## 🧪 Testing

### Manual Testing dengan cURL

**Get All Products:**
```bash
curl -X GET http://localhost:3001/api/products
```

**Get Product by ID:**
```bash
curl -X GET http://localhost:3001/api/products/1
```

**Create Product:**
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "Test description",
    "price": 100000,
    "stock": 50
  }'
```

**Update Product:**
```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product",
    "price": 150000,
    "stock": 75
  }'
```

**Delete Product:**
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

**Update Stock:**
```bash
curl -X PATCH http://localhost:3001/api/products/1/stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": -10}'
```

## 📚 Related Documentation

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Documentation](https://expressjs.com/)
