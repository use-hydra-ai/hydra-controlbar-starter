'use client';
import { useState } from 'react';
import AttractionCard from "./searchable-components/attraction-card";
import CurrencyConverter from "./searchable-components/currency-converter";
import FlightSearch from "./searchable-components/flight-search";
import HotelCard from "./searchable-components/hotel-card";
import ItineraryDay from "./searchable-components/itinerary-day";
import LanguagePhrasebook from "./searchable-components/language-phrasebook";
import TransportationOption from "./searchable-components/transportation-option";
import TravelTip from "./searchable-components/travel-tip";
import WeatherWidget from "./searchable-components/weather-widget";

export default function ExamplesGrid() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        onClick={toggleVisibility}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {isVisible ? 'Hide Available Components' : 'Show Available Components'}
      </button>

      {isVisible && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          <div>
            <h2 className="text-xl font-semibold mb-2">Flight Search</h2>
            <FlightSearch initialFrom="New York" initialTo="Los Angeles" initialDate="2024-06-15" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Hotel Card</h2>
            <HotelCard
              name="Luxury Resort & Spa"
              image="https://example.com/hotel.jpg"
              rating={4.5}
              price={250}
              currency="USD"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Itinerary Day</h2>
            <ItineraryDay
              date="Day 1 - June 15, 2024"
              activities={[
                { time: "09:00 AM", description: "City Tour" },
                { time: "12:00 PM", description: "Lunch at Local Restaurant" },
                { time: "03:00 PM", description: "Museum Visit" },
              ]}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Weather Widget</h2>
            <WeatherWidget
              city="Paris"
              temperature={22}
              condition="Sunny"
              icon="https://example.com/sunny-icon.png"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Currency Converter</h2>
            <CurrencyConverter
              baseCurrency="USD"
              targetCurrency="EUR"
              exchangeRate={0.85}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Travel Tip</h2>
            <TravelTip
              tip="Always carry a portable charger for your devices."
              author="Experienced Traveler"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Language Phrasebook</h2>
            <LanguagePhrasebook
              language="French"
              phrases={[
                { original: "Hello", translated: "Bonjour" },
                { original: "Thank you", translated: "Merci" },
                { original: "Goodbye", translated: "Au revoir" },
              ]}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Attraction Card</h2>
            <AttractionCard
              name="Eiffel Tower"
              image="https://example.com/eiffel-tower.jpg"
              description="Iconic iron tower in Paris"
              rating={4.8}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Transportation Option</h2>
            <TransportationOption
              type="Metro"
              icon="https://example.com/metro-icon.png"
              duration="30 mins"
              price={2.5}
              currency="EUR"
            />
          </div>
        </div>
      )}
    </div>
  );
}
