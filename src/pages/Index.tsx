
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Download, ExternalLink, Shield, Search, FileText, 
         Users, Award, Github, Instagram, Globe, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/components/ui/use-toast';

type Language = 'en' | 'ar';

interface Content {
  nav: {
    home: string;
    about: string;
    services: string;
    achievements: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    biography: string;
    skills: string;
    downloadCV: string;
    viewProfile: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
  };
  achievements: {
    title: string;
    subtitle: string;
    items: Array<{
      platform: string;
      description: string;
      year: string;
    }>;
  };
  projects: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      description: string;
      tech: string[];
      link: string;
    }>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      send: string;
    };
    info: {
      email: string;
      location: string;
      phone: string;
    };
  };
}

const content: Record<Language, Content> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      achievements: 'Achievements',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      title: 'Ali Bahaa Alawsi',
      subtitle: 'Cybersecurity Expert & Vulnerability Researcher',
      description: 'Specialized in penetration testing, vulnerability assessment, and security consulting. Recognized by major tech companies for discovering critical security flaws.',
      cta: 'Request Security Assessment',
      ctaSecondary: 'View Portfolio'
    },
    about: {
      title: 'About Me',
      description: 'Dedicated cybersecurity professional with expertise in vulnerability research and ethical hacking.',
      biography: 'Iraqi security researcher with a passion for uncovering vulnerabilities and strengthening digital security. Featured in Meta\'s WhiteHat program and recognized by Pinterest for discovering critical security flaws. Committed to making the digital world safer through ethical hacking and responsible disclosure.',
      skills: 'Core Expertise',
      downloadCV: 'Download CV',
      viewProfile: 'View Instagram Profile'
    },
    services: {
      title: 'Security Services',
      subtitle: 'Professional cybersecurity solutions tailored to your needs',
      items: [
        {
          title: 'Penetration Testing',
          description: 'Comprehensive security assessments to identify vulnerabilities before attackers do.',
          features: ['Web Application Testing', 'Network Security Assessment', 'Social Engineering Tests', 'Detailed Reporting']
        },
        {
          title: 'Vulnerability Assessment',
          description: 'Systematic evaluation of security weaknesses in your digital infrastructure.',
          features: ['Automated Scanning', 'Manual Verification', 'Risk Prioritization', 'Remediation Guidance']
        },
        {
          title: 'Security Consulting',
          description: 'Expert guidance on security strategy, compliance, and best practices.',
          features: ['Security Architecture Review', 'Compliance Assessment', 'Training & Awareness', 'Incident Response Planning']
        }
      ]
    },
    achievements: {
      title: 'Recognition & Achievements',
      subtitle: 'Acknowledged by leading tech companies for security research',
      items: [
        {
          platform: 'Meta (Facebook)',
          description: 'Listed in Meta\'s WhiteHat program for discovering critical vulnerabilities',
          year: '2023'
        },
        {
          platform: 'Pinterest',
          description: 'Featured for identifying and responsibly disclosing security flaws',
          year: '2023'
        },
        {
          platform: 'Bug Bounty Programs',
          description: 'Active participant in various bug bounty programs with successful findings',
          year: 'Ongoing'
        }
      ]
    },
    projects: {
      title: 'Tools & Projects',
      subtitle: 'Security tools and research projects developed',
      items: [
        {
          name: 'Security Scanner Bot',
          description: 'Automated vulnerability scanning bot for Telegram',
          tech: ['Python', 'Telegram API', 'Security Tools'],
          link: 'https://t.me/awsi_bot'
        },
        {
          name: 'Web Security Tools',
          description: 'Collection of custom security testing tools',
          tech: ['Python', 'JavaScript', 'Bash'],
          link: 'https://github.com/awsi'
        },
        {
          name: 'Research Reports',
          description: 'Published security research and vulnerability reports',
          tech: ['Security Research', 'Documentation'],
          link: '#'
        }
      ]
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Ready to secure your digital assets? Let\'s discuss your security needs.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message'
      },
      info: {
        email: 'Contact Email',
        location: 'Baghdad, Iraq',
        phone: 'Available upon request'
      }
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      services: 'الخدمات',
      achievements: 'الإنجازات',
      projects: 'المشاريع',
      contact: 'التواصل'
    },
    hero: {
      title: 'علي بهاء الأوسي',
      subtitle: 'خبير الأمن السيبراني وباحث الثغرات',
      description: 'متخصص في اختبار الاختراق وتقييم الثغرات الأمنية والاستشارات الأمنية. معترف به من قبل كبرى شركات التكنولوجيا لاكتشاف العيوب الأمنية الحرجة.',
      cta: 'طلب تقييم أمني',
      ctaSecondary: 'عرض الأعمال'
    },
    about: {
      title: 'نبذة عني',
      description: 'محترف أمن سيبراني مختص في أبحاث الثغرات والقرصنة الأخلاقية.',
      biography: 'باحث أمني عراقي لديه شغف لاكتشاف الثغرات وتعزيز الأمان الرقمي. مُدرج في برنامج WhiteHat الخاص بشركة Meta ومُعترف به من قبل Pinterest لاكتشاف عيوب أمنية حرجة. ملتزم بجعل العالم الرقمي أكثر أماناً من خلال القرصنة الأخلاقية والكشف المسؤول.',
      skills: 'الخبرات الأساسية',
      downloadCV: 'تحميل السيرة الذاتية',
      viewProfile: 'عرض الملف الشخصي'
    },
    services: {
      title: 'الخدمات الأمنية',
      subtitle: 'حلول أمن سيبراني احترافية مصممة لتلبية احتياجاتك',
      items: [
        {
          title: 'اختبار الاختراق',
          description: 'تقييمات أمنية شاملة لتحديد الثغرات قبل أن يكتشفها المهاجمون.',
          features: ['اختبار تطبيقات الويب', 'تقييم أمان الشبكات', 'اختبارات الهندسة الاجتماعية', 'تقارير مفصلة']
        },
        {
          title: 'تقييم الثغرات',
          description: 'تقييم منهجي لنقاط الضعف الأمنية في البنية التحتية الرقمية.',
          features: ['المسح الآلي', 'التحقق اليدوي', 'ترتيب المخاطر حسب الأولوية', 'إرشادات المعالجة']
        },
        {
          title: 'الاستشارات الأمنية',
          description: 'إرشادات خبراء حول استراتيجية الأمان والامتثال وأفضل الممارسات.',
          features: ['مراجعة هندسة الأمان', 'تقييم الامتثال', 'التدريب والتوعية', 'تخطيط الاستجابة للحوادث']
        }
      ]
    },
    achievements: {
      title: 'التقدير والإنجازات',
      subtitle: 'معترف به من قبل شركات التكنولوجيا الرائدة للأبحاث الأمنية',
      items: [
        {
          platform: 'ميتا (فيسبوك)',
          description: 'مُدرج في برنامج WhiteHat الخاص بشركة Meta لاكتشاف ثغرات حرجة',
          year: '2023'
        },
        {
          platform: 'بينتيريست',
          description: 'مُميز لتحديد والكشف المسؤول عن العيوب الأمنية',
          year: '2023'
        },
        {
          platform: 'برامج مكافآت الأخطاء',
          description: 'مشارك نشط في برامج مكافآت الأخطاء المختلفة مع اكتشافات ناجحة',
          year: 'مستمر'
        }
      ]
    },
    projects: {
      title: 'الأدوات والمشاريع',
      subtitle: 'أدوات أمنية ومشاريع بحثية تم تطويرها',
      items: [
        {
          name: 'بوت المسح الأمني',
          description: 'بوت آلي لمسح الثغرات عبر تيليجرام',
          tech: ['Python', 'Telegram API', 'أدوات أمنية'],
          link: 'https://t.me/awsi_bot'
        },
        {
          name: 'أدوات أمان الويب',
          description: 'مجموعة من أدوات اختبار الأمان المخصصة',
          tech: ['Python', 'JavaScript', 'Bash'],
          link: 'https://github.com/awsi'
        },
        {
          name: 'تقارير البحث',
          description: 'أبحاث أمنية منشورة وتقارير الثغرات',
          tech: ['البحث الأمني', 'التوثيق'],
          link: '#'
        }
      ]
    },
    contact: {
      title: 'تواصل معي',
      subtitle: 'مستعد لتأمين أصولك الرقمية؟ دعنا نناقش احتياجاتك الأمنية.',
      form: {
        name: 'الاسم الكامل',
        email: 'عنوان البريد الإلكتروني',
        subject: 'الموضوع',
        message: 'الرسالة',
        send: 'إرسال الرسالة'
      },
      info: {
        email: 'البريد الإلكتروني للتواصل',
        location: 'بغداد، العراق',
        phone: 'متاح عند الطلب'
      }
    }
  }
};

const PortfolioWebsite = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const t = content[language];
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
// telegram
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Send data to your custom FastAPI endpoint on Render
    const response = await fetch('https://silenttrack-contact-api.onrender.com/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }),
    });

    if (response.ok) {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    toast({
      title: "Error sending message",
      description: "Please try again later or contact us directly.",
      variant: "destructive",
    });
    console.error('Error sending form data:', error);
  }
};


  const skills = [
    'Penetration Testing',
    'Vulnerability Assessment',
    'Web Application Security',
    'Network Security',
    'Bug Bounty Hunting',
    'Security Consulting'
  ];

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'font-sans' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-xl font-bold cyber-text-gradient">SilentTrack</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => scrollToSection(key)}
                  className={`text-sm font-medium transition-colors hover:text-cyber-blue ${
                    activeSection === key ? 'text-cyber-blue' : 'text-muted-foreground'
                  }`}
                >
                  {value}
                </button>
              ))}
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleLanguage}
                  className="hover-glow"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>
                <Toggle
                  aria-label="Toggle theme"
                  pressed={theme === 'dark'}
                  onPressedChange={toggleTheme}
                  className="hover-glow"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Toggle>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={toggleLanguage}>
                <Globe className="h-4 w-4" />
              </Button>
              <Toggle 
                aria-label="Toggle theme"
                pressed={theme === 'dark'} 
                onPressedChange={toggleTheme}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Toggle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border/50">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg">
                {Object.entries(t.nav).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-cyber-blue transition-colors w-full text-left"
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 relative overflow-hidden">
        <div className="matrix-bg absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="cyber-text-gradient">{t.hero.title}</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 font-mono">
                {t.hero.subtitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                {t.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="cyber-gradient hover-glow text-lg px-8 py-3">
                  <Shield className="mr-2 h-5 w-5" />
                  {t.hero.cta}
                </Button>
                <Button variant="outline" size="lg" className="hover-glow text-lg px-8 py-3">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  {t.hero.ctaSecondary}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 cyber-text-gradient">{t.about.title}</h2>
              <p className="text-xl text-muted-foreground">{t.about.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="glass-effect p-6 rounded-lg hover-glow">
                  <p className="text-lg leading-relaxed mb-6">{t.about.biography}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <Button asChild variant="outline" className="hover-glow">
                      <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        {t.about.downloadCV}
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="hover-glow">
                      <a href="https://www.instagram.com/awsi5" target="_blank" rel="noopener noreferrer">
                        <Instagram className="mr-2 h-4 w-4" />
                        {t.about.viewProfile}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-effect p-6 rounded-lg hover-glow">
                  <h3 className="text-2xl font-semibold mb-4 cyber-text-gradient">{t.about.skills}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="justify-center py-2 hover-glow">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 cyber-text-gradient">{t.services.title}</h2>
              <p className="text-xl text-muted-foreground">{t.services.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.services.items.map((service, index) => (
                <Card key={index} className="glass-effect hover-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      {index === 0 && <Search className="h-12 w-12 text-cyber-blue mx-auto mb-4" />}
                      {index === 1 && <Shield className="h-12 w-12 text-cyber-cyan mx-auto mb-4" />}
                      {index === 2 && <Users className="h-12 w-12 text-cyber-purple mx-auto mb-4" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                    <p className="text-muted-foreground mb-4 text-center">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-cyber-blue rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 cyber-text-gradient">{t.achievements.title}</h2>
              <p className="text-xl text-muted-foreground">{t.achievements.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.achievements.items.map((achievement, index) => (
                <Card key={index} className="glass-effect hover-glow transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <Award className="h-12 w-12 text-cyber-blue mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{achievement.platform}</h3>
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    <Badge variant="outline" className="cyber-gradient text-black font-medium">
                      {achievement.year}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 cyber-text-gradient">{t.projects.title}</h2>
              <p className="text-xl text-muted-foreground">{t.projects.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.projects.items.map((project, index) => (
                <Card key={index} className="glass-effect hover-glow transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <Button asChild variant="ghost" size="sm">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 cyber-text-gradient">{t.contact.title}</h2>
              <p className="text-xl text-muted-foreground">{t.contact.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="glass-effect hover-glow">
                <CardContent className="p-6">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.contact.form.name}</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t.contact.form.email}</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.contact.form.subject}</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t.contact.form.message}</label>
                      <textarea 
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-secondary border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue resize-none"
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full cyber-gradient hover-glow">
                      <Mail className="mr-2 h-4 w-4" />
                      {t.contact.form.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="glass-effect hover-glow">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Mail className="h-5 w-5 text-cyber-blue mr-3" />
                      <div>
                        <h3 className="font-medium">{t.contact.info.email}</h3>
                        <p className="text-muted-foreground">ali@silenttrack.com</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center mb-4">
                      <MapPin className="h-5 w-5 text-cyber-blue mr-3" />
                      <div>
                        <h3 className="font-medium">Location</h3>
                        <p className="text-muted-foreground">{t.contact.info.location}</p>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-cyber-blue mr-3" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">{t.contact.info.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect hover-glow">
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-4">Follow Me</h3>
                    <div className="flex space-x-4">
                      <Button asChild variant="outline" size="sm" className="hover-glow">
                        <a href="https://www.instagram.com/awsi5" target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="hover-glow">
                        <a href="https://github.com/awsi" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-cyber-blue mr-2" />
              <span className="text-lg font-semibold cyber-text-gradient">SilentTrack</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 Ali Bahaa Alawsi. All rights reserved. | Cybersecurity Expert & Researcher
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;
