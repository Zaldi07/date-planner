import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, CalendarHeart, Utensils, MapPin, Sparkles, ArrowRight, Check } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---
const FOOD_OPTIONS = [
  {
    id: 'sushi',
    title: 'Sushi Date',
    desc: 'Makan cantik & fresh',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pasta',
    title: 'Italian / Pasta',
    desc: 'Romantic & cozy vibes',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'steak',
    title: 'Steakhouse',
    desc: 'Biar kenyang & fancy dikit',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'cafe',
    title: 'Cafe Hopping',
    desc: 'Dessert, kopi, & ngobrol',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
  },
];

const ACTIVITY_OPTIONS = [
  {
    id: 'library',
    title: 'Perpustakaan Date',
    desc: 'Baca buku bareng & quiet time',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'movie',
    title: 'Nonton Bioskop',
    desc: 'Pilih film yang lagi seru',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'museum',
    title: 'Museum / Art Gallery',
    desc: 'Jalan santai sambil foto-foto',
    image: 'https://images.unsplash.com/photo-1518998053401-a4149019da8f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'night-drive',
    title: 'Night Drive',
    desc: 'Keliling kota sambil dengerin lagu',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'picnic',
    title: 'Piknik Sore',
    desc: 'Duduk di taman nikmatin senja',
    image: 'https://images.unsplash.com/photo-1596241913289-9407137f8272?auto=format&fit=crop&w=800&q=80',
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const [selectedFood, setSelectedFood] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  
  // For the moving "No" button
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#D9777F', '#C86B5E', '#FAF9F6']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#D9777F', '#C86B5E', '#FAF9F6']
      });
    }, 250);
  };

  const nextStep = () => {
    if (step === 2) {
      triggerConfetti();
    }
    setStep((s) => s + 1);
  };

  return (
    <div className="min-h-screen bg-pearl text-ink flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative selection:bg-rose/30">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-rose-light blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rose-light blur-[100px]" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Invitation */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-12"
            >
              <div className="space-y-4">
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ delay: 0.3, type: "spring" }}
                  className="mx-auto w-16 h-16 bg-rose-light rounded-full flex items-center justify-center mb-8"
                >
                  <Heart className="w-8 h-8 text-rose" strokeWidth={1.5} />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-serif font-light tracking-tight">
                  Hai, <span className="italic text-rose">Cantik.</span>
                </h1>
                <p className="text-lg md:text-xl text-ink/70 font-light max-w-md mx-auto leading-relaxed">
                  Aku punya rencana spesial buat kita. Weekend ini kamu kosong kan? Jalan yuk?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button
                  onClick={nextStep}
                  className="px-8 py-4 bg-ink text-pearl rounded-full text-sm tracking-widest uppercase hover:bg-ink/90 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2 group"
                >
                  Boleh banget!
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="no-button-wrapper w-full sm:w-auto">
                  <motion.button
                    ref={noButtonRef}
                    animate={{ x: noPosition.x, y: noPosition.y }}
                    onMouseEnter={handleNoHover}
                    onClick={handleNoHover}
                    className="px-8 py-4 bg-transparent border border-ink/20 text-ink/60 rounded-full text-sm tracking-widest uppercase w-full sm:w-auto"
                  >
                    Nggak dulu
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Food */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif font-light">
                  Pertama, kita <span className="italic text-rose">makan apa?</span>
                </h2>
                <p className="text-ink/60 font-light">Pilih salah satu yang lagi kamu pengenin banget.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FOOD_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFood(option.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl text-left transition-all duration-500 border",
                      selectedFood === option.id 
                        ? "border-rose ring-1 ring-rose shadow-lg scale-[1.02]" 
                        : "border-ink/10 hover:border-ink/30 hover:shadow-md bg-white/50"
                    )}
                  >
                    <div className="aspect-[21/9] w-full overflow-hidden">
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm">
                      <div>
                        <h3 className="font-serif text-2xl mb-1">{option.title}</h3>
                        <p className="text-sm text-ink/60 font-light">{option.desc}</p>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                        selectedFood === option.id ? "bg-rose border-rose text-white" : "border-ink/20"
                      )}>
                        {selectedFood === option.id && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={nextStep}
                  disabled={!selectedFood}
                  className={cn(
                    "px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2",
                    selectedFood 
                      ? "bg-ink text-pearl hover:bg-ink/90 cursor-pointer" 
                      : "bg-ink/10 text-ink/40 cursor-not-allowed"
                  )}
                >
                  Lanjut <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Activity */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif font-light">
                  Terus, habis makan <span className="italic text-rose">ngapain?</span>
                </h2>
                <p className="text-ink/60 font-light">Biar sekalian aku siapin itinerary-nya.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACTIVITY_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedActivity(option.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl text-left transition-all duration-500 border",
                      selectedActivity === option.id 
                        ? "border-rose ring-1 ring-rose shadow-lg scale-[1.02]" 
                        : "border-ink/10 hover:border-ink/30 hover:shadow-md bg-white/50"
                    )}
                  >
                    <div className="aspect-[21/9] w-full overflow-hidden">
                      <img 
                        src={option.image} 
                        alt={option.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6 flex justify-between items-center bg-white/80 backdrop-blur-sm">
                      <div>
                        <h3 className="font-serif text-2xl mb-1">{option.title}</h3>
                        <p className="text-sm text-ink/60 font-light">{option.desc}</p>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                        selectedActivity === option.id ? "bg-rose border-rose text-white" : "border-ink/20"
                      )}>
                        {selectedActivity === option.id && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={nextStep}
                  disabled={!selectedActivity}
                  className={cn(
                    "px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2",
                    selectedActivity 
                      ? "bg-ink text-pearl hover:bg-ink/90 cursor-pointer" 
                      : "bg-ink/10 text-ink/40 cursor-not-allowed"
                  )}
                >
                  Selesai <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Summary */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-12"
            >
              <div className="space-y-6">
                <motion.div 
                  initial={{ rotate: -10, scale: 0 }} 
                  animate={{ rotate: 0, scale: 1 }} 
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mx-auto w-20 h-20 bg-rose text-white rounded-full flex items-center justify-center mb-8 shadow-xl shadow-rose/20"
                >
                  <CalendarHeart className="w-10 h-10" strokeWidth={1.5} />
                </motion.div>
                <h2 className="text-5xl md:text-6xl font-serif font-light">
                  It's a <span className="italic text-rose">Date!</span>
                </h2>
                <p className="text-lg text-ink/70 font-light max-w-md mx-auto">
                  Yay! Aku udah catet pilihan kamu. Nanti aku yang urus reservasi dan detailnya ya.
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-ink/10 rounded-3xl p-8 max-w-md mx-auto text-left space-y-6 shadow-sm">
                <h3 className="font-serif text-2xl border-b border-ink/10 pb-4">Our Itinerary</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                      <Utensils className="w-5 h-5 text-rose" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-ink/50 mb-1">Makan</p>
                      <p className="font-medium text-lg">
                        {FOOD_OPTIONS.find(f => f.id === selectedFood)?.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-rose-light flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-rose" />
                    </div>
                    <div>
                      <p className="text-xs tracking-widest uppercase text-ink/50 mb-1">Aktivitas</p>
                      <p className="font-medium text-lg">
                        {ACTIVITY_OPTIONS.find(a => a.id === selectedActivity)?.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="font-serif text-2xl italic text-ink/80 pt-4">
                Sampai ketemu hari Sabtu ya, sayang ❤️
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
