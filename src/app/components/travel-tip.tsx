
interface TravelTipProps {
  tip: string;
  author: string;
}

export default function TravelTip({ tip, author }: TravelTipProps) {
  return (
    <div className="bg-yellow-100 p-4 rounded-lg">
      <p className="italic mb-2">"{tip}"</p>
      <p className="text-right text-sm">- {author}</p>
    </div>
  );
}
