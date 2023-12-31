# OTP Generator With Redis

Bu proje, Redis kullanarak OTP (One-Time Password) oluşturma ve doğrulama işlemlerini gerçekleştiren basit bir Express.js uygulamasını içerir.

## Fonksiyonlar ve İşlevleri

### Express, Redis, OTP-generator ve Diğer Bağımlılıkların İçe Aktarılması

Bu kod bloğu, projenin kullanacağı bağımlılıkların içe aktarılmasını sağlar.

### Redis Bağlantısı ve Hata Yönetimi

Redis sunucusuna bağlantı oluşturulur ve hata durumlarında gerekli hata mesajları görüntülenir.

### OTP Oluşturma ve Redis'e Kaydetme

`/generate-otp/:id` yoluna yapılan GET isteği, belirtilen kullanıcı kimliği (id) için rastgele bir OTP oluşturur ve bu OTP'yi Redis veritabanına kaydeder. Ayrıca, bu OTP'yi bir e-posta ile kullanıcıya gönderir.

### E-posta Gönderme

OTP oluşturulduğunda, `sendMail.js` dosyasında tanımlanan `registerMail` fonksiyonu kullanılarak kullanıcıya OTP içeren bir e-posta gönderilir.

### OTP Doğrulama

`/verify-otp/:id` yoluna yapılan GET isteği, kullanıcının sağladığı OTP'yi Redis'ten alır ve kullanıcının girdiği OTP ile karşılaştırır. Doğrulama başarılıysa "Doğrulandı" mesajı döner, aksi takdirde "Hatalı opt değeri" mesajı döner.


## Kullanım

1. Proje bağımlılıklarını yüklemek için `npm install` komutunu kullanın.
2. Redis sunucusu başlatın ve bağlantı bilgilerini `.env` dosyasına ekleyin.
3. Proje sunucusunu başlatmak için `npm start` komutunu kullanın.
