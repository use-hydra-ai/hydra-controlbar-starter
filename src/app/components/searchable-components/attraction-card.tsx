
interface AttractionCardProps {
  name: string;
  image: string;
  description: string;
  rating: number;
}

export default function AttractionCard({ name, image, description, rating }: AttractionCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <p className="text-gray-700 mb-2">{description}</p>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">{'★'.repeat(rating)}</span>
          <span className="text-gray-600">({rating}/5)</span>
        </div>
      </div>
    </div>
  );
}
