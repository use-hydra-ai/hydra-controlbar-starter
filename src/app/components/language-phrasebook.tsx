
interface Phrase {
  original: string;
  translated: string;
}

interface LanguagePhrasebookProps {
  language: string;
  phrases: Phrase[];
}

export default function LanguagePhrasebook({ language, phrases }: LanguagePhrasebookProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-bold text-lg mb-2">{language} Phrasebook</h3>
      <ul className="space-y-2">
        {phrases.map((phrase, index) => (
          <li key={index} className="flex justify-between">
            <span>{phrase.original}</span>
            <span className="font-medium">{phrase.translated}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
