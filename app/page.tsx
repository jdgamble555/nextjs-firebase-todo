import Home from "@/components/home";
import { Provider } from "@/lib/use-provider";

const HomePage = () => {
    return (
        <Provider>
            <Home />
        </Provider>
    );
};

export default HomePage;
