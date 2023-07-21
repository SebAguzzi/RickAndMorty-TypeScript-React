import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./Router";
import { NotificationProvider } from "./context/notification.context";
import { Suspense } from "react";

// La etiqueta suspense sirve para que el componente
// no se renderice hasta que se cargue el contenido
function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
