import { useEffect, useRef, useState } from 'react';
import { FaCirclePlay } from 'react-icons/fa6';
import Loading from './Loading';

function App() {
  const searchWord = useRef()
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchDictionary() {
      if (!searchWord.current?.value || searchWord.current?.value <= 2) {
        return setData({});
      }

      try {
        setLoading(true);
        {
          /* from front-end mentor */
        }
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`,
          {
            signal,
          },
        );
        if (!res.ok) throw new Error('Failed fetching.');

        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setData(data[0]);
        } else {
          setData({ word: 'Not found' });
        }
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDictionary();

    return () => controller.abort();
  }, [searchWord]);

  const { word, phonetic, meanings, sourceUrls } = data;

  return (
    <div className="mx-auto flex max-w-6xl flex-col px-8">
      <section className="my-12 w-3/4 md:w-full">
        <input
          className="w-full rounded-xl bg-slate-100 p-4 outline-none"
          placeholder="Search from dictionary..."
          ref={searchWord}
    
        />
      </section>

      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="flex w-full items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold text-black">{word}</h2>
              <p className="text-blue-500">{phonetic && phonetic}</p>
            </div>
            <div>
              {word && (
                <FaCirclePlay
                  role="button"
                  className="text-[80px] text-blue-500"
                />
              )}
            </div>
          </section>
          <section className="mt-8 flex flex-col">
            {meanings
              ? meanings.map((meaning) => (
                  <div key={meaning.partOfSpeech} className="py-4">
                    <p className="border-l-2 border-blue-500 px-1 text-xl font-bold">
                      {meaning.partOfSpeech}
                    </p>{' '}
                    <p className="italic text-slate-500">Meaning</p>
                    <ul className="ml-8 list-disc text-sm">
                      {meaning.definitions.map((definition, i) => (
                        <li key={i}>{definition.definition}</li>
                      ))}
                    </ul>
                  </div>
                ))
              : null}
          </section>
          {meanings
            ? sourceUrls.map((url) => (
                <footer
                  key={url}
                  className="flex items-center gap-1 border-t border-slate-500 py-2 text-sm"
                >
                  <p className="text-slate-500">Source:</p>
                  <p className="underline">
                    <a href={url}>{url}</a>
                  </p>
                </footer>
              ))
            : null}{' '}
        </>
      )}
    </div>
  );
}

export default App;
