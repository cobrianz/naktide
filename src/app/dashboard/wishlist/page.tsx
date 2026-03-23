"use client";
import React from "react";

export default function WishlistPage() {
  const wishlist = [
    {
      name: "Serengeti Sunset Safari",
      location: "Tanzania, East Africa",
      price: "Ksh 161,200",
      tag: "Safari",
      img: "https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg",
    },
    {
      name: "Okavango Delta Glamping",
      location: "Botswana, South Africa",
      price: "Ksh 500,500",
      tag: "Expedition",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU0d0zqlZEQu60hXGw_XC3xisMeoyjV_KDrxegeoezuE3X4OebwyqI7VAi7NrGcVJ_HZHpjjKK1_iVycPe9TPVuQ5VZaa_aJhbc4jp9DuQHaI_C8BsNTXS_A6ZQmugTozxjYUAppzqsupGGqTJWnmpSlpsGuJhMlzzGM5lRbHnmGISLf-qpG0qVgHioQaabGO0jhyvGjR30eRBz7W8eSWamTSVPq_PkpCNhkDs7upNKyq-mtlRJlYAuNZBYnSsZ2TE9pIL5GOT0A",
    },
    {
      name: "Maasai Mara Photography",
      location: "Kenya, East Africa",
      price: "Ksh 273,000",
      tag: "Culture",
      img: "https://images.pexels.com/photos/34800172/pexels-photo-34800172.jpeg",
    },
    {
      name: "Victoria Falls Sky Tour",
      location: "Zambia/Zimbabwe",
      price: "Ksh 110,500",
      tag: "Aerial",
      img: "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <header>
        <span className="text-primary font-headline font-bold text-xs tracking-[0.2rem] uppercase mb-2 block">Your Collection</span>
        <h1 className="text-3xl lg:text-5xl font-black font-headline text-on-background tracking-tighter italic uppercase underline decoration-primary/20 underline-offset-8">NakTide Wishlist</h1>
        <p className="text-on-surface-variant mt-6 max-w-2xl text-base lg:text-lg font-medium leading-relaxed opacity-80">
          Curate your dream journeys. These selected expeditions are waiting for your final confirmation.
        </p>
      </header>

      {/* Masonry-like Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {wishlist.map((item, i) => (
          <div key={i} className="group relative bg-surface-container-lowest rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-outline-variant/10">
            <div className="relative aspect-[1/1] overflow-hidden">
              <img 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0" 
                src={item.img} 
              />
              <div className="absolute top-6 right-6 z-10">
                <button className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary border border-white/20 hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95">
                  <span className="material-symbols-outlined text-xl">favorite</span>
                </button>
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-primary/20 backdrop-blur-md text-white border border-white/20 text-[9px] font-black uppercase tracking-[0.2rem] px-4 py-2 rounded-full">
                  {item.tag}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-black font-headline text-on-surface group-hover:text-primary transition-colors leading-tight">
                  {item.name}
                </h3>
              </div>
              <div className="flex items-center text-on-surface-variant font-bold text-sm mb-8 opacity-70">
                <span className="material-symbols-outlined text-primary text-sm mr-2">location_on</span>
                {item.location}
              </div>
              <div className="flex items-center justify-between border-t border-outline-variant/10 pt-6">
                <span className="text-2xl font-black font-headline text-primary">{item.price}</span>
                <button className="px-6 py-3 bg-on-background text-white font-black uppercase tracking-widest text-[10px] rounded-xl hover:bg-primary transition-all">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Section */}
      <div className="mt-16 mb-16 relative rounded-[3rem] overflow-hidden min-h-[450px] flex items-center p-10 lg:p-20 group">
        <div className="absolute inset-0 bg-on-background">
          <img 
            alt="Starry Savannah Night" 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[2s]" 
            src="https://images.pexels.com/photos/1054668/pexels-photo-1054668.jpeg" 
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="bg-primary/30 backdrop-blur-md text-white border border-white/10 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 inline-block">
            Curated Recommendation
          </span>
          <h3 className="text-5xl font-headline font-black text-white mb-6 leading-[1.1] tracking-tighter">Under the Namibian Stars</h3>
          <p className="text-white/70 text-lg mb-10 leading-relaxed font-medium">
            Based on your interests in photography and night safaris, we think you'd love our new desert expedition in Sossusvlei. Private camps, expert astrophotography guides.
          </p>
          <button className="px-10 py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-full flex items-center space-x-3 group hover:bg-white hover:text-on-background transition-all shadow-2xl">
            <span>Explore Desert Expedition</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
