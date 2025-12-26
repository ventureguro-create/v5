import { useState } from 'react';

/**
 * Buy NFT Modal Component
 * 
 * A complete modal component for purchasing NFT boxes with quantity selection,
 * discount calculation, and transaction flow.
 * 
 * Props:
 * - isOpen: boolean - Controls modal visibility
 * - onClose: function - Callback when modal closes
 * - nftSettings: object - NFT configuration
 *   - price_per_box: number - Price per NFT box in USDC
 *   - discount_threshold: number - Minimum quantity for discount
 *   - discount_percent: number - Discount percentage
 *   - total_supply: number - Total NFT boxes available
 *   - max_per_wallet: number - Maximum boxes per wallet
 * 
 * Usage:
 * <BuyNFTModal 
 *   isOpen={showModal} 
 *   onClose={() => setShowModal(false)}
 *   nftSettings={{
 *     price_per_box: 150,
 *     discount_threshold: 3,
 *     discount_percent: 10,
 *     total_supply: 666,
 *     max_per_wallet: 100
 *   }}
 * />
 */

const BuyNFTModal = ({ isOpen, onClose, nftSettings }) => {
  const [quantity, setQuantity] = useState(1);
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'
  
  // Settings from props or defaults
  const settings = nftSettings || {
    price_per_box: 150,
    discount_threshold: 3,
    discount_percent: 10,
    total_supply: 666,
    max_per_wallet: 100
  };
  
  const NFT_PRICE = settings.price_per_box || 150;
  const DISCOUNT_THRESHOLD = settings.discount_threshold || 3;
  const DISCOUNT_PERCENT = settings.discount_percent || 10;
  const TOTAL_SUPPLY = settings.total_supply || 666;
  const MAX_PER_WALLET = settings.max_per_wallet || 100;
  
  // Calculate price with discount
  const hasDiscount = quantity >= DISCOUNT_THRESHOLD;
  const basePrice = quantity * NFT_PRICE;
  const discountAmount = hasDiscount ? basePrice * (DISCOUNT_PERCENT / 100) : 0;
  const finalPrice = basePrice - discountAmount;
  
  const handleQuantityChange = (value) => {
    const num = parseInt(value) || 1;
    setQuantity(Math.min(Math.max(1, num), MAX_PER_WALLET));
  };
  
  const handlePurchase = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };
  
  const handleClose = () => {
    setStep('select');
    setQuantity(1);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
      
      <div 
        className="relative w-full max-w-md transform transition-all"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
      >
        <style>{`
          @keyframes modalSlideIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes successPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
          }
          .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 2px;
            animation: confetti 1s ease-out forwards;
          }
          @keyframes boxFloat {
            0%, 100% { transform: translateY(0) rotateY(0deg); }
            25% { transform: translateY(-3px) rotateY(5deg); }
            50% { transform: translateY(0) rotateY(0deg); }
            75% { transform: translateY(-3px) rotateY(-5deg); }
          }
          @keyframes boxGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(16,185,129,0.2); }
            50% { box-shadow: 0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(16,185,129,0.4); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
          }
          .nft-box-icon {
            position: relative;
            width: 56px;
            height: 56px;
            animation: boxFloat 3s ease-in-out infinite, boxGlow 2s ease-in-out infinite;
            border-radius: 12px;
            background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            perspective: 100px;
          }
          .nft-box-icon::before {
            content: '';
            position: absolute;
            top: -4px;
            right: -4px;
            width: 12px;
            height: 12px;
            background: #fbbf24;
            border-radius: 50%;
            animation: sparkle 1.5s ease-in-out infinite;
          }
          .nft-box-icon::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: -2px;
            width: 8px;
            height: 8px;
            background: #f472b6;
            border-radius: 50%;
            animation: sparkle 1.5s ease-in-out infinite 0.5s;
          }
        `}</style>
        
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 p-6 text-white overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-16 -left-16 animate-pulse"></div>
              <div className="absolute w-24 h-24 bg-white/5 rounded-full top-4 right-8 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute w-16 h-16 bg-teal-400/20 rounded-full bottom-0 left-1/3 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative flex items-center gap-4 mb-2">
              {/* Animated 3D Box Icon */}
              <div className="nft-box-icon">
                <svg className="w-8 h-8 drop-shadow-lg" viewBox="0 0 24 24" fill="none">
                  {/* 3D Box with gradient */}
                  <defs>
                    <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#d1fae5" />
                    </linearGradient>
                  </defs>
                  {/* Top face */}
                  <path d="M12 2L3 7L12 12L21 7L12 2Z" fill="url(#boxGradient)" stroke="white" strokeWidth="1.5"/>
                  {/* Left face */}
                  <path d="M3 7V17L12 22V12L3 7Z" fill="rgba(255,255,255,0.7)" stroke="white" strokeWidth="1.5"/>
                  {/* Right face */}
                  <path d="M21 7V17L12 22V12L21 7Z" fill="rgba(255,255,255,0.5)" stroke="white" strokeWidth="1.5"/>
                  {/* Gift ribbon */}
                  <path d="M12 2V22M3 7L21 7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold">FOMO NFT Boxes</h2>
                <p className="text-white/80 text-sm">{TOTAL_SUPPLY} unique boxes</p>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {step === 'select' && (
              <>
                <p className="text-gray-600 text-sm mb-6">
                  Purchase an NFT box and become part of the FOMO ecosystem. Each box contains unique rewards and privileges.
                </p>
                
                {/* Discount Banner */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-emerald-800 font-medium text-sm">Special Offer</p>
                      <p className="text-emerald-600 text-xs">
                        {DISCOUNT_PERCENT}% discount when buying {DISCOUNT_THRESHOLD}+ boxes
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quantity Input */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Number of boxes
                  </label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center transition-all"
                      disabled={quantity <= 1}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      min="1"
                      max={MAX_PER_WALLET}
                      className="flex-1 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    />
                    <button 
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 flex items-center justify-center transition-all"
                      disabled={quantity >= MAX_PER_WALLET}
                    >
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Price Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per box</span>
                    <span className="text-gray-900 font-medium">${NFT_PRICE} USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity</span>
                    <span className="text-gray-900 font-medium">x{quantity}</span>
                  </div>
                  {hasDiscount && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>{DISCOUNT_PERCENT}% Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <span className="text-xl font-bold text-emerald-600">${finalPrice.toFixed(2)} USDC</span>
                    </div>
                  </div>
                </div>
                
                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
                >
                  Buy NFT Boxes
                </button>
                
                <p className="text-center text-gray-400 text-xs mt-4">
                  Connect your wallet to complete the purchase
                </p>
              </>
            )}
            
            {step === 'processing' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Processing transaction...
                </h3>
                <p className="text-gray-500 text-sm">Please wait</p>
              </div>
            )}
            
            {step === 'success' && (
              <div className="text-center py-6 relative overflow-hidden">
                {/* Confetti Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti-piece"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: '100%',
                        backgroundColor: ['#10b981', '#14b8a6', '#059669', '#34d399'][i % 4],
                        animationDelay: `${i * 0.1}s`,
                        transform: `rotate(${Math.random() * 360}deg)`
                      }}
                    />
                  ))}
                </div>
                
                <div 
                  className="w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center"
                  style={{ animation: 'successPulse 0.6s ease-in-out' }}
                >
                  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Congratulations!
                </h3>
                <p className="text-gray-600 mb-4">
                  You have successfully purchased {quantity} FOMO NFT {quantity === 1 ? 'box' : 'boxes'}!
                </p>
                
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">{quantity}</p>
                      <p className="text-xs text-gray-500">Boxes</p>
                    </div>
                    <div className="w-px h-10 bg-gray-200"></div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-600">${finalPrice.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">USDC</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  Your NFT boxes will be available in your wallet after transaction confirmation.
                </p>
                
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNFTModal;
