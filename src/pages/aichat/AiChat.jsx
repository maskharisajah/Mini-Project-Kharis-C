import { useState, useEffect } from "react";
import OpenAI from "openai";
import { Input } from "../../components/input/input";
import Button from "../../components/button/button";
import clsx from "clsx";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function Index() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "Kamu adalah seorang ahli dalam pekerjaan untuk memanajemen stok barang pada sebuah toko, kamu akan menjawab pertanyaan seputar manajemen barang dengan bahasa yang mudah dimengerti oleh karyawan",
          },
        ],
        model: "gpt-3.5-turbo",
      });
      setResults(response.choices);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const userMsg = {
      message: [
        {
          content: prompt,
          role: "user",
        },
        {
          role: "assistant",
          content:
            "Kamu adalah seorang programmer yang sangat menguasai reactjs + vite, tailwind css dan library yang diperlukan, kamu akan menjawab pertanyaan seputar code da programming dengan bahasa yang mudah dimengerti oleh pemula.  ",
        },
      ],
    };
    const newData = [...results, userMsg];
    setResults(newData);
    setPrompt("");
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });
      const choice = response.choices[0];
      setResults([...newData, choice]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col overflow-auto py-4 px-8">
        <Button label="Hallo, Saya adalah chatbot yang akan membantu kamu untuk menjawab pertanyaan seputar inventori barang" />
        {results.map((result) => (
          <p
            className={clsx(
              "border rounded-xl p-2 mt-2 mb-4 w-fit",
              result.message.role === "assistant" ? "self-start" : "self-end"
            )}
            key={result.message.content}
          >
            {result.message.content}
          </p>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
          <Input placeholder="masukan prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
          <Button
            label={isLoading ? "Loading" : "Submit"}
            type="submit"
            disabled={isLoading}
            aria-disabled={isLoading}
          />
        </form>
      </div>
    </>
  );
}
