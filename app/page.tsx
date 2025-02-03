import UrlShortenerForm from "./components/UrlShortenerForm"
import UrlList from "./components/UrlList"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">URL Shortener</h1>
      <UrlShortenerForm />
      <UrlList />
    </div>
  )
}

