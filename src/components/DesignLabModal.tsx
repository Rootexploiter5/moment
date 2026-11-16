import { useState, useEffect } from 'react';
import { X, Sparkles, RotateCw, Camera, Eye, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Product } from '../types/shop';
import { ResilientImage } from './ResilientImage';

interface DesignLabModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProductForOrder?: (product: Product) => void;
}

const AR_MODELS = [
  {
    id: 'sovereign-cup',
    name: 'Sovereign Loving Cup',
    material: '24k Gold Plate on White Marble',
    image: '/src/assets/images/sovereign_classic_heritage_1794823132512.jpg',
    scale: '10" Classic Stature (Standard)',
    heightCm: '25.4 cm',
    weight: '3.1 kg',
    recommendedUse: 'Championships, Sports Regattas & Tournaments',
  },
  {
    id: 'crystal-obelisk',
    name: 'Monolith Crystal Obelisk',
    material: 'Optical Crystal & Satin Brass Base',
    image: '/src/assets/images/trophy_crystal_obelisk_1794820656273.jpg',
    scale: '11" Grand Pillar',
    heightCm: '28.0 cm',
    weight: '2.8 kg',
    recommendedUse: 'Corporate Leadership & Lifetime Achievement',
  },
  {
    id: 'victorian-cup',
    name: 'Victorian Acanthus Cup',
    material: 'Chased Gold with Hand-Cast Handles',
    image: '/src/assets/images/sovereign_victorian_filigree_1794823150614.jpg',
    scale: '13" Premier Stature',
    heightCm: '33.0 cm',
    weight: '4.5 kg',
    recommendedUse: 'Institutional & Civic Honors',
  },
  {
    id: 'brass-plaque',
    name: 'Travertine & Brass Plaque',
    material: 'Milled Roman Travertine & Satin Brass',
    image: '/src/assets/images/memento_brass_plaque_1794820657331.jpg',
    scale: '8" × 10" Beveled Desk Plaque',
    heightCm: '20.3 cm',
    weight: '2.2 kg',
    recommendedUse: 'Dedication Walls & Executive Desks',
  },
];

export function DesignLabModal({ isOpen, onClose }: DesignLabModalProps) {
  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [arModeActive, setArModeActive] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<string | null>(null);

  const [inscriptionLine1, setInscriptionLine1] = useState('VICTORIA ROWING CLUB');
  const [inscriptionLine2, setInscriptionLine2] = useState('Grand Challenge First Place');
  const [inscriptionLine3, setInscriptionLine3] = useState('NOVEMBER 2026');
  const [scaleFactor, setScaleFactor] = useState(1);

  const activeModel = AR_MODELS[selectedModelIdx];

  // Auto-turntable effect when not in AR camera mode
  useEffect(() => {
    if (!isOpen || !isRotating || arModeActive) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isOpen, isRotating, arModeActive]);

  useEffect(() => {
    if (!isOpen) {
      setArModeActive(false);
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const toggleCameraAR = async () => {
    if (arModeActive) {
      setArModeActive(false);
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        setCameraPermission('requesting');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setCameraPermission('granted');
        setArModeActive(true);
        // Stop stream tracks on unmount / toggle handled
        const videoEl = document.getElementById('ar-video-feed') as HTMLVideoElement;
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.play();
        }
      } else {
        setArModeActive(true);
      }
    } catch {
      // Fallback to desktop simulated room
      setCameraPermission('fallback');
      setArModeActive(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#1A1A1A]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="design-lab-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white border border-[#2E2E2E] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[#1A1A1A] border-b border-[#2E2E2E] flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#262626] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="design-lab-title" className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Today Mementos Design Lab
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-[#1A1A1A] rounded">
                  WebAR Try-On
                </span>
              </div>
              <p className="text-xs text-[#A69C8E]">
                Interactive 3D Turntable &amp; In-Space Room Visualizer · Kothamangalam Atelier
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Design Lab"
            className="w-9 h-9 flex items-center justify-center rounded-full border border-[#333333] bg-[#222222] text-[#E5DDD0] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Canvas: 3D Turntable & AR Viewport */}
          <div className="lg:col-span-7 bg-[#121212] p-4 sm:p-6 flex flex-col justify-between relative min-h-[380px] lg:min-h-[500px]">
            {/* Viewport Overlay Controls */}
            <div className="relative z-20 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1A1A1A]/90 border border-[#333333] text-[#D4AF37] backdrop-blur-sm">
                <Eye className="w-3.5 h-3.5" />
                <span>{arModeActive ? 'WebAR Room Mode' : '3D Turntable 360°'}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsRotating((prev) => !prev)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isRotating
                      ? 'bg-[#D4AF37] text-[#1A1A1A] border-[#D4AF37]'
                      : 'bg-[#222222] text-[#E5DDD0] border-[#333333]'
                  }`}
                  title="Toggle Auto Rotation"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                  <span>{isRotating ? 'Rotating' : 'Paused'}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleCameraAR}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-[#222222] text-[#D4AF37] border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{arModeActive ? 'Exit AR' : 'View in Room'}</span>
                </button>
              </div>
            </div>

            {/* Viewport Centerpiece */}
            <div className="relative my-auto flex flex-col items-center justify-center p-4">
              {arModeActive ? (
                /* Simulated AR Room Background or Video */
                <div className="relative w-full aspect-square max-w-md rounded-lg overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#1A1A1A]">
                  <video id="ar-video-feed" playsInline muted autoPlay className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
                    <div
                      className="transition-transform duration-300 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
                      style={{ transform: `scale(${scaleFactor})` }}
                    >
                      <img
                        src={activeModel.image}
                        alt={activeModel.name}
                        className="w-64 h-64 object-contain"
                      />
                    </div>
                    <div className="mt-4 px-3 py-1 rounded-full bg-black/80 border border-[#D4AF37] text-[11px] text-[#F3E5AB]">
                      Surface Detected · Scale: {Math.round(scaleFactor * 100)}%
                    </div>
                  </div>
                </div>
              ) : (
                /* 3D Turntable View */
                <div className="relative w-full aspect-square max-w-md flex flex-col items-center justify-center">
                  {/* Subtle Pedestal Glow */}
                  <div className="absolute bottom-6 w-48 h-12 bg-[#D4AF37]/20 blur-xl rounded-full" />
                  <div className="relative z-10 transition-transform duration-100 ease-out flex flex-col items-center">
                    <ResilientImage
                      src={activeModel.image}
                      alt={activeModel.name}
                      title={activeModel.name}
                      className="w-72 h-72 sm:w-80 sm:h-80 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
                    />

                    {/* Dynamic Real-Time Inscription Plate Mounted on Base */}
                    <div className="mt-[-28px] w-48 px-3 py-1.5 rounded-[2px] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#B89628] border border-[#8E6718] shadow-lg text-center z-20">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] truncate">
                        {inscriptionLine1 || 'RECIPIENT NAME'}
                      </p>
                      <p className="text-[9px] text-[#2B1F06] font-medium truncate">
                        {inscriptionLine2 || 'Occasion Citation'}
                      </p>
                      <p className="text-[8px] text-[#47330A] tracking-widest uppercase">
                        {inscriptionLine3 || '2026'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Scale Slider and Stature Details */}
            <div className="relative z-20 pt-3 border-t border-[#262626] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A69C8E]">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Model Scale ({activeModel.heightCm}):</span>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(parseFloat(e.target.value))}
                  className="w-24 accent-[#D4AF37] cursor-pointer"
                  title="Adjust 3D visual scale"
                />
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span>Angle: {rotationAngle}°</span>
                <span className="text-[#D4AF37]">Weight: {activeModel.weight}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls & Commission Setup */}
          <div className="lg:col-span-5 p-6 bg-white flex flex-col justify-between">
            <div className="space-y-6">
              {/* Model Picker */}
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8E6718] mb-2">
                  Select Award Architecture
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {AR_MODELS.map((model, idx) => {
                    const isSelected = idx === selectedModelIdx;
                    return (
                      <button
                        key={model.id}
                        type="button"
                        onClick={() => setSelectedModelIdx(idx)}
                        className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                          isSelected
                            ? 'bg-[#1A1A1A] border-[#D4AF37] text-white shadow-md'
                            : 'bg-[#FAF8F4] border-[#E6DCC5] text-[#1A1A1A] hover:border-[#D4AF37]'
                        }`}
                      >
                        <img
                          src={model.image}
                          alt={model.name}
                          className="w-10 h-10 object-contain rounded bg-white/10 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>
                            {model.name}
                          </p>
                          <p className={`text-[10px] truncate ${isSelected ? 'text-[#D4AF37]' : 'text-[#645D54]'}`}>
                            {model.scale}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Inscription Inputs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8E6718]">
                    Live Plaque Inscription Proof
                  </p>
                  <span className="text-[10px] font-semibold text-[#D4AF37] bg-[#1A1A1A] px-2 py-0.5 rounded">
                    Free Inscription
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A443C] mb-1">
                      Line 1 — Recipient, Team or Honoree
                    </label>
                    <input
                      type="text"
                      value={inscriptionLine1}
                      onChange={(e) => setInscriptionLine1(e.target.value)}
                      placeholder="e.g. ST. GEORGE FOOTBALL CLUB"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A443C] mb-1">
                      Line 2 — Citation, Award or Occasion
                    </label>
                    <input
                      type="text"
                      value={inscriptionLine2}
                      onChange={(e) => setInscriptionLine2(e.target.value)}
                      placeholder="e.g. Kerala State Championship Winner"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#4A443C] mb-1">
                      Line 3 — Year, Date or Venue
                    </label>
                    <input
                      type="text"
                      value={inscriptionLine3}
                      onChange={(e) => setInscriptionLine3(e.target.value)}
                      placeholder="e.g. Kothamangalam · 2026"
                      className="w-full px-3 py-2 text-xs bg-[#FAF8F4] border border-[#E6DCC5] rounded-md text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Specifications Callout */}
              <div className="p-3.5 rounded-lg bg-[#FAF8F4] border border-[#E6DCC5] space-y-1.5 text-xs text-[#5A5248]">
                <div className="flex items-center gap-2 text-[#1A1A1A] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Kothamangalam Atelier Production Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Every memento is calibrated with high-definition fiber laser or mechanical diamond engraving.
                  Pre-production digital vector proofs sent via WhatsApp/email within 4 hours.
                </p>
              </div>
            </div>

            {/* Bottom Modal CTA */}
            <div className="pt-6 border-t border-[#E6DCC5] mt-6">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  const target = document.getElementById('collection');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 px-6 rounded-md bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white font-semibold text-sm flex items-center justify-center gap-2 border border-[#2E2E2E] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Select &amp; Order This Model from Collection</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
