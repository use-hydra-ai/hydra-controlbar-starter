import { HydraClient } from "hydra-ai";
import AttractionCard from "./components/attraction-card";
import CurrencyConverter from "./components/currency-converter";
import FlightSearch from "./components/flight-search";
import HotelCard from "./components/hotel-card";
import ItineraryDay from "./components/itinerary-day";
import LanguagePhrasebook from "./components/language-phrasebook";
import TransportationOption from "./components/transportation-option";
import TravelTip from "./components/travel-tip";
import WeatherWidget from "./components/weather-widget";

const hydra = new HydraClient({
    hydraApiKey:
        process.env.NEXT_PUBLIC_HYDRA_API_KEY,
});

export const initHydraRegistration = async () => {
    await Promise.all([
        hydra.registerComponent("attraction-card", "A card displaying information about a tourist attraction", AttractionCard,
            {
                name: "string",
                image: "string",
                description: "string",
                rating: "number"
            }
        ),
        hydra.registerComponent("currency-converter", "A widget for converting between currencies", CurrencyConverter,
            {
                baseCurrency: "string",
                targetCurrency: "string",
                exchangeRate: "number"
            }
        ),
        hydra.registerComponent("flight-search", "A form for searching flights", FlightSearch,
            {
                initialFrom: "string",
                initialTo: "string",
                initialDate: "string"
            }
        ),
        hydra.registerComponent("hotel-card", "A card displaying information about a hotel", HotelCard,
            {
                name: "string",
                image: "string",
                rating: "number",
                price: "number",
                currency: "string"
            }
        ),
        hydra.registerComponent("itinerary-day", "A component showing activities for a day in an itinerary", ItineraryDay,
            {
                date: "string",
                activities: "{time: string, description: string}[]"
            }
        ),
        hydra.registerComponent("language-phrasebook", "A phrasebook for common expressions in a foreign language", LanguagePhrasebook,
            {
                language: "string",
                phrases: "{original: string, translated: string}[]"
            }
        ),
        hydra.registerComponent("transportation-option", "A component showing a transportation option", TransportationOption,
            {
                type: "string",
                icon: "string",
                duration: "string",
                price: "number",
                currency: "string"
            }
        ),
        hydra.registerComponent("travel-tip", "A component displaying a travel tip", TravelTip,
            {
                tip: "string",
                author: "string"
            }
        ),
        hydra.registerComponent("weather-widget", "A widget displaying weather information", WeatherWidget,
            {
                city: "string",
                temperature: "number",
                condition: "string",
                icon: "string"
            }
        ),
    ]);
};

export default hydra;
