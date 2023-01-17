import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ColorProvider } from "./contexts/ColorProvider";
import Router from "./routes/Router";
import ThemeProvider from "./theme/ThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ColorProvider>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </ColorProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
