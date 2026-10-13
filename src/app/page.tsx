import Home from "@/components/home";
import { UserProvider } from "@/lib/use-user";

const HomePage = () => {
    return (
        <main>
        <UserProvider>
            <Home />
        </UserProvider>
        </main>
    );
};

export default HomePage;

