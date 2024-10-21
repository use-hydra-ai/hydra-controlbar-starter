
interface HotelCardProps {
  name: string;
  image: string;
  rating: number;
  price: number;
  currency: string;
}

export default function HotelCard({ name, image, rating, price, currency }: HotelCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-yellow-500">{'★'.repeat(rating)}</span>
          <span className="font-bold">{`${price} ${currency}`}</span>
        </div>
      </div>
    </div>
  );
}
