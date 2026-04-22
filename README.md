# Oba Supermarkt - Modern Supermarket Web Sitesi

Premium, modern ve mobil-öncelikli bir süpermarket web sitesi. Next.js, React, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## Özellikler

### Public Website
- **Ana Sayfa**: Hero section, öne çıkan ürünler, kampanyalar, kategoriler
- **Ürünler**: Arama, filtreleme, kategori bazlı listeleme
- **Ürün Detay**: Detaylı ürün bilgisi, benzer ürünler
- **Kampanyalar**: Aktif kampanyalar ve indirimler
- **Kategoriler**: Ürün kategorileri ve detay sayfaları
- **İletişim**: Mağaza bilgileri, çalışma saatleri, harita

### Admin Panel
- **Dashboard**: Genel bakış, istatistikler
- **Ürün Yönetimi**: CRUD işlemleri, liste görünümü
- **Kampanya Yönetimi**: İndirim ve kampanya oluşturma
- **Kategori Yönetimi**: Kategori düzenleme
- **Ayarlar**: Mağaza bilgileri, çalışma saatleri

## Teknoloji Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Font**: Geist (Next.js font optimization)

## Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin**:
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın**:
```bash
npm run dev
```

3. **Tarayıcıda açın**:
```
http://localhost:3000
```

## Build ve Deployment

### Production Build
```bash
npm run build
```

### Production Sunucusu
```bash
npm start
```

### Vercel Deployment
```bash
npm i -g vercel
vercel
```

## Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   │   ├── products/      # Ürün sayfaları
│   │   ├── categories/    # Kategori sayfaları
│   │   ├── promotions/    # Kampanya sayfaları
│   │   └── contact/       # İletişim sayfası
│   ├── admin/             # Admin panel
│   │   ├── login/         # Admin giriş
│   │   ├── dashboard/     # Dashboard
│   │   ├── products/      # Ürün yönetimi
│   │   ├── promotions/    # Kampanya yönetimi
│   │   ├── categories/    # Kategori yönetimi
│   │   └── settings/      # Ayarlar
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 sayfası
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── public/            # Public components
│   ├── admin/             # Admin components
│   └── shared/            # Shared components
├── lib/
│   ├── data/              # Mock data
│   ├── services/          # Service layer
│   └── utils.ts           # Utilities
├── types/
│   └── index.ts           # TypeScript types
└── app/globals.css        # Global styles
```

## Mock Data Yapısı

Şu anda tüm veriler mock data olarak tutulmaktadır. Gerçek backend entegrasyonu için:

### TODO: Backend Entegrasyonu

1. **Supabase Kurulumu**:
   ```bash
   npm install @supabase/supabase-js @supabase/ssr
   ```

2. **Environment Variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Service Layer Güncelleme**:
   - `src/lib/services/productService.ts`
   - `src/lib/services/categoryService.ts`
   - `src/lib/services/promotionService.ts`
   - `src/lib/services/storeService.ts`

4. **Auth Entegrasyonu**:
   - `src/app/admin/login/page.tsx` - Gerçek auth ile değiştir
   - Middleware ekle: `src/middleware.ts`

## Admin Giriş Bilgileri (Demo)

- **Email**: admin@example.com
- **Şifre**: admin123

## Özelleştirme

### Renkler
Renkler `src/app/globals.css` dosyasında CSS variables olarak tanımlanmıştır:

```css
:root {
  --primary: #16a34a;      /* Ana renk - Yeşil */
  --background: #fafafa;   /* Arka plan */
  --foreground: #171717;   /* Metin rengi */
  /* ... */
}
```

### Marka Bilgileri
Mağaza bilgileri `src/lib/data/store.ts` dosyasında güncellenebilir.

## Geliştirme Notları

### Server vs Client Components
- **Server Components**: Varsayılan, data fetching, SEO
- **Client Components**: Interaktivite gerektiren yerlerde `"use client"`

### Data Fetching
```typescript
// Server Component
const products = await getAllProducts();

// Client Component
useEffect(() => {
  getAllProducts().then(setProducts);
}, []);
```

### Image Optimization
Gerçek görseller için `next/image` kullanın:
```tsx
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority
/>
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Sorularınız için: info@obasupermarkt.at

---

**Not**: Bu proje demo/mock data ile çalışmaktadır. Production kullanımı için backend entegrasyonu gereklidir.
