import AppRouter from "./components/AppRouter";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <NavigationBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
