import AppRouter from "./components/AppRouter";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter} from "react-router-dom";
import {getUsername} from "./utils/storage";

function App() {
    console.log(getUsername());
    return (
        <BrowserRouter>
            <NavigationBar/>
            <AppRouter/>
        </BrowserRouter>
    );
}

export default App;
