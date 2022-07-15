import { Form, Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Header() {
    const user = useOptionalUser();

    return (
        <header className="w-screen max-w-full fixed bg-gray-800 top-0 left-0 right-0 z-10 h-14 shadow-md">
            <div className="relative w-full h-full">
                <div className="h-14 p-3 w-screen max-w-full">
                    <div className="float-right pr-5 h-full">
                        {
                            user ?
                            <Form action="/logout" method="post">
                                <button
                                    type="submit"
                                    className="align-sub"
                                >
                                    Abmelden
                                </button>
                            </Form>
                            :
                            <Link className="align-sub" to={{
                                pathname: '/login'
                            }}>Anmelden</Link>
                        }
                    </div>
                    <Link style={{ display: 'contents' }} to={{ pathname: '/' }}>
                        <img src="/logo.png" className="h-full" />
                    </Link>
                </div>
            </div>
        </header>
    )
}