
interface WeatherWidgetProps {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

export default function WeatherWidget({ city, temperature, condition, icon }: WeatherWidgetProps) {
  return (
    <div className="bg-blue-100 p-4 rounded-lg flex items-center justify-between">
      <div>
        <h3 className="font-bold text-lg">{city}</h3>
        <p>{condition}</p>
      </div>
      <div className="flex items-center">
        <img src={icon} alt={condition} className="w-12 h-12 mr-2" />
        <span className="text-2xl font-bold">{temperature}°C</span>
      </div>
    </div>
  );
}
