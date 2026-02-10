import Header from "./components/Header/Header";
import Home from "./components/Main/HomePage";
import { Container } from "./components/Container";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Container>
        <Header />
        <Home />
      </Container>
    </>
  );
}

export default App;
