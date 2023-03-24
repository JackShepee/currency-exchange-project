import Header from './components/Header';
import Converter from './components/Converter';

function App() {
  return (
    <section className="mx-auto flex max-w-screen-sm flex-col content-center items-center justify-center px-4">
      <Header />
      <Converter />
    </section>
  );
}

export default App;
