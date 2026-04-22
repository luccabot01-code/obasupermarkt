import type { Locale } from "./config";

type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

type LegalPageCopy = {
  title: string;
  description: string;
  backHome: string;
  updated: string;
  sections: LegalSection[];
  disclaimer: string;
};

type FaqItem = { question: string; answer: string };

type FaqPageCopy = {
  title: string;
  description: string;
  backHome: string;
  intro: string;
  items: FaqItem[];
  disclaimer: string;
};
const productDetailCopy = {
  tr: {
    notFound: "Ürün Bulunamadı",
    home: "Ana Sayfa",
    products: "Ürünler",
    noImage: "Görsel yok",
    discount: "indirim",
    featured: "Öne Çıkan",
    sku: "SKU",
    savings: "tasarruf",
    unit: "Birim",
    stock: "Stok",
    inStock: "Stokta var",
    outOfStock: "Stokta yok",
    barcode: "Barkod",
    fresh: "Taze Ürün",
    fast: "Hızlı Teslimat",
    quality: "Kalite Garantisi",
    addToCart: "Sepete Ekle",
    tags: "Etiketler",
    descriptionTitle: "Ürün Açıklaması",
    relatedTitle: "Benzer Ürünler",
  },
  de: {
    notFound: "Produkt nicht gefunden",
    home: "Startseite",
    products: "Produkte",
    noImage: "Kein Bild",
    discount: "Rabatt",
    featured: "Empfohlen",
    sku: "SKU",
    savings: "gespart",
    unit: "Einheit",
    stock: "Bestand",
    inStock: "Auf Lager",
    outOfStock: "Nicht auf Lager",
    barcode: "Barcode",
    fresh: "Frische Ware",
    fast: "Schnelle Lieferung",
    quality: "Qualitätsgarantie",
    addToCart: "In den Warenkorb",
    tags: "Stichwörter",
    descriptionTitle: "Produktbeschreibung",
    relatedTitle: "Ähnliche Produkte",
  },
} satisfies Record<Locale, Record<string, string>>;

const promotionDetailCopy = {
  tr: {
    notFound: "Kampanya Bulunamadı",
    home: "Ana Sayfa",
    promotions: "Kampanyalar",
    active: "Aktif",
    inactive: "Pasif",
    starts: "Başlangıç",
    ends: "Bitiş",
    browseProducts: "Ürünleri İncele",
    allPromotions: "Tüm Kampanyalar",
    promoProducts: "Kampanya Ürünleri",
    promoDetails: "Kampanya Detayları",
    promotionType: "Kampanya Türü",
    discountValue: "İndirim Değeri",
    startDate: "Başlangıç Tarihi",
    endDate: "Bitiş Tarihi",
    percentage: "Yüzde İndirim",
    fixedAmount: "Sabit Tutar İndirimi",
    buyXGetY: "Al X Öde Y",
  },
  de: {
    notFound: "Aktion nicht gefunden",
    home: "Startseite",
    promotions: "Aktionen",
    active: "Aktiv",
    inactive: "Inaktiv",
    starts: "Beginn",
    ends: "Ende",
    browseProducts: "Produkte ansehen",
    allPromotions: "Alle Aktionen",
    promoProducts: "Aktionsprodukte",
    promoDetails: "Aktionsdetails",
    promotionType: "Aktionsart",
    discountValue: "Rabattwert",
    startDate: "Startdatum",
    endDate: "Enddatum",
    percentage: "Prozent-Rabatt",
    fixedAmount: "Fixer Rabatt",
    buyXGetY: "Kaufe X, zahle Y",
  },
} satisfies Record<Locale, Record<string, string>>;

const categoryDetailCopy = {
  tr: {
    notFound: "Kategori Bulunamadı",
    home: "Ana Sayfa",
    categories: "Kategoriler",
    allCategories: "Tüm Kategoriler",
    results: "ürün bulundu",
    sortPlaceholder: "Sırala",
    newest: "En Yeni",
    priceAsc: "Fiyat: Düşükten Yükseğe",
    priceDesc: "Fiyat: Yüksekten Düşüğe",
    nameAsc: "İsim: A-Z",
    nameDesc: "İsim: Z-A",
    empty: "Bu kategoride henüz ürün bulunmuyor.",
    allProducts: "Tüm Ürünleri Gör",
  },
  de: {
    notFound: "Kategorie nicht gefunden",
    home: "Startseite",
    categories: "Kategorien",
    allCategories: "Alle Kategorien",
    results: "Produkte gefunden",
    sortPlaceholder: "Sortieren",
    newest: "Neueste",
    priceAsc: "Preis aufsteigend",
    priceDesc: "Preis absteigend",
    nameAsc: "Name A bis Z",
    nameDesc: "Name Z bis A",
    empty: "In dieser Kategorie sind noch keine Produkte verfügbar.",
    allProducts: "Alle Produkte ansehen",
  },
} satisfies Record<Locale, Record<string, string>>;

const aboutPageCopy = {
  tr: {
    title: "Hakkımızda",
    description: "Oba Supermarkt - Wien'de kasap, günlük fırın ürünleri, kahvaltılıklar, temizlik ürünleri ve daha fazlasını bir arada sunan mahalle süpermarketi.",
    region: "Avusturya · Wien",
    intro:
      "Laaer-Berg bölgesinde komşularına hizmet veren bir süpermarkettir. Kasap reyonundan günlük ekmek ve poğaçaya, kahvaltılıklardan temizlik ürünlerine kadar evin günlük ihtiyaçlarını tek çatı altında buluşturmayı önemsiyoruz.",
    paragraph1:
      "Avusturya'da bir market olarak kalite standartlarına uygun ürün seçimi yapıyor, reyonlarımızı düzenli ve hijyenik tutuyoruz. Kasap bölümümüzde günlük taze ürünler, fırın bölümümüzde ekmek ve poğaça çeşitleri, kahvaltılık reyonlarımızda ise güne iyi başlamanız için geniş seçenekler sunuyoruz.",
    paragraph2:
      "Amacımız, hızlı tempolu şehir hayatında size zaman kazandırmak: meyve-sebzeden temel gıdaya, içeceklerden atıştırmalıklara, temizlik ve ev ihtiyaçlarından günlük fırın ürünlerine kadar aklınıza gelebilecek süpermarket ihtiyaçlarını tek yerde tamamlayabilmeniz için buradayız. Haftalık kampanyalarımızla da bütçenize saygı duyuyoruz.",
    freshnessTitle: "Günlük tazelik",
    freshnessBody:
      "Meyve, sebze, kasap ve fırın reyonlarında rotasyonu sık tutuyor; günlük ekmek, poğaça ve taze ürünlerle müşterilerimize her gün yenilenen bir alışveriş deneyimi sunuyoruz.",
    neighborhoodTitle: "Zengin çeşit",
    neighborhoodBody:
      "Wien 1100'de kahvaltılıklar, içecekler, atıştırmalıklar, temizlik ürünleri ve evde ihtiyaç duyulabilecek pek çok ürünü bir arada sunan dolu bir market atmosferi yaratmaya özen gösteriyoruz.",
    trustTitle: "Güven ve düzen",
    trustBody:
      "Etiketli fiyatlar, açık bilgilendirme, düzenli raf yerleşimi ve hijyen odaklı mağaza anlayışı ile müşterilerimize güven veren şeffaf bir hizmet sunuyoruz.",
    locationTitle: "Wien'deki yerimiz",
    locationBodyBefore: "Araç veya toplu taşıma ile ulaşım için haritadan yol tarifi alabilir; çalışma saatlerimizi",
    locationLink: "iletişim sayfamızdan",
    locationBodyAfter: "görebilirsiniz.",
    productsCta: "Ürünleri inceleyin",
    contactCta: "İletişim ve saatler",
  },
  de: {
    title: "Über uns",
    description: "Oba Supermarkt - Ihr Nahversorger in Wien mit Fleischtheke, täglichen Backwaren, Frühstücksartikeln, Reinigungsprodukten und vielem mehr unter einem Dach.",
    region: "Österreich · Wien",
    intro:
      "Oba Supermarkt ist Ihr Nahversorger im Gebiet Laaer Berg. Von der Fleischtheke über täglich frisches Brot und Gebäck bis zu Frühstücksartikeln und Reinigungsprodukten bringen wir den täglichen Einkauf an einem Ort zusammen.",
    paragraph1:
      "Als Markt in Österreich achten wir auf hohe Qualitätsstandards, gepflegte Regale und hygienische Abläufe. In unserer Fleischabteilung finden Sie täglich frische Ware, im Backwarenbereich Brot und Gebäck, und bei den Frühstücksartikeln eine breite Auswahl für den Start in den Tag.",
    paragraph2:
      "Unser Ziel ist es, Ihnen im schnellen Stadtalltag Zeit zu sparen: von Obst und Gemüse über Getränke und Basisprodukte bis hin zu Reinigungs- und Haushaltsartikeln finden Sie alles an einem Ort. Mit unseren Wochenaktionen schonen wir außerdem Ihr Budget.",
    freshnessTitle: "Täglich frisch",
    freshnessBody:
      "In den Abteilungen für Obst, Gemüse, Fleisch und Backwaren achten wir auf raschen Warenwechsel und täglich frische Auslage mit Brot, Gebäck und weiteren frischen Produkten.",
    neighborhoodTitle: "Große Auswahl",
    neighborhoodBody:
      "In Wien 1100 schaffen wir eine gut gefüllte Marktatmosphäre mit Frühstücksartikeln, Getränken, Snacks, Reinigungsprodukten und vielen weiteren Dingen des täglichen Bedarfs.",
    trustTitle: "Vertrauen und Ordnung",
    trustBody:
      "Mit klar ausgezeichneten Preisen, transparenter Information, sauberer Warenpräsentation und hygienischen Abläufen bieten wir verlässlichen Service.",
    locationTitle: "Unser Standort in Wien",
    locationBodyBefore: "Für die Anfahrt mit Auto oder Öffis können Sie die Route in der Karte aufrufen; unsere Öffnungszeiten finden Sie auf unserer",
    locationLink: "Kontaktseite",
    locationBodyAfter: ".",
    productsCta: "Produkte ansehen",
    contactCta: "Kontakt und Öffnungszeiten",
  },
} satisfies Record<Locale, Record<string, string>>;

const contactPageCopy = {
  tr: {
    title: "İletişim",
    description: "Oba Supermarkt iletişim bilgileri. Kasap, günlük fırın ürünleri, kahvaltılıklar, temizlik ürünleri ve tüm market ihtiyaçlarınız için adres, telefon ve çalışma saatleri.",
    hero: "Kasap reyonu, günlük ekmek ve poğaça çeşitleri, kahvaltılıklar, temizlik ürünleri ve diğer market ihtiyaçlarınız için aşağıdaki bilgilerden bize ulaşabilirsiniz. Size yardımcı olmaktan mutluluk duyarız.",
    storeStatus: "Mağaza Durumu",
    open: "Şu An Açık",
    closed: "Şu An Kapalı",
    address: "Adres",
    phone: "Telefon",
    email: "E-posta",
    hours: "Çalışma Saatleri",
    hoursNote: "Günlük alışverişinizi planlayabilmeniz için çalışma saatlerimizi buradan takip edebilirsiniz.",
    social: "Sosyal Medya",
    location: "Konum",
    mapNeedsKey: "Harita entegrasyonu için Google Maps API key gereklidir",
    openMaps: "Google Maps'te Aç",
    open24: "24 Saat Açık",
  },
  de: {
    title: "Kontakt",
    description: "Kontaktinformationen von Oba Supermarkt. Adresse, Telefon und Öffnungszeiten für Fleischtheke, tägliche Backwaren, Frühstücksartikel, Reinigungsprodukte und den gesamten Wocheneinkauf.",
    hero: "Für Fragen zu unserer Fleischtheke, zu täglich frischem Brot und Gebäck, Frühstücksartikeln, Reinigungsprodukten oder Ihrem allgemeinen Einkauf erreichen Sie uns über die folgenden Kontaktdaten. Wir helfen Ihnen gerne weiter.",
    storeStatus: "Marktstatus",
    open: "Jetzt geöffnet",
    closed: "Jetzt geschlossen",
    address: "Adresse",
    phone: "Telefon",
    email: "E-Mail",
    hours: "Öffnungszeiten",
    hoursNote: "Hier finden Sie unsere Öffnungszeiten, damit Sie Ihren täglichen Einkauf besser planen können.",
    social: "Social Media",
    location: "Standort",
    mapNeedsKey: "Für die Kartenintegration wird ein Google-Maps-API-Schlüssel benötigt.",
    openMaps: "In Google Maps öffnen",
    open24: "24 Stunden geöffnet",
  },
} satisfies Record<Locale, Record<string, string>>;

const faqPageCopy: Record<Locale, FaqPageCopy> = {
  tr: {
    title: "Sıkça sorulan sorular",
    description:
      "Oba Supermarkt hakkında çalışma saatleri, adres, ödeme, ürünler ve alışverişe dair merak edilenler.",
    backHome: "Ana sayfa",
    intro:
      "Laaer Berg bölgesindeki mahalle marketimizle ilgili en çok sorulan konuları aşağıda topladık. Başka bir sorunuz varsa iletişim sayfamızdan veya mağazamızdan bize ulaşabilirsiniz.",
    items: [
      {
        question: "Çalışma saatleriniz nedir?",
        answer:
          "Hafta içi genellikle 08:00–19:30, cumartesi 08:00–18:00 saatleri arası hizmet veriyoruz; pazar günü kapalıyız. Güncel ve kesin saatler için web sitemizdeki iletişim bölümündeki çalışma saatleri tablosuna veya mağaza girişindeki bilgilere bakabilirsiniz.",
      },
      {
        question: "Adresiniz ve nasıl ulaşırım?",
        answer:
          "Laaer-Berg-Straße 14, 1100 Wien konumundayız. Harita bağlantısı iletişim ve alt bilgi (footer) alanında yer alır; toplu taşıma veya araçla güzergâhınızı oradan planlayabilirsiniz.",
      },
      {
        question: "Online sipariş veya eve teslimat var mı?",
        answer:
          "Şu anda web sitemiz ürünleri ve kampanyaları tanıtmak içindir; sipariş ve teslimat süreçleri ileride duyurulabilir. Güncel bilgi için mağazamızı arayabilir veya bizi ziyaret edebilirsiniz.",
      },
      {
        question: "Web sitesindeki fiyatlar mağaza ile aynı mı?",
        answer:
          "Kampanya ve ürün bilgileri bilgilendirme amaçlıdır. Kesin fiyat, indirim ve stok durumu mağazadaki etiket ve kasa uygulamasına göre şekillenir; şüphe halinde kasa veya reyon personelimize sorabilirsiniz.",
      },
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer:
          "Tipik olarak nakit ve yaygın banka / kredi kartları kabul edilir. Özel durumlar veya kampanyalar için mağazamızdaki güncel bilgilendirmeyi dikkate alınız.",
      },
      {
        question: "İade veya ürün değişimi nasıl oluyor?",
        answer:
          "Gıda güvenliği ve hijyen nedeniyle birçok ürün grubunda iade koşulları sınırlı olabilir. Fişinizi saklayın; memnuniyetsizlik veya ayıplı mal durumunda aynı gün içinde kasa veya müşteri hizmetlerimize başvurun.",
      },
      {
        question: "Kasap, fırın ve taze ürünler mevcut mu?",
        answer:
          "Evet; kasap reyonu, günlük ekmek ve fırın ürünleri ile taze gıda ve temel ihtiyaç ürünlerini tek çatı altında sunmayı hedefliyoruz. Çeşitler döneme ve tedarike göre değişebilir.",
      },
      {
        question: "Otopark veya bisiklet parkı var mı?",
        answer:
          "Bölgeye göre cadde üzeri veya yakın park imkânları bulunabilir. Araçla gelişinizde çevredeki işaretli alanları ve Wien park kurallarını dikkate almanızı öneririz; mağaza önü için net bilgi için bizi arayabilirsiniz.",
      },
      {
        question: "Sizi telefon veya e-posta ile nasıl bulurum?",
        answer:
          "İletişim sayfasında ve sitenin alt bilgisinde telefon numaramız ve e-posta adresimiz yer alır. Çalışma saatleri dışında bıraktığınız mesajlara mümkün olan en kısa sürede dönüş yapılır.",
      },
    ],
    disclaimer:
      "Bu SSS metni genel bilgilendirme amaçlıdır; özel kampanyalar, yasal düzenlemeler veya mağaza içi duyurular önceliklidir.",
  },
  de: {
    title: "Häufige Fragen",
    description:
      "Antworten zu Öffnungszeiten, Standort, Zahlung, Sortiment und Einkauf bei Oba Supermarkt.",
    backHome: "Startseite",
    intro:
      "Hier finden Sie Antworten rund um unseren Nahversorger am Laaer Berg. Für individuelle Fragen erreichen Sie uns über die Kontaktseite oder direkt im Markt.",
    items: [
      {
        question: "Wie sind Ihre Öffnungszeiten?",
        answer:
          "Montag bis Freitag in der Regel 08:00–19:30 Uhr, Samstag 08:00–18:00 Uhr; sonntags geschlossen. Bitte prüfen Sie die aktuelle Tabelle im Footer oder im Markt – Änderungen sind möglich.",
      },
      {
        question: "Wo liegt der Markt und wie komme ich hin?",
        answer:
          "Unsere Adresse ist Laaer-Berg-Straße 14, 1100 Wien. Den Kartenausschnitt finden Sie auf der Kontaktseite und in der Fußzeile der Website.",
      },
      {
        question: "Gibt es Online-Bestellung oder Lieferung?",
        answer:
          "Die Website informiert über Sortiment und Aktionen; Bestellung und Lieferung können künftig angekündigt werden. Aktuelle Möglichkeiten erfahren Sie telefonisch oder vor Ort im Markt.",
      },
      {
        question: "Stimmen die Preise auf der Website mit dem Markt überein?",
        answer:
          "Online dargestellte Preise und Aktionen dienen der Orientierung. Maßgeblich sind die Preise am Regal und an der Kasse sowie geltende Aktionen im Markt.",
      },
      {
        question: "Welche Zahlungsarten akzeptieren Sie?",
        answer:
          "In der Regel Barzahlung sowie gängige Bank- und Kreditkarten. Hinweise zu Sonderaktionen oder Ausnahmen finden Sie im Markt.",
      },
      {
        question: "Wie funktionieren Umtausch oder Rückgabe?",
        answer:
          "Bei Lebensmitteln gelten aus Hygienegründen oft eingeschränkte Rückgabemöglichkeiten. Bewahren Sie den Kassenbon auf und wenden Sie sich bei Problemen möglichst am selben Tag an die Kasse oder unser Team vor Ort.",
      },
      {
        question: "Gibt es eine Fleischtheke und täglich frische Backwaren?",
        answer:
          "Ja – wir bündeln unter anderem Fleischwaren, täglich frisches Brot und Gebäck sowie Frühstücks- und Grundsortiment. Das Angebot kann je nach Saison und Lieferung variieren.",
      },
      {
        question: "Gibt es Parkplätze oder Fahrradstellplätze?",
        answer:
          "In der Umgebung gibt es je nach Lage Straßenparkplätze oder Kurzparkzonen. Bitte beachten Sie die Wiener Parkregeln; bei konkreten Fragen helfen wir gerne telefonisch weiter.",
      },
      {
        question: "Wie erreiche ich Sie telefonisch oder per E-Mail?",
        answer:
          "Telefonnummer und E-Mail-Adresse stehen auf der Kontaktseite und im Footer. Außerhalb der Öffnungszeiten bemühen wir uns um eine zeitnahe Rückmeldung.",
      },
    ],
    disclaimer:
      "Diese FAQ ersetzt keine individuelle Auskunft vor Ort; Aktionen, gesetzliche Vorgaben und Markthinweise gehen vor.",
  },
};

const legalCopy = {
  privacy: {
    tr: {
      title: "Gizlilik Politikası",
      description: "Oba Supermarkt gizlilik ve kişisel verilerin korunması hakkında bilgilendirme.",
      backHome: "Ana sayfa",
      updated: "Son güncelleme",
      sections: [
        {
          title: "1. Genel",
          paragraphs: [
            "Bu gizlilik politikası, Oba Supermarkt olarak web sitemizi ziyaret ettiğinizde veya bizimle iletişime geçtiğinizde kişisel verilerinizin nasıl işlenebileceğini açıklar.",
            "Politikamız Avusturya ve Avrupa Birliği veri koruma kurallarını dikkate alan genel bir bilgilendirme metni olarak hazırlanmıştır.",
          ],
        },
        {
          title: "2. Veri sorumlusu",
          paragraphs: [
            "Kişisel verilerinizle ilgili sorularınız için iletişim sayfasındaki kanallarımızdan bize ulaşabilirsiniz. Taleplerinizi makul süre içinde yanıtlamayı hedefleriz.",
          ],
        },
        {
          title: "3. Toplanan veriler ve amaçlar",
          paragraphs: ["Örnek olarak aşağıdaki durumlarda veri işlenebilir:"],
          list: [
            "İletişim taleplerinizi yanıtlamak için ad, iletişim bilgisi ve mesaj içeriği.",
            "Teknik güvenlik, hata ayıklama ve iyileştirme amacıyla sınırlı süreli sunucu kayıtları.",
            "Site işlevselliği veya analiz için kullanılan çerez benzeri teknolojiler.",
          ],
        },
        {
          title: "4. Saklama süresi ve güvenlik",
          paragraphs: [
            "Veriler, toplama amacının gerektirdiği süre boyunca ve yasal yükümlülükler çerçevesinde saklanır. Uygun teknik ve organizasyonel önlemler hedeflenir.",
          ],
        },
        {
          title: "5. Haklarınız",
          paragraphs: [
            "Yürürlükteki mevzuat kapsamında erişim, düzeltme, silme, işlemeyi kısıtlama ve itiraz gibi haklarınızı kullanabilirsiniz.",
          ],
        },
        {
          title: "6. Üçüncü taraflar ve bağlantılar",
          paragraphs: [
            "Sitemizde üçüncü taraf sitelere bağlantılar bulunabilir. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz.",
          ],
        },
        {
          title: "7. Politika değişiklikleri",
          paragraphs: [
            "Hizmetlerimiz veya yasal gereklilikler değiştikçe bu metni güncelleyebiliriz.",
          ],
        },
      ],
      disclaimer:
        "Bu sayfadaki metin örnek / taslak niteliğindedir ve hukuki danışmanlık yerine geçmez. Bağlayıcı ve güncel metinler ileride yayınlanacaktır.",
    },
    de: {
      title: "Datenschutz",
      description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten bei Oba Supermarkt.",
      backHome: "Startseite",
      updated: "Zuletzt aktualisiert",
      sections: [
        {
          title: "1. Allgemeines",
          paragraphs: [
            "Diese Datenschutzhinweise erklären in allgemeiner Form, wie personenbezogene Daten verarbeitet werden können, wenn Sie die Website von Oba Supermarkt besuchen oder mit uns Kontakt aufnehmen.",
            "Der Text orientiert sich an den in Österreich und der Europäischen Union geltenden Datenschutzgrundsätzen.",
          ],
        },
        {
          title: "2. Verantwortliche Stelle",
          paragraphs: [
            "Bei Fragen zu personenbezogenen Daten können Sie uns über die Kanäle auf der Kontaktseite erreichen. Wir bemühen uns um eine zeitnahe Rückmeldung.",
          ],
        },
        {
          title: "3. Erhobene Daten und Zwecke",
          paragraphs: ["Zum Beispiel können Daten in folgenden Situationen verarbeitet werden:"],
          list: [
            "Kontaktanfragen per E-Mail oder Telefon inklusive Kontaktdaten und Nachrichteninhalt.",
            "Technische Serverprotokolle für Sicherheit, Fehleranalyse und Verbesserung.",
            "Cookies oder ähnliche Technologien für Funktionalität oder Analyse.",
          ],
        },
        {
          title: "4. Speicherdauer und Sicherheit",
          paragraphs: [
            "Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck und für gesetzliche Verpflichtungen erforderlich ist. Geeignete organisatorische und technische Maßnahmen werden angestrebt.",
          ],
        },
        {
          title: "5. Ihre Rechte",
          paragraphs: [
            "Je nach anwendbarem Recht können Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch geltend machen.",
          ],
        },
        {
          title: "6. Dritte und Links",
          paragraphs: [
            "Unsere Website kann Links zu externen Seiten enthalten. Für deren Datenschutzpraxis sind wir nicht verantwortlich.",
          ],
        },
        {
          title: "7. Änderungen dieser Hinweise",
          paragraphs: [
            "Wir können diese Informationen anpassen, wenn sich unsere Leistungen oder rechtliche Anforderungen ändern.",
          ],
        },
      ],
      disclaimer:
        "Dieser Text ist ein Beispiel bzw. Entwurf und ersetzt keine Rechtsberatung. Verbindliche und aktuelle Fassungen können später veröffentlicht werden.",
    },
  },
  terms: {
    tr: {
      title: "Kullanım Koşulları",
      description: "Oba Supermarkt web sitesi kullanım şartları ve yasal bildirimler.",
      backHome: "Ana sayfa",
      updated: "Son güncelleme",
      sections: [
        {
          title: "1. Kabul",
          paragraphs: [
            "Bu web sitesini kullanarak aşağıdaki kullanım koşullarını okuduğunuzu ve bunlara uymayı kabul ettiğinizi varsayarız.",
          ],
        },
        {
          title: "2. Hizmetin niteliği",
          paragraphs: [
            "Site, Oba Supermarkt hakkında bilgi sunmak ve ürün ya da kampanya içeriklerini tanıtmak amacıyla yayınlanır.",
            "Sitedeki fiyat, stok, kampanya ve görseller bilgilendirme amaçlıdır; mağazadaki güncel durum farklılık gösterebilir.",
          ],
        },
        {
          title: "3. Fikri mülkiyet ve içerik",
          paragraphs: [
            "Sitedeki metinler, görseller, logo ve tasarım unsurları ilgili mevzuat kapsamında korunabilir. İzinsiz çoğaltma ve ticari kullanım yasaktır.",
          ],
        },
        {
          title: "4. Kullanıcı davranışı",
          paragraphs: ["Siteyi kullanırken özellikle şunlara riayet etmeniz beklenir:"],
          list: [
            "Yasalara ve üçüncü kişi haklarına aykırı faaliyette bulunmamak.",
            "Siteyi zarar verecek, aşırı yük oluşturacak veya güvenliği tehdit edecek şekilde kullanmamak.",
            "Yanıltıcı veya kötü niyetli bilgi paylaşmamak.",
          ],
        },
        {
          title: "5. Sorumluluk sınırlaması",
          paragraphs: [
            "Site olduğu gibi sunulur. Mümkün olduğunca doğru ve güncel bilgi verilmeye çalışılsa da eksiksizlik ve kesintisiz erişim garanti edilmez.",
          ],
        },
        {
          title: "6. Bağlantılar",
          paragraphs: [
            "Sitede üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin içeriği veya güvenliğinden sorumlu değiliz.",
          ],
        },
        {
          title: "7. Uygulanacak hukuk ve yargı",
          paragraphs: [
            "Uyuşmazlıklarda Avusturya'daki yürürlükteki hukuk kuralları ve yetkili mahkemeler esas alınabilir; zorunlu tüketici hakları saklıdır.",
          ],
        },
        {
          title: "8. Değişiklikler",
          paragraphs: [
            "Bu koşulları önceden haber vermeksizin güncelleyebiliriz. Yayın tarihi itibarıyla yürürlükte olan metin geçerlidir.",
          ],
        },
      ],
      disclaimer:
        "Bu sayfadaki metin örnek / taslak niteliğindedir ve hukuki danışmanlık yerine geçmez. Bağlayıcı ve güncel metinler ileride yayınlanacaktır.",
    },
    de: {
      title: "Nutzungsbedingungen",
      description: "Nutzungsbedingungen und rechtliche Hinweise für die Website von Oba Supermarkt.",
      backHome: "Startseite",
      updated: "Zuletzt aktualisiert",
      sections: [
        {
          title: "1. Zustimmung",
          paragraphs: [
            "Mit der Nutzung dieser Website gehen wir davon aus, dass Sie die folgenden Nutzungsbedingungen gelesen und akzeptiert haben.",
          ],
        },
        {
          title: "2. Art des Dienstes",
          paragraphs: [
            "Die Website dient dazu, Informationen über Oba Supermarkt bereitzustellen und Produkte sowie Aktionen vorzustellen.",
            "Preise, Verfügbarkeiten, Aktionen und Bilder dienen der Information; der aktuelle Stand im Markt kann abweichen.",
          ],
        },
        {
          title: "3. Geistiges Eigentum und Inhalte",
          paragraphs: [
            "Texte, Bilder, Logos und Gestaltungselemente der Website können rechtlich geschützt sein. Eine unautorisierte Vervielfältigung oder kommerzielle Nutzung ist nicht erlaubt.",
          ],
        },
        {
          title: "4. Verhalten der Nutzer",
          paragraphs: ["Bei der Nutzung der Website wird insbesondere erwartet, dass Sie:"],
          list: [
            "keine rechtswidrigen Handlungen oder Verletzungen fremder Rechte begehen,",
            "die Website nicht schädigen, überlasten oder die Sicherheit gefährden,",
            "keine irreführenden oder böswilligen Informationen verbreiten.",
          ],
        },
        {
          title: "5. Haftungsbeschränkung",
          paragraphs: [
            "Die Website wird wie gesehen bereitgestellt. Trotz sorgfältiger Pflege wird keine Gewähr für Vollständigkeit oder unterbrechungsfreien Zugriff übernommen.",
          ],
        },
        {
          title: "6. Links",
          paragraphs: [
            "Die Website kann Links zu Angeboten Dritter enthalten. Für deren Inhalte oder Sicherheit übernehmen wir keine Verantwortung.",
          ],
        },
        {
          title: "7. Anwendbares Recht und Gerichtsstand",
          paragraphs: [
            "Es kann österreichisches Recht gelten; zwingende Verbraucherrechte bleiben unberührt.",
          ],
        },
        {
          title: "8. Änderungen",
          paragraphs: [
            "Wir können diese Bedingungen ohne Vorankündigung anpassen. Maßgeblich ist die jeweils veröffentlichte Fassung.",
          ],
        },
      ],
      disclaimer:
        "Dieser Text ist ein Beispiel bzw. Entwurf und ersetzt keine Rechtsberatung. Verbindliche und aktuelle Fassungen können später veröffentlicht werden.",
    },
  },
} satisfies {
  privacy: Record<Locale, LegalPageCopy>;
  terms: Record<Locale, LegalPageCopy>;
};

export function getProductDetailCopy(locale: Locale) {
  return productDetailCopy[locale];
}

export function getPromotionDetailCopy(locale: Locale) {
  return promotionDetailCopy[locale];
}

export function getCategoryDetailCopy(locale: Locale) {
  return categoryDetailCopy[locale];
}

export function getAboutPageCopy(locale: Locale) {
  return aboutPageCopy[locale];
}

export function getContactPageCopy(locale: Locale) {
  return contactPageCopy[locale];
}

export function getPrivacyPageCopy(locale: Locale) {
  return legalCopy.privacy[locale];
}

export function getTermsPageCopy(locale: Locale) {
  return legalCopy.terms[locale];
}

export function getFaqPageCopy(locale: Locale) {
  return faqPageCopy[locale];
}





