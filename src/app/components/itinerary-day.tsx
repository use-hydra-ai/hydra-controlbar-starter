
interface Activity {
  time: string;
  description: string;
}

interface ItineraryDayProps {
  date: string;
  activities: Activity[];
}

export default function ItineraryDay({ date, activities }: ItineraryDayProps) {
  return (
    <div className="border-b pb-4 mb-4">
      <h3 className="font-bold text-lg mb-2">{date}</h3>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="flex">
            <span className="font-medium w-20">{activity.time}</span>
            <span>{activity.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
