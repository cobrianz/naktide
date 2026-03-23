import React from "react";
import Link from "next/link";

export interface AdventureCardProps {
  id: string;
  image: string;
  altText: string;
  category: string;
  location: string;
  title: string;
  price: string;
  date: string;
  slots: string;
}

export default function AdventureCard({
  id,
  image,
  altText,
  category,
  location,
  title,
  price,
  date,
  slots,
}: AdventureCardProps) {
  return (
    <Link href={`/adventures/${id}`} className="block h-full cursor-pointer">
      <div className="group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col transition-all h-full border border-outline-variant/30 hover:border-primary">
        <div className="relative h-80 overflow-hidden shrink-0">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            alt={altText}
            src={image}
          />
          <div className="absolute bottom-4 right-4 bg-tertiary-container text-on-tertiary-container px-3 py-1 text-xs font-bold uppercase tracking-tighter rounded">
            {category}
          </div>
        </div>
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                {location}
              </p>
              <h3 className="text-xl font-bold font-headline text-on-background leading-tight">
                {title}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant font-bold uppercase">From</p>
              <p className="text-lg font-bold text-primary">{price}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-outline-variant/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">event</span>
              <span className="text-sm font-medium text-on-surface-variant">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-lg">person</span>
              <span className="text-sm font-medium text-on-surface-variant">{slots}</span>
            </div>
          </div>
          <button className="w-full py-2 text-sm text-on-surface font-bold border-2 border-on-surface group-hover:bg-on-surface group-hover:text-white transition-colors rounded-full uppercase tracking-widest">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
