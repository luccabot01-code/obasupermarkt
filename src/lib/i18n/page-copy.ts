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
    featured: "Im Fokus",
    sku: "SKU",
    savings: "erspart",
    unit: "Einheit",
    stock: "Lagerstand",
    inStock: "Lagernd",
    outOfStock: "Derzeit nicht lagernd",
    barcode: "Barcode",
    fresh: "Frische Ware",
    fast: "Rasche Lieferung",
    quality: "Qualitätsgarantie",
    addToCart: "In den Warenkorb",
    tags: "Schlagwörter",
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
    fixedAmount: "Fixbetrag",
    buyXGetY: "Kauf X, zahl Y",
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
    description: "Oba Supermarkt - der Nachbarschafts-Supermarkt in Wien, der Fleischtheke, tägliche Backwaren, Frühstücksartikel, Reinigungsprodukte und vieles mehr unter einem Dach vereint.",
    region: "Österreich · Wien",
    intro:
      "ein Supermarkt, der seine Nachbarschaft in der Region Laaer Berg bedient. Von der Fleischtheke über tägliches Brot und Poğaça bis hin zu Frühstücksartikeln und Reinigungsprodukten legen wir Wert darauf, die täglichen Bedürfnisse des Haushalts unter einem Dach zusammenzubringen.",
    paragraph1:
      "Als Markt in Österreich wählen wir unsere Produkte nach hohen Qualitätsstandards aus und halten unsere Regale ordentlich und hygienisch. In unserer Fleischabteilung finden Sie täglich frische Ware, in unserer Backabteilung Brot und Poğaça und bei den Frühstücksartikeln eine große Auswahl für einen guten Start in den Tag.",
    paragraph2:
      "Unser Ziel ist es, Ihnen im raschen Stadtalltag Zeit zu sparen: von Obst und Gemüse über Grundnahrungsmittel, von Getränken und Knabbereien bis hin zu Reinigungs- und Haushaltsartikeln und täglichen Backwaren. Damit können Sie alles, was Sie von einem Supermarkt erwarten, an einem Ort erledigen. Mit unseren wöchentlichen Aktionen nehmen wir außerdem Rücksicht auf Ihr Budget.",
    freshnessTitle: "Tägliche Frische",
    freshnessBody:
      "In den Abteilungen für Obst, Gemüse, Fleisch und Backwaren achten wir auf eine rasche Rotation; mit täglichem Brot, Poğaça und frischen Produkten bieten wir unseren Kundinnen und Kunden jeden Tag ein neues Einkaufserlebnis.",
    neighborhoodTitle: "Große Vielfalt",
    neighborhoodBody:
      "In Wien 1100 achten wir darauf, eine gut gefüllte Marktatmosphäre zu schaffen, in der Frühstücksartikel, Getränke, Knabbereien, Reinigungsprodukte und viele weitere Dinge, die man daheim braucht, zusammen angeboten werden.",
    trustTitle: "Vertrauen und Ordnung",
    trustBody:
      "Mit ausgezeichneten Preisen, klaren Informationen, geordneten Regalen und einem auf Hygiene ausgerichteten Marktverständnis bieten wir einen transparenten Service, der unseren Kundinnen und Kunden Vertrauen gibt.",
    locationTitle: "Unser Standort in Wien",
    locationBodyBefore: "Für die Anfahrt mit dem Auto oder öffentlichen Verkehrsmitteln können Sie sich über die Karte die Wegbeschreibung holen; unsere Öffnungszeiten können Sie auf unserer",
    locationLink: "Kontaktseite",
    locationBodyAfter: "sehen.",
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
    description: "Kontaktinformationen von Oba Supermarkt. Adresse, Telefon und Öffnungszeiten für Fleischtheke, tägliche Backwaren, Frühstücksartikel, Reinigungsprodukte und alle Ihre Marktbedürfnisse.",
    hero: "Für Fleischtheke, tägliches Brot und Poğaça, Frühstücksartikel, Reinigungsprodukte und Ihre sonstigen Marktbedürfnisse erreichen Sie uns über die folgenden Informationen. Wir helfen Ihnen gerne weiter.",
    storeStatus: "Marktstatus",
    open: "Jetzt geöffnet",
    closed: "Jetzt geschlossen",
    address: "Adresse",
    phone: "Telefon",
    email: "E-Mail",
    hours: "Öffnungszeiten",
    hoursNote: "Hier können Sie unsere Öffnungszeiten nachsehen, damit Sie Ihren täglichen Einkauf gut planen können.",
    social: "Social Media",
    location: "Standort",
    mapNeedsKey: "Für die Kartenintegration ist ein Google-Maps-API-Schlüssel erforderlich.",
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
      "Wissenswertes zu Öffnungszeiten, Adresse, Bezahlung, Produkten und dem Einkauf bei Oba Supermarkt.",
    backHome: "Startseite",
    intro:
      "Unten haben wir die häufigsten Fragen zu unserem Nachbarschaftsmarkt in der Region Laaer Berg gesammelt. Wenn Sie noch etwas wissen möchten, erreichen Sie uns über unsere Kontaktseite oder direkt in unserem Markt.",
    items: [
      {
        question: "Wie sind Ihre Öffnungszeiten?",
        answer:
          "In der Regel haben wir werktags von 08:00 bis 19:30 Uhr und samstags von 08:00 bis 18:00 Uhr geöffnet; sonntags ist geschlossen. Die aktuellen und genauen Zeiten finden Sie in der Tabelle auf unserer Kontaktseite oder bei den Informationen am Markteingang.",
      },
      {
        question: "Wo liegt der Markt und wie komme ich hin?",
        answer:
          "Sie finden uns in der Laaer-Berg-Straße 14, 1100 Wien. Den Kartenlink gibt es im Kontaktbereich und im Footer; dort können Sie Ihre Route mit den Öffis oder mit dem Auto planen.",
      },
      {
        question: "Gibt es Online-Bestellung oder Lieferung?",
        answer:
          "Derzeit dient unsere Website dazu, Produkte und Aktionen vorzustellen; Bestell- und Liefermöglichkeiten können künftig angekündigt werden. Für aktuelle Informationen können Sie unseren Markt anrufen oder uns besuchen.",
      },
      {
        question: "Stimmen die Preise auf der Website mit dem Markt überein?",
        answer:
          "Aktions- und Produktinformationen dienen der Orientierung. Der genaue Preis, Rabatt und Lagerstand richtet sich nach den Etiketten und dem Kassensystem im Markt; im Zweifel können Sie unser Kassen- oder Regalpersonal fragen.",
      },
      {
        question: "Welche Zahlungsarten akzeptieren Sie?",
        answer:
          "In der Regel werden Bargeld sowie gängige Bank- und Kreditkarten akzeptiert. Bei besonderen Fällen oder Aktionen beachten Sie bitte die aktuellen Informationen im Markt.",
      },
      {
        question: "Wie funktionieren Umtausch oder Rückgabe?",
        answer:
          "Aufgrund von Lebensmittelsicherheit und Hygiene können die Rückgabebedingungen bei vielen Produktgruppen eingeschränkt sein. Bitte bewahren Sie Ihren Beleg auf; bei Unzufriedenheit oder mangelhafter Ware wenden Sie sich noch am selben Tag an unsere Kassa oder unseren Kundenservice.",
      },
      {
        question: "Gibt es eine Fleischtheke und täglich frische Backwaren?",
        answer:
          "Ja; wir möchten unter einem Dach eine Fleischtheke, tägliches Brot und Backwaren sowie frische Lebensmittel und Produkte des täglichen Bedarfs anbieten. Die Auswahl kann je nach Saison und Lieferung variieren.",
      },
      {
        question: "Gibt es Parkplätze oder Fahrradstellplätze?",
        answer:
          "Je nach Lage kann es Parkmöglichkeiten an der Straße oder in der Nähe geben. Wenn Sie mit dem Auto kommen, empfehlen wir, die ausgeschilderten Bereiche und die Wiener Parkregeln zu beachten; für genaue Informationen zum Bereich vor dem Markt können Sie uns gerne anrufen.",
      },
      {
        question: "Wie erreiche ich Sie telefonisch oder per E-Mail?",
        answer:
          "Unsere Telefonnummer und E-Mail-Adresse stehen auf der Kontaktseite und im Footer der Website. Auf Nachrichten, die Sie außerhalb der Öffnungszeiten hinterlassen, antworten wir so bald wie möglich.",
      },
    ],
    disclaimer:
      "Dieser FAQ-Text dient der allgemeinen Information; besondere Aktionen, rechtliche Vorgaben oder Hinweise im Markt haben Vorrang.",
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
      description: "Informationen von Oba Supermarkt zum Datenschutz und zum Schutz personenbezogener Daten.",
      backHome: "Startseite",
      updated: "Zuletzt aktualisiert",
      sections: [
        {
          title: "1. Allgemeines",
          paragraphs: [
            "Diese Datenschutzrichtlinie erklärt, wie Ihre personenbezogenen Daten verarbeitet werden können, wenn Sie unsere Website besuchen oder mit uns Kontakt aufnehmen.",
            "Unsere Richtlinie wurde als allgemeiner Informationstext erstellt, der die Datenschutzregeln in Österreich und der Europäischen Union berücksichtigt.",
          ],
        },
        {
          title: "2. Verantwortliche Stelle",
          paragraphs: [
            "Für Fragen zu Ihren personenbezogenen Daten können Sie uns über die Kanäle auf der Kontaktseite erreichen. Wir bemühen uns, Ihre Anliegen innerhalb angemessener Frist zu beantworten.",
          ],
        },
        {
          title: "3. Erhobene Daten und Zwecke",
          paragraphs: ["Beispielsweise können Daten in den folgenden Situationen verarbeitet werden:"],
          list: [
            "Name, Kontaktdaten und Nachrichteninhalt, um Ihre Kontaktanfragen zu beantworten.",
            "Zeitlich begrenzte Serverprotokolle für technische Sicherheit, Fehlerbehebung und Verbesserungen.",
            "Cookie-ähnliche Technologien, die für die Funktionalität oder Analyse der Website verwendet werden.",
          ],
        },
        {
          title: "4. Speicherdauer und Sicherheit",
          paragraphs: [
            "Daten werden so lange gespeichert, wie es der Zweck der Erhebung erfordert und wie es die gesetzlichen Verpflichtungen vorsehen. Geeignete technische und organisatorische Maßnahmen werden angestrebt.",
          ],
        },
        {
          title: "5. Ihre Rechte",
          paragraphs: [
            "Im Rahmen der geltenden Gesetzgebung können Sie Ihre Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch ausüben.",
          ],
        },
        {
          title: "6. Dritte und Links",
          paragraphs: [
            "Auf unserer Website können Links zu Seiten Dritter enthalten sein. Für die Datenschutzpraktiken dieser Seiten sind wir nicht verantwortlich.",
          ],
        },
        {
          title: "7. Änderungen dieser Hinweise",
          paragraphs: [
            "Wir können diesen Text aktualisieren, wenn sich unsere Dienstleistungen oder die rechtlichen Anforderungen ändern.",
          ],
        },
      ],
      disclaimer:
        "Der Text auf dieser Seite hat Beispiel- bzw. Entwurfscharakter und ersetzt keine Rechtsberatung. Verbindliche und aktuelle Fassungen können später veröffentlicht werden.",
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
          title: "1. Annahme",
          paragraphs: [
            "Durch die Nutzung dieser Website gehen wir davon aus, dass Sie die folgenden Nutzungsbedingungen gelesen haben und sich damit einverstanden erklären.",
          ],
        },
        {
          title: "2. Art des Dienstes",
          paragraphs: [
            "Die Website wird veröffentlicht, um Informationen über Oba Supermarkt bereitzustellen und Produkt- oder Aktionsinhalte vorzustellen.",
            "Preise, Lagerbestand, Aktionen und Bilder auf der Website dienen der Information; die aktuelle Situation im Markt kann abweichen.",
          ],
        },
        {
          title: "3. Geistiges Eigentum und Inhalte",
          paragraphs: [
            "Texte, Bilder, Logos und Designelemente auf der Website können nach den einschlägigen Vorschriften geschützt sein. Unerlaubte Vervielfältigung und kommerzielle Nutzung sind untersagt.",
          ],
        },
        {
          title: "4. Verhalten der Nutzer",
          paragraphs: ["Bei der Nutzung der Website wird insbesondere erwartet, dass Sie Folgendes beachten:"],
          list: [
            "keine Tätigkeiten ausüben, die gegen Gesetze oder die Rechte Dritter verstoßen.",
            "die Website nicht in einer Weise nutzen, die Schaden verursacht, übermäßige Last erzeugt oder die Sicherheit gefährdet.",
            "keine irreführenden oder böswilligen Informationen teilen.",
          ],
        },
        {
          title: "5. Haftungsbeschränkung",
          paragraphs: [
            "Die Website wird so bereitgestellt, wie sie ist. Auch wenn versucht wird, möglichst richtige und aktuelle Informationen bereitzustellen, werden Vollständigkeit und unterbrechungsfreier Zugang nicht garantiert.",
          ],
        },
        {
          title: "6. Links",
          paragraphs: [
            "Auf der Website können Links zu Websites Dritter enthalten sein. Für den Inhalt oder die Sicherheit dieser Seiten sind wir nicht verantwortlich.",
          ],
        },
        {
          title: "7. Anwendbares Recht und Gerichtsstand",
          paragraphs: [
            "Bei Streitigkeiten können die in Österreich geltenden Rechtsvorschriften und die zuständigen Gerichte maßgeblich sein; zwingende Verbraucherrechte bleiben vorbehalten.",
          ],
        },
        {
          title: "8. Änderungen",
          paragraphs: [
            "Wir können diese Bedingungen ohne vorherige Ankündigung aktualisieren. Maßgeblich ist der Text, der zum Zeitpunkt der Veröffentlichung gilt.",
          ],
        },
      ],
      disclaimer:
        "Der Text auf dieser Seite hat Beispiel- bzw. Entwurfscharakter und ersetzt keine Rechtsberatung. Verbindliche und aktuelle Fassungen können später veröffentlicht werden.",
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


