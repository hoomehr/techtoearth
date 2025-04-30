import Image from 'next/image';

export interface SuccessStoryProps {
  name: string;
  formerRole: string;
  currentRole: string;
  testimonial: string;
  transitionYear: string;
  imageSrc: string;
}

export default function SuccessStoryCard({
  name,
  formerRole,
  currentRole,
  testimonial,
  transitionYear,
  imageSrc,
}: SuccessStoryProps) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl"
      style={{
        boxShadow: '0 0 25px rgba(0, 128, 0, 0.25)'
      }}
    >
      <div className="relative h-60">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm">Former {formerRole}</p>
        </div>
      </div>
      <div className="p-6 relative group">
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          Read Story
        </div>
        <p className="text-green-600 font-semibold mb-2">Now: {currentRole}</p>
        <p className="text-gray-600 mb-4">
          "{testimonial}"
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <svg className="h-5 w-5 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Transitioned in {transitionYear}</span>
        </div>
      </div>
    </div>
  );
}
