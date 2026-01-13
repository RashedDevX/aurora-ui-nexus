
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Menu, 
  X, 
  Zap, 
  Shield, 
  Layers, 
  Layout, 
  ChevronRight, 
  ArrowUp, 
  Github, 
  Twitter, 
  Linkedin, 
  Play,
  Globe,
  Cpu,
  Monitor
} from 'lucide-react';

// --- Components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '#demo' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center py-4 px-4 md:px-6 ${
          isScrolled ? 'top-2' : 'top-0'
        }`}
      >
        <div 
          className={`max-w-7xl w-full flex items-center justify-between px-6 md:px-8 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled ? 'glass shadow-2xl backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="text-black fill-black" size={20} />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap uppercase">
              AURORA<span className="text-yellow-400">UI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="px-5 py-2 glass rounded-full text-sm font-semibold hover:bg-yellow-400 hover:text-black transition-all active:scale-95 border-yellow-500/30">
              Sign In
            </button>
          </div>

          <button 
            className="md:hidden text-white p-2 glass rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <Zap className="text-black fill-black" size={18} />
                </div>
                <span className="text-xl font-bold">AURORA</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 glass rounded-full">
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-6 items-center">
              {navLinks.map((link, idx) => (
                <motion.a 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-black hover:text-yellow-400 transition-colors tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto">
              <button className="w-full py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-2xl text-xl shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ScrambleText: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((char, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayText}</span>;
};

const FeatureCard: React.FC<{ title: string, desc: string, icon: React.ReactNode, borderColor: string }> = ({ title, desc, icon, borderColor }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`glass p-8 rounded-3xl border-t-2 ${borderColor} flex flex-col gap-4 relative overflow-hidden group`}
  >
    <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
    <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-2 shadow-inner">
      {icon}
    </div>
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
    <div className="mt-4 flex items-center text-sm font-semibold group-hover:gap-2 group-hover:text-yellow-400 transition-all cursor-pointer">
      Learn More <ChevronRight size={16} />
    </div>
  </motion.div>
);

const PricingCard: React.FC<{ title: string, price: string, features: string[], isPopular?: boolean }> = ({ title, price, features, isPopular }) => {
  const content = (
    <div className="glass h-full p-10 rounded-[15px] flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold">${price}</span>
          <span className="text-gray-400">/mo</span>
        </div>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-gray-300">
            <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
            </div>
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-xl font-bold transition-all active:scale-95 ${
        isPopular ? 'bg-yellow-400 text-black hover:bg-yellow-300' : 'glass border-white/20 hover:bg-white/10'
      }`}>
        Choose Plan
      </button>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={isPopular ? 'rainbow-border' : 'p-[1px] rounded-2xl bg-white/10'}
    >
      {content}
    </motion.div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <motion.div style={{ scale, opacity }} className="text-center max-w-5xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-yellow-500/20 text-xs md:text-sm font-medium text-yellow-400 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            v2.5 Release is now live
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            <ScrambleText text="The Future is Aurora" />
            <br />
            <span className="text-gradient">Experience Fluidity.</span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium"
          >
            Harness the power of multi-color mesh gradients and high-converting layouts. Designed for performance, built for conversion.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(234, 179, 8, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl font-bold text-black text-base md:text-lg shadow-xl"
            >
              Get Started Free
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 md:px-10 py-4 md:py-5 glass border-white/20 rounded-2xl font-bold text-base md:text-lg flex items-center justify-center gap-2"
            >
              <Play size={20} fill="currentColor" /> Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Decorative Elements */}
        <motion.div style={{ y }} className="absolute -bottom-1/4 w-full h-full pointer-events-none opacity-20">
          <div className="w-[800px] h-[800px] bg-yellow-600/30 rounded-full blur-[120px] absolute left-0" />
          <div className="w-[800px] h-[800px] bg-yellow-400/30 rounded-full blur-[120px] absolute right-0" />
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Designed for Excellence</h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">Our toolkit provides everything you need to build stunning interfaces that captivate users.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <FeatureCard 
              title="Global Scale Reliability" 
              desc="Deploy with confidence using our edge computing network that spans across 150+ locations globally."
              icon={<Globe className="text-yellow-400" />}
              borderColor="border-yellow-500/50"
            />
          </div>
          <div>
            <FeatureCard 
              title="Next-Gen Security" 
              desc="Military-grade encryption for all your data."
              icon={<Shield className="text-yellow-600" />}
              borderColor="border-yellow-600/50"
            />
          </div>
          <div>
            <FeatureCard 
              title="Smart Layouts" 
              desc="Automatic bento-grid generation."
              icon={<Layout className="text-yellow-300" />}
              borderColor="border-yellow-300/50"
            />
          </div>
          <div className="md:col-span-2">
            <FeatureCard 
              title="Accelerated Performance" 
              desc="Built with zero-runtime CSS and optimized assets for sub-second loading speeds on any device."
              icon={<Cpu className="text-yellow-500" />}
              borderColor="border-yellow-500/50"
            />
          </div>
        </div>
      </section>

      {/* Parallax Image / Showcase Section */}
      <section id="demo" className="py-20 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Visual Polish <br/><span className="text-gradient">Beyond Imagination</span></h2>
            <div className="space-y-6">
              {[
                { icon: <Monitor />, title: 'High Definition Rendering', text: 'Crisp visuals on every screen size.' },
                { icon: <Layers />, title: 'Layered Glassmorphism', text: 'Complex depth and blur effects.' },
                { icon: <Zap />, title: 'Instant Hot-Reload', text: 'Real-time updates during development.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-3 glass rounded-xl text-yellow-400 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-xl">{item.title}</h4>
                    <p className="text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative group w-full">
            <motion.div 
              whileHover={{ rotateY: -10, rotateX: 5 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative z-10 glass p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border-white/20 shadow-2xl"
            >
              <img 
                src="https://picsum.photos/1200/800?random=2&grayscale" 
                alt="App Interface" 
                className="rounded-xl md:rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 w-full"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-yellow-500/20 blur-3xl -z-1" />
            <div className="absolute -bottom-10 -left-10 w-48 md:w-64 h-48 md:h-64 bg-yellow-600/20 blur-3xl -z-1" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, Fair Pricing</h2>
            <p className="text-gray-400 text-lg">Choose the plan that fits your vision.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              title="Starter" 
              price="0" 
              features={['3 Projects', 'Community Support', 'Basic Components', 'Free Templates']}
            />
            <PricingCard 
              title="Pro" 
              price="29" 
              isPopular
              features={['Unlimited Projects', 'Priority Support', 'Advanced Components', 'Cloud Storage', 'Team Collaboration']}
            />
            <PricingCard 
              title="Enterprise" 
              price="99" 
              features={['Custom Branding', 'Dedicated Manager', 'API Access', 'SSO Integration', 'SLA Guarantee']}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 pt-16 md:pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16 md:mb-20">
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                  <Zap className="text-black" size={18} />
                </div>
                <span className="text-xl font-bold uppercase tracking-tight">AURORA</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The ultimate UI kit for modern developers. Crafting beautiful digital experiences with precision.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 glass rounded-lg hover:text-yellow-400 transition-colors"><Twitter size={20} /></a>
                <a href="#" className="p-2 glass rounded-lg hover:text-yellow-400 transition-colors"><Github size={20} /></a>
                <a href="#" className="p-2 glass rounded-lg hover:text-yellow-400 transition-colors"><Linkedin size={20} /></a>
              </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-yellow-400">Product</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-white transition-colors">Demo</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-yellow-400">Resources</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-yellow-400">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with the latest trends.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-yellow-500 transition-colors" />
              <button className="bg-yellow-400 text-black font-bold px-5 py-3 rounded-xl hover:bg-yellow-300 transition-all shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm order-3 md:order-1">© 2024 Aurora UI. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-gray-500 order-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <p className="text-sm font-medium text-gray-400 order-1 md:order-3">Handcrafted by <span className="text-yellow-400">RashedDevX</span></p>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] p-4 glass border-yellow-500/20 rounded-full shadow-2xl hover:bg-yellow-400 hover:text-black transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
