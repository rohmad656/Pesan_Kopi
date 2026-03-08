import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  Calendar, 
  Users, 
  Clock, 
  ChevronRight, 
  Star, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Menu as MenuIcon,
  X,
  LogIn,
  User,
  Check,
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type Page = 'landing' | 'login' | 'home';
type UserRole = 'customer' | 'admin';

interface Reservation {
  id: string;
  customerName: string;
  date: string;
  time: string;
  guests: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface Order {
  id: number;
  userId: number;
  customerName: string;
  itemName: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  points: number;
}

// --- Components ---

const Navbar = ({ 
  currentPage, 
  onNavigate, 
  isLoggedIn, 
  onLogout,
  userRole,
  userName
}: { 
  currentPage: Page; 
  onNavigate: (page: Page) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  userRole: UserRole;
  userName: string;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => {
            if (isLoggedIn) {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="w-10 h-10 bg-cafe-olive rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Coffee size={20} />
          </div>
          <span className="text-2xl font-serif font-bold tracking-tight">PesenKopi</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => {
              if (isLoggedIn) onNavigate('home');
              else onNavigate('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} 
            className="hover:text-cafe-gold transition-colors"
          >
            Beranda
          </button>
          <button 
            onClick={() => {
              const targetId = 'menu';
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else if (currentPage !== 'landing') {
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-cafe-gold transition-colors"
          >
            Menu
          </button>
          <button 
            onClick={() => {
              const targetId = 'about';
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else if (currentPage !== 'landing') {
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-cafe-gold transition-colors"
          >
            Tentang
          </button>
          <button 
            onClick={() => {
              const targetId = 'contact';
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else if (currentPage !== 'landing') {
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="hover:text-cafe-gold transition-colors"
          >
            Kontak
          </button>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2 text-cafe-olive font-medium"
              >
                <User size={18} />
                <span className="max-w-[100px] truncate">{userName}</span>
              </button>
              <button 
                onClick={onLogout}
                className="btn-outline py-2 px-4 text-sm"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="btn-primary py-2 px-6 flex items-center gap-2"
            >
              <LogIn size={18} />
              Masuk
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            <button onClick={() => { 
              if (isLoggedIn) onNavigate('home'); 
              else onNavigate('landing'); 
              setIsMobileMenuOpen(false); 
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>Beranda</button>
            <button onClick={() => {
              setIsMobileMenuOpen(false);
              const targetId = 'menu';
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else if (currentPage !== 'landing') {
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}>Menu</button>
            <button onClick={() => {
              setIsMobileMenuOpen(false);
              const targetId = 'about';
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else if (currentPage !== 'landing') {
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}>Tentang</button>
            <button onClick={() => {
              setIsMobileMenuOpen(false);
              const targetId = 'contact';
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else if (currentPage !== 'landing') {
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}>Kontak</button>
            {isLoggedIn ? (
              <>
                <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}>
                  {userRole === 'admin' ? 'Panel Admin' : 'Dasbor'}
                </button>
                <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="text-red-500">Keluar</button>
              </>
            ) : (
              <button onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }} className="btn-primary">Masuk</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LandingPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-cafe-gold font-medium tracking-widest uppercase text-sm mb-4 block">Selamat Datang di PesenKopi</span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-tight mb-6">
              Di Mana Setiap <br />
              <span className="italic text-cafe-olive font-light font-serif">Tegukan Bercerita</span>
            </h1>
            <p className="text-lg text-cafe-brown/70 mb-8 max-w-md">
              Nikmati kopi artisanal terbaik dan kue-kue gourmet di ruang yang dirancang untuk koneksi dan kreativitas.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={onStart} className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group">
                Pesan Meja
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline text-lg px-8 py-4"
              >
                Lihat Menu
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[100px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000" 
                alt="Cafe Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-3xl hidden lg:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium">Bergabung dengan 500+ warga lokal</span>
              </div>
              <div className="flex items-center gap-1 text-cafe-gold">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                <span className="text-xs text-cafe-brown ml-1">4.9 (120 ulasan)</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background Elements & Info Box */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cafe-olive/5 -z-0 rounded-l-[200px] hidden lg:flex items-center justify-end pr-12">
          <div className="rotate-90 origin-right translate-y-20 whitespace-nowrap">
            <span className="text-cafe-olive/20 text-8xl font-serif font-bold tracking-tighter uppercase select-none">
              PesenKopi Malang
            </span>
          </div>
          <div className="absolute bottom-20 right-20 text-right">
            <p className="text-cafe-gold font-bold text-sm uppercase tracking-widest mb-2">Jam Operasional</p>
            <p className="text-cafe-brown font-serif text-2xl italic">Setiap Hari<br />08:00 — 22:00</p>
          </div>
        </div>
      </section>

      {/* Menu Preview Section (New) */}
      <section id="menu" className="py-24 px-6 bg-cafe-cream/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Menu Favorit Kami</h2>
            <p className="text-cafe-brown/60">Cicipi kelezatan yang kami sajikan khusus untuk Anda.</p>
            <div className="w-20 h-1 bg-cafe-gold mx-auto mt-4" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Caramel Macchiato", price: "Rp 35.000", img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=300" },
              { name: "Avocado Toast", price: "Rp 45.000", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=300" },
              { name: "Almond Croissant", price: "Rp 28.000", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=300" },
              { name: "Matcha Latte", price: "Rp 38.000", img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=300" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-4 rounded-[32px] text-center"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold mb-1">{item.name}</h4>
                <p className="text-cafe-gold font-bold text-sm">{item.price}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button onClick={onStart} className="btn-primary px-8 py-3">Pesan Sekarang</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Mengapa Memilih PesenKopi?</h2>
            <div className="w-20 h-1 bg-cafe-gold mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Coffee className="text-cafe-olive" />, title: "Kopi Artisanal", desc: "Bersumber dari pertanian berkelanjutan dan dipanggang secara lokal untuk cangkir yang sempurna." },
              { icon: <Calendar className="text-cafe-olive" />, title: "Pemesanan Mudah", desc: "Pesan tempat favorit Anda dalam hitungan detik dengan sistem online kami yang mulus." },
              { icon: <Clock className="text-cafe-olive" />, title: "Ruang Kerja Nyaman", desc: "Wi-Fi berkecepatan tinggi dan sudut-sudut tenang yang sempurna untuk fokus bekerja atau rapat." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-cafe-cream/50 border border-cafe-olive/10 text-center"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-cafe-brown/70 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Hubungi Kami</h2>
              <p className="text-cafe-brown/60 mb-10 leading-relaxed">
                Punya pertanyaan atau ingin melakukan reservasi khusus? Tim kami siap membantu Anda menciptakan momen kopi yang tak terlupakan.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cafe-olive/10 rounded-full flex items-center justify-center text-cafe-olive">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Lokasi Kami</h4>
                    <p className="text-sm text-cafe-brown/60">Jl. Kopi Nikmat No. 123, Malang, Jawa Timur</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cafe-olive/10 rounded-full flex items-center justify-center text-cafe-olive">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Telepon</h4>
                    <p className="text-sm text-cafe-brown/60">0895-1511-4200</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cafe-olive/10 rounded-full flex items-center justify-center text-cafe-olive">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-sm text-cafe-brown/60">mirejrohmad@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-10 rounded-[40px]">
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.'); }}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nama</label>
                    <input type="text" className="w-full px-4 py-3 rounded-2xl border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20" placeholder="Nama Anda" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-2xl border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20" placeholder="email@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pesan</label>
                  <textarea className="w-full px-4 py-3 rounded-2xl border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20 h-32 resize-none" placeholder="Tulis pesan Anda di sini..." required />
                </div>
                <button type="submit" className="btn-primary w-full py-4">Kirim Pesan</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cafe-brown text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="text-cafe-gold" />
              <span className="text-2xl font-serif font-bold">PesenKopi</span>
            </div>
            <p className="text-white/60 max-w-sm mb-8">
              Menciptakan momen kedamaian dan koneksi melalui kopi yang luar biasa dan suasana yang hangat.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><Instagram size={18} /></button>
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><Facebook size={18} /></button>
              <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"><Twitter size={18} /></button>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-cafe-gold transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-cafe-gold transition-colors">Reservasi</a></li>
              <li><a href="#" className="hover:text-cafe-gold transition-colors">Lokasi</a></li>
              <li><a href="#" className="hover:text-cafe-gold transition-colors">Karir</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Kontak</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-center gap-2"><MapPin size={16} /> Malang, Jawa Timur, Indonesia</li>
              <li>mirejrohmad@gmail.com</li>
              <li>089515114200</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 text-center text-white/40 text-sm">
          © 2024 PesenKopi Café & Bistro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const LoginPage = ({ onLogin }: { onLogin: (role: UserRole, userData: User) => void }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const endpoint = isSignUp ? '/api/signup' : '/api/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role })
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("JSON parsing error:", err);
        throw new Error('Server returned invalid response');
      }

      if (response.ok && data.success) {
        onLogin(data.user.role, data.user);
      } else {
        setError(data.message || (isSignUp ? 'Pendaftaran gagal' : 'Login gagal'));
      }
    } catch (err) {
      console.error("Login/Signup error:", err);
      setError('Terjadi kesalahan koneksi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Kata sandi baru tidak cocok');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("JSON parsing error:", err);
        throw new Error('Server returned invalid response');
      }

      if (response.ok && data.success) {
        alert('Kata sandi berhasil diubah. Silakan masuk kembali.');
        setIsForgotPassword(false);
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Gagal mengubah kata sandi');
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError('Terjadi kesalahan koneksi');
    } finally {
      setIsLoading(false);
    }
  };

  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-cafe-cream/30">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full glass-card p-10 rounded-[40px]">
          <h2 className="text-3xl font-bold mb-8">Lupa Kata Sandi</h2>
          <form className="space-y-6" onSubmit={handleForgotPassword}>
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <div>
              <label className="block text-sm font-medium mb-2">Alamat Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Kata Sandi Baru</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ulangi Kata Sandi Baru</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10" required />
            </div>
            <button type="submit" disabled={isLoading} className="btn-primary w-full py-4">{isLoading ? 'Memproses...' : 'Ubah Kata Sandi'}</button>
          </form>
          <button onClick={() => setIsForgotPassword(false)} className="mt-6 w-full text-cafe-olive font-bold hover:underline">Kembali ke Login</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-cafe-cream/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card p-10 rounded-[40px]"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-cafe-olive rounded-full flex items-center justify-center text-white mx-auto mb-4">
            <Coffee size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-2">{isSignUp ? 'Buat Akun' : 'Selamat Datang Kembali'}</h2>
          <p className="text-cafe-brown/60">
            {isSignUp ? 'Mulai perjalanan kopi Anda bersama kami' : 'Masuk untuk mengelola reservasi Anda'}
          </p>
        </div>

        <div className="flex bg-cafe-cream/50 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => setRole('customer')}
            className={cn(
              "flex-1 py-2 rounded-xl text-sm font-bold transition-all",
              role === 'customer' ? "bg-white shadow-sm text-cafe-olive" : "text-cafe-brown/40"
            )}
          >
            Pelanggan
          </button>
          <button 
            onClick={() => setRole('admin')}
            className={cn(
              "flex-1 py-2 rounded-xl text-sm font-bold transition-all",
              role === 'admin' ? "bg-white shadow-sm text-cafe-olive" : "text-cafe-brown/40"
            )}
          >
            Admin
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <button 
            onClick={async () => {
              setIsLoading(true);
              setError('');
              try {
                const response = await fetch('/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    email: 'user@google.com', 
                    name: 'User Google', 
                    role: role, 
                    isGoogle: true 
                  })
                });

                let data;
                try {
                  data = await response.json();
                } catch (err) {
                  console.error("JSON parsing error:", err);
                  throw new Error('Server returned invalid response');
                }

                if (response.ok && data.success) {
                  onLogin(data.user.role, data.user);
                } else {
                  setError(data.message || 'Google login gagal');
                }
              } catch (err) {
                console.error("Google login error:", err);
                setError('Terjadi kesalahan koneksi');
              } finally {
                setIsLoading(false);
              }
            }}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10 hover:bg-cafe-cream transition-all font-medium disabled:opacity-50"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Masuk dengan Google
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cafe-olive/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-cafe-brown/40">Atau</span>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20 transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2">Alamat Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20 transition-all"
              placeholder={role === 'admin' ? 'admin@pesenkopi.com' : 'john@example.com'}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Kata Sandi</label>
              {!isSignUp && (
                <button 
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs text-cafe-olive hover:underline"
                >
                  Lupa kata sandi?
                </button>
              )}
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-2xl bg-white border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary w-full text-lg py-4 mt-4 disabled:opacity-50"
          >
            {isLoading ? 'Memproses...' : (isSignUp ? 'Daftar' : 'Masuk')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-cafe-brown/60">
            {isSignUp ? 'Sudah punya akun?' : "Belum punya akun?"}{' '}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-cafe-olive font-bold hover:underline"
            >
              {isSignUp ? 'Masuk' : 'Daftar'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const HomePage = ({ user }: { user: User }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRedeemSuccess, setShowRedeemSuccess] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [redeemCode, setRedeemCode] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  
  // Form State
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingNotes, setBookingNotes] = useState('');

  const fetchData = async () => {
    try {
      const [resResponse, ordersResponse] = await Promise.all([
        fetch(`/api/reservations?userId=${user.id}&role=${user.role}`),
        fetch(`/api/orders?userId=${user.id}&role=${user.role}`)
      ]);
      const resData = await resResponse.json();
      const ordersData = await ordersResponse.json();
      setReservations(resData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          customerName: user.name,
          date: bookingDate,
          time: bookingTime,
          guests: bookingGuests,
          notes: bookingNotes
        })
      });
      if (response.ok) {
        setShowBookingModal(false);
        fetchData();
        setShowBookingSuccess(true);
        setTimeout(() => setShowBookingSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Booking failed", err);
    }
  };

  const handleOrder = async () => {
    if (!selectedItem) return;
    setShowOrderModal(false);
    setShowPaymentModal(true);
  };

  const confirmPayment = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          customerName: user.name,
          itemName: selectedItem.name,
          quantity: orderQuantity,
          totalPrice: selectedItem.price * orderQuantity
        })
      });
      if (response.ok) {
        setShowPaymentModal(false);
        setShowSuccessModal(true);
        fetchData();
        setTimeout(() => setShowSuccessModal(false), 3000);
      }
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  const handleRedeem = async () => {
    if (user.points < 10) {
      alert("Poin Anda belum cukup. Kumpulkan 10 poin untuk 1 cup gratis!");
      return;
    }
    
    if (!confirm("Tukarkan 10 poin untuk 1 cup kopi gratis?")) return;

    try {
      const response = await fetch('/api/redeem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, pointsToRedeem: 10 })
      });
      const data = await response.json();
      if (data.success) {
        const code = "PK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
        setRedeemCode(code);
        setShowRedeemSuccess(true);
      }
    } catch (err) {
      console.error("Redeem failed", err);
    }
  };

  const handleDelete = async (id: string) => {
    setReservationToDelete(id);
    setShowCancelConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!reservationToDelete) return;
    try {
      const response = await fetch(`/api/reservations/${reservationToDelete}`, { method: 'DELETE' });
      if (response.ok) {
        fetchData();
        setShowCancelConfirmModal(false);
        setReservationToDelete(null);
      } else {
        alert('Gagal membatalkan reservasi.');
      }
    } catch (err) {
      console.error("Delete failed", err);
      alert('Terjadi kesalahan saat membatalkan reservasi.');
    }
  };

  const menuItems = [
    { name: "Caramel Macchiato", price: 35000, img: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=200" },
    { name: "Avocado Toast", price: 45000, img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=200" },
    { name: "Almond Croissant", price: 28000, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=200" },
    { name: "Iced Americano", price: 25000, img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=200" },
    { name: "Cappuccino", price: 32000, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=200" },
    { name: "Matcha Latte", price: 38000, img: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=200" },
    { name: "Berry Smoothie", price: 42000, img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=200" },
    { name: "Tuna Sandwich", price: 48000, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=200" },
    { name: "Espresso", price: 20000, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=200" },
    { name: "Waffle Classic", price: 35000, img: "https://images.unsplash.com/photo-1562329265-95a6d7a83440?auto=format&fit=crop&q=80&w=200" },
    { name: "Cold Brew", price: 30000, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=200" },
    { name: "Cheese Cake", price: 38000, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=200" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <AnimatePresence>
        {showBookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <Check size={20} />
            Reservasi berhasil dibuat!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Selamat datang kembali, {user.name}!</h1>
          <p className="text-cafe-brown/60 italic font-serif">"Kopi pagi adalah cara favorit saya untuk memulai hari."</p>
        </div>
        <button 
          onClick={() => setShowBookingModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Calendar size={20} />
          Reservasi Baru
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mb-16">
        {/* Reservation List */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            Reservasi Anda
            <span className="text-sm font-normal bg-cafe-olive/10 text-cafe-olive px-2 py-1 rounded-full">
              {reservations.length}
            </span>
          </h2>
          
          {isLoading ? (
            <div className="text-center py-20">Memuat data...</div>
          ) : reservations.map((res) => (
            <motion.div 
              key={res.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-cafe-cream rounded-2xl flex flex-col items-center justify-center text-cafe-olive">
                  <span className="text-xs font-bold uppercase">{new Date(res.date).toLocaleString('id-ID', { month: 'short' })}</span>
                  <span className="text-2xl font-bold">{new Date(res.date).getDate()}</span>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1 text-sm text-cafe-brown/60">
                      <Clock size={14} /> {res.time}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-cafe-brown/60">
                      <Users size={14} /> {res.guests} Tamu
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Meja untuk {res.guests} di Aula Utama PesenKopi</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={cn(
                  "px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  res.status === 'confirmed' ? "bg-green-100 text-green-700" : 
                  res.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                )}>
                  {res.status}
                </span>
                <button 
                  onClick={() => handleDelete(res.id)}
                  className="text-cafe-brown/40 hover:text-red-500 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          ))}

          {!isLoading && reservations.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-[40px] border-2 border-dashed border-cafe-olive/20">
              <Calendar className="mx-auto text-cafe-olive/20 mb-4" size={48} />
              <p className="text-cafe-brown/40">Belum ada reservasi. Siap untuk minum kopi?</p>
            </div>
          )}

          {/* Order History */}
          <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Riwayat Pesanan
              <span className="text-sm font-normal bg-cafe-gold/10 text-cafe-gold px-2 py-1 rounded-full">
                {orders.length}
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 bg-white/60 rounded-2xl border border-cafe-olive/5 flex justify-between items-center">
                  <div>
                    <p className="font-bold">{order.itemName}</p>
                    <p className="text-xs text-cafe-brown/40">{order.quantity}x • Rp {order.totalPrice.toLocaleString('id-ID')}</p>
                  </div>
                  <span className={cn(
                    "text-[10px] uppercase font-bold px-2 py-1 rounded-md",
                    order.status === 'completed' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {order.status}
                  </span>
                </div>
              ))}
              {orders.length === 0 && !isLoading && (
                <p className="col-span-2 text-center py-8 text-cafe-brown/40 italic">Belum ada pesanan hari ini.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-8">
          {/* Loyalty Card */}
          <div className="p-8 rounded-[40px] bg-cafe-olive text-white relative overflow-hidden shadow-2xl shadow-cafe-olive/20">
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">Hadiah Loyalitas</h3>
                  <p className="text-white/60 text-xs">Member Gold PesenKopi</p>
                </div>
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                  <Coffee size={20} className="text-cafe-gold" />
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-4xl font-bold">{user.points} <span className="text-white/40 text-lg font-normal">/ 10</span></span>
                  <span className="text-xs font-bold text-cafe-gold uppercase tracking-widest">
                    {user.points >= 10 ? 'Siap Ditukar!' : 'Hampir Selesai!'}
                  </span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (user.points / 10) * 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cafe-gold to-yellow-400" 
                  />
                </div>
              </div>
              
              <p className="text-sm text-white/70 leading-relaxed mb-6">
                {user.points >= 10 
                  ? "Poin Anda sudah cukup! Tukarkan sekarang untuk kopi gratis." 
                  : `Kumpulkan ${10 - user.points} poin lagi untuk mendapatkan 1 Cup Gratis pilihan Anda!`}
              </p>
              
              <button 
                onClick={handleRedeem}
                disabled={user.points < 10}
                className="w-full py-4 bg-cafe-gold hover:bg-white hover:text-cafe-olive text-cafe-brown font-bold rounded-2xl transition-all shadow-lg shadow-black/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {user.points < 10 ? `Kurang ${10 - user.points} Poin` : 'Tukarkan Poin'}
              </button>
            </div>
            <Coffee size={180} className="absolute -bottom-16 -right-16 text-white/5 rotate-12 pointer-events-none" />
          </div>

          {/* Voucher & Promo */}
          <div className="glass-card p-8 rounded-[40px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Voucher & Promo</h3>
              <span className="text-[10px] font-bold bg-cafe-gold/20 text-cafe-gold px-2 py-1 rounded-md uppercase tracking-wider">3 Baru</span>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-cafe-cream/50 border border-cafe-olive/5 flex gap-4 items-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Star className="text-cafe-gold" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Diskon 20% Pelajar</h4>
                  <p className="text-[10px] text-cafe-brown/60">Berlaku setiap hari Senin - Jumat</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-cafe-cream/50 border border-cafe-olive/5 flex gap-4 items-center opacity-60">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="text-cafe-olive" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Happy Hour 14:00</h4>
                  <p className="text-[10px] text-cafe-brown/60">Beli 1 Gratis 1 (Espresso Based)</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => alert('Fitur ini akan segera hadir!')}
              className="w-full mt-6 py-3 text-cafe-olive text-xs font-bold hover:underline"
            >
              Lihat Semua Penawaran
            </button>
          </div>
        </div>
      </div>

      {/* Menu Cepat Section - Grid Box-Box */}
      <div id="menu" className="space-y-8 mb-20">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold mb-2">Menu Cepat</h2>
            <p className="text-cafe-brown/60">Pilih menu favorit Anda dan pesan sekarang!</p>
          </div>
          <button className="text-cafe-olive font-bold text-sm hover:underline">Lihat Menu Lengkap</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {menuItems.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              onClick={() => { setSelectedItem(item); setOrderQuantity(1); setShowOrderModal(true); }}
              className="glass-card p-4 rounded-[32px] cursor-pointer group flex flex-col items-center text-center transition-all hover:shadow-xl hover:shadow-cafe-olive/10"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-md">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
              </div>
              <h3 className="font-bold text-sm mb-1 line-clamp-1">{item.name}</h3>
              <p className="text-cafe-gold font-bold text-xs">Rp {item.price.toLocaleString('id-ID')}</p>
              <div className="mt-3 w-8 h-8 rounded-full bg-cafe-cream flex items-center justify-center text-cafe-olive opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Section for Home Page */}
      <div id="about" className="mb-20">
        <div className="glass-card p-10 rounded-[40px] bg-white/40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Tentang PesenKopi</h2>
              <p className="text-cafe-brown/70 leading-relaxed mb-6">
                PesenKopi hadir sebagai tempat pelarian dari hiruk pikuk kota. Kami percaya bahwa secangkir kopi yang baik dapat mengubah hari seseorang.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white/60 rounded-2xl border border-cafe-olive/5">
                  <h4 className="font-bold text-cafe-olive mb-1">Kualitas</h4>
                  <p className="text-xs text-cafe-brown/60">Biji kopi pilihan dari petani lokal terbaik.</p>
                </div>
                <div className="p-4 bg-white/60 rounded-2xl border border-cafe-olive/5">
                  <h4 className="font-bold text-cafe-olive mb-1">Kenyamanan</h4>
                  <p className="text-xs text-cafe-brown/60">Ruang yang tenang untuk bekerja atau bersantai.</p>
                </div>
              </div>
            </div>
            <div className="rounded-[32px] overflow-hidden h-64 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800" 
                alt="Cafe Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section for Home Page */}
      <div id="contact" className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-[32px] flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-cafe-cream rounded-2xl flex items-center justify-center text-cafe-olive mb-4">
              <MapPin size={24} />
            </div>
            <h4 className="font-bold mb-2">Lokasi</h4>
            <p className="text-sm text-cafe-brown/60">Malang, Jawa Timur, Indonesia</p>
          </div>
          <div className="glass-card p-8 rounded-[32px] flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-cafe-cream rounded-2xl flex items-center justify-center text-cafe-olive mb-4">
              <Phone size={24} />
            </div>
            <h4 className="font-bold mb-2">Telepon</h4>
            <p className="text-sm text-cafe-brown/60">0895-1511-4200</p>
          </div>
          <div className="glass-card p-8 rounded-[32px] flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-cafe-cream rounded-2xl flex items-center justify-center text-cafe-olive mb-4">
              <Mail size={24} />
            </div>
            <h4 className="font-bold mb-2">Email</h4>
            <p className="text-sm text-cafe-brown/60">mirejrohmad@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
              className="absolute inset-0 bg-cafe-brown/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[40px] p-10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-cafe-cream transition-colors"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-8">Pesan Meja</h2>
              <form className="space-y-6" onSubmit={handleBooking}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Tanggal</label>
                    <input 
                      type="date" 
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Waktu</label>
                    <select 
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20"
                    >
                      <option>08:00</option>
                      <option>09:00</option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>14:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                      <option>17:00</option>
                      <option>18:00</option>
                      <option>19:00</option>
                      <option>20:00</option>
                      <option>21:00</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Jumlah Tamu</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <button 
                        key={num}
                        type="button"
                        onClick={() => setBookingGuests(num)}
                        className={cn(
                          "flex-1 py-3 rounded-2xl border border-cafe-olive/10 transition-all font-bold",
                          bookingGuests === num ? "bg-cafe-olive text-white" : "hover:bg-cafe-cream"
                        )}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Permintaan Khusus</label>
                  <textarea 
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-cafe-olive/10 focus:outline-none focus:ring-2 focus:ring-cafe-olive/20 h-24 resize-none"
                    placeholder="Ulang tahun, kursi dekat jendela, dll."
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  Konfirmasi Reservasi
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Order Modal */}
        {showOrderModal && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOrderModal(false)}
              className="absolute inset-0 bg-cafe-brown/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowOrderModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-cafe-cream transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-32 h-32 rounded-3xl overflow-hidden mb-6 shadow-lg">
                  <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h2 className="text-3xl font-bold mb-2">{selectedItem.name}</h2>
                <p className="text-cafe-gold font-bold text-xl">Rp {selectedItem.price.toLocaleString('id-ID')}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-4 text-center">Jumlah Pesanan</label>
                  <div className="flex items-center justify-center gap-8">
                    <button 
                      onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                      className="w-12 h-12 rounded-full border-2 border-cafe-olive/20 flex items-center justify-center text-cafe-olive hover:bg-cafe-olive hover:text-white transition-all text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="text-4xl font-bold w-12 text-center">{orderQuantity}</span>
                    <button 
                      onClick={() => setOrderQuantity(orderQuantity + 1)}
                      className="w-12 h-12 rounded-full border-2 border-cafe-olive/20 flex items-center justify-center text-cafe-olive hover:bg-cafe-olive hover:text-white transition-all text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="bg-cafe-cream/30 p-6 rounded-3xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-cafe-brown/60">Total Harga</span>
                    <span className="text-2xl font-bold text-cafe-olive">
                      Rp {(selectedItem.price * orderQuantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleOrder}
                  className="btn-primary w-full py-4 text-lg"
                >
                  Konfirmasi Pesanan
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPaymentModal(false)}
              className="absolute inset-0 bg-cafe-brown/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl overflow-hidden text-center"
            >
              <h2 className="text-2xl font-bold mb-6">Pembayaran</h2>
              <p className="mb-8">Total yang harus dibayar: <span className="font-bold text-cafe-olive">Rp {(selectedItem.price * orderQuantity).toLocaleString('id-ID')}</span></p>
              <button 
                onClick={confirmPayment}
                className="btn-primary w-full py-4 text-lg"
              >
                Bayar Sekarang
              </button>
            </motion.div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cafe-brown/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl overflow-hidden text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-2">Pesanan Berhasil!</h2>
              <p className="text-cafe-brown/60">Terima kasih telah memesan di PesenKopi.</p>
            </motion.div>
          </div>
        )}

        {/* Redeem Success Modal */}
        {showRedeemSuccess && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setShowRedeemSuccess(false); window.location.reload(); }}
              className="absolute inset-0 bg-cafe-brown/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-sm rounded-[40px] p-10 shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee size={40} />
              </div>
              <h2 className="text-3xl font-bold mb-2 text-cafe-olive">Berhasil Ditukar!</h2>
              <p className="text-cafe-brown/60 mb-8">Tunjukkan kode di bawah ini kepada barista kami untuk mendapatkan kopi gratis Anda.</p>
              
              <div className="bg-cafe-cream/50 p-6 rounded-3xl border-2 border-dashed border-cafe-olive/20 mb-8">
                <span className="text-4xl font-mono font-bold tracking-widest text-cafe-olive">{redeemCode}</span>
              </div>
              
              <button 
                onClick={() => { setShowRedeemSuccess(false); window.location.reload(); }}
                className="btn-primary w-full py-4"
              >
                Selesai
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCancelConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelConfirmModal(false)}
              className="absolute inset-0 bg-cafe-brown/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white p-10 rounded-[40px] max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-4">Batalkan Reservasi</h2>
              <p className="text-cafe-brown/60 mb-8">Apakah Anda yakin ingin membatalkan reservasi ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCancelConfirmModal(false)}
                  className="flex-1 py-3 rounded-2xl bg-cafe-cream text-cafe-brown font-bold"
                >
                  Tidak
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold"
                >
                  Ya, Batalkan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminHomePage = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<'management' | 'reports'>('management');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [resResponse, ordersResponse] = await Promise.all([
        fetch(`/api/reservations?role=admin`),
        fetch(`/api/orders?role=admin`)
      ]);
      const resData = await resResponse.json();
      const ordersData = await ordersResponse.json();
      setReservations(resData);
      setOrders(ordersData);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Reservasi', value: reservations.length.toString(), icon: <Calendar className="text-cafe-olive" /> },
    { label: 'Total Pesanan', value: orders.length.toString(), icon: <Coffee className="text-cafe-gold" /> },
    { label: 'Pendapatan Estimasi', value: `Rp ${(reservations.filter(r => r.status === 'confirmed').length * 150000 + orders.reduce((acc, o) => acc + o.totalPrice, 0)).toLocaleString('id-ID')}`, icon: <Star className="text-cafe-gold" /> },
  ];

  const handleStatusChange = async (id: string, newStatus: Reservation['status']) => {
    try {
      await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchData();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  const handleOrderStatusChange = async (id: number, newStatus: Order['status']) => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchData();
    } catch (err) {
      console.error("Order status update failed", err);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Admin PesenKopi</h1>
        <p className="text-cafe-brown/60">Kelola reservasi dan pantau performa kafe Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-[40px] flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-cafe-brown/60 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
            <div className="w-14 h-14 bg-cafe-cream rounded-2xl flex items-center justify-center">
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div id="menu" className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('management')}
          className={cn(
            "px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2",
            activeTab === 'management' ? "bg-cafe-olive text-white shadow-lg" : "bg-white text-cafe-brown/40 hover:bg-cafe-cream"
          )}
        >
          <Calendar size={18} />
          Manajemen
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={cn(
            "px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2",
            activeTab === 'reports' ? "bg-cafe-olive text-white shadow-lg" : "bg-white text-cafe-brown/40 hover:bg-cafe-cream"
          )}
        >
          <FileText size={18} />
          Laporan
        </button>
      </div>

      <div id="about" className="hidden">Tentang Kami</div>
      <div id="contact" className="hidden">Kontak Kami</div>

      {activeTab === 'management' ? (
        <div className="space-y-12">
          {/* Reservations Table */}
          <div className="glass-card rounded-[40px] overflow-hidden">
            <div className="p-8 border-b border-cafe-olive/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Daftar Reservasi</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cafe-cream/30 text-cafe-brown/60 text-xs uppercase tracking-widest">
                    <th className="px-8 py-4 font-bold">Pelanggan</th>
                    <th className="px-8 py-4 font-bold">Jadwal</th>
                    <th className="px-8 py-4 font-bold">Tamu</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4 font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-olive/5">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-cafe-cream/20 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold">{res.customerName}</div>
                        <div className="text-xs text-cafe-brown/40">ID: #{res.id}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium">{res.date}</div>
                        <div className="text-xs text-cafe-brown/40">{res.time}</div>
                      </td>
                      <td className="px-8 py-6 font-medium">{res.guests} Orang</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          res.status === 'confirmed' ? "bg-green-100 text-green-700" : 
                          res.status === 'pending' ? "bg-amber-100 text-amber-700" : 
                          "bg-red-100 text-red-700"
                        )}>
                          {res.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {res.status === 'pending' && (
                            <button 
                              onClick={() => handleStatusChange(res.id, 'confirmed')}
                              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                              title="Konfirmasi"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleStatusChange(res.id, 'cancelled')}
                            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            title="Batalkan"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Orders Table */}
          <div className="glass-card rounded-[40px] overflow-hidden">
            <div className="p-8 border-b border-cafe-olive/5 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Daftar Pesanan Menu Cepat</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-cafe-cream/30 text-cafe-brown/60 text-xs uppercase tracking-widest">
                    <th className="px-8 py-4 font-bold">Pelanggan</th>
                    <th className="px-8 py-4 font-bold">Item</th>
                    <th className="px-8 py-4 font-bold">Total</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4 font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cafe-olive/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-cafe-cream/20 transition-colors">
                      <td className="px-8 py-6">
                        <div className="font-bold">{order.customerName}</div>
                        <div className="text-xs text-cafe-brown/40">{new Date(order.createdAt).toLocaleString('id-ID')}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium">{order.itemName}</div>
                        <div className="text-xs text-cafe-brown/40">{order.quantity}x</div>
                      </td>
                      <td className="px-8 py-6 font-bold text-cafe-olive">Rp {order.totalPrice.toLocaleString('id-ID')}</td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          order.status === 'completed' ? "bg-green-100 text-green-700" : 
                          order.status === 'pending' ? "bg-amber-100 text-amber-700" : 
                          "bg-red-100 text-red-700"
                        )}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {order.status === 'pending' && (
                            <button 
                              onClick={() => handleOrderStatusChange(order.id, 'completed')}
                              className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                              title="Selesaikan"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button 
                            onClick={() => handleOrderStatusChange(order.id, 'cancelled')}
                            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            title="Batalkan"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-[40px]">
            <h2 className="text-2xl font-bold mb-6">Laporan Aktivitas Kafe</h2>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="p-6 bg-cafe-cream/30 rounded-3xl">
                <p className="text-xs text-cafe-brown/60 uppercase font-bold mb-1">Total Reservasi</p>
                <p className="text-2xl font-bold">{reservations.length}</p>
              </div>
              <div className="p-6 bg-cafe-gold/10 rounded-3xl">
                <p className="text-xs text-cafe-gold uppercase font-bold mb-1">Total Pesanan</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <div className="p-6 bg-green-50 rounded-3xl">
                <p className="text-xs text-green-600 uppercase font-bold mb-1">Dikonfirmasi/Selesai</p>
                <p className="text-2xl font-bold text-green-700">
                  {reservations.filter(r => r.status === 'confirmed').length + orders.filter(o => o.status === 'completed').length}
                </p>
              </div>
              <div className="p-6 bg-cafe-olive/10 rounded-3xl">
                <p className="text-xs text-cafe-olive uppercase font-bold mb-1">Total Pendapatan</p>
                <p className="text-2xl font-bold text-cafe-olive">
                  Rp {(reservations.filter(r => r.status === 'confirmed').length * 150000 + orders.reduce((acc, o) => acc + o.totalPrice, 0)).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
            
            <div className="border-t border-cafe-olive/10 pt-8">
              <h3 className="text-lg font-bold mb-4">Ringkasan Aktivitas Terakhir</h3>
              <div className="space-y-4">
                {[...reservations, ...orders].sort((a: any, b: any) => {
                  const dateA = a.createdAt || a.date;
                  const dateB = b.createdAt || b.date;
                  return new Date(dateB).getTime() - new Date(dateA).getTime();
                }).slice(0, 10).map((item: any, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-cafe-olive/5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        (item.status === 'confirmed' || item.status === 'completed') ? "bg-green-500" : item.status === 'pending' ? "bg-amber-500" : "bg-red-500"
                      )} />
                      <div>
                        <p className="font-bold text-sm">{item.customerName}</p>
                        <p className="text-xs text-cafe-brown/40">
                          {item.itemName ? `Pesanan: ${item.itemName}` : `Reservasi: ${item.guests} Tamu`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {item.totalPrice ? `Rp ${item.totalPrice.toLocaleString('id-ID')}` : `${item.date}`}
                      </p>
                      <p className="text-[10px] uppercase font-bold text-cafe-brown/40">{item.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (role: UserRole, userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
    setUserRole(role);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserRole('customer');
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-cafe-cream/30">
      <Navbar 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        userRole={userRole}
        userName={user?.name || ''}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStart={() => isLoggedIn ? setCurrentPage('home') : setCurrentPage('login')} />
            </motion.div>
          )}

          {currentPage === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <LoginPage onLogin={handleLogin} />
            </motion.div>
          )}

          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {userRole === 'admin' ? <AdminHomePage user={user!} /> : <HomePage user={user!} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
