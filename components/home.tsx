'use client';

import { Loading } from "@/lib/helpers";
import { useUser } from "@/lib/use-user";

export default function Home() {

    const [user] = useUser();

    return (
        <div className="text-center">
            <h1 className="text-3xl font-semibold my-3">NextJS Firebase Todo App</h1>
            {user.loading ? <Loading /> : user.data ? 'profile' : 'login'}
        </div>
    );
}
