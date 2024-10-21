
interface TransportationOptionProps {
  type: string;
  icon: string;
  duration: string;
  price: number;
  currency: string;
}

export default function TransportationOption({ type, icon, duration, price, currency }: TransportationOptionProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center">
        <img src={icon} alt={type} className="w-8 h-8 mr-4" />
        <div>
          <h4 className="font-bold">{type}</h4>
          <p className="text-sm text-gray-600">{duration}</p>
        </div>
      </div>
      <span className="font-bold">{`${price} ${currency}`}</span>
    </div>
  );
}
