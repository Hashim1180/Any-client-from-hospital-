import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  Stethoscope,
  Sparkles,
  Shield,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import AIChatbot from './components/AIChatbot';
import MusicPlayer from './components/MusicPlayer';
import WhatsAppButton from './components/WhatsAppButton';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      tl.from('.hero-cross-line', {
        scaleX: 0,
        scaleY: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1
      })
      .from('.hero-circle', {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.2)
      .from('.hero-left-rule', {
        scaleY: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.3)
      .from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.4)
      .from('.hero-headline', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.5)
      .from('.hero-body', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, 0.6)
      .from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
      }, 0.7);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setNavOpen(false);
  };

  const services = [
    {
      title: 'i-Linq Dental Implants',
      description: 'Transform your smile and reclaim your confidence with premium implant solutions.',
      price: 'PKR 140,000.00',
      image: '/assets/images/21030.jpg'
    },
    {
      title: 'Swiss Dental Implants',
      description: 'Swiss-engineered precision for lasting dental restoration.',
      price: 'PKR 125,000.00',
      image: '/assets/images/21031.jpg'
    },
    {
      title: 'Laser Fillings (Nano hybrid)',
      description: 'Gentle, efficient, and designed for durability with nano-hybrid technology.',
      price: 'PKR 7,000.00 - PKR 8,000.00',
      image: '/assets/images/21032.jpg'
    },
    {
      title: 'Check up Consultation',
      description: 'Comprehensive dental examination for optimal oral health.',
      price: 'PKR 1,000.00',
      image: '/assets/images/21033.jpg'
    },
    {
      title: 'Crowns Porcelain Fused',
      description: 'Traditional porcelain crowns with natural aesthetics.',
      price: 'PKR 8,000.00',
      image: '/assets/images/21130.jpg'
    },
    {
      title: 'Porcelain Bridge',
      description: 'Restore your smile when one tooth is extracted.',
      price: 'PKR 12,000.00',
      image: '/assets/images/21131.jpg'
    }
  ];

  const technologies = [
    {
      title: '3D CBCT Scanning',
      description: 'Full-arch imaging in seconds with precision diagnostics.',
      icon: <Stethoscope className="w-6 h-6" />
    },
    {
      title: 'Digital X-Ray',
      description: 'Low dose radiation with instant results.',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: 'Laser Dentistry',
      description: 'Pain-free procedures with faster healing.',
      icon: <Shield className="w-6 h-6" />
    }
  ];

  return (
    <div ref={mainRef} className="relative bg-clinical-navy min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="liquid-green rounded-full max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clinical-blue to-clinical-green flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-heading font-semibold text-lg tracking-wide">
              Gujrat Dental Clinic
            </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('technology')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              Technology
            </button>
            <button onClick={() => scrollToSection('results')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              Results
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white text-sm font-medium transition-colors">
              Contact
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden sm:block btn-primary text-sm"
            >
              Book Appointment
            </button>
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Nav */}
        {navOpen && (
          <div className="md:hidden mt-2 liquid-glass rounded-2xl p-4 max-w-6xl mx-auto">
            <div className="flex flex-col gap-3">
              <button onClick={() => scrollToSection('services')} className="text-white/70 hover:text-white text-sm font-medium py-2 text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('technology')} className="text-white/70 hover:text-white text-sm font-medium py-2 text-left">
                Technology
              </button>
              <button onClick={() => scrollToSection('results')} className="text-white/70 hover:text-white text-sm font-medium py-2 text-left">
                Results
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white text-sm font-medium py-2 text-left">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="section-pinned z-10">
        {/* Medical Cross */}
        <div className="medical-cross absolute" style={{ 
          left: '58vw', 
          top: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '70vh',
          height: '70vh'
        }}>
          <div className="hero-cross-line absolute inset-0" />
        </div>
        
        {/* Hero Circle */}
        <div 
          className="hero-circle absolute image-clinical-grade"
          style={{
            width: '66vh',
            height: '66vh',
            left: '58vw',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/videos/21159.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Left Content */}
        <div className="left-content pl-6">
          <div className="relative">
            <div className="hero-left-rule absolute left-0 top-0 bottom-0 w-0.5 bg-white/30 origin-top" />
            <div className="pl-6">
              <p className="hero-eyebrow font-mono text-xs tracking-[0.2em] text-white/50 uppercase mb-4">
                Gujrat Dental Clinic
              </p>
              <h1 className="hero-headline font-heading text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
                Precision dental care for every{' '}
                <span className="text-gradient">smile.</span>
              </h1>
              <p className="hero-body text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                From routine checkups to advanced implants, we combine modern technology 
                with a gentle touch—so you can smile with confidence.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hero-cta btn-primary flex items-center gap-2"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hero-cta btn-secondary"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-white/40 uppercase tracking-wider">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-20 py-24 px-6 bg-clinical-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.2em] text-clinical-blue uppercase mb-4">
              Our Services
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Comprehensive dentistry,{' '}
              <span className="italic text-white/60">tailored to you.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We offer a full range of treatments under one roof—preventive, restorative, and cosmetic.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group liquid-glass rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-glow"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 image-clinical-grade"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-white mb-2">{service.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-clinical-blue font-medium">{service.price}</span>
                    <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors hover:bg-clinical-blue">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Service Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {['Implants', 'Braces', 'Whitening', 'Crowns', 'Root Canal', 'Veneers'].map((tag) => (
              <span key={tag} className="service-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative z-30 py-24 px-6 bg-clinical-navy-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-clinical-green uppercase mb-4">
                Advanced Technology
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
                Advanced imaging.{' '}
                <span className="italic text-white/60">Accurate diagnoses.</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                3D scans and digital X-rays help us plan treatments with precision—less guessing, better outcomes.
              </p>
              
              <div className="space-y-4">
                {technologies.map((tech, index) => (
                  <div 
                    key={index}
                    className="liquid-glass rounded-xl p-4 flex items-start gap-4 transition-all duration-300 hover:bg-white/5"
                  >
                    <div className="w-12 h-12 rounded-lg bg-clinical-blue/20 flex items-center justify-center text-clinical-blue flex-shrink-0">
                      {tech.icon}
                    </div>
                    <div>
                      <h4 className="font-heading text-white mb-1">{tech.title}</h4>
                      <p className="text-white/60 text-sm">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover image-clinical-grade"
                >
                  <source src="/assets/videos/21160.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute -bottom-6 -left-6 liquid-glass-green rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-clinical-green" />
                  <span className="text-white font-medium">ISO Certified</span>
                </div>
                <p className="text-white/60 text-sm">International standards in dental care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results/Stats Section */}
      <section id="results" className="relative z-40 py-24 px-6 bg-clinical-navy">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-mono text-xs tracking-[0.2em] text-clinical-blue uppercase mb-4">
              Our Results
            </p>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Real results.{' '}
              <span className="italic text-white/60">Confident smiles.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { number: '500+', label: 'Smile Makeovers' },
              { number: '98%', label: 'Patient Satisfaction' },
              { number: '15+', label: 'Years Experience' },
              { number: '10K+', label: 'Happy Patients' }
            ].map((stat, index) => (
              <div key={index} className="liquid-glass rounded-2xl p-6 text-center">
                <div className="font-heading text-4xl md:text-5xl text-gradient mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Video Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['/assets/videos/21161.mp4', '/assets/videos/21162.mp4', '/assets/videos/21163.mp4'].map((video, index) => (
              <div key={index} className="aspect-video rounded-2xl overflow-hidden liquid-glass">
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  className="w-full h-full object-cover image-clinical-grade"
                >
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-50 py-24 px-6 bg-clinical-navy-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden liquid-glass">
                  <img 
                    src="/assets/images/21132.jpg" 
                    alt="Dental Team"
                    className="w-full h-full object-cover image-clinical-grade"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden liquid-glass mt-8">
                  <img 
                    src="/assets/images/21133.jpg" 
                    alt="Dental Procedure"
                    className="w-full h-full object-cover image-clinical-grade"
                  />
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <p className="font-mono text-xs tracking-[0.2em] text-clinical-blue uppercase mb-4">
                Our Team
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
                Experienced dentists.{' '}
                <span className="italic text-white/60">Personal attention.</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Our team brings years of advanced training and a commitment to continuing 
                education—so you receive up-to-date care.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  'Sedation options available',
                  'Pain-free techniques',
                  'Transparent pricing'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-clinical-green flex-shrink-0" />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Meet the Team
                </button>
                <button className="btn-secondary">
                  Read Patient Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Section */}
      <section className="relative z-60 py-24 px-6 bg-clinical-navy">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-clinical-green uppercase mb-4">
                Our Clinic
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
                A modern clinic designed{' '}
                <span className="italic text-white/60">for comfort.</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Spacious treatment rooms, strict sterilization protocols, and a calm 
                atmosphere from the moment you walk in.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-clinical-blue" />
                  <div>
                    <p className="text-white font-medium">Mon–Sat</p>
                    <p className="text-white/60 text-sm">9:00 AM – 8:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-clinical-green" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-white/60 text-sm">Gujrat, Pakistan</p>
                  </div>
                </div>
              </div>
              
              <button className="btn-secondary flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Get Directions
              </button>
            </div>
            
            <div className="aspect-video rounded-3xl overflow-hidden liquid-glass">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover image-clinical-grade"
              >
                <source src="/assets/videos/21164.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-70 py-24 px-6 bg-clinical-navy-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-clinical-blue uppercase mb-4">
                Book Appointment
              </p>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-6">
                Book your appointment{' '}
                <span className="italic text-white/60">today.</span>
              </h2>
              <p className="text-white/60 text-lg mb-8">
                Choose a date and time that works for you. We'll confirm within a few hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-clinical-blue/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-clinical-blue" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white font-medium">+92-XXX-XXXXXXX</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-clinical-green/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-clinical-green" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">WhatsApp</p>
                    <p className="text-white font-medium">Chat on WhatsApp</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-clinical-blue/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-clinical-blue" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">hello@gujratdental.clinic</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-clinical-green/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-clinical-green" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Address</p>
                    <p className="text-white font-medium">Main Road, Gujrat, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="liquid-glass rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-clinical-blue transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-clinical-blue transition-colors"
                      placeholder="Your phone"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-clinical-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Preferred Time</label>
                    <input 
                      type="time" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-clinical-blue transition-colors"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-white/60 text-sm mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-clinical-blue transition-colors resize-none"
                    placeholder="Tell us about your dental concerns..."
                  />
                </div>
                
                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Request Appointment
                </button>
              </form>
              
              <p className="text-white/40 text-sm text-center mt-4">
                Emergency visits available. Call directly for urgent care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-80 py-12 px-6 bg-clinical-navy border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clinical-blue to-clinical-green flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-heading font-semibold text-lg">
                Gujrat Dental Clinic
              </span>
            </div>
            
            <div className="flex items-center gap-6">
              <button onClick={() => scrollToSection('services')} className="text-white/60 hover:text-white text-sm transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('technology')} className="text-white/60 hover:text-white text-sm transition-colors">
                Technology
              </button>
              <button onClick={() => scrollToSection('results')} className="text-white/60 hover:text-white text-sm transition-colors">
                Results
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-white/60 hover:text-white text-sm transition-colors">
                Contact
              </button>
            </div>
            
            <p className="text-white/40 text-sm">
              © 2024 Gujrat Dental Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Components */}
      <AIChatbot />
      <WhatsAppButton />
      <MusicPlayer />
    </div>
  );
}

export default App;
